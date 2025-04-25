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


// "use client"

// import React, { useState, useEffect } from "react"
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   TouchableOpacity,
// } from "react-native"
// import { Bell, ArrowUp, ArrowDown, Home, LineChart as LineChartIcon, MessageCircle, User } from "lucide-react-native"
// import { LineChart, BarChart } from "react-native-chart-kit"
// import { Dimensions } from "react-native"
// import StatusBar from "./Components/StatusBar"

// const screenWidth = Dimensions.get("window").width - 40

// interface AnalyticsScreenProps {
//   navigation: any
// }

// const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ navigation }) => {
//   const [activeTab, setActiveTab] = useState("analytics")
//   const [userName, setUserName] = useState("Canaberra")
//   const [profileImage, setProfileImage] = useState("/placeholder.svg?height=50&width=50")
  
//   // Analytics data
//   const [analyticsData, setAnalyticsData] = useState({
//     fundsRaised: "$100K",
//     fundsRaisedChange: "+5.2%",
//     profileViews: "10K",
//     profileViewsChange: "-1.5%",
//     messages: "20+",
//     engagementImprovement: "30%",
//     highlightedEngagement: {
//       value: 60,
//       type: "messaging",
//       date: "Monday, April 22nd"
//     }
//   })

//   // Chart data
//   const engagementData = {
//     labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
//     datasets: [
//       {
//         data: [25, 45, 28, 35, 30, 40, 35, 55, 40, 45, 35, 30],
//         color: (opacity = 1) => `rgba(0, 168, 107, ${opacity})`,
//         strokeWidth: 2
//       }
//     ],
//     legend: ["Engagement"]
//   }

//   const fundsRaisedData = {
//     labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
//     datasets: [
//       {
//         data: [1000, 3000, 8000, 3000, 15000, 30000, 40000, 60000, 80000, 10000, 12000, 15000],
//         colors: [
//           (opacity = 1) => `rgba(0, 168, 107, ${opacity})`,
//           (opacity = 1) => `rgba(0, 168, 107, ${opacity})`,
//           (opacity = 1) => `rgba(0, 168, 107, ${opacity})`,
//           (opacity = 1) => `rgba(0, 168, 107, ${opacity})`,
//           (opacity = 1) => `rgba(0, 168, 107, ${opacity})`,
//           (opacity = 1) => `rgba(0, 168, 107, ${opacity})`,
//           (opacity = 1) => `rgba(0, 168, 107, ${opacity})`,
//           (opacity = 1) => `rgba(0, 168, 107, ${opacity})`,
//           (opacity = 1) => `rgba(0, 168, 107, ${opacity})`,
//           (opacity = 1) => `rgba(252, 90, 90, ${opacity})`,
//           (opacity = 1) => `rgba(252, 90, 90, ${opacity})`,
//           (opacity = 1) => `rgba(252, 90, 90, ${opacity})`,
//         ]
//       }
//     ]
//   }

//   // Mock data for user avatars
//   const userAvatars = [
//     "/placeholder.svg?height=30&width=30",
//     "/placeholder.svg?height=30&width=30",
//     "/placeholder.svg?height=30&width=30",
//     "/placeholder.svg?height=30&width=30",
//   ]

//   const handleTabPress = (tab: string) => {
//     setActiveTab(tab)
//     if (tab !== "analytics") {
//       // Navigate to the corresponding screen
//       switch (tab) {
//         case "home":
//           navigation.navigate("Home")
//           break
//         case "messages":
//           navigation.navigate("Chat")
//           break
//         case "profile":
//           navigation.navigate("Profile")
//           break
//       }
//     }
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar />
//       <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.profileContainer}>
//             <Image 
//               source={{ uri: profileImage }} 
//               style={styles.profileImage} 
//             />
//             <Text style={styles.userName}>{userName}</Text>
//           </View>
//           <TouchableOpacity 
//             style={styles.notificationButton}
//             onPress={() => navigation.navigate("Notifications")}
//           >
//             <Bell size={24} color="#000000" />
//           </TouchableOpacity>
//         </View>

//         {/* Key Metrics */}
//         <View style={styles.metricsContainer}>
//           {/* Funds Raised */}
//           <View style={styles.metricCard}>
//             <View style={styles.metricHeader}>
//               <Text style={styles.metricValue}>{analyticsData.fundsRaised}</Text>
//               <ArrowUp size={14} color="#00a86b" />
//             </View>
//             <Text style={styles.metricLabel}>Funds raised</Text>
//           </View>

