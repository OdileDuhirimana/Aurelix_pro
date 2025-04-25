// import { Alert } from "react-native/Libraries/Alert/Alert";
// import { useState } from "react";
// import { Linking } from "react-native";


// const [error, setError] = useState<string | null>(null);
// const [isLoading, setIsLoading] = useState(false);
// const [profile, setProfile] = useState(null);
// const [isEditing, setIsEditing] = useState(false);
// const [isSaving, setIsSaving] = useState(false);

// const userId = "1"; // Replace with actual logic

// import { useNavigation } from "@react-navigation/native";

// const navigation = useNavigation();


// // API service for data fetching and operations
// interface UserProfile {
//   id: string;
//   name: string;
//   avatar: string;
//   activeSince: string;
//   email: string;
//   phone: string;
//   website: string;
//   isPremium: boolean;
//   hasBusinessDocuments: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export const API = {
//   baseUrl: 'https://api.example.com',
  
//   // Fetch user profile
//    async getUserProfile(userId: string): Promise<UserProfile> {
//     try {
//       // This would be replaced with an actual API call
//       // const response = await fetch(`${this.baseUrl}/users/${userId}/profile`, {
//       //   headers: {
//       //     'Authorization': `Bearer ${await this.getAuthToken()}`
//       //   }
//       // });
//       // if (!response.ok) throw new Error('Failed to fetch user profile');
//       // return await response.json();
      
//       // Mock data for demonstration
//       await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay
      
//       return {
//         id: userId,
//         name: 'Ange Curtis',
//         avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-kf2eJ5D0TDvUWbRybtyvmN2KHYB9Mz.png#crop=290,290,150,150',
//         activeSince: '2023',
//         email: 'angecurtis02@gmail.com',
//         phone: '+250 788 897 654',
//         website: 'www.seedinvest.com',
//         isPremium: true,
//         hasBusinessDocuments: true,
//         createdAt: '2023-01-15T10:30:00Z',
//         updatedAt: '2023-03-22T14:45:00Z'
//       };
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       throw error;
//     }
//   },
  
//   // Update user profile
//    async updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
//     try {
//       // This would be replaced with an actual API call
//       // const response = await fetch(`${this.baseUrl}/users/${userId}/profile`, {
//       //   method: 'PATCH',
//       //   headers: {
//       //     'Authorization': `Bearer ${await this.getAuthToken()}`,
//       //     'Content-Type': 'application/json'
//       //   },
//       //   body: JSON.stringify(data)
//       // });
//       // if (!response.ok) throw new Error('Failed to update user profile');
//       // return await response.json();
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 800));
      
//       // Return updated profile (mock)
//       return {
//         id: userId,
//         name: data.name || 'Ange Curtis',
//         avatar: data.avatar || 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-kf2eJ5D0TDvUWbRybtyvmN2KHYB9Mz.png#crop=290,290,150,150',
//         activeSince: '2023',
//         email: data.email || 'angecurtis02@gmail.com',
//         phone: data.phone || '+250 788 897 654',
//         website: data.website || 'www.seedinvest.com',
//         isPremium: true,
//         hasBusinessDocuments: true,
//         createdAt: '2023-01-15T10:30:00Z',
//         updatedAt: new Date().toISOString()
//       };
//     } catch (error) {
//       console.error('Error updating user profile:', error);
//       throw error;
//     }
//   },
  
