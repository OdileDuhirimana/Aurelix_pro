import React, { useState, useCallback, useRef } from "react";
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
import Header from "../components/header";

// Types
type RootStackParamList = {
  Verification: { fromScreen?: string };
  NewPassword: undefined;
  Signin: undefined;
  VerifyEligibility: undefined;
};

type VerificationScreenRouteProp = RouteProp<RootStackParamList, "Verification">;

const OtpInput = ({ 
  value, 
  onChange, 
  onKeyPress, 
  inputRef 
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      ref={inputRef}
      style={styles.input}
      maxLength={1}
      value={value}
      onChangeText={onChange}
      onKeyPress={onKeyPress}
      keyboardType="numeric"
    />
    {!value && <View style={styles.placeholder} />}
  </View>
);

const VerificationScreen: React.FC = () => {
  const route = useRoute<VerificationScreenRouteProp>();
  const navigation = useNavigation();
  const fromScreen = route.params?.fromScreen || "";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Handle OTP input change
  const handleChange = useCallback((value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [otp]);

  // Handle backspace key press
  const handleKeyPress = useCallback((e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [otp]);

  // Verify OTP
  
const handleVerify = async (otp: string[], setErrorMessage: (message: string) => void, setIsLoading: (loading: boolean) => void, fromScreen: string | undefined, navigation: any) => {
  if (otp.some(digit => digit === "")) {
    setErrorMessage("Please fill all OTP fields");
    return;
  }

  setIsLoading(true);
  setErrorMessage("");

  try {
    // Simulate backend verification
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const correctOtp = ["1", "2", "3", "4"];
        otp.join("") === correctOtp.join("") 
          ? resolve() 
          : reject(new Error("Invalid OTP, please try again!"));
      }, 2000);
    });
    
    if (fromScreen == "Signup") {
      navigation.navigate("VerifyEligibility" as never);
    } else if (fromScreen == "ForgotPassword") {
      navigation.navigate("NewPassword" as never);
    } else {
      navigation.navigate("NewPassword" as never);
    }
  } catch (error) {
    setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred");
  } finally {
    setIsLoading(false);
  }
};
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
      <Header 
        onBack={() => navigation.goBack()} 
        title="Verification" 
      />
      </View>
     

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.stitle}>Verify OTP</Text>
          <Text style={styles.subtitle}>We have sent a verification code!</Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, idx) => (
            <OtpInput
              key={idx}
              value={digit}
              onChange={(value) => handleChange(value, idx)}
              onKeyPress={(e) => handleKeyPress(e, idx)}
              inputRef={(input) => inputRefs.current[idx] = input}
            />
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
  style={styles.verifyButton}
  onPress={() => handleVerify(otp, setErrorMessage, setIsLoading, fromScreen, navigation)}
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
  headerContainer:{
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
  },
  verifyButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#fce986",
  },
  errorText: {
    color: "red",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: 20,
  },
});

export default VerificationScreen;