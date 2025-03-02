import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientText from "../components/GradientText";

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Welcome" as never);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <GradientText 
        text="Aurelix"
        style={styles.logo} 
        colors={[
          "rgba(252, 229, 105, 0.691)", 
          "rgba(253, 226, 77, 0.631)", 
          "rgba(254, 222, 50, 0.573)", 
          "rgba(251, 236, 151, 0.789)", 
          "#F9F9F9", 
          "rgba(255, 215, 0, 0.467)"
        ]}
        locations={[0.2375, 0.2375, 0.2375, 0.3484, 0.5092, 0.6888]}
        start={{ x: 0.0, y: 0.0 }} // Gradient start at the top left corner
        end={{ x: 1.0, y: 1.0 }}   // Gradient end at the bottom right corner
      />
      <GradientText 
        text="There to seamlessly connect potential investors and entrepreneurs" 
        style={styles.tagline}
        colors={[
          "rgba(249, 249, 249, 0.573927)", 
          "rgba(254, 222, 50, 0.573927)", 
          "rgba(249, 247, 231, 0.573927)"
        ]}
        locations={[0.234, 0.4784, 0.869]}
        start={{ x: 0, y: 0 }}  // Gradient start (left to right)
        end={{ x: 1, y: 0 }}    // Gradient end (right)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00a86b",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  logo:{
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 60,
  },
  tagline: {
    fontFamily: "Poppins-Medium",
    fontSize: 23,
    color: "white",
    textAlign: "center",
  },
});

export default SplashScreen;
