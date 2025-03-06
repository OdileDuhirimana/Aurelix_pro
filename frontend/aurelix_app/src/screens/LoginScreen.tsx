"use client"

import React, { useState, useCallback, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native"
import { Feather } from "@expo/vector-icons"
import CustomInput from "../components/CustomInput"
import { useNavigation } from "@react-navigation/native"
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import AsyncStorage from "@react-native-async-storage/async-storage"

WebBrowser.maybeCompleteAuthSession()

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigation = useNavigation()

  const [userInfo, setUserInfo] = React.useState(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "323596051383-oharki8qb0a9bupb565hdg6qq42hg6ug.apps.googleusercontent.com",
    iosClientId: "323596051383-9hho4affs38pd97jv7ljipslok0ces3r.apps.googleusercontent.com",
    webClientId: "323596051383-4npuru6680eodcn8nt844vgjoma378p8.apps.googleusercontent.com",
    redirectUri: "exp://10.12.74.144:8081/--/", 
  })

  React.useEffect(() => {
    handleSignInWithGoogle()
  }, [response])

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user")

    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken)
      }
    } else {
      setUserInfo(JSON.parse(user))
    }
  }

  const getUserInfo = async (token: string) => {
    if (!token) return
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const user = await response.json()
      await AsyncStorage.setItem("@user", JSON.stringify(user))
      setUserInfo(user)
    } catch (error) {
      Alert.alert("Error", "Failed to fetch user info. Please try again.")
    }
  }

  const handleSubmit = useCallback(async () => {
    if (!formData.name || !formData.password) {
      setError("Both fields are required.")
      return
    }

    setError(null) // Reset error message
    setLoading(true)

    try {
      const response = await simulateBackendRequest(formData)
      if (response.success) {
        console.log("Form submitted:", formData)
        navigation.navigate("Home" as never)
      } else {
        setError("Invalid credentials.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [formData, navigation])

  const simulateBackendRequest = (data: { name: string; password: string }) => {
    return new Promise<{ success: boolean }>((resolve) => {
      setTimeout(() => {
        if (data.name === "admin" && data.password === "admin123") {
          resolve({ success: true })
        } else {
          resolve({ success: false })
        }
      }, 2000)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Login</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Inputs */}
          <View style={styles.inputContainer}>
            <CustomInput
              type="text"
              placeholder="Enter your username"
              icon="user"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInput
              type="password"
              placeholder="Enter your password"
              icon="lock"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
            />
          </View>

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Forgot Password Link */}
          <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate("ForgotPassword" as never)}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fce986" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <Text>{JSON.stringify(userInfo)}</Text>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup" as never)}>
              <Text style={styles.signUpLink}>Sign up</Text>
            </TouchableOpacity>
          </View>

          {/* OR Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <TouchableOpacity style={styles.socialButton} onPress={() => promptAsync()}>
            <Text style={styles.socialButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => console.log("Facebook Login")}>
            <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

// Styles remain unchanged...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  content: {
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    gap: 65,
    marginTop: 60,
    marginBottom: 40,
    marginLeft: 50,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    maxWidth: 330,
    marginBottom: 34,
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
    fontSize: 14,
  },
  signUpLink: {
    fontFamily: "Poppins-Bold",
    color: "#00a86b",
    fontSize: 14,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 330,
    marginBottom: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  dividerText: {
    fontFamily: "Poppins-Regular",
    paddingHorizontal: 14,
    color: "#9CA3AF",
  },
  socialButton: {
    width: "100%",
    maxWidth: 310,
    height: 50,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  socialButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: 20,
  },
})

export default LoginScreen