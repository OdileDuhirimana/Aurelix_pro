import React, { useState, useEffect } from "react";
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
} from "react-native";
import {
  ChevronLeft,
  MessageCircle,
  ArrowUpDown,
  Filter,
  MessageCircleDashed,
} from "lucide-react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import type { Investor2 } from "../index";
import { API } from "./mockup/api_ivestor";

// Define TypeScript interfaces for data structure



type InvestorProfileScreenNavigationProp = StackNavigationProp<
  any,
  "InvestorProfile"
>;

interface Props {
  navigation: InvestorProfileScreenNavigationProp;
  route: {
    params: {
      investorId: string;
    };
  };
}

const InvestorProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  // State management
  const [investor, setInvestor] = useState<Investor2 | null>(null);
  const [similarInvestors, setSimilarInvestors] = useState<Investor2[]>([]);
  const [totalSimilar, setTotalSimilar] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("relevance");
  const [filterOptions, setFilterOptions] = useState<string[]>([]);

  // Fetch investor profile on component mount
  useEffect(() => {
    fetchInvestorProfile();
    fetchSimilarInvestors();
  }, []);

  // Fetch investor profile when sort or filter changes
  useEffect(() => {
    fetchSimilarInvestors();
  }, [sortOption, filterOptions]);

  const fetchInvestorProfile = async () => {
    try {
      setIsLoading(true);
      const data = await API.getInvestorProfile(route.params.investorId);
      setInvestor(data);
    } catch (error) {
      // Handle error state
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSimilarInvestors = async () => {
    try {
      setIsLoadingSimilar(true);
      const params = {
        sort: sortOption,
        filter: filterOptions.join(","),
      };
      const data = await API.getSimilarInvestors(
        route.params.investorId,
        params
      );
      setSimilarInvestors(data.investors);
      setTotalSimilar(data.total);
    } catch (error) {
      // Handle error state
    } finally {
      setIsLoadingSimilar(false);
    }
  };

  const handleInitiateChat = async (targetInvestorId: string) => {
    try {
      const { chatId } = await API.initiateChat(targetInvestorId);
      navigation.navigate("Chat", { chatId });
    } catch (error) {
      // Handle error state
    }
  };

  const handleSort = () => {
    // Toggle between different sort options
    const options = ["relevance", "investmentCount", "alphabetical"];
    const currentIndex = options.indexOf(sortOption);
    const nextIndex = (currentIndex + 1) % options.length;
    setSortOption(options[nextIndex]);
  };

  const handleFilter = () => {
    // This would open a filter modal or screen
    navigation.navigate("InvestorFilters", {
      currentFilters: filterOptions,
      onApplyFilters: (filters: string[]) => setFilterOptions(filters),
    });
  };

  const renderSimilarInvestor = ({ item }: { item: Investor2 }) => (
    <View style={styles.similarInvestorCard}>
      <Image
        source={{ uri: item.profileImage }}
        style={styles.similarInvestorImage}
      />
      <Text style={styles.similarInvestorName}>{item.name}</Text>
      <Text style={styles.investmentCount}>
        {item.investmentCount}+ Investments
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
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00a86b" />
      </SafeAreaView>
    );
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
            onPress={() => investor && handleInitiateChat(investor.id)}
          >
            <MessageCircle size={24} color="#00a86b" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        {investor && (
          <View style={styles.profileSection}>
            <Image
              source={{ uri: investor.profileImage }}
              style={styles.profileImage}
            />

            <View style={styles.nameSection}>
              <Text style={styles.nameText}>{investor.name}</Text>
              <View style={styles.socialLinks}>
                {investor.socialLinks?.linkedin && (
                  <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialIcon}>in</Text>
                  </TouchableOpacity>
                )}
                {investor.socialLinks?.twitter && (
                  <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialIcon}>𝕏</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <Text style={styles.investmentCountLarge}>
              <Text style={styles.greenText}>{investor.investmentCount}</Text>{" "}
              Investments made so far
            </Text>

            <Text style={styles.industryText}>{investor.industry}</Text>

            {investor.bio && <Text style={styles.bioText}>{investor.bio}</Text>}
          </View>
        )}

        {/* Similar Investors Section */}
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <View style={styles.similarHeader}>
            <Text style={styles.totalCount}>{totalSimilar}+ People</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSort}
              >
                <Text style={styles.actionButtonText}>Sort</Text>
                <ArrowUpDown size={16} color="#171725" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleFilter}
              >
                <Text style={styles.actionButtonText}>Filter</Text>
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
              snapToAlignment="start" // Optional: Smooth scrolling behavior
              pagingEnabled={false} // Optional: Page-like snapping
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    marginTop: 20,
    marginBottom: 18,
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
    marginBottom: 40,
  },
  profileImage: {
    width: "100%",
    height: 220,
    borderRadius: 8,
    marginBottom: 40,
  },
  nameSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nameText: {
    fontFamily: "Inter-Variable",
    fontSize: 25,
    fontWeight: "700",
    color: "#221F1F",
  },
  socialLinks: {
    flexDirection: "row",
    gap: 8,
  },
  socialButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: "600",
  },
  greenText: {
    color: "#00a86b",
  },
  investmentCountLarge: {
    fontFamily: "Inter-Variable",
    fontSize: 15,
    fontWeight: 400,
    marginBottom: 4,
  },
  industryText: {
    fontFamily: "Inter-Variable",
    fontSize: 12,
    fontWeight: 400,
    color: "#221F1FE5",
    marginBottom: 16,
  },
  bioText: {
    fontFamily: "Inter-Variable",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 19.5,
    color: "#221F1FE5",
  },
  similarSection: {
    paddingLeft: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Inter-Variable",
    fontSize: 20,
    fontWeight: 700,
    color: "#221F1FE5",
    marginBottom: 10,
  },
  similarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  totalCount: {
    // fontFamily: 'Inter-Variable',
    fontSize: 18,
    fontWeight: 500,
    color: "#171725",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderColor: "#e5e5e5",
    height: 30,
  },
  actionButtonText: {
    fontSize: 12,
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
});

export default InvestorProfileScreen;
