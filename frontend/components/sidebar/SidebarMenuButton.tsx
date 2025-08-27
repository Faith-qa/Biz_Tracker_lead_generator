import React from "react"
import { Text, Pressable, PressableProps } from "react-native"

type SidebarMenuButtonProps = PressableProps & {
  label: string
}

export default function SidebarMenuButton({ label, ...props }: SidebarMenuButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => ({
        padding: 12,
        backgroundColor: pressed ? "#ccc" : "transparent",
        borderRadius: 8,
      })}
      {...props}
    >
      <Text>{label}</Text>
    </Pressable>
  )
}
