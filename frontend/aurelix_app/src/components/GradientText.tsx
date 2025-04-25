import React from "react";
import { Text, StyleSheet, View, TextStyle } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

type GradientTextProps = {
  text: string;
  style?: TextStyle; // Allowing custom styles to be passed
  colors: [string, string, ...string[]]; // At least two colors required
  locations?: [number, number, ...number[]]; // At least two locations required
  start: { x: number; y: number }; // Gradient start (required)
  end: { x: number; y: number }; // Gradient end (required)
};

const GradientText: React.FC<GradientTextProps> = ({ text, style, colors, locations, start, end }) => {
  return (
    <View>
      <MaskedView
        style={styles.maskContainer}
        maskElement={<Text style={[styles.text, style]}>{text}</Text>}
      >
        <LinearGradient
          colors={colors}
          locations={locations}
          start={start}
          end={end}
          style={styles.gradient}
        >
          {/* Invisible text to ensure the gradient covers the area */}
          <Text style={[styles.text, style, { opacity: 0 }]}>{text}</Text>
        </LinearGradient>
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  maskContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 48,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  gradient: {
    paddingHorizontal: 10, // Ensures gradient fully covers the text width
  },
});

export default GradientText;