//           {/* Profile Views */}
//           <View style={styles.metricCard}>
//             <View style={styles.metricHeader}>
//               <Text style={styles.metricValue}>{analyticsData.profileViews}</Text>
//               <View style={styles.changeIndicator}>
//                 <Text style={[styles.changeText, styles.negativeChange]}>
//                   {analyticsData.profileViewsChange}
//                 </Text>
//                 <ArrowDown size={12} color="#fc5a5a" />
//               </View>
//             </View>
//             <Text style={styles.metricLabel}>Profile views</Text>
//           </View>

//           {/* Messages */}
//           <View style={styles.metricCard}>
//             <View style={styles.metricHeader}>
//               <Text style={styles.metricValue}>{analyticsData.messages}</Text>
//             </View>
//             <View style={styles.messageAvatars}>
//               {userAvatars.map((avatar, index) => (
//                 <Image 
//                   key={index}
//                   source={{ uri: avatar }} 
//                   style={[
//                     styles.avatarImage,
//                     { marginLeft: index > 0 ? -10 : 0 }
//                   ]} 
//                 />
//               ))}
//             </View>
//             <Text style={styles.metricLabel}>Messages</Text>
//           </View>
//         </View>

//         {/* Investor Engagement Chart */}
//         <View style={styles.chartCard}>
//           <Text style={styles.chartTitle}>Investor engagement</Text>
          
//           <View style={styles.chartContainer}>
//             <LineChart
//               data={engagementData}
//               width={screenWidth - 40}
//               height={220}
//               chartConfig={{
//                 backgroundColor: "#ffffff",
//                 backgroundGradientFrom: "#ffffff",
//                 backgroundGradientTo: "#ffffff",
//                 decimalPlaces: 0,
//                 color: (opacity = 1) => `rgba(0, 168, 107, ${opacity})`,
//                 labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                 style: {
//                   borderRadius: 16,
//                 },
//                 propsForDots: {
//                   r: "4",
//                   strokeWidth: "2",
//                   stroke: "#00a86b",
//                 },
//                 propsForBackgroundLines: {
//                   strokeDasharray: "",
//                   stroke: "#e9ecf1",
//                   strokeWidth: 1
//                 },
//               }}
//               bezier
//               style={styles.chart}
//               withInnerLines={false}
//               withOuterLines={false}
//               withHorizontalLabels={true}
//               withVerticalLabels={false}
//               withDots={true}
//               segments={3}
//               fromZero={true}
//             />
            
//             {/* Highlight point */}
//             <View style={styles.highlightContainer}>
//               <View style={styles.highlightBubble}>
//                 <Text style={styles.highlightEmoji}>😊</Text>
//                 <Text style={styles.highlightText}>
//                   {analyticsData.highlightedEngagement.value} {analyticsData.highlightedEngagement.type}
//                 </Text>
//                 <Text style={styles.highlightDate}>
//                   {analyticsData.highlightedEngagement.date}
//                 </Text>
//               </View>
//             </View>
//           </View>
          
//           <View style={styles.engagementSummary}>
//             <Text style={styles.engagementText}>
//               Your investor engagement and profile interactions are {" "}
//               <Text style={styles.percentageHighlight}>{analyticsData.engagementImprovement}</Text>
//               {" "}better than last month
//             </Text>
//           </View>
//         </View>

//         {/* Funds Raised Chart */}
//         <View style={styles.chartCard}>
//           <View style={styles.fundsRaisedHeader}>
//             <View style={styles.fundsRaisedLabelContainer}>
//               <Text style={styles.chartTitle}>Total Funds Raised</Text>
//             </View>
//           </View>
          