//   // Upload profile picture
//    async uploadProfilePicture(file: { uri: string; type: string; name: string }): Promise<{ url: string }> {
//     try {
//       // This would be replaced with an actual API call
//       // const formData = new FormData();
//       // formData.append('file', {
//       //   uri: file.uri,
//       //   type: file.type,
//       //   name: file.name
//       // });
//       // 
//       // const response = await fetch(`${this.baseUrl}/uploads/profile-picture`, {
//       //   method: 'POST',
//       //   headers: {
//       //     'Authorization': `Bearer ${await this.getAuthToken()}`,
//       //     'Content-Type': 'multipart/form-data'
//       //   },
//       //   body: formData
//       // });
//       // if (!response.ok) throw new Error('Failed to upload profile picture');
//       // return await response.json();
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       return {
//         url: `https://example.com/uploads/${file.name}`
//       };
//     } catch (error) {
//       console.error('Error uploading profile picture:', error);
//       throw error;
//     }
//   },
  
//   // Logout user
//    async logout(): Promise<void> {
//     try {
//       // This would be replaced with an actual API call
//       // const response = await fetch(`${this.baseUrl}/auth/logout`, {
//       //   method: 'POST',
//       //   headers: {
//       //     'Authorization': `Bearer ${await this.getAuthToken()}`
//       //   }
//       // });
//       // if (!response.ok) throw new Error('Failed to logout');
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       console.log('User logged out successfully');
      
//       // Clear local auth token (would be implemented with secure storage)
//       // await SecureStore.deleteItemAsync('auth_token');
//     } catch (error) {
//       console.error('Error logging out:', error);
//       throw error;
//     }
//   },
  
//   // Get authentication token (would be implemented with secure storage)
//    async getAuthToken(): Promise<string> {
//     // This would retrieve the token from secure storage
//     return 'mock-auth-token';
//   }
// };

// // Authentication service
//  export const AuthService = {
//   // Check if user is authenticated
//  async isAuthenticated(): Promise<boolean> {
//     try {
//       // This would check if the auth token exists and is valid
//       const token = await API.getAuthToken();
//       return !!token;
//     } catch (error) {
//       console.error('Error checking authentication:', error);
//       return false;
//     }
//   },
  
//   // Logout user
//    async logout(navigation: any): Promise<void> {
//     try {
//       await API.logout();
      
//       // Navigate to login screen
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Login' }]
//       });
//     } catch (error) {
//       console.error('Error logging out:', error);
//       Alert.alert('Logout Failed', 'An error occurred while logging out. Please try again.');
//     }
//   }
// };

// // Fetch user profile from API
// export const fetchUserProfile = async () => {
//     try {
//       setError(null);
//       setIsLoading(true);
      
//       const userProfile = await API.getUserProfile(userId);
//       setProfile(userProfile);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       setError('Failed to load profile. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Handle edit profile
//   export const handleEditProfile = () => {
//     if (isEditing) {
//       // Cancel editing
//       setIsEditing(false);
//     } else {
//       // Start editing
//       setIsEditing(true);
//     }
//   };
  
//   // Handle save profile changes
//   export const handleSaveProfile = async () => {
//     if (!profile) return;
    
//     try {
//       setIsSaving(true);
      
//       // Update profile with API
//       const updatedProfile = await API.updateUserProfile(userId, {
//         name: profile.name,
//         email: profile.email,
//         phone: profile.phone,
//         website: profile.website
//       });
      
//       setProfile(updatedProfile);
//       setIsEditing(false);
      
//       // Show success message
//       Alert.alert('Success', 'Profile updated successfully');
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       Alert.alert('Update Failed', 'An error occurred while updating your profile. Please try again.');
//     } finally {
//       setIsSaving(false);
//     }
//   };
  
//   // Handle profile picture upload
//   export const handleProfilePictureUpload = async () => {
//     // This would use image picker to select an image
//     // const result = await ImagePicker.launchImageLibraryAsync({
//     //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     //   allowsEditing: true,
//     //   aspect: [1, 1],
//     //   quality: 0.8
//     // });
//     // 
//     // if (!result.cancelled) {
//     //   try {
//     //     const fileInfo = {
//     //       uri: result.uri,
//     //       type: 'image/jpeg',
//     //       name: `profile-${Date.now()}.jpg`
//     //     };
//     //     
//     //     const uploadResult = await API.uploadProfilePicture(fileInfo);
//     //     
//     //     // Update profile with new avatar URL
//     //     if (profile) {
//     //       const updatedProfile = await API.updateUserProfile(userId, {
//     //         avatar: uploadResult.url
//     //       });
//     //       
//     //       setProfile(updatedProfile);
//     //     }
//     //   } catch (error) {
//     //     console.error('Error uploading profile picture:', error);
//     //     Alert.alert('Upload Failed', 'An error occurred while uploading your profile picture. Please try again.');
//     //   }
//     // }
    
//     Alert.alert('Upload Profile Picture', 'This feature would allow users to upload a new profile picture.');
//   };
  
//   // Handle logout
//   export const handleLogout = async () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel'
//         },
//         {
//           text: 'Logout',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await AuthService.logout(navigation);
//             } catch (error) {
//               console.error('Error logging out:', error);
//               Alert.alert('Logout Failed', 'An error occurred while logging out. Please try again.');
//             }
//           }
//         }
//       ]
//     );
//   };
  
//   // Handle opening business documents
//   export const handleOpenBusinessDocuments = () => {
//     navigation.navigate('BusinessDocuments');
//   };
  
//   // Handle opening AI analytics
//   export const handleOpenAIAnalytics = () => {
//     if (profile?.isPremium) {
//       navigation.navigate('AIAnalytics');
//     } else {
//       navigation.navigate('PremiumSubscription');
//     }
//   };
  
//   // Handle opening website
//   export const handleOpenWebsite = async (website: string) => {
//     if (!website) return;
    
//     // Add https:// if not present
//     let url = website;
//     if (!url.startsWith('http://') && !url.startsWith('https://')) {
//       url = `https://${url}`;
//     }
    
//     try {
//       const supported = await Linking.canOpenURL(url);
      
//       if (supported) {
//         await Linking.openURL(url);
//       } else {
//         Alert.alert('Error', `Cannot open URL: ${url}`);
//       }
//     } catch (error) {
//       console.error('Error opening URL:', error);
//       Alert.alert('Error', 'An error occurred while opening the website.');
//     }
//   };
  
//   // Handle making a phone call
//   export const handlePhoneCall = async (phone: string) => {
//     if (!phone) return;
    
//     const phoneUrl = `tel:${phone.replace(/\s+/g, '')}`;
    
//     try {
//       const supported = await Linking.canOpenURL(phoneUrl);
      
//       if (supported) {
//         await Linking.openURL(phoneUrl);
//       } else {
//         Alert.alert('Error', `Cannot make call to: ${phone}`);
//       }
//     } catch (error) {
//       console.error('Error making phone call:', error);
//       Alert.alert('Error', 'An error occurred while trying to make a phone call.');
//     }
//   };
  
//   // Handle sending an email
//   export const handleSendEmail = async (email: string) => {
//     if (!email) return;
    
//     const emailUrl = `mailto:${email}`;
    
//     try {
//       const supported = await Linking.canOpenURL(emailUrl);
      
//       if (supported) {
//         await Linking.openURL(emailUrl);
//       } else {
//         Alert.alert('Error', `Cannot send email to: ${email}`);
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//       Alert.alert('Error', 'An error occurred while trying to send an email.');
//     }
//   };
  
//   // Generate utility sections
  
  
