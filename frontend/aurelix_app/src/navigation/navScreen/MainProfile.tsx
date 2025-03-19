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
  Linking,
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
import type { Business, Investor, Investor2 } from "../index"
import { API as BusinessAPI } from "./mockup/api_business_profile"
import { API as InvestorAPI } from "./mockup/api_ivestor"
import AsyncStorage from "@react-native-async-storage/async-storage"
import EntityCard from "./Components/Card"
type MainProfileScreenNavigationProp = StackNavigationProp<
  any,
  "Profile"
>

interface Props {
  navigation: MainProfileScreenNavigationProp
  route: {
    params: {
      entityId?: string
      entity?: Business | Investor | Investor2
      entityType: "business" | "investor"
    }
  }
}

const MainProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  // Extract params
  const { entityId, entity: initialEntity, entityType } = route.params
  
  // State
  const [entity, setEntity] = useState<Business | Investor | Investor2 | null>(initialEntity || null)
  const [similarEntities, setSimilarEntities] = useState<(Business | Investor | Investor2)[]>([])
  const [totalSimilar, setTotalSimilar] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(!initialEntity)
  const [isLoadingSimilar, setIsLoadingSimilar] = useState<boolean>(true)
  const [sortOption, setSortOption] = useState<string>("relevance")
  const [filterOptions, setFilterOptions] = useState<string[]>([])
  const [userType, setUserType] = useState<"entrepreneur" | "investor">("entrepreneur")

  useEffect(() => {
    const determineUserType = async () => {
      try {
        const storedUserType = await AsyncStorage.getItem("@user_type")
        if (storedUserType === "investor" || storedUserType === "entrepreneur") {
          setUserType(storedUserType as "entrepreneur" | "investor")
        }
      } catch (error) {
        console.error("Error determining user type:", error)
      }
    }

    determineUserType()
  }, [])


  useEffect(() => {
    if (!initialEntity && entityId) {
      fetchEntityProfile()
    }
    fetchSimilarEntities()
  }, [initialEntity, entityId])

  useEffect(() => {
    fetchSimilarEntities()
  }, [sortOption, filterOptions, entity])

  const fetchEntityProfile = async () => {
    if (!entityId) return
    
    try {
      setIsLoading(true)
      
      if (entityType === "business") {
        const data = await BusinessAPI.getBusinessProfile(entityId)
        setEntity(data)
      } else {
        const data = await InvestorAPI.getInvestorProfile(entityId)
        setEntity(data)
      }
    } catch (error) {
      console.error(`Error fetching ${entityType} profile:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSimilarEntities = async () => {
    if (!entity) return
    
    try {
      setIsLoadingSimilar(true)
      const params = {
        sort: sortOption,
        filter: filterOptions.join(","),
      }
      
      let data
      if (entityType === "business") {
        data = await BusinessAPI.getSimilarInvestors(entity.id, params)
        setSimilarEntities(data.businesses || [])
        setTotalSimilar(data.total || 0)
      } else {
        data = await InvestorAPI.getSimilarInvestors(entity.id, params)
        setSimilarEntities(data.investors || [])
        setTotalSimilar(data.total || 0)
      }
    } catch (error) {
      console.error(`Error fetching similar ${entityType}s:`, error)
      setSimilarEntities([])
      setTotalSimilar(0)
    } finally {
      setIsLoadingSimilar(false)
    }
  }

  const handleInitiateChat = async (targetId: string) => {
    try {
      let chatId
      if (entityType === "business") {
        const response = await BusinessAPI.initiateChat(targetId)
        chatId = response.chatId
      } else {
        const response = await InvestorAPI.initiateChat(targetId)
        chatId = response.chatId
      }
      
      navigation.navigate("Chat", { chatId })
    } catch (error) {
      console.error("Error initiating chat:", error)
    }
  }

  const handleSort = () => {
    const options = ["relevance", entityType === "business" ? "investorCount" : "investmentCount", "alphabetical"]
    const currentIndex = options.indexOf(sortOption)
    const nextIndex = (currentIndex + 1) % options.length
    setSortOption(options[nextIndex])
  }

  const handleFilter = () => {
    navigation.navigate(`${entityType === "business" ? "Business" : "Investor"}Filters`, {
      currentFilters: filterOptions,
      onApplyFilters: (filters: string[]) => setFilterOptions(filters),
    })
  }

  const handleContactPress = (type: string, value?: string) => {
    if (!value) return
    
    switch (type) {
      case "phone":
        Linking.openURL(`tel:${value}`)
        break
      case "email":
        Linking.openURL(`mailto:${value}`)
        break
      case "website":
        Linking.openURL(value.startsWith("http") ? value : `https://${value}`)
        break
      case "linkedin":
        Linking.openURL(value)
        break
      case "twitter":
        Linking.openURL(value)
        break
    }
  }

  const renderSimilarEntityItem = ({ item }: { item: Business | Investor | Investor2 }) => (
    <TouchableOpacity 
      style={styles.similarEntityCard}
      onPress={() => navigation.navigate("MainProfile", { 
        entity: item, 
        entityType: entityType,
      })}
    >
      <Image 
        source={{ uri: entityType === "business" ? item.image : (item as Investor2).profileImage || item.image }} 
        style={styles.similarEntityImage}
        resizeMode="cover"
      />
      <Text style={styles.similarEntityName} numberOfLines={1}>{item.name}</Text>
      
      {entityType === "business" ? (
        <Text style={styles.countText}>
          <Text style={styles.greenText}>{(item as Business).investors}</Text> Investors
        </Text>
      ) : (
        <Text style={styles.countText}>
          <Text style={styles.greenText}>{(item as Investor2).investmentCount || (item as Investor).investments}</Text>+ Investments
        </Text>
      )}
      
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

  if (!entity) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>{entityType === "business" ? "Business" : "Investor"} not found</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  // Determine if we're viewing a business or investor
  const isBusiness = entityType === "business"
  
  const countValue = isBusiness 
    ? (entity as Business).investors 
    : (entity as Investor).investments || (entity as Investor2).investmentCount
  

  const countLabel = isBusiness ? "Investors" : "Investments made so far"

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color="#171725" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => handleInitiateChat(entity.id)}
          >
            <MessageCircle size={24} color="#00a86b" />
          </TouchableOpacity>
        </View>

        {/* Entity Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: isBusiness ? entity.image : (entity as Investor2).profileImage || entity.image }}
            style={[
              styles.profileImage,
              isBusiness ? styles.businessImage : styles.investorImage
            ]}
            resizeMode="cover"
          />

          <View style={styles.nameSection}>
            <Text style={styles.nameText}>{entity.name}</Text>
            
            {isBusiness ? (
              // Business contact buttons
              <View style={styles.contactButtons}>
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={() => handleContactPress("phone", (entity as Business).phone)}
                >
                  <Phone size={20} color="#000000" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={() => handleContactPress("email", (entity as Business).email)}
                >
                  <Mail size={20} color="#000000" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={() => handleContactPress("website", (entity as Business).website)}
                >
                  <Globe size={20} color="#000000" />
                </TouchableOpacity>
              </View>
            ) : (
              // Investor social links
              <View style={styles.socialLinks}>
                {(entity as Investor2).socialLinks?.linkedin && (
                  <TouchableOpacity 
                    style={styles.socialButton}
                    onPress={() => handleContactPress("linkedin", (entity as Investor2).socialLinks?.linkedin)}
                  >
                     <Text style={styles.socialIcon}>in</Text>
                  </TouchableOpacity>
                )}
                {(entity as Investor2).socialLinks?.twitter && (
                  <TouchableOpacity 
                    style={styles.socialButton}
                    onPress={() => handleContactPress("twitter", (entity as Investor2).socialLinks?.twitter)}
                  >
                    <Text style={styles.socialIcon}>𝕏</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          <Text style={styles.countText}>
            <Text style={styles.greenText}>{countValue}</Text> {countLabel}
          </Text>

          <Text style={styles.industryText}>{entity.industry}</Text>

          {/* Description/Bio */}
          {isBusiness ? (
            (entity as Business).description && (
              <Text style={styles.descriptionText}>{(entity as Business).description}</Text>
            )
          ) : (
            (entity as Investor2).bio && (
              <Text style={styles.descriptionText}>{(entity as Investor2).bio}</Text>
            )
          )}

          {/* Action buttons for business only */}
          {isBusiness && (
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
          )}
        </View>

        {/* Similar Entities Section */}
        <View style={styles.similarSection}>
          <Text style={styles.sectionTitle}>
            {isBusiness ? "You might be interested in" : "Similar Investors"}
          </Text>
          
          <View style={styles.similarHeader}>
            <Text style={styles.totalCount}>
              {totalSimilar > 0 
                ? `${totalSimilar}+ ${isBusiness ? "Businesses" : "People"}` 
                : `No similar ${isBusiness ? "businesses" : "investors"}`}
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
            data={similarEntities}
            renderItem={({ item }) => (
              <EntityCard
                entity={item}
                type={entityType}
                onPress={() => navigation.navigate("MainProfile", {
                  entity: item,
                  entityType: entityType,
                })}
                onChatPress={() => handleInitiateChat(item.id)}
                style={{ width: 164, marginRight: 16 }}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.similarEntitiesList}
            ListEmptyComponent={() => (
              <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>
                  No similar {isBusiness ? "businesses" : "investors"} found
                </Text>
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
    borderRadius: 8,
    marginBottom: 20,
  },
  businessImage: {
    height: 255,
  },
  investorImage: {
    height: 220,
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
  socialLinks: {
    flexDirection: "row",
    gap: 8,
  },
  socialButton: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    fontWeight: '700',
  },
  greenText: {
    color: "#00a86b",
    fontWeight: "600",
  },
  countText: {
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
  similarEntitiesList: {
    paddingBottom: 16,
    gap: 16,
  },
  similarEntityCard: {
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
  similarEntityImage: {
    width: "100%",
    height: 136,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  similarEntityName: {
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

export default MainProfileScreen