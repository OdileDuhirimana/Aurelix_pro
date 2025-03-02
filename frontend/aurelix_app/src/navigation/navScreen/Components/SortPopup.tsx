import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native"
import { Check } from "lucide-react-native"
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
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.popup}>
          <View style={styles.header}>
            <Text style={styles.title}>Sort by</Text>
          </View>

          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity key={option.id} style={styles.optionItem} onPress={() => onSelectOption(option.id)}>
                <Text style={styles.optionText}>{option.name}</Text>
                {selectedOption === option.id && <Check size={18} color="#00a86b" />}
              </TouchableOpacity>
            ))}
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
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingBottom: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#232327",
  },
  optionsContainer: {
    gap: 15,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#232327",
  },
})

export default SortPopup

