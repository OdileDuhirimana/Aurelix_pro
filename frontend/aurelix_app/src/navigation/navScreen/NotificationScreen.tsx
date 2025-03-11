import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Animated,
  Platform,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GradientText from '../../components/GradientText';

// Mock data for notifications - would be replaced with API data
const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    type: 'interest',
    user: {
      id: 'u1',
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      location: 'USA',
    },
    message: 'John Doe from USA is interested in your profile, you can talk!!',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 1)),
    read: true,
    section: 'recent',
  },
  {
    id: '2',
    type: 'message',
    user: {
      id: 'u2',
      name: 'Mark Robinson',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    message: 'Mark Robinson messaged you',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
    read: false,
    section: 'recent',
    time: '9:00',
  },
  {
    id: '3',
    type: 'message',
    user: {
      id: 'u3',
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      title: 'CEO of Braliirwa',
      location: 'Rwanda',
    },
    message: 'John Doe, CEO of Braliirwa from Rwanda has messaged you.',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 5)),
    read: true,
    section: 'earlier',
    time: '7:00',
  },
  {
    id: '4',
    type: 'system',
    system: {
      name: 'Aurelix',
      logo: 'aurelix',
    },
    title: 'You have not uploaded all documents',
    message: 'You are missing financial statement and the 3D Model of your product',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    read: true,
    section: 'yesterday',
    time: '14:30',
  },
  {
    id: '5',
    type: 'system',
    system: {
      name: 'Aurelix',
      logo: 'aurelix',
    },
    title: 'Welcome',
    message: "Thank you for registering with Aurelix. Let's get started to making your business a success.",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    read: true,
    section: 'yesterday',
    time: '9:00',
  },
];

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;
  
  // Filter notifications based on unread status if needed
  const displayedNotifications = showUnreadOnly 
    ? notifications.filter(n => !n.read) 
    : notifications;

  // Group notifications by section
  const groupedNotifications = displayedNotifications.reduce((groups, notification) => {
    const section = notification.section;
    if (!groups[section]) {
      groups[section] = [];
    }
    groups[section].push(notification);
    return groups;
  }, {});

  // Create sections array for the SectionList
  const sections = [
    { title: '', data: groupedNotifications.recent || [] },
    { title: 'Earlier Today', data: groupedNotifications.earlier || [] },
    { title: 'Yesterday', data: groupedNotifications.yesterday || [] },
  ].filter(section => section.data.length > 0);

  // Toggle menu visibility with animation
  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(menuAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  // Handle marking all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toggleMenu();
  };

  // Handle showing only unread notifications
  const toggleUnreadOnly = () => {
    setShowUnreadOnly(!showUnreadOnly);
    toggleMenu();
  };

  // Handle deleting all notifications
  const deleteAll = () => {
    setNotifications([]);
    toggleMenu();
  };

  // Handle marking a single notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  // Handle notification press
  const handleNotificationPress = (notification) => {
    // Mark as read when pressed
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'message':
        // Navigate to chat with this user
        console.log(`Navigate to chat with ${notification.user.name}`);
        // navigation.navigate('Chat', { userId: notification.user.id });
        break;
      case 'interest':
        // Navigate to profile
        console.log(`Navigate to profile of ${notification.user.name}`);
        // navigation.navigate('Profile', { userId: notification.user.id });
        break;
      case 'system':
        if (notification.title.includes('documents')) {
          // Navigate to document upload
          console.log('Navigate to document upload');
          // navigation.navigate('Documents');
        }
        break;
      default:
        break;
    }
  };

  // Render notification item based on type
  const renderNotificationItem = ({ item }) => {
    // Common timestamp display
    const timeDisplay = item.time || formatTime(item.timestamp);
    
    // User notification (message or interest)
    if (item.type === 'message' || item.type === 'interest') {
      return (
        <TouchableOpacity 
          style={styles.notificationCard}
          onPress={() => handleNotificationPress(item)}
          activeOpacity={0.7}
        >
          <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
          
          <View style={styles.notificationContent}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>{item.user.name}</Text>
            </View>
            <Text style={styles.notificationMessage} numberOfLines={2}>
              {item.message}
            </Text>
          </View>
          <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{timeDisplay}</Text>
                {!item.read && <View style={styles.unreadDot} />}
          </View>
        </TouchableOpacity>
      );
    }
    
    // System notification
    if (item.type === 'system') {
      return (
        <TouchableOpacity 
          style={styles.notificationCard}
          onPress={() => handleNotificationPress(item)}
          activeOpacity={0.7}
        >
          <View style={styles.systemLogoContainer}>
          <GradientText 
        text="Aurelix" 
        colors={[
          "rgba(252, 229, 105, 0.691272)", 
          "rgba(253, 226, 77, 0.631532)", 
          "rgba(254, 222, 50, 0.573927)", 
          "rgba(251, 236, 151, 0.789524)", 
          "#00A86B", 
          "rgba(255, 215, 0, 0.466667)"
        ]}
        locations={[0.2375, 0.2375, 0.2375, 0.3484, 0.5092, 0.6888]}
        start={{ x: 1.0, y: 0.0 }} 
        end={{ x: 0.0, y: 1.0 }}  
        style={styles.systemLogoBlack}
      />
            {/* <Text style={styles.systemLogoBlack}>Au</Text>
            <Text style={styles.systemLogoGold}>re</Text>
            <Text style={styles.systemLogoBlack}>lix</Text> */}
          </View>
          
          <View style={styles.notificationContent}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.timeText}>{timeDisplay}</Text>
            </View>
            <Text style={styles.notificationMessage} numberOfLines={2}>
              {item.message}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    
    return null;
  };

  // Format timestamp to display time
  const formatTime = (timestamp) => {
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={toggleMenu}
        >
          <Ionicons name="ellipsis-vertical" size={15} color="#333" />
        </TouchableOpacity>
      </View>
      
      {/* Dropdown Menu */}
      {menuVisible && (
        <Animated.View 
          style={[
            styles.menuContainer,
            {
              opacity: menuAnimation,
              transform: [
                { 
                  translateY: menuAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }) 
                }
              ]
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={markAllAsRead}
          >
            <Text style={styles.menuItemTextGreen}>Mark all as read</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={toggleUnreadOnly}
          >
            <Text style={styles.menuItemText}>
              {showUnreadOnly ? 'Show all' : 'Show unread'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={deleteAll}
          >
            <Text style={styles.menuItemText}>Delete all</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      
      {/* Notifications List */}
      {notifications.length > 0 ? (
        <FlatList
          data={sections}
          keyExtractor={(item, index) => `section-${index}`}
          renderItem={({ item: section }) => (
            <View>
              {section.title ? (
                <Text style={styles.sectionHeader}>{section.title}</Text>
              ) : null}
              <FlatList
                data={section.data}
                keyExtractor={(item) => item.id}
                renderItem={renderNotificationItem}
                scrollEnabled={false}
              />
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={60} color="#CCCCCC" />
          <Text style={styles.emptyText}>No notifications yet</Text>
        </View>
      )}
      
      {/* Overlay to close menu when clicking outside */}
      {menuVisible && (
        <Pressable  
          onPress={toggleMenu}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 8,

  },
  headerTitleContainer:{
    flexDirection: "row",
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Inter-Variable",
    fontSize: 18,
    fontWeight: "700",
    color: "#221F1F",
  },
  menuButton: {
    padding: 5,
  },
  menuContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 50 + (StatusBar.currentHeight || 0),
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  menuItem: {
    // paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  menuItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#333',
  },
  menuItemTextGreen: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#00a86b',
  },
  listContent: {
    paddingBottom: 80,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginTop: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 5,
  },
  systemLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  systemLogoBlack: {
    fontSize: 10,
    fontFamily: "Poppins-Bold",
  },
  systemLogoGold: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  notificationContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    
  },
  notificationTitle: {
    fontSize: 11,
    fontFamily: "Poppins-SemiBold",
  },
  timeContainer: {
    alignItems: 'center',
    gap: 10,
  },
  timeText: {
    fontSize: 10,
    fontFamily: "Poppin-Medium",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00B074',
    marginLeft: 5,
  },
  notificationMessage: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 10,
  },
});

export default NotificationsScreen;