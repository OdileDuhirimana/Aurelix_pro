import type React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

interface FilterChipProps {
  label: string
  active: boolean
  onPress: () => void
}

const FilterChip: React.FC<FilterChipProps> = ({ label, active, onPress }) => {
  return (
    <TouchableOpacity style={[styles.filterChip, active && styles.activeFilterChip]} onPress={onPress}>
      <Text style={[styles.filterText, active && styles.activeFilterText]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "#00A86B",
    marginRight: 10,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  activeFilterChip: {
    backgroundColor: "#00a86b",
    borderColor: "#00a86b",
  },
  filterText: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#232327",
  },
  activeFilterText: {
    color: "#ffffff",
    fontFamily: "Poppins-Medium",
  },
})

export default FilterChip

