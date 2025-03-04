"use client"

import React, { useState, useCallback, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native"
import { Feather } from "@expo/vector-icons"
import CustomInput from "../components/CustomInput"
import { useNavigation } from "@react-navigation/native"
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google"
import AsyncStorage from "@react-native-async-storage/async-storage"


const androidClientId = "995334592785-9tre585q3mr7a3m8bled0u7qnhfnju2t.apps.googleusercontent.com"
const iosClientId = "995334592785-g5q6kcuicmh8k27ogepntone1u6lfv6k.apps.googleusercontent.com"
const webClientId = "995334592785-n248qk2a880kgvf049avclnqaj3hacbf.apps.googleusercontent.com"


WebBrowser.maybeCompleteAuthSession();

const config = {
  androidClientId,
  iosClientId,
  webClientId,
}

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigation = useNavigation()

  // Debounced form submission to prevent spamming requests
  const handleSubmit = useCallback(async () => {
    if (!formData.name || !formData.password) {
      setError("Both fields are required.")
      return
    }

    setError(null)  // Reset error message

    setLoading(true)

    try {
      // Simulating an API request
      const response = await simulateBackendRequest(formData)

      if (response.success) {
        console.log("Form submitted:", formData)
        navigation.navigate('Home' as never)
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
    // Simulate a successful login or failure response after 2 seconds
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

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: androidClientId,
    iosClientId: iosClientId,
    webClientId: webClientId,
  });
  
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      handleGoogleSignIn(authentication?.accessToken);
    }
  }, [response]);
  
  const handleGoogleSignIn = async (token: string | undefined) => {
    if (!token) return;
    
    const userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    const user = await userInfoResponse.json();
    await AsyncStorage.setItem("user", JSON.stringify(user));
    console.log("User Info:", user);
    navigation.navigate("Home" as never);
  };
  

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
          <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword' as never)}>
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

export default LoginScreen;
