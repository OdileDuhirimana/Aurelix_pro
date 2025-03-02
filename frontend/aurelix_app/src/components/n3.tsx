// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   ScrollView,
//   Linking,
// } from 'react-native';
// import BottomNav from './components/BottomNav'; // Assume shared component

// // Constants
// const COLORS = {
//   primary: '#00a86b',
//   secondary: '#666',
//   accent: '#ffd700',
//   background: '#fff',
//   border: '#f1f1f1',
// };

// const SIZES = {
//   spacing: 16,
//   radius: {
//     sm: 8,
//     md: 16,
//     lg: 30,
//   },
//   icon: 24,
//   profileImage: 400,
// };

// const TYPOGRAPHY = {
//   header: 28,
//   title: 18,
//   body: 16,
//   button: 18,
// };

// const SOCIALS = [
//   { id: 'linkedin', icon: require('./assets/linkedin.png'), url: 'https://linkedin.com' },
//   { id: 'twitter', icon: require('./assets/twitter.png'), url: 'https://x.com' },
// ];

// const PROFILE = {
//   name: 'Mark Robinson',
//   industry: 'Agriculture',
//   bio: `Dedicated investor passionate about transforming the agricultural sector...`,
//   image: require('./assets/profile-placeholder.png'),
// };

// // Components
// const SocialButton = ({ icon, onPress }) => (
//   <TouchableOpacity
//     onPress={onPress}
//     style={styles.socialButton}
//     accessibilityRole="button"
//   >
//     <Image source={icon} style={styles.socialIcon} />
//   </TouchableOpacity>
// );

// const ProfileDetailScreen = React.memo(({ navigation }) => {
//   const handleSocialPress = async (url) => {
//     try {
//       await Linking.openURL(url);
//     } catch (error) {
//       console.error('Failed to open URL:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//         accessibilityLabel="Go back"
//       >
//         <Image source={require('./assets/back.png')} style={styles.icon} />
//       </TouchableOpacity>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Profile Image */}
//         <View style={styles.imageContainer}>
//           <Image
//             source={PROFILE.image}
//             style={styles.profileImage}
//             accessibilityIgnoresInvertColors
//           />
//         </View>

//         {/* Profile Info */}
//         <View style={styles.profileInfo}>
//           <View style={styles.nameRow}>
//             <Text style={styles.name}>{PROFILE.name}</Text>
//             <View style={styles.socialRow}>
//               {SOCIALS.map((social) => (
//                 <SocialButton
//                   key={social.id}
//                   icon={social.icon}
//                   onPress={() => handleSocialPress(social.url)}
//                 />
//               ))}
//             </View>
//           </View>

//           <Text style={styles.industry}>{PROFILE.industry}</Text>
//           <Text style={styles.bio}>{PROFILE.bio}</Text>
//         </View>

//         {/* Message Button */}
//         <TouchableOpacity
//           style={styles.messageButton}
//           onPress={() => navigation.navigate('Chat')}
//           accessibilityRole="button"
//         >
//           <Text style={styles.messageButtonText}>Message</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       <BottomNav activeTab="profile" />
//     </SafeAreaView>
//   );
// });

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   backButton: {
//     padding: SIZES.spacing,
//   },
//   icon: {
//     width: SIZES.icon,
//     height: SIZES.icon,
//     tintColor: COLORS.secondary,
//   },
//   scrollContent: {
//     paddingBottom: SIZES.spacing * 2,
//   },
//   imageContainer: {
//     height: SIZES.profileImage,
//     borderRadius: SIZES.radius.md,
//     overflow: 'hidden',
//     marginBottom: SIZES.spacing * 1.5,
//   },
//   profileImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   profileInfo: {
//     paddingHorizontal: SIZES.spacing,
//   },
//   nameRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: SIZES.spacing / 2,
//   },
//   name: {
//     fontSize: TYPOGRAPHY.header,
//     fontWeight: '600',
//     flexShrink: 1,
//     marginRight: SIZES.spacing,
//   },
//   socialRow: {
//     flexDirection: 'row',
//     gap: SIZES.spacing,
//   },
//   socialButton: {
//     padding: SIZES.spacing / 4,
//   },
//   socialIcon: {
//     width: SIZES.icon,
//     height: SIZES.icon,
//   },
//   industry: {
//     fontSize: TYPOGRAPHY.title,
//     color: COLORS.secondary,
//     marginBottom: SIZES.spacing,
//   },
//   bio: {
//     fontSize: TYPOGRAPHY.body,
//     color: COLORS.secondary,
//     lineHeight: TYPOGRAPHY.body * 1.5,
//     marginBottom: SIZES.spacing * 2,
//   },
//   messageButton: {
//     backgroundColor: COLORS.primary,
//     borderRadius: SIZES.radius.lg,
//     paddingVertical: SIZES.spacing,
//     marginHorizontal: SIZES.spacing,
//   },
//   messageButtonText: {
//     color: COLORS.accent,
//     fontSize: TYPOGRAPHY.button,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
// });

// export default ProfileDetailScreen;