//           <BarChart
//             data={fundsRaisedData}
//             width={screenWidth - 40}
//             height={220}
//             yAxisLabel="$"
//             yAxisSuffix=""
//             chartConfig={{
//               backgroundColor: "#ffffff",
//               backgroundGradientFrom: "#ffffff",
//               backgroundGradientTo: "#ffffff",
//               decimalPlaces: 0,
//               color: (opacity = 1, index) => {
//                 return index < 9 
//                   ? `rgba(0, 168, 107, ${opacity})`
//                   : `rgba(252, 90, 90, ${opacity})`
//               },
//               labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//               style: {
//                 borderRadius: 16,
//               },
//               barPercentage: 0.5,
//               propsForBackgroundLines: {
//                 strokeDasharray: "",
//                 stroke: "#e9ecf1",
//                 strokeWidth: 1
//               },
//             }}
//             style={styles.chart}
//             showBarTops={false}
//             fromZero
//             withInnerLines={true}
//             segments={4}
//             showValuesOnTopOfBars={false}
//           />
//         </View>
//       </ScrollView>

//       {/* Bottom Tab Bar */}
//       <View style={styles.tabBar}>
//         <TouchableOpacity 
//           style={styles.tabItem} 
//           onPress={() => handleTabPress("home")}
//         >
//           <Home size={24} color={activeTab === "home" ? "#00a86b" : "#171717"} />
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={styles.tabItem} 
//           onPress={() => handleTabPress("analytics")}
//         >
//           <LineChartIcon size={24} color={activeTab === "analytics" ? "#00a86b" : "#171717"} />
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={styles.tabItem} 
//           onPress={() => handleTabPress("messages")}
//         >
//           <MessageCircle size={24} color={activeTab === "messages" ? "#00a86b" : "#171717"} />
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={styles.tabItem} 
//           onPress={() => handleTabPress("profile")}
//         >
//           <User size={24} color={activeTab === "profile" ? "#00a86b" : "#171717"} />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#F9F9F9",
//   },
//   scrollView: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 16,
//     marginBottom: 24,
//   },
//   profileContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   userName: {
//     fontSize: 18,
//     fontFamily: "Poppins-SemiBold",
//     color: "#171725",
//   },
//   notificationButton: {
//     padding: 8,
//   },
//   metricsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 24,
//   },
//   metricCard: {
//     width: "31%",
//     alignItems: "flex-start",
//   },
//   metricHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   metricValue: {
//     fontSize: 18,
//     fontFamily: "Poppins-SemiBold",
//     color: "#171725",
//     marginRight: 4,
//   },
//   metricLabel: {
//     fontSize: 12,
//     fontFamily: "Poppins-Regular",
//     color: "#767676",
//   },
//   changeIndicator: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: 4,
//   },
//   changeText: {
//     fontSize: 12,
//     fontFamily: "Poppins-Medium",
//     marginRight: 2,
//   },
//   positiveChange: {
//     color: "#00a86b",
//   },
//   negativeChange: {
//     color: "#fc5a5a",
//   },
//   messageAvatars: {
//     flexDirection: "row",
//     marginBottom: 4,
//   },
//   avatarImage: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#ffffff",
//   },
//   chartCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   chartTitle: {
//     fontSize: 16,
//     fontFamily: "Poppins-SemiBold",
//     color: "#171725",
//     marginBottom: 16,
//   },
//   chartContainer: {
//     position: "relative",
//   },
//   chart: {
//     marginVertical: 8,
//     borderRadius: 16,
//   },
//   highlightContainer: {
//     position: "absolute",
//     top: 70,
//     right: 100,
//     zIndex: 10,
//   },
//   highlightBubble: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 8,
//     padding: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     alignItems: "center",
//   },
//   highlightEmoji: {
//     fontSize: 20,
//     marginBottom: 4,
//   },
//   highlightText: {
//     fontSize: 14,
//     fontFamily: "Poppins-Medium",
//     color: "#171725",
//   },
//   highlightDate: {
//     fontSize: 10,
//     fontFamily: "Poppins-Regular",
//     color: "#767676",
//   },
//   engagementSummary: {
//     marginTop: 16,
//   },
//   engagementText: {
//     fontSize: 14,
//     fontFamily: "Poppins-Regular",
//     color: "#767676",
//     lineHeight: 20,
//   },
//   percentageHighlight: {
//     fontSize: 20,
//     fontFamily: "Poppins-Bold",
//     color: "#171725",
//   },
//   fundsRaisedHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   fundsRaisedLabelContainer: {
//     backgroundColor: "#F0F9F5",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   tabBar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: "#E9ECF1",
//   },
//   tabItem: {
//     alignItems: "center",
//     justifyContent: "center",
//     height: 48,
//     width: 48,
//   },
// })

// export default AnalyticsScreen