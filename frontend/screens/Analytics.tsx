// Analytics.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart as BarChartIcon, TrendingUp, Users, Phone, MessageSquare, Calendar as CalendarIcon } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import { BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker'; // Add this import

import Sidebar from '../components/sidebar/sidebar';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

interface Metric {
  id: number;
  label: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

interface Activity {
  id: string;
  description: string;
  timestamp: string;
  value?: string;
  duration?: string;
  date?: string;
}

const Analytics: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedRange, setSelectedRange] = useState<'30days' | '7days' | '3months'>('30days');

  const metrics: Metric[] = [
    { id: 1, label: 'Total Revenue', value: '$24,580', icon: TrendingUp, change: '+15.2%', color: '#10b981' },
    { id: 2, label: 'Conversion Rate', value: '68%', icon: Users, change: '+8.1%', color: '#3b82f6' },
    { id: 3, label: 'Avg Call Duration', value: '8:32', icon: Phone, change: '+2.4%', color: '#f97316' },
    { id: 4, label: 'Response Rate', value: '92%', icon: MessageSquare, change: '+5.3%', color: '#6366f1' },
  ];

  const recentActivity: Activity[] = [
    { id: '1', description: 'Sarah Johnson converted to customer', timestamp: '2 hours ago', value: '$2,400' },
    { id: '2', description: 'Call with Michael Brown completed', timestamp: '4 hours ago', duration: '12:45' },
    { id: '3', description: 'New appointment with John Smith', timestamp: '6 hours ago', date: 'Jul 15, 2:00 PM' },
  ];

  const chartDataSets = {
    '30days': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [{ data: [3000, 5000, 4000, 7000] }]
    },
    '7days': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{ data: [400, 600, 500, 700, 800, 900, 1000] }]
    },
    '3months': {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{ data: [13000, 16500, 14250, 19000] }]
    }
  };

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
            <Text style={styles.title}>Analytics</Text>
            <View style={styles.filterContainer}>
              {isMobile ? (
                <Picker
                  selectedValue={selectedRange}
                  style={{ width: 150, height: 60 }}
                  onValueChange={(itemValue) => setSelectedRange(itemValue)}
                >
                  <Picker.Item label="Last 30 Days" value="30days" />
                  <Picker.Item label="Last 7 Days" value="7days" />
                  <Picker.Item label="Last 3 Months" value="3months" />
                </Picker>
              ) : (
                <>
                  <TouchableOpacity
                    style={[
                      styles.filterButton,
                      selectedRange === '30days' && styles.filterButtonActive
                    ]}
                    onPress={() => setSelectedRange('30days')}
                  >
                    <Text style={selectedRange === '30days' ? styles.filterTextActive : styles.filterText}>Last 30 Days</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filterButton,
                      selectedRange === '7days' && styles.filterButtonActive
                    ]}
                    onPress={() => setSelectedRange('7days')}
                  >
                    <Text style={selectedRange === '7days' ? styles.filterTextActive : styles.filterText}>Last 7 Days</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filterButton,
                      selectedRange === '3months' && styles.filterButtonActive
                    ]}
                    onPress={() => setSelectedRange('3months')}
                  >
                    <Text style={selectedRange === '3months' ? styles.filterTextActive : styles.filterText}>Last 3 Months</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {/* Metrics */}
          <View style={styles.metricsGrid}>
            {metrics.map((metric) => (
              <View key={metric.id} style={styles.metricCard}>
                <View style={styles.metricContent}>
                  <View>
                    <Text style={styles.metricLabel}>{metric.label}</Text>
                    <Text style={styles.metricValue}>{metric.value}</Text>
                    <Text style={[styles.metricChange, { color: metric.color }]}>{metric.change} vs last period</Text>
                  </View>
                  <View style={[styles.metricIconWrapper, { backgroundColor: metric.color + '20' }]}>
                    <metric.icon size={20} color={metric.color} />
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Charts */}
          <View style={styles.chartsGrid}>
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Sales Chart</Text>
              <BarChart
							  data={{
								  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
								  datasets: [{ data: [13000, 16500, 14250, 19000] }]
							  }}
							  width={width - 32}
							  height={220}
							  chartConfig={{
								  backgroundColor: '#f9fafb',
								  backgroundGradientFrom: '#f9fafb',
								  backgroundGradientTo: '#f9fafb',
								  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
								  barPercentage: 0.5,
							  }}
							  style={{ borderRadius: 12 }} yAxisLabel={''} yAxisSuffix={''}              />
            </View>

            <View style={styles.chartCard}>
              <View style={styles.cardHeader}>
                <BarChartIcon size={18} color="#111827" />
                <Text style={styles.cardTitle}>Performance Overview</Text>
              </View>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>Lead Conversion</Text>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: '68%', backgroundColor: '#3b82f6' }]} />
                </View>
                <Text style={styles.progressValue}>68%</Text>
              </View>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>Call Success Rate</Text>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: '85%', backgroundColor: '#10b981' }]} />
                </View>
                <Text style={styles.progressValue}>85%</Text>
              </View>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>Message Response</Text>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: '92%', backgroundColor: '#6366f1' }]} />
                </View>
                <Text style={styles.progressValue}>92%</Text>
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recent Activity</Text>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                  <Text style={styles.activityTimestamp}>{activity.timestamp}</Text>
                </View>
                {activity.value && <Text style={styles.activityExtra}>{activity.value}</Text>}
                {activity.duration && <Text style={styles.activityExtra}>{activity.duration}</Text>}
                {activity.date && <Text style={styles.activityExtra}>{activity.date}</Text>}
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
  title: { fontSize: 24, fontWeight: '600' },
  newButton: { flexDirection: 'row', backgroundColor: '#3b82f6', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignItems: 'center' },
  newButtonText: { color: '#fff', fontWeight: '500' },
  filterContainer: { flexDirection: 'row', alignItems: 'center' },
  filterButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#f3f4f6', marginLeft: 8 },
  filterButtonActive: { backgroundColor: '#3b4ef6ff' },
  filterText: { color: '#111827', fontWeight: '500' },
  filterTextActive: { color: '#fff', fontWeight: '500' },

  // Metrics
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  metricCard: { width: '48%', backgroundColor: '#f9fafb', borderRadius: 12, padding: 12, marginBottom: 12 },
  metricContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metricLabel: { fontSize: 12, color: '#6b7280' },
  metricValue: { fontSize: 20, fontWeight: '600', marginTop: 4 },
  metricChange: { fontSize: 12, marginTop: 2 },
  metricIconWrapper: { padding: 10, borderRadius: 50 },

  // Charts
  chartsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  chartCard: { width: '100%', backgroundColor: '#f9fafb', borderRadius: 12, padding: 16, marginBottom: 16 },
  chartTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginLeft: 6 },

  // Progress bars
  progressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  progressLabel: { flex: 1, fontSize: 14, color: '#374151' },
  progressBarBackground: { width: 100, height: 6, backgroundColor: '#e5e7eb', borderRadius: 4, marginHorizontal: 8 },
  progressBarFill: { height: 6, borderRadius: 4 },
  progressValue: { fontSize: 14, fontWeight: '500' },

  // Recent Activity
  card: { backgroundColor: '#f9fafb', borderRadius: 12, padding: 16, marginBottom: 16 },
  activityItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  activityDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#3b82f6', marginRight: 8 },
  activityContent: { flex: 1 },
  activityDescription: { fontSize: 14, fontWeight: '500', color: '#111827' },
  activityTimestamp: { fontSize: 12, color: '#6b7280' },
  activityExtra: { fontSize: 12, fontWeight: '500', marginLeft: 8 },
});

export default Analytics;
