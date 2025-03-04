"use client"
import React, { useState, useCallback } from "react"
import { View, TextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

interface CustomInputProps {
  type: "text" | "password" | "email"
  placeholder: string
  icon: keyof typeof Feather.glyphMap
  value: string
  onChange: (value: string) => void
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
}

const CustomInput: React.FC<CustomInputProps> = React.memo(({ type, placeholder, icon, value, onChange, containerStyle, inputStyle }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = useCallback((text: string) => {
    onChange(text)
  }, [onChange])

  return (
    <View style={[styles.container, containerStyle]}>
      <Feather name={icon} size={24} color="rgba(34, 31, 31, 0.4)" />
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="rgba(34, 31, 31, 0.4)"
        value={value}
        onChangeText={handleInputChange}
        secureTextEntry={type === "password" && !showPassword}
        keyboardType={type === "email" ? "email-address" : "default"}
        autoCapitalize={type === "email" ? "none" : "sentences"}
        autoComplete={type === "email" ? "email" : "off"} 
        
      />
      {type === "password" && (
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(prevState => !prevState)}>
          <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#D1D5DB" />
        </TouchableOpacity>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 55,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#221F1F1A",
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins-Regular", // Ensure to use a fallback font for better cross-platform compatibility
    fontSize: 14,
    color: "#000",
    marginLeft: 12,
    marginBottom: -5,
  },
  eyeIcon: {
    marginLeft: 8,
    padding: 4,
  },
})

export default CustomInput
