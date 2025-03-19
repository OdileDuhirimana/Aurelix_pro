"use client"

import React, { useState, useCallback } from "react"
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  SafeAreaView,
  ScrollView
} from "react-native"
import CustomInput from "../components/CustomInput"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as WebBrowser from "expo-web-browser"
import { SocialAuthButtons } from "../components/SocialAuthButtons"
import Header from "../components/header"

// Ensure auth session can complete
WebBrowser.maybeCompleteAuthSession()

// Define user credentials and their corresponding user types
const USER_CREDENTIALS = {
  admin: {
    password: "admin123",
    userType: "investor"
  },
  user: {
    password: "user123",
    userType: "entrepreneur"
  }
}

// Main Login Screen component
const LoginScreen = () => {
  const [formData, setFormData] = useState({ name: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigation = useNavigation()

  const handleSubmit = useCallback(async () => {
    if (!formData.name || !formData.password) {
      setError("Both fields are required.")
      return
    }

    setError(null)
    setLoading(true)

    try {
      // Check if username exists in our predefined credentials
      const userCredential = USER_CREDENTIALS[formData.name.toLowerCase()]
      
      if (userCredential && userCredential.password === formData.password) {
        // Store user type in AsyncStorage for future app sessions
        await AsyncStorage.setItem("@user_type", userCredential.userType)
        
        // Also store auth token
        await AsyncStorage.setItem("@auth_token", "sample_token")
        
        // Navigate to Home screen with the user type
        navigation.navigate('Home', { 
          userType: userCredential.userType 
        })
      } else {
        setError("Invalid credentials.")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [formData, navigation])

  const handleAuthSuccess = async (userData) => {
    try {
      // For social auth, you might want to determine user type differently
      // For now, let's default to entrepreneur for social logins
      const userType = "entrepreneur"
      
      await AsyncStorage.setItem("@user_type", userType)
      await AsyncStorage.setItem("@user", JSON.stringify(userData))
      
      navigation.navigate("Home", { userType })
    } catch (error) {
      setError('Failed to process authentication')
    }
  }

  const handleAuthError = (errorMessage) => {
    setError(errorMessage)
  }

  const updateForm = (field: string) => (value: string) => 
    setFormData(prev => ({ ...prev, [field]: value }))

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Header onBack={() => navigation.goBack()} title="Login" />

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <CustomInput
                type="text"
                placeholder="Enter your username"
                icon="user"
                value={formData.name}
                onChange={updateForm("name")}
              />
            </View>
            <View style={styles.inputContainer}>
              <CustomInput
                type="password"
                placeholder="Enter your password"
                icon="lock"
                value={formData.password}
                onChange={updateForm("password")}
              />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity 
              style={styles.forgotPassword} 
              onPress={() => navigation.navigate("ForgotPassword" as never)}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleSubmit} 
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fce986" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.credentialsHint}>
              <Text style={styles.credentialsHintText}>
                Investor login: admin / admin123
              </Text>
              <Text style={styles.credentialsHintText}>
                Entrepreneur login: user / user123
              </Text>
            </View>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup" as never)}>
                <Text style={styles.signUpLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          <SocialAuthButtons 
              onAuthSuccess={handleAuthSuccess}
              onAuthError={handleAuthError}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F9F9F9" 
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: { 
    flex: 1,
    alignItems: "center" 
  },
  form: { 
    width: "100%", 
    alignItems: "center" 
  },
  inputContainer: { 
    width: "100%", 
    maxWidth: 330, 
    marginBottom: 34 
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 40,
    marginRight: 32,
  },
  forgotPasswordText: {
    fontFamily: "Poppins-Medium",
    color: "#00a86b",
    fontSize: 13,
  },
  loginButton: {
    width: "100%",
    maxWidth: 330,
    height: 65,
    backgroundColor: "#00a86b",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  loginButtonText: {
    fontFamily: "Poppins-Bold",
    color: "#fce986",
    fontSize: 20,
  },
  credentialsHint: {
    marginBottom: 20,
    alignItems: "center",
  },
  credentialsHintText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#666",
  },
  signUpContainer: {
    flexDirection: "row",
    marginBottom: 32,
    gap: 5,
  },
  signUpText: { 
    fontFamily: "Poppins-Regular", 
    fontSize: 14 
  },
  signUpLink: {
    fontFamily: "Poppins-Bold",
    color: "#00a86b",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: 20,
  },
})

export default LoginScreen