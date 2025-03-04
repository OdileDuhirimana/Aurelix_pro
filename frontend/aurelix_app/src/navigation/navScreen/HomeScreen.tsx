"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native"
import { Bell, Filter, ArrowDown, ArrowUp } from "lucide-react-native"

import StatusBar from "./Components/StatusBar"
import SearchBar from "./Components/SearchBar"
import StatCard from "./Components/StatCard"
import FilterChip from "./Components/FilterChip"
import ActionButton from "./Components/ActionButton"
import InvestorCard from "./Components/InvestorCard"
import FilterPopup from "./Components/FilterPopup"
import SortPopup from "./Components/SortPopup"

// Types and Services
import type { Investor, Region, FilterOption, SortOption } from "../index"
import { fetchInvestors, fetchRegions, fetchStats, fetchSectors, fetchSortOptions } from "./mockup/api_home"

interface HomeScreenProps {
  navigation: any
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // State
  const [investors, setInvestors] = useState<Investor[]>([])
  const [regions, setRegions] = useState<Region[]>([])
  const [sectors, setSectors] = useState<FilterOption[]>([])
  const [sortOptions, setSortOptions] = useState<SortOption[]>([])
  const [stats, setStats] = useState({
    visitors: "",
    visitorsChange: "",
    visitorsIncreasing: false,
    newInvestors: "",
    newInvestorsChange: "",
    newInvestorsIncreasing: true,
  })
  const [activeRegion, setActiveRegion] = useState<string>("Africa")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false)
  const [showSortPopup, setShowSortPopup] = useState<boolean>(false)
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("home")

  // Load initial data
  useEffect(() => {
    loadData()
  }, [])

  // Load data when filters change
  useEffect(() => {
    loadInvestors()
  }, [activeRegion, selectedSortOption, searchQuery])

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      // Load all data in parallel
      const [investorsData, regionsData, statsData, sectorsData, sortOptionsData] = await Promise.all([
        fetchInvestors(),
        fetchRegions(),
        fetchStats(),
        fetchSectors(),
        fetchSortOptions(),
      ])

      setInvestors(investorsData)
      setRegions(regionsData)
      setStats(statsData)
      setSectors(sectorsData)
      setSortOptions(sortOptionsData)
    } catch (error) {
      console.error("Error loading data:", error)
      // Handle error state here
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadInvestors = async () => {
    try {
      const data = await fetchInvestors(activeRegion, undefined, selectedSortOption, searchQuery)
      setInvestors(data)
    } catch (error) {
      console.error("Error loading investors:", error)
    }
  }

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await loadData()
    setIsRefreshing(false)
  }, [loadData])

  const handleRegionPress = (region: Region) => {
    setActiveRegion(region.name)

    // Update active state in regions
    const updatedRegions = regions.map((r) => ({
      ...r,
      active: r.id === region.id,
    }))

    setRegions(updatedRegions)
  }

  const handleSortOptionSelect = (optionId: string) => {
    setSelectedSortOption(optionId)
    setShowSortPopup(false)
  }

  const handleFilterSelect = (type: string, option: FilterOption) => {
    // In a real app, you would apply thttps://www.figma.com/design/F3SwHNnHXYNlkveAlSu12b/InveConnect?node-id=646-602&t=p4huLioJzzYsQ5JV-1he filter
    console.log(`Selected ${type}: ${option.name}`)
    setShowFilterPopup(false)
  }

  const handleInvestorPress = (investor: Investor) => {
    navigation.navigate("InvestorProfile", { investor })
  }

  const handleChatPress = (investor: Investor) => {
    navigation.navigate("Chat", { investor })
  }

  const renderInvestorItem = ({ item, index }: { item: Investor; index: number }) => (
    <InvestorCard
      investor={item}
      onPress={handleInvestorPress}
      onChatPress={handleChatPress}
      style={
        index % 2 === 0
          ? {
              marginRight: 8,
            }
          : {
              marginLeft: 8,
            }
      }
    />
  )

  // Get the current sort option name for display
  const getCurrentSortName = () => {
    if (!selectedSortOption) return "Sort"
    const option = sortOptions.find((opt) => opt.id === selectedSortOption)
    return option ? option.name.split(" ")[0] : "Sort"
  }

  // Get the sort direction icon
  const getSortDirectionIcon = () => {
    if (!selectedSortOption) return null
    const option = sortOptions.find((opt) => opt.id === selectedSortOption)
    if (!option) return null

    return option.direction === "asc" ? <ArrowUp size={14} color="#232327" /> : <ArrowDown size={14} color="#232327" />
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00a86b" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Hello, Welcome👋</Text>
            <Text style={styles.userName}>Ange Curtis</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate("Notifications")}>
            <Bell size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <SearchBar placeholder="Search investors..." onChangeText={setSearchQuery} value={searchQuery} />

        <View style={styles.statsContainer}>
          <StatCard
            value={stats.visitors}
            label="Visitors this year"
            percentage={stats.visitorsChange}
            isIncreasing={stats.visitorsIncreasing}
          />

          <StatCard
            value={stats.newInvestors}
            label="New investors this year"
            percentage={stats.newInvestorsChange}
            isIncreasing={stats.newInvestorsIncreasing}
          />
        </View>

        <FlatList
          horizontal
          data={regions}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
          renderItem={({ item }) => (
            <FilterChip label={item.name} active={item.active} onPress={() => handleRegionPress(item)} />
          )}
        />

        <View style={styles.matchesHeader}>
          <Text style={styles.matchesTitle}>Top matches</Text>
          <View style={styles.matchesActions}>
            <ActionButton
              label={getCurrentSortName()}
              icon={getSortDirectionIcon()}
              onPress={() => setShowSortPopup(true)}
              style={[styles.actionButton, selectedSortOption ? styles.activeActionButton : null]}
              textStyle={selectedSortOption ? styles.activeActionText : null}
            />
            <ActionButton
              label="Filter"
              icon={<Filter size={16} color="#000000" />}
              onPress={() => setShowFilterPopup(true)}
              style={styles.actionButton}
            />
          </View>
        </View>
       
        <FlatList
          data={investors}
          renderItem={renderInvestorItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ ...styles.investorList, flexGrow: 1 }} // Ensure it takes available space
          columnWrapperStyle={styles.investorRow}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={["#00a86b"]} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No investors found</Text>
            </View>
          }
        />


        <FilterPopup
          visible={showFilterPopup}
          onClose={() => setShowFilterPopup(false)}
          onSelectFilter={handleFilterSelect}
          locationOptions={regions}
          sectorOptions={sectors}
        />

        <SortPopup
          visible={showSortPopup}
          onClose={() => setShowSortPopup(false)}
          options={sortOptions}
          selectedOption={selectedSortOption}
          onSelectOption={handleSortOptionSelect}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#221F1F99",
  },
  userName: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#00a86b",
  },
  notificationButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filtersContainer: {
    paddingVertical: 10,
    marginBottom: 40,
  },
  matchesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  matchesTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#232327",
  },
  matchesActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionButton: {
    width: 70,
    height: 32,
  },
  activeActionButton: {
    backgroundColor: "#F0F9F5",
    borderWidth: 1,
    borderColor: "#00a86b20",
  },
  activeActionText: {
    color: "#00a86b",
    fontFamily: "Poppins-Medium",
  },
  investorList: {
    paddingBottom: 16,
  },
  investorRow: {
    justifyContent: "space-between",
  },
  emptyContainer: {
    padding: 20,
    height: 500,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#737373",
  },
})

export default HomeScreen

