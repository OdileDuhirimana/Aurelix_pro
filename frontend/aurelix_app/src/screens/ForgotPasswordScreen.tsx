import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ActivityIndicator } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import CustomInput from "../components/CustomInput"
import { SocialAuthButtons } from "../components/SocialAuthButtons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Header from "../components/header"

const simulateApiCall = (email: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.includes("@")) {
        resolve("Reset link sent!");
      } else {
        reject("Invalid email address!");
      }
    }, 2000);
  });
};



const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)  // Simulate loading state
  const [error, setError] = useState<string | null>(null)  // For error messages
  const navigation = useNavigation()

  const handleResetPassword = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setError(null); // Clear previous error

    try {
      const response = await simulateApiCall(email); // Simulated API call
      alert(response); // Handle success (for now, show an alert)
      navigation.navigate("Verification" as never);  // Navigate on success
    } catch (err: any) {
      setError(err);  // Set error state
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = async (userData) => {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(userData))
      navigation.navigate("Home" as never)
    } catch (error) {
      setError('Failed to process authentication')
    }
  }

  const handleAuthError = (errorMessage) => {
    setError(errorMessage)
  }

  return (
    <View style={styles.container}>
      <Header onBack={() => navigation.goBack()} title="Forgot Password" />

      <View style={styles.content}>
        <View style={styles.form}>
        <View style={styles.inputContainer}>
        <CustomInput
          type="text"
          placeholder="Enter your email"
          icon="mail"
          value={email}
          onChange={setEmail}
        />
        </View>
        

        {error && <Text style={styles.errorText}>{error}</Text>} 

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fce986" />  // Show loader while processing
          ) : (
            <Text style={styles.resetButtonText}>Send Reset Link</Text>
          )}
        </TouchableOpacity>
        </View>
        

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SocialAuthButtons 
                      onAuthSuccess={handleAuthSuccess}
                      onAuthError={handleAuthError}
                    />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
  },
  content: {
    width: '100%',
    marginHorizontal: 24,
  },
  form: { 
    width: "100%", 
    alignItems: "center",
    marginTop: 40, 
  },
  inputContainer: { 
    width: "100%", 
    maxWidth: 330, 
    marginBottom: 34 
  },
  resetButton: {
    width: "100%",
    maxWidth: 330,
    backgroundColor: "#00a86b",
    borderRadius: 30,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
    marginTop: 20,
  },
  resetButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#fce986",
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 48,
    gap: 5,
    justifyContent: "center",
  },
  signupText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  signupLink: {
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

});

export default ForgotPasswordScreen;
