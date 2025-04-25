import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import GradientText from "../components/GradientText"

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation()
  
  const navigateTo = (screen: string) => navigation.navigate(screen as never)

  return (
    <View style={styles.container}>
      <GradientText 
        text="Aurelix" 
        colors={[
          "rgba(252, 229, 105, 0.69)", 
          "rgba(253, 226, 77, 0.63)", 
          "rgba(254, 222, 50, 0.57)", 
          "rgba(251, 236, 151, 0.79)", 
          "#00A86B", 
          "rgba(255, 215, 0, 0.47)"
        ]}
        locations={[0.24, 0.24, 0.24, 0.35, 0.51, 0.69]}
        start={{ x: 1, y: 0 }} 
        end={{ x: 0, y: 1 }}  
        style={styles.logo}
      />
      <Text style={styles.title}>Let's get started!</Text>
      <Text style={styles.subtitle}>Here at your service!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => navigateTo("Login")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.signupButton} 
          onPress={() => navigateTo("Signup")}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
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
    lineHeight: 30,
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
})

export default WelcomeScreen