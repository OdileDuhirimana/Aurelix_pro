import type React from "react";
import { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";

// Define navigation stack parameter list type
type RootStackParamList = {
  Verification: { fromScreen?: string };
  NewPassword: undefined;
  Signin: undefined;
  VerifyEligibility: undefined;
  // Add other routes as needed
};

// Define the route prop type for the current screen
type VerificationScreenRouteProp = RouteProp<RootStackParamList, "Verification">;

const VerificationScreen: React.FC = () => {
  const route = useRoute<VerificationScreenRouteProp>(); // Use the correct type here
  const navigation = useNavigation();
  const fromScreen = route.params?.fromScreen || ""; // This will now work correctly

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState<string>(""); // Ensure it's a string
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = useCallback((value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [otp]);

  const handleKeyPress = useCallback((e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [otp]);

  const handleVerify = async () => {
    if (otp.some(digit => digit === "")) {
      setErrorMessage("Please fill all OTP fields");
      return;
    }
  
    setIsLoading(true);
    setErrorMessage(""); // Clear any previous error message
  
    // Simulated backend OTP verification function
    const simulateBackendOTPVerification = (otp: string[]) => {
      return new Promise<void>((resolve, reject) => {
        // Simulate a delay (e.g., network request delay)
        setTimeout(() => {
          const correctOtp = ["1", "2", "3", "4"]; // This would be the correct OTP
          const inputOtp = otp.join("");
  
          // Check if the OTP is correct
          if (inputOtp === correctOtp.join("")) {
            resolve(); // OTP is correct
          } else {
            reject(new Error("Invalid OTP, please try again!")); // OTP is incorrect
          }
        }, 2000); // Simulate a 2-second network delay
      });
    };
  
    try {
      await simulateBackendOTPVerification(otp); // Simulate backend verification
      console.log('fromScreen:', fromScreen);
      navigation.navigate('VerifyEligibility' as never);
      // try {
      //   if (fromScreen === "ForgotPassword") {
      //     navigation.navigate("NewPassword" as never);
      //   } else if (fromScreen === "Signup") {
      //     navigation.navigate("VerifyEligibility" as never);
      //   }
      // } catch (error) {
      //   console.error('Navigation Error:', error);
      // }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred");
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
                ref={(input) => inputRefs.current[idx] = input}
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

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>} {/* Ensure this is a string */}

        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerify}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fce986" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify</Text>
          )}
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
    paddingVertical: 18,
    alignItems: "center",
  },
  verifyButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#fce986",
    alignItems: 'center',
  },
  errorText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "red",
    marginTop: 10,
  },
});

export default VerificationScreen;
