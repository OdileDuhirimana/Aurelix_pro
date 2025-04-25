"use client"

import type React from "react"
import { useState, useReducer } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { Feather } from "@expo/vector-icons"
import CustomInput from "../components/CustomInput"
import { ArrowLeft } from "lucide-react"
import { useNavigation } from "@react-navigation/native"

// Action types for useReducer
const actionTypes = {
  UPDATE_FORM: "UPDATE_FORM",
  TOGGLE_TERMS: "TOGGLE_TERMS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
}

// Initial form state
const initialState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  agreeToTerms: false,
  isLoading: false,
  error: "",
}

// Reducer to handle form state updates
const formReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FORM:
      return { ...state, [action.field]: action.value }
    case actionTypes.TOGGLE_TERMS:
      return { ...state, agreeToTerms: !state.agreeToTerms }
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.value }
    case actionTypes.SET_ERROR:
      return { ...state, error: action.value }
    default:
      return state
  }
}

// Email validation function
const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return emailRegex.test(email)
}

const SignupScreen: React.FC = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState)
  const navigation = useNavigation()

  const handleSubmit = async () => {
    // Basic validation before submitting
    if (!formState.name || !formState.email || !formState.phone || !formState.password) {
      dispatch({ type: actionTypes.SET_ERROR, value: "Please fill all fields." })
      return
    }

    // Email validation
    if (!validateEmail(formState.email)) {
      dispatch({ type: actionTypes.SET_ERROR, value: "Please enter a valid email address." })
      return
    }

    if (!formState.agreeToTerms) {
      dispatch({ type: actionTypes.SET_ERROR, value: "You must agree to the terms and privacy policy." })
      return
    }

    dispatch({ type: actionTypes.SET_LOADING, value: true })

    // Simulate backend API call with a delay
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // On success, navigate to verification page
      navigation.navigate("Verification", {fromScreen: "Signup"})
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, value: "Something went wrong. Please try again." })
    } finally {
      dispatch({ type: actionTypes.SET_LOADING, value: false })
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Sign Up</Text>
        </View>

        {/* Error Message */}
        {formState.error ? (
          <Text style={styles.errorText}>{formState.error}</Text>
        ) : null}

        {/* Form */}
        <View style={styles.form}>
          {/* Inputs */}
          <View style={styles.inputContainer}>
            <CustomInput
              type="text"
              placeholder="Enter your username"
              icon="user"
              value={formState.name}
              onChange={(value) => dispatch({ type: actionTypes.UPDATE_FORM, field: "name", value })}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInput
              type="text"
              placeholder="Enter your email"
              icon="mail"
              value={formState.email}
              onChange={(value) => dispatch({ type: actionTypes.UPDATE_FORM, field: "email", value })}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInput
              type="text"
              placeholder="Enter your phone number"
              icon="phone"
              value={formState.phone}
              onChange={(value) => dispatch({ type: actionTypes.UPDATE_FORM, field: "phone", value })}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomInput
              type="password"
              placeholder="Enter your password"
              icon="lock"
              value={formState.password}
              onChange={(value) => dispatch({ type: actionTypes.UPDATE_FORM, field: "password", value })}
            />
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => dispatch({ type: actionTypes.TOGGLE_TERMS })}
            >
              {formState.agreeToTerms && <Feather name="check" size={16} color="#00a86b" />}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to the healthcare <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login" as never)}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
            {formState.isLoading ? (
              <ActivityIndicator size="small" color="#fce986" />
            ) : (
              <Text style={styles.signupButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

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
    marginBottom: 22,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: 330,
    marginBottom: 38,
    marginTop: 18,
    marginLeft: 18,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "rgba(34, 31, 31, 0.4)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  termsText: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 13,
  },
  termsLink: {
    color: "#00a86b",
  },
  signupButton: {
    width: "100%",
    maxWidth: 330,
    height: 66,
    backgroundColor: "#00a86b",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  signupButtonText: {
    fontFamily: "Poppins-Bold",
    color: "#fce986",
    fontSize: 20,
  },
  loginContainer: {
    flexDirection: "row",
    marginBottom: 32,
    gap: 5,
  },
  loginText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  loginLink: {
    fontFamily: "Poppins-SemiBold",
    color: "#00a86b",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
})

export default SignupScreen;
