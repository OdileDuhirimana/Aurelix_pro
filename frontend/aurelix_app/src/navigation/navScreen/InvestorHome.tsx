"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
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
import { Bell, Filter, ArrowDown, ArrowUp, Search } from "lucide-react-native"

import StatusBar from "./Components/StatusBar"
import SearchBar from "./Components/SearchBar"
import StatCard from "./Components/StatCard"
import FilterChip from "./Components/FilterChip"
import ActionButton from "./Components/ActionButton"
import BusinessCard from "./Components/BusinessCard"
import FilterPopup from "./Components/FilterPopup"
import SortPopup from "./Components/SortPopup"

// Types and Services
import type { Business, Region, FilterOption, SortOption } from "../index"
import { fetchBusinesses, fetchRegions, fetchStats, fetchSectors, fetchSortOptions } from "./mockup/api_investor"

interface InvestorHomeProps {
  navigation: any
}

const InvestorHome: React.FC<InvestorHomeProps> = ({ navigation }) => {
  // State
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [regions, setRegions] = useState<Region[]>([])
  const [sectors, setSectors] = useState<FilterOption[]>([])
  const [sortOptions, setSortOptions] = useState<SortOption[]>([])
  const [stats, setStats] = useState({
    businesses: "",
    businessesChange: "",
    businessesIncreasing: false,
    newBusinesses: "",
    newBusinessesChange: "",
    newBusinessesIncreasing: true,
  })

  // Filter and search state
  const [activeRegion, setActiveRegion] = useState<string>("All")
  const [activeSector, setActiveSector] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(null)

  // UI state
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false)
  const [showSortPopup, setShowSortPopup] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false)

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim().toLowerCase())
    }, 300)
    return () => clearTimeout(handler)
  }, [searchQuery])

  // Load initial data
  const loadData = useCallback(async (showLoading = true) => {
    if (showLoading) setIsLoading(true)
    setError(null)

    try {
      const [businessesData, regionsData, statsData, sectorsData, sortOptionsData] = await Promise.all([
        fetchBusinesses(),
        fetchRegions(),
        fetchStats(),
        fetchSectors(),
        fetchSortOptions(),
      ])

      setBusinesses(businessesData)
      setRegions(regionsData)
      setStats(statsData)
      setSectors(sectorsData)
      setSortOptions(sortOptionsData)

      // Find the active region from the fetched data
      const activeRegionData = regionsData.find((r) => r.active)
      if (activeRegionData) {
        setActiveRegion(activeRegionData.name)
      }
    } catch (error) {
      console.error("Error loading data:", error)
      setError("Failed to load data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Load businesses based on filters
  const loadBusinesses = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await fetchBusinesses(activeRegion, activeSector, selectedSortOption, debouncedSearchQuery)
      setBusinesses(data)
      setError(null)
    } catch (error) {
      console.error("Error loading businesses:", error)
      setBusinesses([])
      setError("Failed to load businesses. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [activeRegion, activeSector, selectedSortOption, debouncedSearchQuery])

  // Initial data load
  useEffect(() => {
    const abortController = new AbortController()
    loadData()
    return () => abortController.abort()
  }, [])

  // Load businesses when filters change
  useEffect(() => {
    if (regions.length > 0) {
      loadBusinesses()
    }
  }, [loadBusinesses, regions.length])

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await loadData(false)
    setIsRefreshing(false)
  }, [loadData])

  // Event handlers
  const handleRegionPress = useCallback((region: Region) => {
    setActiveRegion(region.name)
    setRegions((prev) =>
      prev.map((r) => ({
        ...r,
        active: r.id === region.id,
      })),
    )
  }, [])

  const handleSortOptionSelect = useCallback((optionId: string) => {
    setSelectedSortOption(optionId)
    setShowSortPopup(false)
  }, [])

  const handleFilterSelect = useCallback((type: string, option: FilterOption) => {
    if (type === "sector") {
      setActiveSector(option.name)
    }
    setShowFilterPopup(false)
  }, [])

  const handleBusinessPress = useCallback(
    (business: Business) => {
      navigation.navigate("BusinessProfile", { business })
    },
    [navigation],
  )

  const handleChatPress = useCallback(
    (business: Business) => {
      navigation.navigate("Chat", { business })
    },
    [navigation],
  )

  const handleClearSearch = useCallback(() => {
    setSearchQuery("")
  }, [])

  const handleFilterPress = useCallback(() => {
    setFilterMenuOpen(true)
  }, [])

  // Memoized values
  const currentSortName = useMemo(() => {
    if (!selectedSortOption) return "Sort"
    const option = sortOptions.find((opt) => opt.id === selectedSortOption)
    return option ? option.name.split(" ")[0] : "Sort"
  }, [selectedSortOption, sortOptions])

  const sortDirectionIcon = useMemo(() => {
    if (!selectedSortOption) return null
    const option = sortOptions.find((opt) => opt.id === selectedSortOption)
    if (!option) return null
    return option.direction === "asc" ? <ArrowUp size={14} color="#232327" /> : <ArrowDown size={14} color="#232327" />
  }, [selectedSortOption, sortOptions])

  // Render functions
  const renderBusinessItem = useCallback(
    ({ item, index }: { item: Business; index: number }) => (
      <View style={styles.businessCardContainer}>
        <BusinessCard
          business={item}
          onPress={() => handleBusinessPress(item)}
          onChatPress={() => handleChatPress(item)}
        />
      </View>
    ),
    [handleBusinessPress, handleChatPress],
  )

  const renderHeader = useCallback(
    () => (
      <View>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Hello, Welcome👋</Text>
            <Text style={styles.userName}>Mark Robinson</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate("Notifications")}
            accessibilityLabel="Notifications"
          >
            <Bell size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search enterprises..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            onClear={handleClearSearch}
          />
        </View>

        <View style={styles.statsContainer}>
          <StatCard
            value={stats.businesses}
            label="You might like"
            percentage={"Businesses"}
            isIncreasing={stats.businessesIncreasing}
          />
          <StatCard
            value={stats.newBusinesses}
            label="New businesses today"
            percentage={stats.newBusinessesChange}
            isIncreasing={stats.newBusinessesIncreasing}
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
              label={`Sort ${selectedSortOption ? "" : "↓"}`}
              icon={sortDirectionIcon}
              onPress={() => setShowSortPopup(true)}
              style={[styles.actionButton, selectedSortOption ? styles.activeActionButton : null]}
              textStyle={selectedSortOption ? styles.activeActionText : null}
            />
            <ActionButton
              label="Filter"
              icon={<Filter size={16} color="#000000" />}
              onPress={() => setShowFilterPopup(true)}
              style={[styles.actionButton, activeSector ? styles.activeActionButton : null]}
              textStyle={activeSector ? styles.activeActionText : null}
            />
          </View>
        </View>

        {activeSector && (
          <View style={styles.activeFilterContainer}>
            <Text style={styles.activeFilterLabel}>Active filter:</Text>
            <View style={styles.activeFilterChip}>
              <Text style={styles.activeFilterText}>{activeSector}</Text>
              <TouchableOpacity
                onPress={() => setActiveSector(undefined)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.activeFilterClear}>×</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    ),
    [
      stats,
      regions,
      searchQuery,
      currentSortName,
      sortDirectionIcon,
      selectedSortOption,
      activeSector,
      handleRegionPress,
      handleClearSearch,
      navigation,
    ],
  )

  const renderEmptyList = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        {debouncedSearchQuery ? (
          <>
            <Search size={40} color="#A3A2A3" style={{ marginBottom: 10 }} />
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptyText}>We couldn't find any businesses matching "{debouncedSearchQuery}"</Text>
            <TouchableOpacity style={styles.clearSearchButton} onPress={handleClearSearch}>
              <Text style={styles.clearSearchText}>Clear search</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.emptyTitle}>No businesses found</Text>
            <Text style={styles.emptyText}>Try adjusting your filters or search criteria</Text>
          </>
        )}
      </View>
    ),
    [debouncedSearchQuery, handleClearSearch],
  )

  const renderError = useCallback(
    () => (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadData()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    ),
    [error, loadData],
  )

  if (isLoading && !isRefreshing && businesses.length === 0) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00a86b" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />

      {error && !isRefreshing ? (
        renderError()
      ) : (
        <View style={styles.container}>
          <FlatList
            data={businesses}
            renderItem={renderBusinessItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.businessList}
            columnWrapperStyle={styles.businessRow}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmptyList}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={["#00a86b"]} />}
            showsVerticalScrollIndicator={false}
            initialNumToRender={8}
            maxToRenderPerBatch={10}
            windowSize={10}
            removeClippedSubviews={true}
          />
        </View>
      )}

      <FilterPopup
        visible={showFilterPopup}
        onClose={() => setShowFilterPopup(false)}
        onSelectFilter={handleFilterSelect}
        locationOptions={regions}
        sectorOptions={sectors}
        selectedSector={activeSector}
      />

      <SortPopup
        visible={showSortPopup}
        onClose={() => setShowSortPopup(false)}
        options={sortOptions}
        selectedOption={selectedSortOption}
        onSelectOption={handleSortOptionSelect}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  container: {
    flex: 1,
    maxWidth: 480, 
    marginHorizontal: "auto", 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
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
  searchContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  filtersContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  matchesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  matchesTitle: {
    fontSize: 16,
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
  businessList: {
    paddingBottom: 16,
  },
  businessRow: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  businessCardContainer: {
    width: "48.5%", // Slightly less than 50% to account for gap
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#221F1F",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#787777",
    textAlign: "center",
    marginBottom: 16,
  },
  clearSearchButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#F0F9F5",
    borderRadius: 20,
  },
  clearSearchText: {
    color: "#00a86b",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#FF3B30",
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#00a86b",
    borderRadius: 25,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  activeFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  activeFilterLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#787777",
    marginRight: 8,
  },
  activeFilterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F9F5",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#00a86b20",
  },
  activeFilterText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#00a86b",
    marginRight: 4,
  },
  activeFilterClear: {
    fontSize: 16,
    color: "#00a86b",
    fontWeight: "bold",
  },
})

export default InvestorHome

