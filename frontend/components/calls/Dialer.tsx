import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
import { Phone, Clock, Users, Grid3x3 } from 'lucide-react-native';

const contacts = [
  { id: '1', name: 'John Smith', phone: '+1 234-567-8901' },
  { id: '2', name: 'Sarah Johnson', phone: '+1 345-678-9012' },
  { id: '3', name: 'Michael Brown', phone: '+1 456-789-0123' },
];

const recents = [
  { id: '1', name: 'Emily Davis', phone: '+1 567-890-1234', time: 'Today, 09:12' },
  { id: '2', name: 'Robert Wilson', phone: '+1 678-901-2345', time: 'Yesterday, 16:45' },
];

interface DialerProps {
  visible: boolean;
  onClose: () => void;
}

const Dialer = ({ visible, onClose }: DialerProps) => {
  const [activeTab, setActiveTab] = useState<'keypad' | 'recents' | 'contacts' | 'history'>('keypad');
  const [number, setNumber] = useState('');
  const [history, setHistory] = useState<{ id: string; phone: string; time: string }[]>([]);

  const handleKeyPress = (digit: string) => {
    setNumber((prev) => prev + digit);
  };

  const handleCall = () => {
    if (number) {
      setHistory([{ id: Date.now().toString(), phone: number, time: new Date().toLocaleString() }, ...history]);
      setNumber('');
    }
  };

  const renderKeypad = () => (
    <View style={styles.keypadContainer}>
      <View style={styles.numberDisplay}>
        <Text style={styles.numberText}>{number}</Text>
      </View>
      <View style={styles.keypadGrid}>
        {['1','2','3','4','5','6','7','8','9','*','0','#'].map((digit) => (
          <TouchableOpacity key={digit} style={styles.keypadButton} onPress={() => handleKeyPress(digit)}>
            <Text style={styles.keypadDigit}>{digit}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.callButton} onPress={handleCall}>
        <Phone color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );

  const renderRecents = () => (
    <FlatList
      data={recents}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listName}>{item.name}</Text>
          <Text style={styles.listPhone}>{item.phone}</Text>
          <Text style={styles.listTime}>{item.time}</Text>
        </View>
      )}
    />
  );

  const renderContacts = () => (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listName}>{item.name}</Text>
          <Text style={styles.listPhone}>{item.phone}</Text>
        </View>
      )}
    />
  );

  const renderHistory = () => (
    <FlatList
      data={history}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listPhone}>{item.phone}</Text>
          <Text style={styles.listTime}>{item.time}</Text>
        </View>
      )}
      ListEmptyComponent={<Text style={styles.emptyText}>No call history yet.</Text>}
    />
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <View style={styles.header}>
            <Text style={styles.title}>Dialer</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabBar}>
            <TouchableOpacity style={activeTab === 'keypad' ? styles.tabActive : styles.tab} onPress={() => setActiveTab('keypad')}>
              <Grid3x3 color={activeTab === 'keypad' ? '#3b82f6' : '#6b7280'} size={22} />
              <Text style={activeTab === 'keypad' ? styles.tabTextActive : styles.tabText}>Keypad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={activeTab === 'recents' ? styles.tabActive : styles.tab} onPress={() => setActiveTab('recents')}>
              <Clock color={activeTab === 'recents' ? '#3b82f6' : '#6b7280'} size={22} />
              <Text style={activeTab === 'recents' ? styles.tabTextActive : styles.tabText}>Recents</Text>
            </TouchableOpacity>
            <TouchableOpacity style={activeTab === 'contacts' ? styles.tabActive : styles.tab} onPress={() => setActiveTab('contacts')}>
              <Users color={activeTab === 'contacts' ? '#3b82f6' : '#6b7280'} size={22} />
              <Text style={activeTab === 'contacts' ? styles.tabTextActive : styles.tabText}>Contacts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={activeTab === 'history' ? styles.tabActive : styles.tab} onPress={() => setActiveTab('history')}>
              <Clock color={activeTab === 'history' ? '#3b82f6' : '#6b7280'} size={22} />
              <Text style={activeTab === 'history' ? styles.tabTextActive : styles.tabText}>History</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabContent}>
            {activeTab === 'keypad' && renderKeypad()}
            {activeTab === 'recents' && renderRecents()}
            {activeTab === 'contacts' && renderContacts()}
            {activeTab === 'history' && renderHistory()}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: '95%',
    maxHeight: '90%',
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  closeText: {
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#e9e5ebff',
    paddingBottom: 4,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 6,
    flex: 1,
  },
  tabActive: {
    alignItems: 'center',
    paddingVertical: 6,
    flex: 1,
    borderBottomWidth: 2,
    borderColor: '#3b82f6',
  },
  tabText: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 2,
  },
  tabTextActive: {
    color: '#3b82f6',
    fontSize: 13,
    marginTop: 2,
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    minHeight: 300,
    marginTop: 8,
  },
  keypadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  numberDisplay: {
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    minWidth: 180,
    alignItems: 'center',
  },
  numberText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: 2,
  },
  keypadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 220,
    justifyContent: 'center',
    marginBottom: 18,
  },
  keypadButton: {
    width: 60,
    height: 60,
    margin: 4,
    borderRadius: 30,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  keypadDigit: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
  },
  callButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    elevation: 3,
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
  },
  listName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  listPhone: {
    fontSize: 14,
    color: '#374151',
  },
  listTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 24,
    fontSize: 15,
  },
});

export default Dialer;