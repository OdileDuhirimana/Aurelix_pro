import { View, Text, StyleSheet } from "react-native"
import { Check } from "lucide-react-native"

export default function SuccessScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkmarkContainer}>
          <Check size={70} color="#fff" />
        </View>
        <Text style={styles.successText}>You have successfully signed up{"\n"}and completed your Profile</Text>
        <Text style={styles.welcomeText}>Welcome!</Text>
      </View>
      <View style={styles.dotsContainer}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  checkmarkContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#00a86b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  successText: {
    fontSize: 18,
    fontFamily: 'Poppins-Light',
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    color: "#00a86b",
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d9d9d9",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#00a86b",
    width: 32,
  },
})

