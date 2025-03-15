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
    }
  }
}

const BusinessProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const {business} = route.params
  const [similarInvestors, setSimilarInvestors] = useState<Investor[]>([])
  const [totalSimilar, setTotalSimilar] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingSimilar, setIsLoadingSimilar] = useState<boolean>(true)
  const [sortOption, setSortOption] = useState<string>("relevance")
  const [filterOptions, setFilterOptions] = useState<string[]>([])

  // Fetch business profile on component mount
  useEffect(() => {
    fetchBusinessProfile()
    fetchSimilarInvestors()
  }, [])

  // Fetch similar investors when sort or filter changes
  useEffect(() => {
    fetchSimilarInvestors()
  }, [sortOption, filterOptions])

  const fetchBusinessProfile = async () => {
    try {
      setIsLoading(true)
      const data = await API.getBusinessProfile(route.params.businessId)
      setBusiness(data)
    } catch (error) {
      // Handle error state
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSimilarInvestors = async () => {
    try {
      setIsLoadingSimilar(true)
      const params = {
        sort: sortOption,
        filter: filterOptions.join(","),
      }
      const data = await API.getSimilarInvestors(
        route.params.businessId,
        params
      )
      setSimilarInvestors(data.investors)
      setTotalSimilar(data.total)
    } catch (error) {
      // Handle error state
    } finally {
      setIsLoadingSimilar(false)
    }
  }

  const handleInitiateChat = async (targetInvestorId: string) => {
    try {
      const { chatId } = await API.initiateChat(targetInvestorId)
      navigation.navigate("Chat", { chatId })
    } catch (error) {
      // Handle error state
    }
  }

  const handleSort = () => {
    const options = ["relevance", "investmentCount", "alphabetical"]
    const currentIndex = options.indexOf(sortOption)
    const nextIndex = (currentIndex + 1) % options.length
    setSortOption(options[nextIndex])
  }

  const handleFilter = () => {
    navigation.navigate("InvestorFilters", {
      currentFilters: filterOptions,
      onApplyFilters: (filters: string[]) => setFilterOptions(filters),
    })
  }

  const renderSimilarInvestor = ({ item }: { item: Investor }) => (
    <View style={styles.similarInvestorCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.similarInvestorImage}
      />
      <Text style={styles.similarInvestorName}>{item.name}</Text>
      <Text style={styles.investmentCount}>
        {item.investments} Investments
      </Text>
      <Text style={styles.industryText1}>{item.industry}</Text>
      <View style={styles.locationRow}>
        <Text style={styles.locationText}>{item.location}</Text>
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => handleInitiateChat(item.id)}
        >
          <MessageCircle size={20} color="#00a86b" />
        </TouchableOpacity>
      </View>
    </View>
  )

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00a86b" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container}>
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
            onPress={() => business && handleInitiateChat(business.id)}
          >
            <MessageCircle size={24} color="#00a86b" />
          </TouchableOpacity>
        </View>

        {/* Business Profile Section */}
        {business && (
          <View style={styles.profileSection}>
            <Image
              source={{ uri: business.image }}
              style={styles.profileImage}
            />

            <View style={styles.nameSection}>
              <Text style={styles.nameText}>{business.name}</Text>
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
              <Text style={styles.greenText}>{business.investors}</Text> Investors
            </Text>

            <Text style={styles.industryText}>{business.industry}</Text>

            {business.description && (
              <Text style={styles.descriptionText}>{business.description}</Text>
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
        )}

        {/* Similar Investors Section */}
        <View style={styles.similarSection}>
          <Text style={styles.sectionTitle}>Similar Investors</Text>
          
          <View style={styles.similarHeader}>
            <Text style={styles.totalCount}>{totalSimilar}+ People</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.sortFilterButton}
                onPress={handleSort}
              >
                <Text style={styles.sortFilterButtonText}>Sort</Text>
                <ArrowUpDown size={16} color="#171725" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sortFilterButton}
                onPress={handleFilter}
              >
                <Text style={styles.sortFilterButtonText}>Filter</Text>
                <Filter size={16} color="#171725" />
              </TouchableOpacity>
            </View>
          </View>

          {isLoadingSimilar ? (
            <ActivityIndicator
              size="small"
              color="#00a86b"
              style={styles.loadingIndicator}
            />
          ) : (
            <FlatList
              data={similarInvestors}
              renderItem={renderSimilarInvestor}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.similarInvestorsList}
              snapToAlignment="start"
              pagingEnabled={false}
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
  sortFilterButtonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginRight: 4,
  },
  loadingIndicator: {
    marginVertical: 16,
  },
  similarInvestorsList: {
    flexGrow: 1,
    paddingBottom: 4,
    gap: 8,
  },
  similarInvestorCard: {
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
  },
  similarInvestorImage: {
    width: "100%",
    height: 136,
  },
  similarInvestorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#171725",
    marginTop: 8,
    marginHorizontal: 12,
  },
  investmentCount: {
    fontSize: 14,
    color: "#00a86b",
    marginHorizontal: 12,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
  },
  locationText: {
    fontSize: 14,
    color: "#737373",
  },
  industryText1: {
    fontSize: 10,
    fontWeight: 400,
    marginHorizontal: 12,
  },
})

export default BusinessProfileScreen
