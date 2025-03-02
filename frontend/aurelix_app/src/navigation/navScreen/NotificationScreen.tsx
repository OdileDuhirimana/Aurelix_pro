"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from "react-native"

// Define notification types
interface Notification {
  id: string
  type: "transaction" | "system" | "alert" | "update"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  actionUrl?: string
  metadata?: Record<string, any>
}

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sampleNotifications: Notification[] = [
    {
      id: "1",
      type: "transaction",
      title: "Payment Received",
      message: "You've received $250.00 from John Doe",
      timestamp: "2h ago",
      isRead: false,
      metadata: { amount: 250, currency: "USD" }
    },
    {
      id: "2",
      type: "update",
      title: "App Update Available",
      message: "New version 2.3.0 is ready to download",
      timestamp: "5h ago",
      isRead: true
    },
    {
      id: "3",
      type: "alert",
      title: "Security Alert",
      message: "New login from unknown device detected",
      timestamp: "1d ago",
      isRead: false,
      actionUrl: "security-settings"
    },
    {
      id: "4",
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance on June 25th 2:00-4:00 AM UTC",
      timestamp: "3d ago",
      isRead: true
    }
  ]
  const fetchNotifications = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setLoading(true)
      }

      // TODO: Replace with actual API call
      // const response = await api.getNotifications();
      // setNotifications(response.data);

      // Simulating API response delay
      setTimeout(() => {
        // For demo purposes, we'll always show an empty state
        setNotifications([])
        setLoading(false)
        setRefreshing(false)
      }, 1500)
    } catch (err) {
      setError("Failed to load notifications")
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, []) //Fixed: Added empty dependency array to useEffect

  const onRefresh = () => {
    setRefreshing(true)
    fetchNotifications(true)
  }

  const handleMenuPress = () => {
    // TODO: Implement menu options
    console.log("Menu pressed")
  }

  // Render empty state
  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Notifications</Text>
        <Text style={styles.emptyMessage}>When you receive notifications, they will appear here.</Text>
      </View>
    )
  }

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.iconText}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
            <Text style={styles.iconText}>{"..."}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00A86B" />
        </View>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.iconText}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
            <Text style={styles.iconText}>{"..."}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setError(null)
              fetchNotifications()
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.iconText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <Text style={styles.iconText}>{"..."}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        renderItem={() => null} // We're not rendering any items in this example
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#000000"]} tintColor="#000000" />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  menuButton: {
    padding: 8,
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    maxWidth: 250,
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#ff3b30",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#000000",
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  iconText: {
    fontSize: 24,
    color: "#000000",
  },
})

export default NotificationsScreen

