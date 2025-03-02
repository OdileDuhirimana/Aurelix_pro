import type React from "react"
import type { ReactNode } from "react"
import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { StyleProp } from "react-native";

interface ActionButtonProps {
  label: string;
  icon?: ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>; // ✅ Fix
  textStyle?: StyleProp<TextStyle>;
}


const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.7}>
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      {icon}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: "center",
    gap: 6,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#232327",
  },
})

export default ActionButton

