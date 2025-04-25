import type React from "react"
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, SafeAreaView } from "react-native"
import { X } from "lucide-react-native"

import type { Region, FilterOption } from "../../index"

interface FilterPopupProps {
  visible: boolean
  onClose: () => void
  onSelectFilter: (type: string, option: FilterOption) => void
  locationOptions: Region[]
  sectorOptions: FilterOption[]
  selectedSector?: string // Added selectedSector prop
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  visible,
  onClose,
  onSelectFilter,
  locationOptions,
  sectorOptions,
  selectedSector,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Filter</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#000000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Sector</Text>
          <FlatList
            data={sectorOptions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.filterItem, selectedSector === item.name && styles.selectedFilterItem]}
                onPress={() => onSelectFilter("sector", item)}
              >
                <Text style={[styles.filterItemText, selectedSector === item.name && styles.selectedFilterItemText]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.footer}>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#232327",
  },
  closeButton: {
    padding: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#232327",
    marginBottom: 12,
  },
  filterItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#F9F9F9",
  },
  selectedFilterItem: {
    backgroundColor: "#F0F9F5",
    borderWidth: 1,
    borderColor: "#00a86b20",
  },
  filterItemText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#232327",
  },
  selectedFilterItemText: {
    color: "#00a86b",
    fontFamily: "Poppins-Medium",
  },
  footer: {
    marginTop: 20,
  },
  applyButton: {
    backgroundColor: "#00a86b",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
})

export default FilterPopup

