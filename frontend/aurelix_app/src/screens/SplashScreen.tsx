import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientText from "../components/GradientText";

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => 
      navigation.navigate("Welcome" as never), 3000
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <GradientText 
        text="Aurelix"
        style={styles.logo} 
        colors={[
          "rgba(252, 229, 105, 0.69)", 
          "rgba(253, 226, 77, 0.63)", 
          "rgba(254, 222, 50, 0.57)", 
          "rgba(251, 236, 151, 0.79)", 
          "#F9F9F9", 
          "rgba(255, 215, 0, 0.47)"
        ]}
        locations={[0.24, 0.24, 0.24, 0.35, 0.51, 0.69]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <GradientText 
        text="There to seamlessly connect potential investors and entrepreneurs" 
        style={styles.tagline}
        colors={[
          "rgba(249, 249, 249, 0.57)", 
          "rgba(254, 222, 50, 0.57)", 
          "rgba(249, 247, 231, 0.57)"
        ]}
        locations={[0.23, 0.48, 0.87]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
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
  logo: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 60,
  },
  tagline: {
    fontFamily: "Poppins-Medium",
    fontSize: 23,
    textAlign: "center",
  },
});

export default SplashScreen;