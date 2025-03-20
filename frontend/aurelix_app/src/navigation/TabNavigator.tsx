import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Home, LineChart, Bot, User, MessageCircle } from 'lucide-react-native';
import HomeScreen from './navScreen/HomeScreen';
import AICoachScreen from './navScreen/AIScreen';
import AIChatScreen from './navScreen/AIChatScreen';
import InvestorProfileScreen from './navScreen/MainProfile';
import RecentMessagesScreen from './navScreen/ChatScreen';
import ConversationScreen from './navScreen/ConversationScreen';
import ProfileScreen from './navScreen/ProfileScreen';
import BusinessDocumentsScreen from './navScreen/BusinessDocumentScreen';
import SettingsScreen from './navScreen/SettingsScreen';
import NotificationsScreen from './navScreen/NotificationScreen';
import DashboardScreen from './navScreen/AnalyticsScreen';
import BusinessProfileScreen from './navScreen/BusinessProfile';
import MainProfileScreen from './navScreen/MainProfile';
import DocumentsScreen from './navScreen/DocumentsScreen';

const Tab = createBottomTabNavigator();
const TabStack = createStackNavigator();

const TabStackNavigator = () => (
  <TabStack.Navigator screenOptions={{ headerShown: false }}>
    <TabStack.Screen name="AI" component={AICoachScreen} />
    <TabStack.Screen name="AIChat" component={AIChatScreen} />
  </TabStack.Navigator>
);

const HomeStackNavigator = () => (
  <TabStack.Navigator screenOptions={{ headerShown: false }}>
    <TabStack.Screen name="Home" component={HomeScreen} />
    <TabStack.Screen name="MainProfile" component={MainProfileScreen} />
    <TabStack.Screen name="BusinessProfile" component={BusinessProfileScreen} />
    <TabStack.Screen name='Notifications' component={NotificationsScreen} options={{headerShown: false}} key='Notifications'/>
    <TabStack.Screen name="Documents" component={DocumentsScreen} />
  </TabStack.Navigator>
);

const ChatStackNavigator = () => (
  <TabStack.Navigator screenOptions={{ headerShown: false }}>
    <TabStack.Screen name="Chat" component={RecentMessagesScreen} />
    <TabStack.Screen name="Conversation" component={ConversationScreen} />
  </TabStack.Navigator>
);

const ProfileStackNavigator = () => (
  <TabStack.Navigator screenOptions={{ headerShown: false }}>
    <TabStack.Screen name="Profile" component={ProfileScreen} />
    <TabStack.Screen name="BusinessDoc" component={BusinessDocumentsScreen} />
    <TabStack.Screen name="Settings" component={SettingsScreen} />
  </TabStack.Navigator>
);


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: '#00a86b',
        tabBarInactiveTintColor: '#171717',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => <LineChart size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Bot" 
        component={TabStackNavigator} // Contains both AIScreen and AIChatScreen.
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.aiIconContainer}>
              <Bot size={24} color={color} />
              {focused && (
                <View style={styles.crown}>
                  <Text style={styles.crownText}>👑</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <MessageCircle size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "#F9F9F9",
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  aiIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  crown: {
    position: 'absolute',
    top: -10,
    right: -8,
  },
  crownText: {
    fontSize: 12,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
