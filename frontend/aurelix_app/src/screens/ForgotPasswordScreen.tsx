import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ActivityIndicator } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import CustomInput from "../components/CustomInput"

// Simulating a backend request function
const simulateApiCall = (email: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulating success for a valid email
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="#221f1f" />
        </TouchableOpacity>
        <Text style={styles.title}>Forgot Password</Text>
      </View>

      {/* Form */}
      <View style={styles.content}>
        <CustomInput
          type="text"
          placeholder="Enter your email"
          icon="mail"
          value={email}
          onChange={setEmail}
        />

        {/* Show error message */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Send Reset Link Button */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetPassword}
          disabled={loading}  // Disable button while loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fce986" />  // Show loader while processing
          ) : (
            <Text style={styles.resetButtonText}>Send Reset Link</Text>
          )}
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* OR Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>
      </View>

      {/* Social Buttons */}
      <TouchableOpacity style={styles.socialButton}>
        <Image source={{ uri: "https://v0.dev/google.svg" }} style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
        <View style={styles.facebookIconContainer}>
          <Text style={styles.facebookIcon}>f</Text>
        </View>
        <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
      </TouchableOpacity>
    </View>
  )
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
    gap: 32,
    marginTop: 60,
    marginBottom: 80,
    marginLeft: 20,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  content: {
    marginHorizontal: 24,
  },
  resetButton: {
    backgroundColor: "#00a86b",
    borderRadius: 30,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
    marginTop: 42,
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
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#9CA3AF",
    marginHorizontal: 16,
  },
  socialButton: {
    flexDirection: "row",
    gap: 20,
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
    marginHorizontal: 42,
  },
  socialButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  facebookButton: {
    marginBottom: 16,
  },
  facebookIconContainer: {
    width: 24,
    height: 24,
    backgroundColor: "#3577e5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  facebookIcon: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
  errorText: {
    color: "red",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: 20,
  }
});

export default ForgotPasswordScreen;
