import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define settings types
interface SettingOption {
  id: string;
  title: string;
  type: 'toggle' | 'navigation' | 'action';
  icon: string;
  value?: boolean | string;
  navigateTo?: string;
}

const SettingsScreen = ({ navigation }) => {
  // State for user settings - in a real app, this would be fetched from an API or local storage
  const [settings, setSettings] = useState<SettingOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching settings from an API or local storage
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // In a real app, this would be an API call or AsyncStorage retrieval
        // const storedSettings = await AsyncStorage.getItem('userSettings');
        // const settingsData = storedSettings ? JSON.parse(storedSettings) : defaultSettings;
        
        // Simulating API response delay
        setTimeout(() => {
          setSettings([
            {
              id: 'darkMode',
              title: 'Dark Mode',
              type: 'toggle',
              icon: 'moon-outline',
              value: false,
            },
            {
              id: 'notifications',
              title: 'Notifications',
              type: 'toggle',
              icon: 'notifications-outline',
              value: true,
            },
            {
              id: 'language',
              title: 'Language',
              type: 'navigation',
              icon: 'language-outline',
              value: 'English',
              navigateTo: 'LanguageSettings',
            },
            {
              id: 'password',
              title: 'Password',
              type: 'navigation',
              icon: 'key-outline',
              navigateTo: 'PasswordSettings',
            },
            {
              id: 'security',
              title: 'Security and Two-factor authentication',
              type: 'navigation',
              icon: 'finger-print-outline',
              navigateTo: 'SecuritySettings',
            },
            {
              id: 'terms',
              title: 'Terms and Privacy Policy',
              type: 'navigation',
              icon: 'shield-outline',
              navigateTo: 'TermsAndPrivacy',
            },
            {
              id: 'about',
              title: 'About',
              type: 'navigation',
              icon: 'information-circle-outline',
              navigateTo: 'AboutApp',
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load settings');
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Function to handle toggle changes
  const handleToggle = async (id: string, newValue: boolean) => {
    try {
      // Update local state immediately for responsive UI
      setSettings(prevSettings =>
        prevSettings.map(setting =>
          setting.id === id ? { ...setting, value: newValue } : setting
        )
      );

      // In a real app, you would sync with backend or local storage
      // await api.updateUserSetting(id, newValue);
      // or
      // const updatedSettings = settings.map(setting => 
      //   setting.id === id ? { ...setting, value: newValue } : setting
      // );
      // await AsyncStorage.setItem('userSettings', JSON.stringify(updatedSettings));
      
      console.log(`Setting ${id} changed to ${newValue}`);
    } catch (err) {
      // Revert on error
      setSettings(prevSettings =>
        prevSettings.map(setting =>
          setting.id === id ? { ...setting, value: !newValue } : setting
        )
      );
      console.error('Failed to update setting', err);
      // You could show an error toast here
    }
  };

  // Function to handle navigation options
  const handleNavigation = (navigateTo: string) => {
    navigation.navigate(navigateTo);
  };

  // Render icon based on name
  const renderIcon = (iconName: string) => {
    return <Ionicons name={iconName} size={24} color="#000000" />;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00a86b" />
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={50} color="#ff3b30" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            setError(null);
            // Retry fetching settings
          }}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>
      
      {/* Settings List */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.settingsContainer}>
          {settings.map((setting) => (
            <View key={setting.id}>
              <TouchableOpacity
                style={styles.settingItem}
                disabled={setting.type === 'toggle'}
                onPress={() => setting.navigateTo && handleNavigation(setting.navigateTo)}
              >
                <View style={styles.settingIconContainer}>
                  {renderIcon(setting.icon)}
                </View>
                
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                </View>
                
                <View style={styles.settingAction}>
                  {setting.type === 'toggle' && (
                    <Switch
                      trackColor={{ false: '#e4e4e5', true: '#00a86b' }}
                      thumbColor={'#ffffff'}
                      ios_backgroundColor="#e4e4e5"
                      onValueChange={(newValue) => handleToggle(setting.id, newValue)}
                      value={setting.value as boolean}
                    />
                  )}
                  
                  {setting.type === 'navigation' && setting.value && (
                    <View style={styles.navigationValueContainer}>
                      <Text style={styles.navigationValue}>{setting.value}</Text>
                      <Ionicons name="chevron-forward" size={20} color="#c2c2c2" />
                    </View>
                  )}
                  
                  {setting.type === 'navigation' && !setting.value && (
                    <Ionicons name="chevron-forward" size={20} color="#c2c2c2" />
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* Note: Bottom navigation is assumed to be provided elsewhere */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#221f1f',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#221f1f',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00a86b',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  settingsContainer: {
    paddingTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  settingIconContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#000000',
  },
  settingAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationValue: {
    marginRight: 8,
    fontSize: 16,
    color: '#221f1f',
    opacity: 0.6,
  },
  divider: {
    height: 1,
    backgroundColor: '#f9f9f9',
    marginLeft: 65,
  },
});

export default SettingsScreen;