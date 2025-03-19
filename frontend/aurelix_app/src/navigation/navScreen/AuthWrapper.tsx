import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthWrapper = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Get user data from AsyncStorage
        const userDataString = await AsyncStorage.getItem("@user_data");
        
        if (!userDataString) {
          // No user data found, redirect to auth flow
          navigation.reset({
            index: 0,
            routes: [{ name: "Auth" }],
          });
          return;
        }

        const userData = JSON.parse(userDataString);
        
        // Check if user role exists
        if (!userData.role) {
          // No role defined, redirect to auth flow
          navigation.reset({
            index: 0,
            routes: [{ name: "Auth" }],
          });
          return;
        }

        // User is authenticated and has a role, navigate to main app
        // The role will be used by the UnifiedHomePage component
        navigation.reset({
          index: 0,
          routes: [
            { 
              name: "Main",
              params: { 
                userRole: userData.role,
                userData: {
                  id: userData.id,
                  name: userData.name
                }
              }
            }
          ],
        });
      } catch (error) {
        console.error("Error checking auth status:", error);
        // On error, redirect to auth flow
        navigation.reset({
          index: 0,
          routes: [{ name: "Auth" }],
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00a86b" />
      </View>
    );
  }

  // This should not be visible as we always navigate away
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
});

export default AuthWrapper;