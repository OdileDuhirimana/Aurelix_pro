import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView } from "react-native"
import { Check, X } from "lucide-react-native"
import type { SortOption } from "../../index"

interface SortPopupProps {
  visible: boolean
  onClose: () => void
  options: SortOption[]
  selectedOption: string | null
  onSelectOption: (optionId: string) => void
}

const SortPopup: React.FC<SortPopupProps> = ({ visible, onClose, options, selectedOption, onSelectOption }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Sort by</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#000000" />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[styles.optionItem, selectedOption === option.id && styles.selectedOptionItem]}
                onPress={() => onSelectOption(option.id)}
              >
                <Text style={[styles.optionText, selectedOption === option.id && styles.selectedOptionText]}>
                  {option.name}
                </Text>
                {selectedOption === option.id && <Check size={18} color="#00a86b" />}
              </TouchableOpacity>
            ))}
          </View>

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
  optionsContainer: {
    gap: 8,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
  },
  selectedOptionItem: {
    backgroundColor: "#F0F9F5",
    borderWidth: 1,
    borderColor: "#00a86b20",
  },
  optionText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#232327",
  },
  selectedOptionText: {
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

export default SortPopup

