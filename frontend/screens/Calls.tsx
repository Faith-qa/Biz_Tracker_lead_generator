// Calls.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Phone, PhoneCall, PhoneIncoming, PhoneOutgoing, Home as HomeIcon } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Sidebar from '../components/sidebar/sidebar';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const Calls: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const isMobile = width < 768;

  const stats = [
    { id: 1, label: 'Total Calls', value: 24, icon: Phone, color: '#3b82f6' },
    { id: 2, label: 'Completed', value: 18, icon: PhoneCall, color: '#22c55e' },
    { id: 3, label: 'Missed', value: 6, icon: PhoneCall, color: '#ef4444' },
  ];

  const calls = [
    { id: '1', contact: 'John Smith', phone: '+1 234-567-8901', type: 'incoming', duration: '5:32', timestamp: 'Today, 2:30 PM', status: 'completed' },
    { id: '2', contact: 'Sarah Johnson', phone: '+1 345-678-9012', type: 'outgoing', duration: '12:45', timestamp: 'Today, 1:15 PM', status: 'completed' },
    { id: '3', contact: 'Unknown', phone: '+1 456-789-0123', type: 'incoming', duration: '0:00', timestamp: 'Today, 11:45 AM', status: 'missed' },
  ];

  const getCallIcon = (type: string, status: string) => {
    if (status === 'missed') return <PhoneCall size={18} color="#ef4444" />;
    if (type === 'incoming') return <PhoneIncoming size={18} color="#22c55e" />;
    return <PhoneOutgoing size={18} color="#3b82f6" />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.sidebarToggle} onPress={() => setShowSidebar(!showSidebar)}>
              <HomeIcon width={24} height={24} color="#3b82f6" />
            </TouchableOpacity>
            <Text style={styles.title}>Calls</Text>
            <TouchableOpacity style={styles.newButton} onPress={() => Toast.show({ type: 'success', text1: 'New Call Clicked!' })}>
              <Phone size={16} color="#fff" />
              <Text style={styles.newButtonText}>{isMobile ? 'New Call' : 'New Call'}</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <View style={styles.statContent}>
                  <View>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                    <Text style={styles.statValue}>{stat.value}</Text>
                  </View>
                  <View style={[styles.statIconWrapper, { backgroundColor: stat.color + '20' }]}>
                    <stat.icon size={20} color={stat.color} />
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Calls List */}
          <View style={styles.callsList}>
            {calls.map((call) => (
              <View key={call.id} style={styles.callCard}>
                <View style={styles.callIconWrapper}>{getCallIcon(call.type, call.status)}</View>
                <View style={styles.callTextWrapper}>
                  <Text style={styles.callContact}>{call.contact}</Text>
                  <Text style={styles.callPhone}>{call.phone}</Text>
                  <Text style={styles.callTimestamp}>{call.timestamp}</Text>
                </View>
                <Text style={styles.callDuration}>{call.duration}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Sidebar Overlay */}
      {showSidebar && (
        <View style={styles.sidebarOverlay}>
          <Sidebar onClose={() => setShowSidebar(false)} />
        </View>
      )}

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
  title: { fontSize: 35, fontWeight: '600' },
  newButton: { flexDirection: 'row', backgroundColor: '#3b82f6', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignItems: 'center' },
  newButtonText: { color: '#fff', marginLeft: 6, fontWeight: '500' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginBottom: 24 },
  statCard: { width: '48%', backgroundColor: '#f9fafb', borderRadius: 12, padding: 12, marginBottom: 12 },
  statContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#6b7280' },
  statValue: { fontSize: 20, fontWeight: '600', marginTop: 4 },
  statIconWrapper: { padding: 10, borderRadius: 50 },
  callsList: { marginTop: 16 },
  callCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9fafb', padding: 12, borderRadius: 8, marginBottom: 10 },
  callIconWrapper: { padding: 8, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  callTextWrapper: { flex: 1 },
  callContact: { fontSize: 14, fontWeight: '600', color: '#111827' },
  callPhone: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  callTimestamp: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  callDuration: { fontSize: 12, color: '#374151', fontWeight: '500' },
});

export default Calls;
