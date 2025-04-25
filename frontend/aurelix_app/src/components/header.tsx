import React from "react"
import { Feather } from "@expo/vector-icons"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"

// Header component
const Header = ({ onBack, title }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack}>
      <Feather name="chevron-left" size={24} color="black" />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
  </View>
)

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 40,
        gap: 65,
        marginTop: 60,
        marginBottom: 40,
        marginLeft: 50,
      },
      title: { 
        fontFamily: "Poppins-Bold", 
        fontSize: 18 
      },
})

export default Header
