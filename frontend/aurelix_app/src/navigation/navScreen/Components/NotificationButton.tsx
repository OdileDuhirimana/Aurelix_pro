import type React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { Bell } from "lucide-react-native"

const NotificationButton: React.FC = () => {
  return (
    <TouchableOpacity style={styles.notificationButton}>
      <Bell size={24} color="#232327" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  notificationButton: {
    marginLeft: 15,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default NotificationButton

