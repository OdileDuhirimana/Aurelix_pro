import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import GradientText from "../components/GradientText"


const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
       <GradientText 
        text="Aurelix" 
        colors={[
          "rgba(252, 229, 105, 0.691272)", 
          "rgba(253, 226, 77, 0.631532)", 
          "rgba(254, 222, 50, 0.573927)", 
          "rgba(251, 236, 151, 0.789524)", 
          "#00A86B", 
          "rgba(255, 215, 0, 0.466667)"
        ]}
        locations={[0.2375, 0.2375, 0.2375, 0.3484, 0.5092, 0.6888]}
        start={{ x: 1.0, y: 0.0 }} 
        end={{ x: 0.0, y: 1.0 }}  
        style={styles.logo}
      />
      <Text style={styles.title}>Let's get started!</Text>
      <Text style={styles.subtitle}>Here at your service!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login" as never)}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("Signup" as never)}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("VerifyEligibility" as never)}
      >
        <Text>Go to Verification</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("error" as never)}
      >
        <Text>Go to Error</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("forbidden" as never)}
      >
        <Text>Go to Forbidden</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("profile" as never)}
      >
        <Text>Go to Forbidden</Text>
      </TouchableOpacity> */}
      
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 60,
    marginBottom: 40,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    lineHeight: 29.7,
    color: "black",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Poppins-Light",
    fontSize: 16,
    color: "#221F1F99",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 250,
    gap: 16,
  },
  loginButton: {
    backgroundColor: "#00a86b",
    borderRadius: 30,
    height: 55,
    justifyContent: "center",
    alignItems: "center",

  },
  loginButtonText: {
    fontFamily: "Poppins-Bold",
    color: "#fce986",
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#00a86b",
    borderRadius: 30,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  signupButtonText: {
    fontFamily: "Poppins-Bold",
    color: "#00a86b",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#00a86b",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 9999,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
})

export default WelcomeScreen

