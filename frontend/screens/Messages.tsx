// Messages.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MessageSquare, Search } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import Sidebar from '../components/sidebar/sidebar';

const { width } = Dimensions.get('window');

interface Message {
  id: string;
  contact: string;
  phone: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const Messages: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchText, setSearchText] = useState('');
  const isMobile = width < 768;

  const messages: Message[] = [
    { id: '1', contact: 'John Smith', phone: '+1 234-567-8901', lastMessage: 'Thanks for the information!', timestamp: '2:30 PM', unread: 2 },
    { id: '2', contact: 'Sarah Johnson', phone: '+1 345-678-9012', lastMessage: 'When can we schedule the appointment?', timestamp: '1:15 PM', unread: 0 },
    { id: '3', contact: 'Michael Brown', phone: '+1 456-789-0123', lastMessage: 'Perfect, see you tomorrow!', timestamp: '11:45 AM', unread: 1 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.sidebarToggle} onPress={() => setShowSidebar(!showSidebar)}>
              <MessageSquare width={24} height={24} color="#3b82f6" />
            </TouchableOpacity>
            <Text style={styles.title}>Messages</Text>
            <TouchableOpacity style={styles.newButton} onPress={() => Toast.show({ type: 'success', text1: 'New Message Clicked!' })}>
              <MessageSquare size={16} color="#fff" />
              <Text style={styles.newButtonText}>{isMobile ? 'New' : 'New Message'}</Text>
            </TouchableOpacity>
          </View>

          {/* Search Box */}
          <View style={styles.searchBox}>
            <Search size={18} color="#6b7280" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search messages..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Messages List */}
          <View style={styles.messagesList}>
            {messages.map((msg) => (
              <View key={msg.id} style={styles.messageCard}>
                <View style={styles.messageLeft}>
                  <View style={styles.messageIconWrapper}>
                    <MessageSquare size={18} color="#3b82f6" />
                  </View>
                  <View>
                    <Text style={styles.messageContact}>{msg.contact}</Text>
                    <Text style={styles.messagePhone}>{msg.phone}</Text>
                    <Text style={styles.messageLast}>{msg.lastMessage}</Text>
                  </View>
                </View>
                <View style={styles.messageRight}>
                  <Text style={styles.messageTimestamp}>{msg.timestamp}</Text>
                  {msg.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{msg.unread}</Text>
                    </View>
                  )}
                </View>
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
  newButtonText: { color: '#fff', marginLeft: 6, fontWeight: '500' },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9fafb', borderRadius: 12, paddingHorizontal: 12, marginBottom: 16 },
  searchInput: { flex: 1, padding: 8, fontSize: 14, color: '#111827' },
  messagesList: { marginTop: 16 },
  messageCard: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f9fafb', borderRadius: 12, padding: 12, marginBottom: 12 },
  messageLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, flex: 1 },
  messageIconWrapper: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#3b82f620', justifyContent: 'center', alignItems: 'center' },
  messageContact: { fontSize: 14, fontWeight: '600', color: '#111827' },
  messagePhone: { fontSize: 12, color: '#6b7280' },
  messageLast: { fontSize: 12, color: '#374151', marginTop: 2 },
  messageRight: { alignItems: 'flex-end', justifyContent: 'center' },
  messageTimestamp: { fontSize: 12, color: '#6b7280' },
  unreadBadge: { backgroundColor: '#3b82f6', borderRadius: 12, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center', marginTop: 4, paddingHorizontal: 6 },
  unreadText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});

export default Messages;
