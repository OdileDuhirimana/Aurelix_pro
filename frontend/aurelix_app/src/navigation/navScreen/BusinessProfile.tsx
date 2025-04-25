import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native"
import {
  ChevronLeft,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  ArrowUpDown,
  Filter,
  FileText,
  Play,
} from "lucide-react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { StackNavigationProp } from "@react-navigation/stack"
import type { Business, Investor } from "../index"
import { API } from "./mockup/api_business_profile"

type BusinessProfileScreenNavigationProp = StackNavigationProp<
  any,
  "BusinessProfile"
>

interface Props {
  navigation: BusinessProfileScreenNavigationProp
  route: {
    params: {
      businessId: string
      business: Business
    }
  }
}

const BusinessProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const { business } = route.params
  const [similarBusinesses, setSimilarBusinesses] = useState<Business[]>([])
  const [totalSimilar, setTotalSimilar] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingSimilar, setIsLoadingSimilar] = useState<boolean>(true)
  const [sortOption, setSortOption] = useState<string>("relevance")
  const [filterOptions, setFilterOptions] = useState<string[]>([])
  const [businessDetails, setBusinessDetails] = useState<Business | null>(null)

  // Fetch business profile on component mount
  useEffect(() => {
    fetchBusinessProfile()
    fetchSimilarBusinesses()
  }, [])

  // Fetch similar businesses when sort or filter changes
  useEffect(() => {
    fetchSimilarBusinesses()
  }, [sortOption, filterOptions])

  const fetchBusinessProfile = async () => {
    try {
      setIsLoading(true)
      // If we already have the business data from route params, use it
      if (business) {
        setBusinessDetails(business)
        setIsLoading(false)
        return
      }
      
      // Otherwise fetch from API
      const data = await API.getBusinessProfile(route.params.businessId)
      setBusinessDetails(data)
    } catch (error) {
      console.error("Error fetching business profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSimilarBusinesses = async () => {
    try {
      setIsLoadingSimilar(true)
      const params = {
        sort: sortOption,
        filter: filterOptions.join(","),
      }
      
      // Use business ID from route params or from the business object
      const businessId = route.params.businessId || (business ? business.id : null)
      
      if (!businessId) {
        throw new Error("Business ID not available")
      }
      
      const data = await API.getSimilarBusinesses(businessId, params)
      setSimilarBusinesses(data.businesses)
      setTotalSimilar(data.total)
    } catch (error) {
      console.error("Error fetching similar businesses:", error)
      setSimilarBusinesses([])
      setTotalSimilar(0)
    } finally {
      setIsLoadingSimilar(false)
    }
  }

  const handleInitiateChat = async (targetBusinessId: string) => {
    try {
      const { chatId } = await API.initiateChat(targetBusinessId)
      navigation.navigate("Chat", { chatId })
    } catch (error) {
      console.error("Error initiating chat:", error)
    }
  }

  const handleSort = () => {
    const options = ["relevance", "investorCount", "alphabetical"]
    const currentIndex = options.indexOf(sortOption)
    const nextIndex = (currentIndex + 1) % options.length
    setSortOption(options[nextIndex])
  }

  const handleFilter = () => {
    navigation.navigate("BusinessFilters", {
      currentFilters: filterOptions,
      onApplyFilters: (filters: string[]) => setFilterOptions(filters),
    })
  }

  const renderSimilarBusinessItem = ({ item }: { item: Business }) => (
    <TouchableOpacity 
      style={styles.similarBusinessCard}
      onPress={() => navigation.navigate("BusinessProfile", { business: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.similarBusinessImage}
        resizeMode="cover"
      />
      <Text style={styles.similarBusinessName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.investorCount}>
        <Text style={styles.greenText}>{item.investors}</Text> Investors
      </Text>
      <Text style={styles.industryText1}>{item.industry}</Text>
      <View style={styles.locationRow}>
        <Text style={styles.locationText}>{item.location}</Text>
        <TouchableOpacity onPress={() => handleInitiateChat(item.id)}>
          <MessageCircle size={20} color="#00a86b" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00a86b" />
      </SafeAreaView>
    )
  }

  // Use either the business from route params or the fetched business details
  const displayBusiness = businessDetails || business

  if (!displayBusiness) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Business not found</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color="#171725" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => handleInitiateChat(displayBusiness.id)}
          >
            <MessageCircle size={24} color="#00a86b" />
          </TouchableOpacity>
        </View>

        {/* Business Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: displayBusiness.image }}
            style={styles.profileImage}
            resizeMode="cover"
          />

          <View style={styles.nameSection}>
            <Text style={styles.nameText}>{displayBusiness.name}</Text>
            <View style={styles.contactButtons}>
              <TouchableOpacity style={styles.contactButton}>
                <Phone size={20} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton}>
                <Mail size={20} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton}>
                <Globe size={20} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.investorCount}>
            <Text style={styles.greenText}>{displayBusiness.investors}</Text> Investors
          </Text>

          <Text style={styles.industryText}>{displayBusiness.industry}</Text>

          {displayBusiness.description && (
            <Text style={styles.descriptionText}>{displayBusiness.description}</Text>
          )}

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButtonGreen}>
              <MaterialCommunityIcons name="cube-outline" size={24} color="#ffff" />
              <Text style={styles.actionButtonTextWhite}>AR View</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButtonOutline}>
              <Play size={18} color="#000000" />
              <Text style={styles.actionButtonText}>Pitch Video</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButtonOutline}>
              <FileText size={18} color="#000000" />
              <Text style={styles.actionButtonText}>Documents</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Similar Businesses Section */}
        <View style={styles.similarSection}>
          <Text style={styles.sectionTitle}>You might be interested in</Text>
          
          <View style={styles.similarHeader}>
            <Text style={styles.totalCount}>
              {totalSimilar > 0 ? `${totalSimilar}+ Businesses` : "No similar businesses"}
            </Text>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[
                  styles.sortFilterButton,
                  sortOption !== "relevance" && styles.activeFilterButton
                ]}
                onPress={handleSort}
              >
                <Text style={[
                  styles.sortFilterButtonText,
                  sortOption !== "relevance" && styles.activeFilterText
                ]}>
                  Sort
                </Text>
                <ArrowUpDown size={16} color={sortOption !== "relevance" ? "#00a86b" : "#171725"} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.sortFilterButton,
                  filterOptions.length > 0 && styles.activeFilterButton
                ]}
                onPress={handleFilter}
              >
                <Text style={[
                  styles.sortFilterButtonText,
                  filterOptions.length > 0 && styles.activeFilterText
                ]}>
                  Filter
                </Text>
                <Filter size={16} color={filterOptions.length > 0 ? "#00a86b" : "#171725"} />
              </TouchableOpacity>
            </View>
          </View>
          
          {isLoadingSimilar ? (
            <ActivityIndicator 
              style={styles.loadingIndicator} 
              size="small" 
              color="#00a86b" 
            />
          ) : (
            <FlatList
              data={similarBusinesses}
              renderItem={renderSimilarBusinessItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.similarBusinessesList}
              ListEmptyComponent={() => (
                <View style={styles.emptyListContainer}>
                  <Text style={styles.emptyListText}>No similar businesses found</Text>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  chatButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  profileImage: {
    width: "100%",
    height: 255,
    borderRadius: 8,
    marginBottom: 20,
  },
  nameSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nameText: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: "#221F1F",
  },
  contactButtons: {
    flexDirection: "row",
    gap: 8,
  },
  contactButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  greenText: {
    color: "#00a86b",
    fontWeight: "600",
  },
  investorCount: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    marginBottom: 4,
  },
  industryText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#221F1F",
    marginBottom: 16,
  },
  descriptionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 22,
    color: "#221F1F",
    marginBottom: 20,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButtonGreen: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00a86b",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
    flex: 1,
    marginRight: 8,
  },
  actionButtonOutline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "#00a86b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontFamily: "Poppins-Light",
    fontSize: 10,
    color: "#000000",
  },
  actionButtonTextWhite: {
    fontFamily: "Poppins-Light",
    fontSize: 10,
    color: "#ffffff",
  },
  similarSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: "#221F1F",
    marginBottom: 16,
  },
  similarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalCount: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#171725",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  sortFilterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  activeFilterButton: {
    backgroundColor: "#F0F9F5",
    borderColor: "#00a86b20",
  },
  sortFilterButtonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginRight: 4,
    color: "#171725",
  },
  activeFilterText: {
    color: "#00a86b",
    fontFamily: "Poppins-Medium",
  },
  loadingIndicator: {
    marginVertical: 16,
  },
  similarBusinessesList: {
    paddingBottom: 16,
    gap: 16,
  },
  similarBusinessCard: {
    width: 164,
    height: 245,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderColor: "#e5e5e5",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  similarBusinessImage: {
    width: "100%",
    height: 136,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  similarBusinessName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#171725",
    marginTop: 8,
    marginHorizontal: 12,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#737373",
    fontFamily: "Poppins-Regular",
  },
  industryText1: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#737373",
    marginHorizontal: 12,
    marginTop: 2,
  },
  emptyListContainer: {
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#737373",
    textAlign: "center",
  },
  errorText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#fc5a5a",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#00a86b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  retryButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#ffffff",
  },
})

export default BusinessProfileScreen