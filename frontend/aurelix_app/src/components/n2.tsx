// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   FlatList,
// } from 'react-native';

// // Constants
// const COLORS = {
//   primary: '#00a86b',
//   secondary: '#666',
//   background: '#fff',
//   border: '#f1f1f1',
//   positive: '#00a86b',
//   negative: '#ff4444',
// };

// const SIZES = {
//   spacing: 16,
//   radius: {
//     sm: 12,
//     md: 20,
//     lg: 25,
//   },
//   icon: 24,
//   image: {
//     card: 150,
//     avatar: 200,
//   },
// };

// const ASSETS = {
//   icons: {
//     bell: require('./assets/bell.png'),
//     search: require('./assets/search.png'),
//     filter: require('./assets/filter.png'),
//     chat: require('./assets/chat.png'),
//     crown: require('./assets/crown.png'),
//   },
//   navIcons: {
//     home: require('./assets/home.png'),
//     chart: require('./assets/chart.png'),
//     bot: require('./assets/bot.png'),
//     chat: require('./assets/chat.png'),
//     profile: require('./assets/profile.png'),
//   },
// };

// const DATA = {
//   investors: [
//     { id: '1', name: 'Mark Robinson', industry: 'Agriculture', location: 'Rwanda' },
//     { id: '2', name: 'Sarah Pearls', industry: 'Agriculture', location: 'USA' },
//     { id: '3', name: 'Sarah Pearls', industry: 'Agriculture', location: 'USA' },
//     { id: '4', name: 'Mark Robinson', industry: 'Agriculture', location: 'Rwanda' },
//   ],
//   regions: ['Rwanda', 'Africa', 'Europe', 'America', 'Asia'],
//   stats: [
//     { id: '1', number: '14,254', label: 'Visitors this year', percentage: '1.5% ↓', positive: false },
//     { id: '2', number: '100+', label: 'New investors this year', percentage: '1.3% ↑', positive: true },
//   ],
//   navItems: [
//     { id: 'home', icon: ASSETS.navIcons.home },
//     { id: 'chart', icon: ASSETS.navIcons.chart },
//     { id: 'bot', icon: ASSETS.navIcons.bot, badge: ASSETS.icons.crown },
//     { id: 'chat', icon: ASSETS.navIcons.chat },
//     { id: 'profile', icon: ASSETS.navIcons.profile },
//   ],
// };

// // Reusable Components
// const StatCard = ({ number, label, percentage, isPositive }) => (
//   <View style={styles.statCard}>
//     <Text style={styles.statNumber}>{number}</Text>
//     <Text style={[styles.statPercentage, { color: isPositive ? COLORS.positive : COLORS.negative }]}>
//       {percentage}
//     </Text>
//     <Text style={styles.statLabel}>{label}</Text>
//   </View>
// );

// const InvestorCard = ({ investor }) => (
//   <View style={styles.investorCard}>
//     <Image 
//       source={{ uri: `https://picsum.photos/200?random=${investor.id}` }}
//       style={styles.investorImage} 
//     />
//     <Text style={styles.investorName}>{investor.name}</Text>
//     <Text style={styles.investorIndustry}>{investor.industry}</Text>
//     <View style={styles.locationContainer}>
//       <Text style={styles.investorLocation}>{investor.location}</Text>
//       <TouchableOpacity>
//         <Image 
//           source={ASSETS.icons.chat} 
//           style={[styles.chatIcon, { tintColor: COLORS.primary }]} 
//         />
//       </TouchableOpacity>
//     </View>
//   </View>
// );

// const RegionFilter = ({ regions, activeRegion, onSelect }) => (
//   <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.regionsScroll}>
//     {regions.map((region) => (
//       <TouchableOpacity
//         key={region}
//         style={[
//           styles.regionChip,
//           activeRegion === region && styles.activeRegionChip
//         ]}
//         onPress={() => onSelect(region)}
//       >
//         <Text style={[
//           styles.regionText,
//           activeRegion === region && styles.activeRegionText
//         ]}>
//           {region}
//         </Text>
//       </TouchableOpacity>
//     ))}
//   </ScrollView>
// );

// const BottomNav = ({ activeTab }) => (
//   <View style={styles.bottomNav}>
//     {DATA.navItems.map(({ id, icon, badge }) => (
//       <TouchableOpacity
//         key={id}
//         style={[styles.navItem, activeTab === id && styles.navItemActive]}
//       >
//         <Image
//           source={icon}
//           style={[styles.navIcon, activeTab === id && styles.navIconActive]}
//         />
//         {badge && <Image source={badge} style={styles.navCrown} />}
//       </TouchableOpacity>
//     ))}
//   </View>
// );

