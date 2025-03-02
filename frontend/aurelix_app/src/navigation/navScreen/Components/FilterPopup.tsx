import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native"

interface FilterOption {
  id: string
  name: string
}

interface FilterPopupProps {
  visible: boolean
  onClose: () => void
  onSelectFilter: (type: string, option: FilterOption) => void
  locationOptions: FilterOption[]
  sectorOptions: FilterOption[]
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  visible,
  onClose,
  onSelectFilter,
  locationOptions,
  sectorOptions,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.popup}>
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Location</Text>
            <View style={styles.optionsContainer}>
              {locationOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.filterOption}
                  onPress={() => onSelectFilter("location", option)}
                >
                  <Text style={styles.optionText}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Sector</Text>
            <View style={styles.optionsContainer}>
              {sectorOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.filterOption}
                  onPress={() => onSelectFilter("sector", option)}
                >
                  <Text style={styles.optionText}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  popup: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "60%",
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#232327",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  optionText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#232327",
  },
})

export default FilterPopup

