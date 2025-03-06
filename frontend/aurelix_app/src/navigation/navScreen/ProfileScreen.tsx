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
  ArrowLeft, 
  Settings, 
  Mail, 
  Phone, 
  Globe, 
  FileText, 
  BarChart2, 
  LogOut,
  Home,
  Crown,
  Bot,
  MessageSquare,
  User
} from 'lucide-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';

// Define TypeScript interfaces for data structures
interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  activeSince: string;
  email: string;
  phone: string;
  website: string;
  isPremium: boolean;
  hasBusinessDocuments: boolean;
  createdAt: string;
  updatedAt: string;
}

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
  async getUserProfile(userId: string): Promise<UserProfile> {
    try {
      // This would be replaced with an actual API call
      // const response = await fetch(`${this.baseUrl}/users/${userId}/profile`, {
      //   headers: {
      //     'Authorization': `Bearer ${await this.getAuthToken()}`
      //   }
      // });
      // if (!response.ok) throw new Error('Failed to fetch user profile');
      // return await response.json();
      
      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay
      
      return {
        id: userId,
        name: 'Ange Curtis',
        avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-kf2eJ5D0TDvUWbRybtyvmN2KHYB9Mz.png#crop=290,290,150,150',
        activeSince: '2023',
        email: 'angecurtis02@gmail.com',
        phone: '+250 788 897 654',
        website: 'www.seedinvest.com',
        isPremium: true,
        hasBusinessDocuments: true,
        createdAt: '2023-01-15T10:30:00Z',
        updatedAt: '2023-03-22T14:45:00Z'
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  
  // Update user profile
  async updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    try {
      // This would be replaced with an actual API call
      // const response = await fetch(`${this.baseUrl}/users/${userId}/profile`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Authorization': `Bearer ${await this.getAuthToken()}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // });
      // if (!response.ok) throw new Error('Failed to update user profile');
      // return await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Return updated profile (mock)
      return {
        id: userId,
        name: data.name || 'Ange Curtis',
        avatar: data.avatar || 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-kf2eJ5D0TDvUWbRybtyvmN2KHYB9Mz.png#crop=290,290,150,150',
        activeSince: '2023',
        email: data.email || 'angecurtis02@gmail.com',
        phone: data.phone || '+250 788 897 654',
        website: data.website || 'www.seedinvest.com',
        isPremium: true,
        hasBusinessDocuments: true,
        createdAt: '2023-01-15T10:30:00Z',
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },
  
  // Upload profile picture
  async uploadProfilePicture(file: { uri: string; type: string; name: string }): Promise<{ url: string }> {
    try {
      // This would be replaced with an actual API call
      // const formData = new FormData();
      // formData.append('file', {
      //   uri: file.uri,
      //   type: file.type,
      //   name: file.name
      // });
      // 
      // const response = await fetch(`${this.baseUrl}/uploads/profile-picture`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${await this.getAuthToken()}`,
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   body: formData
      // });
      // if (!response.ok) throw new Error('Failed to upload profile picture');
      // return await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        url: `https://example.com/uploads/${file.name}`
      };
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  },
  
  // Logout user
  async logout(): Promise<void> {
    try {
      // This would be replaced with an actual API call
      // const response = await fetch(`${this.baseUrl}/auth/logout`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${await this.getAuthToken()}`
      //   }
      // });
      // if (!response.ok) throw new Error('Failed to logout');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('User logged out successfully');
      
      // Clear local auth token (would be implemented with secure storage)
      // await SecureStore.deleteItemAsync('auth_token');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },
  
  // Get authentication token (would be implemented with secure storage)
  async getAuthToken(): Promise<string> {
    // This would retrieve the token from secure storage
    return 'mock-auth-token';
  }
};

// Authentication service
const AuthService = {
  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      // This would check if the auth token exists and is valid
      const token = await API.getAuthToken();
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },
  
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
  
  // Get user ID from route params or use current user
  const userId = route.params?.userId || 'currentUser';
  const isCurrentUser = userId === 'currentUser';
  
  // Fetch user profile when component mounts or when user navigates back to this screen
  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
      
      // Clean up function
      return () => {
        // Any cleanup needed when screen loses focus
      };
    }, [userId])
  );
  
  // Fetch user profile from API
  const fetchUserProfile = async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      const userProfile = await API.getUserProfile(userId);
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
      const updatedProfile = await API.updateUserProfile(userId, {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        website: profile.website
      });
      
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
    // This would use image picker to select an image
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 0.8
    // });
    // 
    // if (!result.cancelled) {
    //   try {
    //     const fileInfo = {
    //       uri: result.uri,
    //       type: 'image/jpeg',
    //       name: `profile-${Date.now()}.jpg`
    //     };
    //     
    //     const uploadResult = await API.uploadProfilePicture(fileInfo);
    //     
    //     // Update profile with new avatar URL
    //     if (profile) {
    //       const updatedProfile = await API.updateUserProfile(userId, {
    //         avatar: uploadResult.url
    //       });
    //       
    //       setProfile(updatedProfile);
    //     }
    //   } catch (error) {
    //     console.error('Error uploading profile picture:', error);
    //     Alert.alert('Upload Failed', 'An error occurred while uploading your profile picture. Please try again.');
    //   }
    // }
    
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
  
  // Generate utility sections
  const getUtilitySections = (): ProfileSection[] => {
    if (!profile) return [];
    
    return [
      {
        id: 'business-documents',
        title: 'Business Documents',
        icon: <FileText size={24} color="#000000" />,
        action: handleOpenBusinessDocuments,
        isActive: profile.hasBusinessDocuments
      },
      {
        id: 'ai-analytics',
        title: 'AI Analytics',
        icon: <BarChart2 size={24} color="#000000" />,
        action: handleOpenAIAnalytics,
        isPremium: true
      },
      {
        id: 'logout',
        title: 'Logout',
        icon: <LogOut size={24} color="#000000" />,
        action: handleLogout
      }
    ];
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
            {/* {isCurrentUser && (
              <View style={styles.editProfileImageOverlay}>
                <Text style={styles.editProfileImageText}>Edit</Text>
              </View>
            )} */}
          </TouchableOpacity>
          
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileActiveSince}>Active since {profile.activeSince}</Text>
        </View>
        
        {/* Personal Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            {isCurrentUser && (
              <View style={styles.editButtonsContainer}>
                {isEditing ? (
                  <>
                    <TouchableOpacity 
                      onPress={handleSaveProfile}
                      disabled={isSaving}
                    >
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={handleEditProfile}
                  >
                    <FileText size={20} color="#000000" />
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.infoItem}
            onPress={() => handleSendEmail(profile.email)}
          >
            <View style={styles.infoIconContainer}>
              <Mail size={20} color="#000000" />
            </View>
            <Text style={styles.infoText}>{profile.email}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.infoItem}
            onPress={() => handlePhoneCall(profile.phone)}
          >
            <View style={styles.infoIconContainer}>
              <Phone size={20} color="#000000" />
            </View>
            <Text style={styles.infoText}>{profile.phone}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.infoItem}
            onPress={() => handleOpenWebsite(profile.website)}
          >
            <View style={styles.infoIconContainer}>
              <Globe size={20} color="#000000" />
            </View>
            <Text style={styles.infoText}>{profile.website}</Text>
          </TouchableOpacity>
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
        
        {/* Add more sections as needed */}
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
    borderRadius: "50%",
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#00A86B',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  editProfileImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 4,
    alignItems: 'center',
  },
  editProfileImageText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-Variable',
    fontWeight: '700',
    color: '#171725',
    marginBottom: 4,
  },
  profileActiveSince: {
    fontSize: 10,
    fontFamily: 'Inter-Variable',
    fontWeight: 300,
    color: '#221F1F99',
  },
  section: {
    paddingHorizontal: 30,
    // paddingVertical: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f0f0f0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
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
    color: '#171725',
    marginLeft: 4,
  },
  saveButtonText: {
    fontSize: 1,
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
    fontSize: 12,
    fontFamily: 'Inter-Variable',
    fontWeight: 400,
    color: '#171725',
    flex: 1,
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
    fontSize: 12,
    fontFamily: 'Inter-Variable',
    fontWeight: 400,
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