import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ArrowUp } from "lucide-react-native"

interface StatCardProps {
  value: string
  label: string
  percentage?: string
  isIncreasing?: boolean
}

const StatCard: React.FC<StatCardProps> = ({ value, label, percentage, isIncreasing = true }) => {
  const hasPlus = value.endsWith("+")
  const mainValue = hasPlus ? value.slice(0, -1) : value
  const plusSign = hasPlus ? " +" : ""

  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statNumber}>
          {mainValue}
          {hasPlus && <Text style={styles.plusSign}>{plusSign}</Text>}
        </Text>
        {isIncreasing && !hasPlus && <ArrowUp size={16} color="#00a86b" />}
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    width: "31%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    alignItems: "center",
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    justifyContent: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#232327",
    marginRight: 2,
  },
  plusSign: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#00a86b", 
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    color: "#737373",
    textAlign: "center",
  },
})

export default StatCard
