// Home.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Home as HomeIcon, ArrowRight, Phone, Calendar, MessageSquare, User, Plus, Handshake, MagnetIcon, DollarSign } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import * as NavigationBar from 'expo-navigation-bar';

import Sidebar from '../components/sidebar/sidebar';

const { width } = Dimensions.get('window');

const fetchExampleData = async (): Promise<string[]> => {
  // Mock fetch
  return new Promise((resolve) =>
    setTimeout(() => resolve(['Item 1', 'Item 2', 'Item 3']), 1000)
  );
};

const Home: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [barVisible, setBarVisible] = useState(true);
  const [showCallNotification, setShowCallNotification] = useState(false);

  const isMobile = width < 768;

  const { data, isLoading, error }: UseQueryResult<string[], Error> = useQuery({
    queryKey: ['example'],
    queryFn: fetchExampleData,
  });

  useEffect(() => {
    NavigationBar.setVisibilityAsync(barVisible ? 'visible' : 'hidden');
  }, [barVisible]);

  const stats = [
    {
      id: 1,
      label: 'Total Leads',
      value: 142,
      icon: User,
      change: '+12%',
      color: '#3b82f6',
    },
    {
      id: 2,
      label: 'Calls Today',
      value: 24,
      icon: Phone,
      change: '+5%',
      color: '#f97316',
    },
    {
      id: 3,
      label: 'Messages Sent',
      value: 68,
      icon: MessageSquare,
      change: '+8%',
      color: '#6366f1',
    },
    {
      id: 4,
      label: 'Appointments',
      value: 18,
      icon: Calendar,
      change: '+2%',
      color: '#22c55e',
    },
    {
      id: 5,
      label: 'New Leads',
      value: 11,
      icon: MagnetIcon,
      change: '+10%',
      color: '#3b82f6',
    },
    {
      id: 6,
      label: 'Profit/loss',
      value: '$5,420',
      icon: DollarSign,
      change: '+25%',
      color: '#22c55e',
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'Incoming Call',
      details: 'From: +1 234-567-8901',
      time: '2 hours ago',
      icon: <Phone width={18} height={18} color="#3b82f6" />,
      bgColor: '#3b82f610',
    },
    {
      id: '2',
      type: 'New Appointment',
      details: 'Sarah Johnson - Premium Consultation',
      time: 'Yesterday',
      icon: <Calendar width={18} height={18} color="#22c55e" />,
      bgColor: '#22c55e10',
    },
    {
      id: '3',
      type: 'Message Sent',
      details: 'To: Michael Brown',
      time: '2 days ago',
      icon: <MessageSquare width={18} height={18} color="#f97316" />,
      bgColor: '#f9731610',
    },
  ];

  if (isLoading) return <Text style={styles.center}>Loading...</Text>;
  if (error) return <Text style={styles.center}>Error loading data</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.sidebarToggle} 
              onPress={() => setShowSidebar(!showSidebar)}
            >
              <HomeIcon width={24} height={24} color="#3b82f6" />
            </TouchableOpacity>
            <Text style={styles.title}>Dashboard</Text>
            <TouchableOpacity style={styles.newButton}>
              <Plus size={16} color="#fff" />
              <Text style={styles.newButtonText}>
                {isMobile ? 'New' : 'Add New Lead'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <View style={styles.statContent}>
                  <View>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statChange}>
                      {stat.change} this week
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statIconWrapper,
                      { backgroundColor: stat.color + '20' },
                    ]}
                  >
                    <stat.icon size={20} color={stat.color} />
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* --- Updated Recent Activity Section --- */}
          <View style={styles.recentActivity}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View
                  style={[
                    styles.activityIconWrapper,
                    { backgroundColor: activity.bgColor },
                  ]}
                >
                  {activity.icon}
                </View>
                <View style={styles.activityTextWrapper}>
                  <Text style={styles.activityTitle}>{activity.type}</Text>
                  <Text style={styles.activitySubtitle}>{activity.details}</Text>
                  <Text style={styles.activitySubtitle}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
          <Text style={styles.footerText}>2025 © Biz Tracker v1.0</Text>
          <Text style={styles.footerText}>All Rights Reserved</Text>
      </View>


      {/* Sidebar as overlay */}
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
  container: { 
    flex: 1, 
    backgroundColor: '#f2f2f2' 
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sidebarToggle: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  newButton: {
    flexDirection: 'row',
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  newButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  statContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },
  statChange: {
    fontSize: 12,
    color: '#16a34a',
    marginTop: 4,
  },
  statIconWrapper: {
    padding: 10,
    borderRadius: 50,
  },
  recentActivity: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#374151',
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  activityIconWrapper: {
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityTextWrapper: {
    marginLeft: 10,
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  footer: {
  marginTop: 2,
  alignItems: 'center',
  paddingVertical: 5,
},
footerText: {
  fontSize: 12,
  color: '#6b7280',
},

});

export default Home;
