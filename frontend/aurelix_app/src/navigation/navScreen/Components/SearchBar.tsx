import type React from "react"
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { Search, X } from "lucide-react-native"

export interface SearchBarProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  onClear?: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChangeText, onClear }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Search size={20} color="#787777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#787777"
          value={value}
          onChangeText={onChangeText}
        />
        {value.length > 0 && onClear && (
          <TouchableOpacity
            onPress={onClear}
            style={styles.clearButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={18} color="#787777" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    height: 48,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#232327",
    height: "100%",
    padding: 0, 
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
})

export default SearchBar

