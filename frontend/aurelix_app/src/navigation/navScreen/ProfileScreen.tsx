import React, { useState, useEffect, useCallback } from 'react';
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
  Alert,
  Linking,
  Platform
} from 'react-native';
import { 
  Settings, 
  Mail, 
  Phone, 
  Globe, 
  FileText, 
  BarChart2, 
  LogOut,
  Edit,
  Crown,
  ChevronLeft
} from 'lucide-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define TypeScript interfaces for data structures
interface BaseProfile {
  id: string;
  name: string;
  avatar: string;
  activeSince: string;
  email: string;
  phone: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BusinessProfile extends BaseProfile {
  businessName: string;
  website: string;
  hasBusinessDocuments: boolean;
  description?: string;
}

interface InvestorProfile extends BaseProfile {
  bio?: string;
  linkedin?: string;
  twitter?: string;
}

type UserProfile = BusinessProfile | InvestorProfile;

interface ProfileSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: () => void;
  isPremium?: boolean;
  isActive?: boolean;
}

// API service for data fetching and operations
const API = {
  baseUrl: 'https://api.example.com',
  
  // Fetch user profile
  async getUserProfile(userId: string, userType: string): Promise<UserProfile> {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      if (userType === 'entrepreneur') {
        // Return business profile
        return {
          id: userId,
          name: 'Canaberra',
          businessName: 'Canaberra',
          avatar: 'https://s3-alpha-sig.figma.com/img/4b07/3cce/73f6c12d8d50448c6c5457d2dca5a5c7?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NdDLaM-KXxKx2ayfOTbHlAW0Nig2AB2xcqb~uFVxpvUQNY0XOAFLYXFI4kCusWxDWK1v1xZ~GSIjKNSju1pAxhlB2IKtE6ulVii~D60-QVaMzrO2IKQa6~E4QsvCiQq1D4hBT8B3TLzRPNEc79kjcOdNOYu6s81NMqbSxACKzxS0z-7iEQQZ6WaFr8lPrm0E5sThoIBo3DcZbJeqhwPdy10-AqO26A--U5Z7muI-ktPhd7gc6-N1GfRTNmgnuu44H3dsS7-ozct1qOkiwXVi9Kezq5ZagFll8P4VniJKnfiqU69zbHZdDmHPULw1MHNf81xZQBWlwjLztCHm0MR~EQ__',
          activeSince: '2023',
          email: 'angecurtis02@gmail.com',
          phone: '+250 788 897 654',
          website: 'www.seedinvest.com',
          isPremium: true,
          hasBusinessDocuments: true,
          description: 'Premium Rwandan coffee, artisanal pastries, and a stylish co-working space.',
          createdAt: '2023-01-15T10:30:00Z',
          updatedAt: '2023-03-22T14:45:00Z'
        };
      } else {
        return {
          id: userId,
          name: 'Mark Robinson',
          avatar: 'https://s3-alpha-sig.figma.com/img/c645/17ac/20f3774b14b072cf7edaae17b5f45a95?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=d9ZkNS8HHaJshlaIfDbW0fJ6Mrh0pQJL~m27leTgN~c~TaRoPgTQ1qAYkRKps9kO3CtoNxZk9zPKeDoDbeU63~OxXQvxs4zApBD9wApbyuguNMAhe1OzbxdIVb2yvzJS6nwvEuzOv6JKVOBlYclEvmFPYvgxbXcLxzxQp6UE8qniHUnxP62XAhtXxN2ecnyYW-cptNzv2hoBTD2s~5GD2tz61DMsmeVMhmrU5XmeJL0IkQbUf9aodN40CTKk1kXQuwe6rj1cB-OtNPZOPYMGm1JlqrJiIxOnlblw4QNTZIQp-FVauL0jR3xPx7hofoLz7s~vNGDaVtzOv~FsMQEy2g__',
          activeSince: '2023',
          email: 'markrobinson@gmail.com',
          phone: '+250 788 897 654',
          linkedin: 'https://linkedin/markrobin',
          twitter: 'x.com/mark_robinson',
          isPremium: true,
          bio: 'Angel investor focused on African startups in the hospitality and tech sectors.',
          createdAt: '2023-01-15T10:30:00Z',
          updatedAt: '2023-03-22T14:45:00Z'
        };
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  
  // Update user profile
  async updateUserProfile(userId: string, data: Partial<UserProfile>, userType: string): Promise<UserProfile> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Return updated profile based on user type
      if (userType === 'entrepreneur') {
        return {
          id: userId,
          name: data.name || 'Canaberra',
          businessName: data.name || 'Canaberra',
          avatar: data.avatar || 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aurelix_design-OLMXtPJpfFSgZMcXRqUEKnZHuIbBOq.png',
          activeSince: '2023',
          email: data.email || 'angecurtis02@gmail.com',
          phone: data.phone || '+250 788 897 654',
          website: (data as Partial<BusinessProfile>).website || 'www.seedinvest.com',
          isPremium: true,
          hasBusinessDocuments: true,
          createdAt: '2023-01-15T10:30:00Z',
          updatedAt: new Date().toISOString()
        };
      } else {
        return {
          id: userId,
          name: data.name || 'Mark Robinson',
          avatar: data.avatar || 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aurelix_design-tLTlWENaJ0Uv6ilTiTOYhBgHLSs1ln.png',
          activeSince: '2023',
          email: data.email || 'markrobinson@gmail.com',
          phone: data.phone || '+250 788 897 654',
          linkedin: (data as Partial<InvestorProfile>).linkedin || 'https://linkedin/markrobin',
          twitter: (data as Partial<InvestorProfile>).twitter || 'x.com/mark_robinson',
          isPremium: true,
          bio: (data as Partial<InvestorProfile>).bio || '',
          createdAt: '2023-01-15T10:30:00Z',
          updatedAt: new Date().toISOString()
        };
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },
  
  // Logout user
  async logout(): Promise<void> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }
};

// Authentication service
const AuthService = {
  // Logout user
  async logout(navigation: any): Promise<void> {
    try {
      await API.logout();
      
      // Navigate to login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Logout Failed', 'An error occurred while logging out. Please try again.');
    }
  }
};

type ProfileScreenNavigationProp = StackNavigationProp<any, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
  route: {
    params?: {
      userId?: string;
      userType?: 'entrepreneur' | 'investor';
    }
  }
}

const ProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  // State management
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<'entrepreneur' | 'investor'>('entrepreneur');
  
  // Get user ID from route params or use current user
  const userId = route.params?.userId || 'currentUser';
  const isCurrentUser = userId === 'currentUser';
  
  // Determine if the profile is for a business or investor
  useEffect(() => {
    const determineUserType = async () => {
      try {
        // First check if userType is passed in route params
        if (route.params?.userType) {
          setUserType(route.params.userType);
        } else {
          // Otherwise check AsyncStorage
          const storedUserType = await AsyncStorage.getItem('@user_type');
          if (storedUserType === 'investor' || storedUserType === 'entrepreneur') {
            setUserType(storedUserType as 'entrepreneur' | 'investor');
          }
        }
      } catch (error) {
        console.error('Error determining user type:', error);
      }
    };

    determineUserType();
  }, [route.params]);
  
  // Fetch user profile when component mounts or when user navigates back to this screen
  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
      
      // Clean up function
      return () => {
        // Any cleanup needed when screen loses focus
      };
    }, [userId, userType])
  );
  
  // Fetch user profile from API
  const fetchUserProfile = async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      const userProfile = await API.getUserProfile(userId, userType);
      setProfile(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to load profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle edit profile
  const handleEditProfile = () => {
    if (isEditing) {
      // Cancel editing
      setIsEditing(false);
    } else {
      // Start editing
      setIsEditing(true);
    }
  };
  
  // Handle save profile changes
  const handleSaveProfile = async () => {
    if (!profile) return;
    
    try {
      setIsSaving(true);
      
      // Update profile with API
      const updatedProfile = await API.updateUserProfile(userId, profile, userType);
      
      setProfile(updatedProfile);
      setIsEditing(false);
      
      // Show success message
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Update Failed', 'An error occurred while updating your profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle profile picture upload
  const handleProfilePictureUpload = async () => {
    Alert.alert('Upload Profile Picture', 'This feature would allow users to upload a new profile picture.');
  };
  
  // Handle logout
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AuthService.logout(navigation);
            } catch (error) {
              console.error('Error logging out:', error);
              Alert.alert('Logout Failed', 'An error occurred while logging out. Please try again.');
            }
          }
        }
      ]
    );
  };
  
  // Handle opening business documents
  const handleOpenBusinessDocuments = () => {
    navigation.navigate('BusinessDocuments');
  };
  
  // Handle opening AI analytics
  const handleOpenAIAnalytics = () => {
    if (profile?.isPremium) {
      navigation.navigate('AIAnalytics');
    } else {
      navigation.navigate('PremiumSubscription');
    }
  };
  
  // Handle opening website
  const handleOpenWebsite = async (website: string) => {
    if (!website) return;
    
    // Add https:// if not present
    let url = website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }
    
    try {
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open URL: ${url}`);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert('Error', 'An error occurred while opening the website.');
    }
  };
  
  // Handle making a phone call
  const handlePhoneCall = async (phone: string) => {
    if (!phone) return;
    
    const phoneUrl = `tel:${phone.replace(/\s+/g, '')}`;
    
    try {
      const supported = await Linking.canOpenURL(phoneUrl);
      
      if (supported) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert('Error', `Cannot make call to: ${phone}`);
      }
    } catch (error) {
      console.error('Error making phone call:', error);
      Alert.alert('Error', 'An error occurred while trying to make a phone call.');
    }
  };
  
  // Handle sending an email
  const handleSendEmail = async (email: string) => {
    if (!email) return;
    
    const emailUrl = `mailto:${email}`;
    
    try {
      const supported = await Linking.canOpenURL(emailUrl);
      
      if (supported) {
        await Linking.openURL(emailUrl);
      } else {
        Alert.alert('Error', `Cannot send email to: ${email}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      Alert.alert('Error', 'An error occurred while trying to send an email.');
    }
  };

  // Handle opening social media
  const handleOpenSocialMedia = async (type: 'linkedin' | 'twitter', url: string) => {
    if (!url) return;
    
    // Add https:// if not present
    let fullUrl = url;
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = `https://${fullUrl}`;
    }
    
    try {
      const supported = await Linking.canOpenURL(fullUrl);
      
      if (supported) {
        await Linking.openURL(fullUrl);
      } else {
        Alert.alert('Error', `Cannot open ${type}: ${url}`);
      }
    } catch (error) {
      console.error(`Error opening ${type}:`, error);
      Alert.alert('Error', `An error occurred while opening ${type}.`);
    }
  };
  
  // Generate utility sections
  const getUtilitySections = (): ProfileSection[] => {
    if (!profile) return [];
    
    const sections: ProfileSection[] = [];
    
    // Add business documents for entrepreneurs only
    if (userType === 'entrepreneur') {
      sections.push({
        id: 'business-documents',
        title: 'Business Documents',
        icon: <FileText size={24} color="#000000" />,
        action: handleOpenBusinessDocuments,
        isActive: (profile as BusinessProfile).hasBusinessDocuments
      });
    }
    
    // Add AI Analytics for both types
    sections.push({
      id: 'ai-analytics',
      title: 'AI Analytics',
      icon: <BarChart2 size={24} color="#000000" />,
      action: handleOpenAIAnalytics,
      isPremium: true
    });
    
    // Add logout for both types
    sections.push({
      id: 'logout',
      title: 'Logout',
      icon: <LogOut size={24} color="#000000" />,
      action: handleLogout
    });
    
    return sections;
  };
  
  // Render loading state
  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00a86b" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  };
  
  // Render error state
  const renderError = () => {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchUserProfile}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  // Render profile content
  const renderProfileContent = () => {
    if (!profile) return null;
    
    const isBusinessProfile = userType === 'entrepreneur';
    const businessProfile = profile as BusinessProfile;
    const investorProfile = profile as InvestorProfile;
    
    return (
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity 
            style={styles.profileImageContainer}
            onPress={isCurrentUser ? handleProfilePictureUpload : undefined}
            disabled={!isCurrentUser}
          >
            <Image 
              source={{ uri: profile.avatar }} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
          
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileActiveSince}>Active since {profile.activeSince}</Text>
          
          {/* Bio/Description - only show if it exists */}
          {isBusinessProfile && businessProfile.description ? (
            <Text style={styles.profileBio}>{businessProfile.description}</Text>
          ) : !isBusinessProfile && investorProfile.bio ? (
            <TouchableOpacity 
              style={styles.addDescriptionButton}
              onPress={() => Alert.alert('Edit Bio', 'This would allow editing the bio.')}
            >
              <Edit size={16} color="#00a86b" />
              <Text style={styles.addDescriptionText}>
                {investorProfile.bio || 'Add description'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.addDescriptionButton}
              onPress={() => Alert.alert('Add Description', 'This would allow adding a description.')}
            >
              <Edit size={16} color="#00a86b" />
              <Text style={styles.addDescriptionText}>Add description</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Personal Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            {isCurrentUser && (
              <View style={styles.editButtonsContainer}>
                {isEditing ? (
                  <TouchableOpacity 
                    onPress={handleSaveProfile}
                    disabled={isSaving}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={handleEditProfile}
                  >
                    <Edit size={20} color="#00a86b" />
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          
          {/* Email */}
          <TouchableOpacity 
            style={styles.infoItem}
            onPress={() => handleSendEmail(profile.email)}
          >
            <View style={styles.infoIconContainer}>
              <Mail size={20} color="#000000" />
            </View>
            <Text style={styles.infoText}>{profile.email}</Text>
          </TouchableOpacity>
          
          {/* Phone */}
          <TouchableOpacity 
            style={styles.infoItem}
            onPress={() => handlePhoneCall(profile.phone)}
          >
            <View style={styles.infoIconContainer}>
              <Phone size={20} color="#000000" />
            </View>
            <Text style={styles.infoText}>{profile.phone}</Text>
          </TouchableOpacity>
          
          {/* Website or Social Media based on profile type */}
          {isBusinessProfile ? (
            <TouchableOpacity 
              style={styles.infoItem}
              onPress={() => handleOpenWebsite(businessProfile.website)}
            >
              <View style={styles.infoIconContainer}>
                <Globe size={20} color="#000000" />
              </View>
              <Text style={styles.infoText}>{businessProfile.website}</Text>
            </TouchableOpacity>
          ) : (
            <>
              {/* LinkedIn */}
              {investorProfile.linkedin && (
                <TouchableOpacity 
                  style={styles.infoItem}
                  onPress={() => handleOpenSocialMedia('linkedin', investorProfile.linkedin || '')}
                >
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.socialIcon}>in</Text>
                  </View>
                  <Text style={styles.infoText}>{investorProfile.linkedin}</Text>
                </TouchableOpacity>
              )}
              
              {/* Twitter */}
              {investorProfile.twitter && (
                <TouchableOpacity 
                  style={styles.infoItem}
                  onPress={() => handleOpenSocialMedia('twitter', investorProfile.twitter || '')}
                >
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.socialIcon}>𝕏</Text>
                  </View>
                  <Text style={styles.infoText}>{investorProfile.twitter}</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        
        {/* Utilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Utilities</Text>
          
          {getUtilitySections().map((section) => (
            <TouchableOpacity 
              key={section.id}
              style={[
                styles.utilityItem,
                section.isActive && styles.activeUtilityItem
              ]}
              onPress={section.action}
            >
              <View style={styles.utilityIconContainer}>
                {section.icon}
              </View>
              <Text style={styles.utilityText}>{section.title}</Text>
              
              {section.isPremium && (
                <View style={styles.premiumBadge}>
                  <Crown size={16} color="#f8c82d" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.subhead}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color="#171725" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Settings size={24} color="#171725" />
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      {isLoading ? (
        renderLoading()
      ) : error ? (
        renderError()
      ) : (
        renderProfileContent()
      )}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 20,
  },
  subhead:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: "Inter-Variable",
    fontSize: 20,
    fontWeight: "700",
    color: "#221F1F",
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#737373',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#e53935',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#00a86b',
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImageContainer: {
    position: 'relative',
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
    resizeMode: 'cover',
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-Variable',
    fontWeight: '700',
    color: '#171725',
    marginBottom: 4,
  },
  profileActiveSince: {
    fontSize: 12,
    fontFamily: 'Inter-Variable',
    fontWeight: '300',
    color: '#221F1F99',
    marginBottom: 8,
  },
  profileBio: {
    fontSize: 14,
    fontFamily: 'Inter-Variable',
    color: '#171725',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginTop: 8,
  },
  addDescriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  addDescriptionText: {
    fontSize: 14,
    color: '#00a86b',
    marginLeft: 4,
  },
  section: {
    paddingHorizontal: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171725',
    marginBottom: 16,
    marginTop: 20,
  },
  editButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#00a86b',
    marginLeft: 4,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#00a86b',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginBottom: 4,
  },
  infoIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Variable',
    fontWeight: '400',
    color: '#171725',
    flex: 1,
  },
  socialIcon: {
    fontWeight: '700',
    fontSize: 16,
  },
  utilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginBottom: 4,
  },
  activeUtilityItem: {
    backgroundColor: '#00a86b',
  },
  utilityIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  utilityText: {
    fontSize: 14,
    fontFamily: 'Inter-Variable',
    fontWeight: '400',
    color: '#171725',
    flex: 1,
  },
  premiumBadge: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 80,
  }
});

export default ProfileScreen;