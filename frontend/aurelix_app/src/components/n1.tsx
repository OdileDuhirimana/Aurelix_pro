// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';

// // Constants
// const COLORS = {
//   primary: '#00a86b',
//   secondary: '#666',
//   background: '#fff',
//   border: '#f1f1f1',
// };

// const SIZES = {
//   avatar: 50,
//   icon: 24,
//   spacing: 16,
//   radius: {
//     sm: 10,
//     md: 25,
//   },
// };

// const MESSAGES = [
//   // This would typically come from an API or state management
//   { id: '1', name: 'Ange Curtis', unread: 2 },
//   { id: '2', name: 'Joselyn Gouse' },
//   { id: '3', name: 'Jaylon Dias' },
//   { id: '4', name: 'Ange Curtis', unread: 1 },
//   { id: '5', name: 'Ange Curtis' },
// ].map(msg => ({
//   ...msg,
//   message: "Thank you, I'm interested in your startup...",
//   time: '02:11',
//   avatar: require('./assets/placeholder.png'),
// }));

// const NAV_ITEMS = [
//   { id: 'home', icon: require('./assets/home.png') },
//   { id: 'chart', icon: require('./assets/chart.png') },
//   { id: 'bot', icon: require('./assets/bot.png'), badge: require('./assets/crown.png') },
//   { id: 'chat', icon: require('./assets/chat.png') },
//   { id: 'profile', icon: require('./assets/profile.png') },
// ];

// // Components
// const UnreadBadge = ({ count }) => (
//   <View style={styles.unreadBadge}>
//     <Text style={styles.unreadText}>{count}</Text>
//   </View>
// );

// const MessageItem = React.memo(({ item, onPress }) => (
//   <TouchableOpacity style={styles.messageItem} onPress={onPress}>
//     <Image source={item.avatar} style={styles.avatar} />
//     <View style={styles.messageContent}>
//       <View style={styles.messageHeader}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.time}>{item.time}</Text>
//       </View>
//       <View style={styles.messagePreview}>
//         <Text style={styles.messageText} numberOfLines={1}>
//           {item.message}
//         </Text>
//         {item.unread && <UnreadBadge count={item.unread} />}
//       </View>
//     </View>
//   </TouchableOpacity>
// ));

// const BottomNav = ({ activeTab }) => (
//   <View style={styles.bottomNav}>
//     {NAV_ITEMS.map(({ id, icon, badge }) => (
//       <TouchableOpacity
//         key={id}
//         style={[styles.navItem, activeTab === id && styles.navItemActive]}
//       >
//         <Image
//           source={icon}
//           style={[styles.navIcon, activeTab === id && styles.navIconActive]}
//         />
//         {badge && (
//           <Image source={badge} style={styles.navBadge} resizeMode="contain" />
//         )}
//       </TouchableOpacity>
//     ))}
//   </View>
// );

// // Main Component
// const RecentsScreen = ({ navigation }) => {
//   const handleMessagePress = (userId) => {
//     navigation.navigate('Chat', { userId });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={navigation.goBack}>
//           <Image source={require('./assets/back.png')} style={styles.icon} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Recents</Text>
//         <TouchableOpacity>
//           <Image source={require('./assets/search.png')} style={styles.icon} />
//         </TouchableOpacity>
//       </View>

//       {/* Messages List */}
//       <FlatList
//         data={MESSAGES}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <MessageItem item={item} onPress={() => handleMessagePress(item.id)} />
//         )}
//         contentContainerStyle={styles.listContent}
//       />

//       {/* Bottom Navigation */}
//       <BottomNav activeTab="chat" />
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: SIZES.spacing,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: COLORS.border,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: COLORS.primary,
//   },
//   icon: {
//     width: SIZES.icon,
//     height: SIZES.icon,
//     tintColor: COLORS.secondary,
//   },
//   listContent: {
//     paddingHorizontal: SIZES.spacing,
//   },
//   messageItem: {
//     flexDirection: 'row',
//     paddingVertical: SIZES.spacing,
//     alignItems: 'center',
//   },
//   avatar: {
//     width: SIZES.avatar,
//     height: SIZES.avatar,
//     borderRadius: SIZES.radius.md,
//     marginRight: SIZES.spacing,
//   },
//   messageContent: {
//     flex: 1,
//   },
//   messageHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 4,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//   },
//   time: {
//     fontSize: 14,
//     color: COLORS.secondary,
//   },
//   messagePreview: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   messageText: {
//     fontSize: 14,
//     color: COLORS.secondary,
//     flex: 1,
//     marginRight: 8,
//   },
//   unreadBadge: {
//     backgroundColor: COLORS.primary,
//     borderRadius: SIZES.radius.sm,
//     minWidth: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 6,
//   },
//   unreadText: {
//     color: COLORS.background,
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: SIZES.spacing,
//     borderTopWidth: StyleSheet.hairlineWidth,
//     borderTopColor: COLORS.border,
//   },
//   navItem: {
//     padding: 8,
//     position: 'relative',
//   },
//   navIcon: {
//     width: SIZES.icon,
//     height: SIZES.icon,
//     tintColor: COLORS.secondary,
//   },
//   navIconActive: {
//     tintColor: COLORS.primary,
//   },
//   navBadge: {
//     position: 'absolute',
//     top: -4,
//     right: -8,
//     width: 16,
//     height: 16,
//   },
// });

// export default RecentsScreen;