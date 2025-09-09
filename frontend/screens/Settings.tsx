// screens/Settings.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Bell, Lock, Moon, User } from "lucide-react-native";

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Account
          </Text>
          <TouchableOpacity style={[styles.row, styles.card, styles.mb3]}>
            <View style={styles.row}>
              <User size={20} color="#111" />
              <Text style={styles.cardText}>Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.row, styles.card]}>
            <View style={styles.row}>
              <Lock size={20} color="#111" />
              <Text style={styles.cardText}>Change Password</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Preferences
          </Text>
          <View style={[styles.row, styles.card, styles.mb3]}>
            <View style={styles.row}>
              <Moon size={20} color="#111" />
              <Text style={styles.cardText}>Dark Mode</Text>
            </View>
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>
          <View style={[styles.row, styles.card]}>
            <View style={styles.row}>
              <Bell size={20} color="#111" />
              <Text style={styles.cardText}>Push Notifications</Text>
            </View>
            <Switch value={notifications} onValueChange={setNotifications} />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 0,
    marginTop: 0,
  },
  mb3: {
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default SettingsScreen;
