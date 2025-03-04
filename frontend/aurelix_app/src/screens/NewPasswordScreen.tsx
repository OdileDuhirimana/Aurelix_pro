import React, { useState, useReducer } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import CustomInput from "../components/CustomInput";

// Define the navigation type
type RootStackParamList = {
  ForgotPassword: undefined;
  NewPassword: undefined;
  Login: undefined,
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

// Initial state for useReducer
const initialState = {
  newPassword: "",
  confirmPassword: "",
  loading: false,
  error: "",
};

// Reducer function
function passwordReducer(state: any, action: any) {
  switch (action.type) {
    case "SET_NEW_PASSWORD":
      return { ...state, newPassword: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const NewPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [state, dispatch] = useReducer(passwordReducer, initialState);

  const handleBack = () => {
    navigation.goBack();
  };

  const validatePasswords = () => {
    if (state.newPassword !== state.confirmPassword) {
      dispatch({ type: "SET_ERROR", payload: "Passwords do not match!" });
      return false;
    }
    if (state.newPassword.length < 6) {
      dispatch({ type: "SET_ERROR", payload: "Password must be at least 6 characters long!" });
      return false;
    }
    return true;
  };

  const handleConfirm = async () => {
    if (!validatePasswords()) return;

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      // Simulating a backend call
      const response = await simulateBackendCall(state.newPassword);
      if (response.success) {
        navigation.navigate("Login");
      } else {
        dispatch({ type: "SET_ERROR", payload: response.error });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "An error occurred. Please try again." });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Simulate a backend call for password confirmation
  const simulateBackendCall = (password: string) => {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        if (password === "test123") {
          resolve({ success: true });
        } else {
          resolve({ success: false, error: "Failed to reset password. Please try again." });
        }
      }, 2000);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Feather name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>New Password</Text>
      </View>

      <View style={styles.content}>
        <CustomInput
          type="password"
          placeholder="Enter your new password"
          icon="lock"
          value={state.newPassword}
          onChange={(text: string) => dispatch({ type: "SET_NEW_PASSWORD", payload: text })}
        />

        <View style={styles.inputSpacing} />

        <CustomInput
          type="password"
          placeholder="Confirm password"
          icon="lock"
          value={state.confirmPassword}
          onChange={(text: string) => dispatch({ type: "SET_CONFIRM_PASSWORD", payload: text })}
        />

        {state.error ? <Text style={styles.errorText}>{state.error}</Text> : null}

        <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} disabled={state.loading}>
          {state.loading ? (
            <ActivityIndicator size="small" color="#FFEB3B" />
          ) : (
            <Text style={styles.confirmButtonText}>Confirm</Text>
          )}
        </TouchableOpacity>
      </View>
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
    width: "100%",
    height: 40,
    gap: 58,
    marginTop: 60,
    marginBottom: 52,
    marginLeft: 20,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  content: {
    marginHorizontal: 28,
    alignItems: "center",
  },
  inputSpacing: {
    height: 34,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 32,
    marginTop: 32,
  },
  forgotPasswordText: {
    fontFamily: "Poppins-Medium",
    color: "#00a86b",
    fontSize: 13,
  },
  confirmButton: {
    width: "100%",
    backgroundColor: "#00A86B",
    borderRadius: 32,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
  },
  confirmButtonText: {
    color: "#FFEB3B",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginVertical: 10,
    fontFamily: "Poppins-Regular",
  },
});

export default NewPasswordScreen;
