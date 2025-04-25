import { View, Text, StyleSheet, Image } from "react-native"
import { Check } from "lucide-react-native"
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function SuccessScreen() {
  const navigation = useNavigation();
  useEffect(() => {
      const timer = setTimeout(() => {
        navigation.navigate("Login" as never);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [navigation]);
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkmarkContainer}>
          <Image style={styles.checkmarkImage} source={{uri: 'https://s3-alpha-sig.figma.com/img/f3f0/584e/cda65a3a4394f6a80720a5ebe4957457?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=juKQ5nhIethxAn1MfGWQDFqNFICOrzRbR9YTgF-XTIu0BJgF17IhixV2sFMcngj6APOHqjyo8E89yId-N-EtEcs2qSWVxmEc3b-oCW06q-osjEOdPBDMRqLhWGFPyHOowxtscAP-8d5DpHmS~fKHn-0cadWugpX7LKQtIaSob50cRU-PC61Tc7i8eA~0-k03Pibc61946vTU-mKMn7EWzfax8XLEVgnA1~5IUJNboSmL0tYrZ86TovYN3GgUBZqfnnVlH7vJRaRM-gnskGpjvigxhHWYiNGoQmSJUn986YamALPtdYfCQ7CQt05zquu3dbrLlQBZG2VLlOI2K~0xFg__'}}/>
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
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#00a86b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  successText: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    textAlign: "center",
    color: "#6b7280",
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
  checkmarkImage: {
    width: 75,
    height: 75,
  }
})

