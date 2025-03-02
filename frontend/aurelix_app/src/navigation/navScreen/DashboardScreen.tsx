"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native"
import { Bell } from "lucide-react-native"

// Components

import StatusBar from "./Components/StatusBar"
import SearchBar from "./Components/SearchBar"
import MetricCard from "./Components/dashboard/MetricCard"
import PerformanceCard from "./Components/dashboard/PerfomanceCard"
import ChartCard from "./Components/dashboard/ChartCard"
import ProfileViewsCard from "./Components/dashboard/ProfileViewsCard"

// Types and Services
import type { DashboardData } from "../index"
import { fetchDashboardData } from "./mockup/api_dashboard"

interface DashboardScreenProps {
  navigation: any
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("analytics")

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const dashboardData = await fetchDashboardData()
      setData(dashboardData)
    } catch (err) {
      setError("Failed to load dashboard data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Load dashboard data
  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await loadDashboardData()
    setRefreshing(false)
  }, [loadDashboardData])

  const handleDetailsPress = () => {
    navigation.navigate("Details")
  }

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00a86b" />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (error && !data) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadDashboardData}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#00a86b"]} />}
      >
        {/* Search and Notification */}
        <View style={styles.header}>
          <SearchBar placeholder="Search investors..." onChangeText={setSearchQuery} value={searchQuery} />
          <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate("Notifications")}>
            <Bell size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Key Metrics */}
        {data && (
          <>
            <View style={styles.metricsRow}>
              <MetricCard type="percentage" value={data.hitRate} label="Hit Rate this year" color="#00a86b" />
              <MetricCard
                type="count"
                value={data.visitors.count}
                label="Visitors this year"
                change={data.visitors.change}
                isIncreasing={data.visitors.change > 0}
              />
            </View>

            <View style={styles.metricsRow}>
              <MetricCard type="percentage" value={data.deals} label="Deals made this year" color="#f8c82d" />
              <View style={styles.emptyMetric} />
            </View>

            {/* Overall Performance */}
            <PerformanceCard
              total={data.performance.total}
              new={data.performance.new}
              returning={data.performance.returning}
            />

            {/* Chart */}
            <ChartCard data={data.chartData} periodLabel="Apr 30 - May 30" />

            {/* Profile Views */}
            <ProfileViewsCard data={data.profileViews} onDetailsPress={handleDetailsPress} />
          </>
        )}

        {/* Bottom spacing to account for navigation */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  notificationButton: {
    marginLeft: 15,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  emptyMetric: {
    flex: 1,
  },
  bottomSpacing: {
    height: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666666",
    fontFamily: "Poppins-Regular",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#fc5a5a",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
  retryButton: {
    backgroundColor: "#00a86b",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
  },
})

export default DashboardScreen

