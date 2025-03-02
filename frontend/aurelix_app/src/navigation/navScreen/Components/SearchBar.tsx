import type React from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { Search } from "lucide-react-native"

interface SearchBarProps {
  placeholder: string
  onChangeText?: (text: string) => void
  value?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onChangeText, value }) => {
  return (
    <View style={styles.searchContainer}>
      <Search size={20} color="#9E9E9E" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#9E9E9E"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    maxWidth: 330,
    height: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
    fontFamily: "Poppins-Regular",
  },
})

export default SearchBar

