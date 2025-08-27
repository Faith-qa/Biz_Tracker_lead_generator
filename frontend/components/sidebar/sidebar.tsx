import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {
  Inbox,
  Calendar,
  Users,
  FileText, 
  Settings,
  ChevronLeft,
  ChartBar,
  LogOut,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const menuItems = [
    { icon: Inbox, label: 'Inbox', count: 12 },
    { icon: Calendar, label: 'Calendar', count: 0 },
    { icon: Users, label: 'Contacts', count: 0 },
    { icon: FileText, label: 'Tasks', count: 0 },
    { icon: Settings, label: 'Settings', count: 0 },
    { icon: ChartBar, label: 'Analytics', count: 0 },
    { icon: LogOut, label: 'Log Out', count: 0 }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <ChevronLeft size={24} color="#3b82f6" />
        </TouchableOpacity>
        <Text style={styles.title}>Menu</Text>
      </View>

      <View style={styles.menuItems}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <item.icon size={20} color="#3b82f6" />
              <Text style={styles.menuItemText}>{item.label}</Text>
            </View>
            {item.count !== undefined && item.count > 0 && (
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{item.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  closeButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  menuItems: {
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#1f2937',
  },
  countBadge: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default Sidebar;
