// Leads.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Plus, SidebarIcon, Users, Timer, Contact, TicketPlus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import Sidebar from '../components/sidebar/sidebar';

const { width } = Dimensions.get('window');

interface Lead {
  id: string;
  name: string;
  phoneNumber: string;
  date: string;
  status: 'on-hold' | 'contacted' | 'successful' | 'not-successful';
  notes?: string;
}

const Leads: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchText, setSearchText] = useState('');
  const isMobile = width < 768;

  const leads: Lead[] = [
    { id: '1', name: 'John Smith', phoneNumber: '+1 234-567-8901', date: 'Jul 12, 2023', status: 'on-hold', notes: 'Interested in premium subscription plan' },
    { id: '2', name: 'Sarah Johnson', phoneNumber: '+1 345-678-9012', date: 'Jul 10, 2023', status: 'contacted' },
    { id: '3', name: 'Michael Brown', phoneNumber: '+1 456-789-0123', date: 'Jul 8, 2023', status: 'successful', notes: 'Scheduled for installation next week' },
    { id: '4', name: 'Emily Davis', phoneNumber: '+1 567-890-1234', date: 'Jul 6, 2023', status: 'on-hold', notes: 'Called about pricing options' },
    { id: '5', name: 'Robert Wilson', phoneNumber: '+1 678-901-2345', date: 'Jul 5, 2023', status: 'not-successful' },
    { id: '6', name: 'Lisa Anderson', phoneNumber: '+1 789-012-3456', date: 'Jul 4, 2023', status: 'contacted', notes: 'Follow up scheduled for next week' },
  ];

  const handleMessageClick = (leadId: string) => {
    Toast.show({ type: 'success', text1: `Message clicked for lead ${leadId}` });
  };

  const handleScheduleClick = (leadId: string) => {
    Toast.show({ type: 'success', text1: `Schedule clicked for lead ${leadId}` });
  };

  const stats = [
    { id: 1, label: 'Total Leads', value: leads.length, icon: Users, color: '#3b82f6' },
    { id: 2, label: 'on-hold', value: leads.filter(l => l.status === 'on-hold').length, icon: Timer,color: '#3b82f6' },
    { id: 3, label: 'Contacted', value: leads.filter(l => l.status === 'contacted').length, icon: Contact, color: '#f97316' },
    { id: 4, label: 'Successful', value: leads.filter(l => l.status === 'successful').length, icon: TicketPlus, color: '#22c55e' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.sidebarToggle} onPress={() => setShowSidebar(!showSidebar)}>
              <SidebarIcon width={24} height={24} color="#3b82f6" />
            </TouchableOpacity>
            <Text style={styles.title}>Leads</Text>
            <TouchableOpacity style={styles.newButton} onPress={() => Toast.show({ type: 'success', text1: 'New Lead Clicked!' })}>
              <Plus size={16} color="#fff" />
              <Text style={styles.newButtonText}>{isMobile ? 'Add Lead' : 'Add New Lead'}</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <View style={styles.statContent}>
                  <View>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                    <Text style={styles.statValue}>{stat.value}</Text>
                  </View>
                  {stat.icon && <View style={[styles.statIconWrapper, { backgroundColor: stat.color + '20' }]}><stat.icon size={20} color={stat.color} /></View>}
                  {!stat.icon && <View style={[styles.statIconWrapper, { backgroundColor: stat.color + '20' }]} />}
                </View>
              </View>
            ))}
          </View>

          {/* Search */}
          <View style={styles.searchBox}>
            <TextInput 
              style={styles.searchInput} 
              placeholder="Search leads..." 
              value={searchText} 
              onChangeText={setSearchText} 
            />
          </View>

          {/* Leads List */}
          <View style={styles.leadsList}>
            {leads.map((lead) => (
              <View key={lead.id} style={styles.leadCard}>
                <View style={styles.leadInfo}>
                  <Text style={styles.leadName}>{lead.name}</Text>
                  <Text style={styles.leadPhone}>{lead.phoneNumber}</Text>
                  <Text style={styles.leadDate}>{lead.date}</Text>
                  {lead.notes && <Text style={styles.leadNotes}>{lead.notes}</Text>}
                </View>
                <View style={styles.leadActions}>
                  <TouchableOpacity onPress={() => handleMessageClick(lead.id)} style={styles.actionButton}>
                    <Text style={styles.actionText}>Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleScheduleClick(lead.id)} style={styles.actionButton}>
                    <Text style={styles.actionText}>Schedule</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Sidebar Overlay */}
      {showSidebar && <View style={styles.sidebarOverlay}><Sidebar onClose={() => setShowSidebar(false)} /></View>}

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  mainContainer: { flex: 1, flexDirection: 'row', backgroundColor: '#fff' },
  content: { flexGrow: 1, padding: 16, paddingBottom: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  sidebarToggle: { padding: 8, borderRadius: 8, backgroundColor: '#f3f4f6' },
  sidebarOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.5)' },
  title: { fontSize: 24, fontWeight: '600' },
  newButton: { flexDirection: 'row', backgroundColor: '#3b82f6', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignItems: 'center' },
  newButtonText: { color: '#fff', marginLeft: 6, fontWeight: '500' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginBottom: 24 },
  statCard: { width: '48%', backgroundColor: '#f9fafb', borderRadius: 12, padding: 12, marginBottom: 12 },
  statContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#6b7280' },
  statValue: { fontSize: 20, fontWeight: '600', marginTop: 4 },
  statIconWrapper: { padding: 10, borderRadius: 50 },
  searchBox: { backgroundColor: '#f9fafb', borderRadius: 12, padding: 8, marginBottom: 16 },
  searchInput: { padding: 8, fontSize: 14, color: '#111827' },
  leadsList: { marginTop: 16 },
  leadCard: { backgroundColor: '#f9fafb', borderRadius: 12, padding: 12, marginBottom: 12 },
  leadInfo: { marginBottom: 8 },
  leadName: { fontSize: 14, fontWeight: '600', color: '#111827' },
  leadPhone: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  leadDate: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  leadNotes: { fontSize: 12, color: '#374151', marginTop: 2 },
  leadActions: { flexDirection: 'row', gap: 12 },
  actionButton: { paddingVertical: 4, paddingHorizontal: 8, backgroundColor: '#3b82f6', borderRadius: 6 },
  actionText: { color: '#fff', fontSize: 12 },
});

export default Leads;