// // Main Component
// const HomeScreen = ({ navigation }) => {
//   const [activeRegion, setActiveRegion] = React.useState('Africa');

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.welcomeText}>Hello, Welcome👋</Text>
//           <Text style={styles.userName}>Ange Curtis</Text>
//         </View>
//         <TouchableOpacity>
//           <Image source={ASSETS.icons.bell} style={styles.bellIcon} />
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <Image source={ASSETS.icons.search} style={styles.searchIcon} />
//           <TextInput 
//             placeholder="Search investors..." 
//             style={styles.searchInput}
//             placeholderTextColor={COLORS.secondary}
//           />
//         </View>
//         <TouchableOpacity style={styles.filterButton}>
//           <Image source={ASSETS.icons.filter} style={styles.filterIcon} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.content}>
//         {/* Stats */}
//         <FlatList
//           data={DATA.stats}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.statsContainer}
//           renderItem={({ item }) => (
//             <StatCard
//               number={item.number}
//               label={item.label}
//               percentage={item.percentage}
//               isPositive={item.positive}
//             />
//           )}
//           keyExtractor={item => item.id}
//         />

//         {/* Region Filters */}
//         <RegionFilter
//           regions={DATA.regions}
//           activeRegion={activeRegion}
//           onSelect={setActiveRegion}
//         />

//         {/* Top Matches */}
//         <Text style={styles.sectionTitle}>Top matches</Text>
//         <FlatList
//           data={DATA.investors}
//           numColumns={2}
//           columnWrapperStyle={styles.investorsGrid}
//           renderItem={({ item }) => <InvestorCard investor={item} />}
//           keyExtractor={item => item.id}
//           scrollEnabled={false}
//         />
//       </ScrollView>

//       {/* Bottom Navigation */}
//       <BottomNav activeTab="home" />
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
//   },
//   welcomeText: {
//     fontSize: 16,
//     color: COLORS.secondary,
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: COLORS.primary,
//   },
//   bellIcon: {
//     width: SIZES.icon,
//     height: SIZES.icon,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: SIZES.spacing,
//     gap: SIZES.spacing,
//     marginBottom: SIZES.spacing,
//   },
//   searchBar: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     borderRadius: SIZES.radius.sm,
//     paddingHorizontal: SIZES.spacing,
//   },
//   searchIcon: {
//     width: SIZES.icon,
//     height: SIZES.icon,
//     tintColor: COLORS.secondary,
//   },
//   searchInput: {
//     flex: 1,
//     paddingVertical: 12,
//     marginLeft: 8,
//     color: COLORS.secondary,
//   },
//   filterButton: {
//     backgroundColor: '#f5f5f5',
//     padding: SIZES.spacing,
//     borderRadius: SIZES.radius.sm,
//   },
//   filterIcon: {
//     width: SIZES.icon,
//     height: SIZES.icon,
//   },
//   statsContainer: {
//     paddingHorizontal: SIZES.spacing,
//     gap: SIZES.spacing,
//     marginBottom: SIZES.spacing * 1.5,
//   },
//   statCard: {
//     width: 160,
//     backgroundColor: '#f5f5f5',
//     borderRadius: SIZES.radius.sm,
//     padding: SIZES.spacing,
//   },
//   statNumber: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: COLORS.secondary,
//   },
//   statPercentage: {
//     fontSize: 14,
//     marginVertical: 4,
//   },
//   statLabel: {
//     fontSize: 14,
//     color: COLORS.secondary,
//   },
//   regionsScroll: {
//     paddingHorizontal: SIZES.spacing,
//     marginBottom: SIZES.spacing * 1.5,
//   },
//   regionChip: {
//     paddingHorizontal: SIZES.spacing,
//     paddingVertical: 8,
//     borderRadius: SIZES.radius.md,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     marginRight: 8,
//   },
//   activeRegionChip: {
//     backgroundColor: COLORS.primary,
//     borderColor: COLORS.primary,
//   },
//   regionText: {
//     color: COLORS.secondary,
//   },
//   activeRegionText: {
//     color: COLORS.background,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginHorizontal: SIZES.spacing,
//     marginBottom: SIZES.spacing,
//     color: COLORS.secondary,
//   },
//   investorsGrid: {
//     justifyContent: 'space-between',
//     paddingHorizontal: SIZES.spacing,
//     gap: SIZES.spacing,
//   },
//   investorCard: {
//     width: '48%',
//     backgroundColor: COLORS.background,
//     borderRadius: SIZES.radius.sm,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },
//   investorImage: {
//     width: '100%',
//     height: SIZES.image.card,
//     backgroundColor: '#f5f5f5',
//   },
//   investorName: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop: SIZES.spacing,
//     marginHorizontal: SIZES.spacing,
//     color: COLORS.secondary,
//   },
//   investorIndustry: {
//     fontSize: 14,
//     color: COLORS.secondary,
//     marginHorizontal: SIZES.spacing,
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginHorizontal: SIZES.spacing,
//     marginVertical: SIZES.spacing,
//   },
//   investorLocation: {
//     fontSize: 14,
//     color: COLORS.secondary,
//   },
//   chatIcon: {
//     width: SIZES.icon,
//     height: SIZES.icon,
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingVertical: SIZES.spacing,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.border,
//   },
//   navItem: {
//     alignItems: 'center',
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
//   navCrown: {
//     position: 'absolute',
//     top: -8,
//     right: -8,
//     width: 16,
//     height: 16,
//   },
// });

// export default HomeScreen;