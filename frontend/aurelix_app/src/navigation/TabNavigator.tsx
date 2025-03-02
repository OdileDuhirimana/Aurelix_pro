import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Home, LineChart, Bot, User, MessageCircle } from 'lucide-react-native';
import HomeScreen from './navScreen/HomeScreen';
import AICoachScreen from './navScreen/AIScreen';
import AIChatScreen from './navScreen/AIChatScreen';
import InvestorProfileScreen from './navScreen/InvestorProfileScreen';
import RecentMessagesScreen from './navScreen/ChatScreen';
import ConversationScreen from './navScreen/ConversationScreen';
import ProfileScreen from './navScreen/ProfileScreen';
import BusinessDocumentsScreen from './navScreen/BusinessDocumentScreen';
import SettingsScreen from './navScreen/SettingsScreen';
import NotificationsScreen from './navScreen/NotificationScreen';
import DashboardScreen from './navScreen/DashboardScreen';

const Tab = createBottomTabNavigator();
const BotStack = createStackNavigator();

const AnalyticsScreen = () => (
  <View style={styles.screen}>
    <Text>Analytics</Text>
  </View>
);

// Stack navigator for the Bot tab containing both AI and AIChat screens.
const BotStackNavigator = () => (
  <BotStack.Navigator screenOptions={{ headerShown: false }}>
    <BotStack.Screen name="AI" component={AICoachScreen} />
    <BotStack.Screen name="AIChat" component={AIChatScreen} />
  </BotStack.Navigator>
);

const HomeStackNavigator = () => (
  <BotStack.Navigator screenOptions={{ headerShown: false }}>
    <BotStack.Screen name="Home" component={HomeScreen} />
    <BotStack.Screen name="InvestorProfile" component={InvestorProfileScreen} />
    <BotStack.Screen name='Notifications' component={NotificationsScreen} options={{headerShown: false}} key='Notifications'/>
  </BotStack.Navigator>
);

const ChatStackNavigator = () => (
  <BotStack.Navigator screenOptions={{ headerShown: false }}>
    <BotStack.Screen name="Chat" component={RecentMessagesScreen} />
    <BotStack.Screen name="Conversation" component={ConversationScreen} />
  </BotStack.Navigator>
);

const ProfileStackNavigator = () => (
  <BotStack.Navigator screenOptions={{ headerShown: false }}>
    <BotStack.Screen name="Profile" component={ProfileScreen} />
    <BotStack.Screen name="BusinessDocuments" component={BusinessDocumentsScreen} />
    <BotStack.Screen name="Settings" component={SettingsScreen} />
  </BotStack.Navigator>
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
        component={BotStackNavigator} // Contains both AIScreen and AIChatScreen.
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
    backgroundColor: '#ffffff',
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
