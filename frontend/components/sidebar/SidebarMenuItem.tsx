import React from "react"
import { View, ViewProps } from "react-native"

export default function SidebarMenuItem({ children, ...props }: ViewProps) {
  return <View {...props}>{children}</View>
}
