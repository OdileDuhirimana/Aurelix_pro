"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

// Simulating backend interaction
const simulateBackendOTPVerification = (otp: string[]) => {
  // Simulating an async call to verify OTP
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const correctOtp = "1234"; // Placeholder for correct OTP logic
      const otpString = otp.join("");
      if (otpString === correctOtp) {
        resolve("OTP verified successfully!");
      } else {
        reject("Invalid OTP. Please try again.");
      }
    }, 1000); // Simulating network delay
  });
};

const VerificationScreen: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  // Handle OTP change
  const handleChange = useCallback((value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Focus next input if we have a value
    if (value !== "" && index < 3) {
      inputRefs[index + 1].focus();
    }
  }, [otp]);

  // Handle key press event
  const handleKeyPress = useCallback((e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace if current input is empty
      inputRefs[index - 1].focus();
    }
  }, [otp]);

  // Refs for OTP input fields
  const inputRefs: any[] = [];

  // Handle OTP verification
  const handleVerify = async () => {
    setIsLoading(true);
    try {
      await simulateBackendOTPVerification(otp);
      // Redirect to "NewPassword" screen upon successful OTP verification
      navigation.navigate("NewPassword" as never);
    } catch (error) {
      setErrorMessage(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="#221f1f" />
        </TouchableOpacity>
        <Text style={styles.title}>Verification</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.stitle}>Verify OTP</Text>
          <Text style={styles.subtitle}>We have sent a verification code!</Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, idx) => (
            <View key={idx} style={styles.inputContainer}>
              <TextInput
                ref={(input) => {
                  inputRefs[idx] = input;
                }}
                style={styles.input}
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleChange(value, idx)}
                onKeyPress={(e) => handleKeyPress(e, idx)}
                keyboardType="numeric"
              />
              {!digit && <View style={styles.placeholder} />}
            </View>
          ))}
        </View>

        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>We have sent the code to</Text>
          <View style={styles.emailBox}>
            <Feather name="mail" size={20} color="#9CA3AF" />
            <Text style={styles.email}>peaceexaucee@gmail.com</Text>
          </View>
        </View>

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <TouchableOpacity
          style={[styles.verifyButton, isLoading && styles.verifyButtonLoading]}
          onPress={handleVerify}
          disabled={isLoading}
        >
          <Text style={styles.verifyButtonText}>{isLoading ? "Verifying..." : "Verify"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginBottom: 41,
    marginLeft: 20,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  content: {
    marginHorizontal: 32,
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    marginBottom: 42,
  },
  stitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
  },
  subtitle: {
    fontFamily: "Poppins-Light",
    fontSize: 16,
    color: "#221F1F99",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 300,
    marginBottom: 50,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#221f1f",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#221f1f",
    paddingBottom: 8,
  },
  placeholder: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 7,
    height: 7,
    borderRadius: 6,
    backgroundColor: "#D1D5DB",
    transform: [{ translateX: -6 }, { translateY: -6 }],
  },
  emailContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  emailText: {
    fontFamily: "Poppins-Light",
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 42,
  },
  emailBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: 300,
    height: 51,
    borderRadius: 20,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  email: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#221F1F66",
    marginLeft: 18,
  },
  verifyButton: {
    backgroundColor: "#00a86b",
    borderRadius: 32,
    width: 300,
    height: 65,
    paddingVertical: 15,
    alignItems: "center",
  },
  verifyButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#fce986",
  },
  verifyButtonLoading: {
    backgroundColor: "#6b7280",
  },
  errorText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "red",
    marginTop: 10,
  },
});

export default VerificationScreen;
