import React, { useState, useEffect } from 'react';
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
  FlatList
} from 'react-native';
import { ArrowLeft, MessageCircle, ArrowUpDown, Filter } from 'lucide-react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define TypeScript interfaces for data structures
interface Investor {
  id: string;
  name: string;
  profileImage: string;
  investmentCount: number;
  industry: string;
  location: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

// API service for data fetching
const API = {
  baseUrl: 'https://api.example.com',
  
  // Fetch investor profile data
  async getInvestorProfile(investorId: string): Promise<Investor> {
    try {
      // This would be replaced with an actual API call
      // const response = await fetch(`${this.baseUrl}/investors/${investorId}`);
      // if (!response.ok) throw new Error('Failed to fetch investor profile');
      // return await response.json();
      
      // Mock data for demonstration
      return {
        id: investorId,
        name: 'Mark Robinson',
        profileImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-wJTLlqFNCoxV9SG5qmxIDKnmpdGI5P.png#crop=0,150,550,550',
        investmentCount: 158,
        industry: 'Agriculture',
        location: 'Rwanda',
        bio: 'Dedicated investor passionate about transforming the agricultural sector through innovation and sustainability. I actively support agri-tech startups, modern farming solutions, and businesses driving efficiency in food production and supply chains. Looking to connect with visionary entrepreneurs building the future of agriculture.',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/markrobinson',
          twitter: 'https://twitter.com/markrobinson'
        }
      };
    } catch (error) {
      console.error('Error fetching investor profile:', error);
      throw error;
    }
  },
  
  // Fetch similar investors
  async getSimilarInvestors(investorId: string, params: { sort?: string, filter?: string } = {}): Promise<{ total: number, investors: Investor[] }> {
    try {
      // This would be replaced with an actual API call
      // const queryParams = new URLSearchParams();
      // if (params.sort) queryParams.append('sort', params.sort);
      // if (params.filter) queryParams.append('filter', params.filter);
      // const response = await fetch(`${this.baseUrl}/investors/${investorId}/similar?${queryParams}`);
      // if (!response.ok) throw new Error('Failed to fetch similar investors');
      // return await response.json();
      
      // Mock data for demonstration
      return {
        total: 282,
        investors: [
          {
            id: '1',
            name: 'John Doe',
            profileImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-wJTLlqFNCoxV9SG5qmxIDKnmpdGI5P.png#crop=0,1150,300,1450',
            investmentCount: 150,
            industry: 'Agriculture',
            location: 'Rwanda'
          },
          {
            id: '2',
            name: 'John Doe',
            profileImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-wJTLlqFNCoxV9SG5qmxIDKnmpdGI5P.png#crop=300,1150,600,1450',
            investmentCount: 150,
            industry: 'Agriculture',
            location: 'Rwanda'
          }
        ]
      };
    } catch (error) {
      console.error('Error fetching similar investors:', error);
      throw error;
    }
  },
  
  // Initiate chat with investor
  async initiateChat(investorId: string): Promise<{ chatId: string }> {
    try {
      // This would be replaced with an actual API call
      // const response = await fetch(`${this.baseUrl}/chats`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ investorId })
      // });
      // if (!response.ok) throw new Error('Failed to initiate chat');
      // return await response.json();
      
      // Mock data for demonstration
      return { chatId: `chat-${investorId}-${Date.now()}` };
    } catch (error) {
      console.error('Error initiating chat:', error);
      throw error;
    }
  }
};

type InvestorProfileScreenNavigationProp = StackNavigationProp<any, 'InvestorProfile'>;

interface Props {
  navigation: InvestorProfileScreenNavigationProp;
  route: {
    params: {
      investorId: string;
    }
  }
}

const InvestorProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  // State management
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [similarInvestors, setSimilarInvestors] = useState<Investor[]>([]);
  const [totalSimilar, setTotalSimilar] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>('relevance');
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
        filter: filterOptions.join(',')
      };
      const data = await API.getSimilarInvestors(route.params.investorId, params);
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
      navigation.navigate('Chat', { chatId });
    } catch (error) {
      // Handle error state
    }
  };

  const handleSort = () => {
    // Toggle between different sort options
    const options = ['relevance', 'investmentCount', 'alphabetical'];
    const currentIndex = options.indexOf(sortOption);
    const nextIndex = (currentIndex + 1) % options.length;
    setSortOption(options[nextIndex]);
  };

  const handleFilter = () => {
    // This would open a filter modal or screen
    navigation.navigate('InvestorFilters', {
      currentFilters: filterOptions,
      onApplyFilters: (filters: string[]) => setFilterOptions(filters)
    });
  };

  const renderSimilarInvestor = ({ item }: { item: Investor }) => (
    <View style={styles.similarInvestorCard}>
      <Image 
        source={{ uri: item.profileImage }} 
        style={styles.similarInvestorImage}
      />
      <Text style={styles.similarInvestorName}>{item.name}</Text>
      <Text style={styles.investmentCount}>{item.investmentCount}+ Investments</Text>
      <Text style={styles.industryText}>{item.industry}</Text>
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
            <ArrowLeft size={24} color="#171725" />
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
              <Text style={styles.greenText}>{investor.investmentCount}</Text> Investments made so far
            </Text>
            
            <Text style={styles.industryText}>{investor.industry}</Text>
            
            {investor.bio && (
              <Text style={styles.bioText}>{investor.bio}</Text>
            )}
          </View>
        )}

        {/* Similar Investors Section */}
        <View style={styles.similarSection}>
          <Text style={styles.sectionTitle}>Similar Investors</Text>
          
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
            <ActivityIndicator size="small" color="#00a86b" style={styles.loadingIndicator} />
          ) : (
            <FlatList
              data={similarInvestors}
              renderItem={renderSimilarInvestor}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.similarInvestorsList}
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
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  profileImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  nameSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#171725',
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 8,
  },
  socialButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
  greenText: {
    color: '#00a86b',
  },
  investmentCountLarge: {
    fontSize: 16,
    marginBottom: 8,
  },
  industryText: {
    fontSize: 16,
    color: '#171725',
    marginBottom: 16,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#171725',
  },
  similarSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#171725',
    marginBottom: 16,
  },
  similarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171725',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  actionButtonText: {
    fontSize: 14,
    marginRight: 4,
  },
  loadingIndicator: {
    marginVertical: 16,
  },
  similarInvestorsList: {
    paddingBottom: 16,
    gap: 16,
  },
  similarInvestorCard: {
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    overflow: 'hidden',
  },
  similarInvestorImage: {
    width: '100%',
    height: 180,
  },
  similarInvestorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171725',
    marginTop: 8,
    marginHorizontal: 12,
  },
  investmentCount: {
    fontSize: 14,
    color: '#00a86b',
    marginHorizontal: 12,
    marginTop: 4,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#737373',
  },
});

export default InvestorProfileScreen;