// Calendar.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, Clock, Plus } from 'lucide-react-native';
import Toast from 'react-native-toast-message';

import Sidebar from '../components/sidebar/sidebar';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

interface Appointment {
  id: string;
  title: string;
  client: string;
  time: string;
  date: string;
  status: 'confirmed' | 'pending';
}

const Calendar: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const upcomingAppointments: Appointment[] = [
    { id: '1', title: 'Premium Consultation', client: 'Sarah Johnson', time: '2:00 PM - 3:00 PM', date: 'Today', status: 'confirmed' },
    { id: '2', title: 'Installation Planning', client: 'Michael Brown', time: '10:00 AM - 11:30 AM', date: 'Tomorrow', status: 'pending' },
    { id: '3', title: 'Follow-up Call', client: 'John Smith', time: '3:30 PM - 4:00 PM', date: 'Jul 15, 2023', status: 'confirmed' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.sidebarToggle} onPress={() => setShowSidebar(!showSidebar)}>
              <CalendarIcon width={24} height={24} color="#3b82f6" />
            </TouchableOpacity>
            <Text style={styles.title}>Calendar</Text>
            <TouchableOpacity
              style={styles.newButton}
              onPress={() => Toast.show({ type: 'success', text1: 'New Appointment Clicked!' })}
            >
              <Plus size={16} color="#fff" />
              <Text style={styles.newButtonText}>{isMobile ? 'New' : 'New Appointment'}</Text>
            </TouchableOpacity>
          </View>

          {/* Calendar View */}
          <View style={styles.calendarCard}>
            <RNCalendar
              onDayPress={(day) => {
                Toast.show({ type: 'info', text1: `Selected ${day.dateString}` });
              }}
              markedDates={{
                '2025-09-08': { selected: true, marked: true, selectedColor: '#3b82f6' },
              }}
            />
          </View>

          {/* Upcoming Appointments */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Clock size={18} color="#111827" />
              <Text style={styles.cardTitle}>Upcoming Appointments</Text>
            </View>
            {upcomingAppointments.map((appt) => (
              <View key={appt.id} style={styles.appointmentItem}>
                <View style={styles.appointmentTop}>
                  <Text style={styles.appointmentTitle}>{appt.title}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      appt.status === 'confirmed' ? styles.confirmed : styles.pending,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        appt.status === 'confirmed' ? styles.confirmedText : styles.pendingText,
                      ]}
                    >
                      {appt.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.appointmentClient}>{appt.client}</Text>
                <Text style={styles.appointmentMeta}>{appt.time}</Text>
                <Text style={styles.appointmentMeta}>{appt.date}</Text>
              </View>
            ))}
          </View>

          {/* Quick Stats */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quick Stats</Text>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Today's Appointments</Text>
              <Text style={styles.statValue}>3</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>This Week</Text>
              <Text style={styles.statValue}>12</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Pending Confirmations</Text>
              <Text style={styles.statValue}>2</Text>
            </View>
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
  title: { fontSize: 24, fontWeight: '600' },
  newButton: { flexDirection: 'row', backgroundColor: '#3b82f6', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignItems: 'center' },
  newButtonText: { color: '#fff', marginLeft: 6, fontWeight: '500' },
  calendarCard: { backgroundColor: '#f9fafb', borderRadius: 12, padding: 12, marginBottom: 16 },
  card: { backgroundColor: '#f9fafb', borderRadius: 12, padding: 16, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginLeft: 6 },
  appointmentItem: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 12 },
  appointmentTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  appointmentTitle: { fontSize: 14, fontWeight: '600', color: '#111827' },
  appointmentClient: { fontSize: 13, color: '#6b7280', marginBottom: 2 },
  appointmentMeta: { fontSize: 12, color: '#6b7280' },
  statusBadge: { borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 },
  confirmed: { backgroundColor: '#10b98120' },
  pending: { backgroundColor: '#f9731620' },
  confirmedText: { color: '#10b981', fontSize: 12, fontWeight: '500' },
  pendingText: { color: '#f97316', fontSize: 12, fontWeight: '500' },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statLabel: { fontSize: 13, color: '#6b7280' },
  statValue: { fontSize: 14, fontWeight: '600' },
  statusText: { fontSize: 12, fontWeight: '500' },
});

export default Calendar;
