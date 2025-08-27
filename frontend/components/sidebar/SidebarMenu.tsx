import React from "react"
import { View, ViewProps } from "react-native"

export default function SidebarMenu({ children, ...props }: ViewProps) {
  return <View style={{ gap: 8 }} {...props}>{children}</View>
}
