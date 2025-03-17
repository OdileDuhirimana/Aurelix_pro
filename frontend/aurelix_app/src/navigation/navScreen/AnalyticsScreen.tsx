import type React from "react"
import { useState, useCallback } from "react"
import { SafeAreaView, StatusBar, ScrollView, View, RefreshControl, StyleSheet, TouchableOpacity } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { useFocusEffect } from "@react-navigation/native"
import { User, Home, BarChart2, Bot, MessageSquare, Crown } from "lucide-react-native"

// Import types
import type { AnalyticsData } from "../analytics"

// Import API service
import API from "./mockup/api_analytics"

// Import components
import SearchHeader from "./Components/common/SearchHeader"
import LoadingState from "./Components/common/LoadingState"
import ErrorState from "./Components/common/ErrorState"
import KPIItem from "./Components/analytics/KPIItem"
import PerformanceGauge from "./Components/analytics/PerformanceGauge"
import TimeSeriesChart from "./Components/analytics/TimeSeries"
import ProfileViews from "./Components/analytics/ProfileViews"

// Import utils
import { formatNumber } from "./util/formatters"

type AnalyticsScreenNavigationProp = StackNavigationProp<any, "Analytics">

interface Props {
  navigation: AnalyticsScreenNavigationProp
  route: {
    params?: {
      userId?: string
    }
  }
}

const AnalyticsScreen: React.FC<Props> = ({ navigation, route }) => {
  // State management
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [timeRange, setTimeRange] = useState<string>("year")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [selectedProfileViewFilter, setSelectedProfileViewFilter] = useState<string>("Investors")
  const [selectedKPI, setSelectedKPI] = useState<string>("deals")

  // Get current user ID from route params or use default
  const userId = route.params?.userId || "currentUser"

  // Fetch analytics data when component mounts or when user navigates back to this screen
  useFocusEffect(
    useCallback(() => {
      fetchAnalyticsData()

      // Clean up function
      return () => {
        // Any cleanup needed when screen loses focus
      }
    }, [timeRange]),
  )

  // Fetch analytics data from API
  const fetchAnalyticsData = async (refresh = false) => {
    try {
      setError(null)

      if (refresh) {
        setIsRefreshing(true)
      } else if (!analyticsData) {
        setIsLoading(true)
      }

      const data = await API.getAnalyticsData(userId, timeRange)
      setAnalyticsData(data)
    } catch (error) {
      console.error("Error fetching analytics data:", error)
      setError("Failed to load analytics data. Please try again.")
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  // Handle refresh
  const handleRefresh = () => {
    fetchAnalyticsData(true)
  }

  // Handle time range change
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range)
  }

  // Handle search
  const handleSearch = (text: string) => {
    setSearchQuery(text)
    // Implement search functionality
    console.log("Searching for:", text)
  }

  // Handle notification press
  const handleNotificationPress = () => {
    navigation.navigate("Notifications")
  }

  // Handle profile view filter change
  const handleProfileViewFilterChange = (filter: string) => {
    setSelectedProfileViewFilter(filter)
    // Implement filter functionality
    console.log("Filter changed to:", filter)
  }

  // Handle details press
  const handleDetailsPress = () => {
    navigation.navigate("AnalyticsDetails", {
      profileViews: analyticsData?.profileViews,
    })
  }

  // Handle KPI selection
  const handleKPISelect = (kpiType: string) => {
    setSelectedKPI(kpiType)
  }

  

  // Render KPI section
  const renderKPISection = () => {
    if (!analyticsData) return null

    return (
      <View style={styles.kpiContainer}>
        <View style={styles.kpiRow}>
          <KPIItem
            value={`${analyticsData.hitRate.current}%`}
            subtitle="Hit Rate this year"
            color="#00a86b"
            showCircle={true}
            type="hitRate"
            onPress={() => handleKPISelect("hitRate")}
          />

          <KPIItem
            value={formatNumber(analyticsData.visitors.current)}
            subtitle="Visitors this year"
            color="#171725"
            showCircle={false}
            percentageChange={analyticsData.visitors.percentageChange}
            type="visitors"
            onPress={() => handleKPISelect("visitors")}
          />
        </View>

        <View style={styles.kpiRow}>
          <KPIItem
            value={`${analyticsData.deals.current}%`}
            subtitle="Deals made this year"
            color="#f8c82d"
            showCircle={true}
            type="deals"
            onPress={() => handleKPISelect("deals")}
          />
        </View>
      </View>
    )
  }



  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Search and Notification */}
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onNotificationPress={handleNotificationPress}
      />

      {/* Content */}
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchAnalyticsData} />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#00a86b"]}
              tintColor="#00a86b"
            />
          }
        >
          {/* KPIs */}
          {renderKPISection()}

          {/* Performance Gauge */}
          {analyticsData && <PerformanceGauge performance={analyticsData.performance} />}

          {/* Time Series Chart */}
          {analyticsData && (
            <TimeSeriesChart
              startDate={analyticsData.timeSeriesData.startDate}
              endDate={analyticsData.timeSeriesData.endDate}
              data={analyticsData.timeSeriesData.data}
              labels={analyticsData.timeSeriesData.labels}
            />
          )}

          {/* Profile Views */}
          {analyticsData && (
            <ProfileViews
              monthlyAverage={analyticsData.profileViews.monthlyAverage}
              views={analyticsData.profileViews.views}
              selectedFilter={selectedProfileViewFilter}
              onFilterChange={handleProfileViewFilterChange}
              onDetailsPress={handleDetailsPress}
            />
          )}

          {/* Bottom spacing */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    marginBottom: 16,
  },
  kpiContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  kpiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  bottomSpacer: {
    height: 80,
  },
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingVertical: 8,
    backgroundColor: "#ffffff",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    width: 24,
    height: 2,
    backgroundColor: "#00a86b",
  },
  aiNavItem: {
    position: "relative",
  },
  crownBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 2,
  },
})

export default AnalyticsScreen

