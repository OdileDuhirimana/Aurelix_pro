import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ArrowDown, ArrowUp } from "lucide-react-native"

interface StatCardProps {
  value: string
  label: string
  percentage?: string
  isIncreasing?: boolean
}

const StatCard: React.FC<StatCardProps> = ({ value, label, percentage, isIncreasing }) => {
  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statNumber}>{value}</Text>
        {percentage && (
          <View style={styles.percentageContainer}>
            {isIncreasing ? <ArrowUp size={12} color="#00a86b" /> : <ArrowDown size={12} color="#fc5a5a" />}
            <Text style={[styles.percentage, isIncreasing ? styles.percentageUp : styles.percentageDown]}>
              {percentage}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#232327",
    marginRight: 8,
  },
  percentageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  percentage: {
    fontSize: 10,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    marginLeft: 2,
  },
  percentageDown: {
    color: "#fc5a5a",
  },
  percentageUp: {
    color: "#00a86b",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "300",
    fontFamily: "Poppins-Light",
    color: "#737373",
  },
})

export default StatCard

