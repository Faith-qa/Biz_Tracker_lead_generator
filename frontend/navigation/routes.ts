import { Home, Phone, Users, MessageSquare, Calendar, PieChart, FileText, Settings } from "lucide-react-native";

export const routes = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/calls", label: "Calls", icon: Phone },
  { path: "/leads", label: "Leads", icon: Users },
  { path: "/messages", label: "Messages", icon: MessageSquare },
  { path: "/calendar", label: "Calendar", icon: Calendar },
  { path: "/analytics", label: "Analytics", icon: PieChart },
  { path: "/settings", label: "Settings", icon: Settings },
];
