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
      const success = await new Promise<boolean>(resolve => 
        setTimeout(() => resolve(formData.name === "admin" && formData.password === "admin123"), 2000)
      )
      
      if (success) {
        await AsyncStorage.setItem("@auth_token", "sample_token")
        navigation.navigate('Home', { screen: 'InvestorHome' });
      } else {
        setError("Invalid credentials.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [formData, navigation])

 
  const handleAuthSuccess = async (userData) => {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(userData))
      navigation.navigate("InvestorHome" as never)
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