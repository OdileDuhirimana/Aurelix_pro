import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ArrowDown, ArrowUp } from "lucide-react-native"
import CircularProgress from "../charts/CircularProgress"

interface MetricCardProps {
  type: "percentage" | "count"
  value: number | string
  label: string
  color?: string
  change?: number
  isIncreasing?: boolean
}

const MetricCard: React.FC<MetricCardProps> = ({ type, value, label, color = "#00a86b", change, isIncreasing }) => {
  return (
    <View style={styles.container}>
      {type === "percentage" ? (
        <View style={styles.progressContainer}>
          <CircularProgress
            percentage={typeof value === "number" ? value : Number.parseInt(value as string)}
            color={color}
            size={60}
            strokeWidth={6}
            showPercentage={true}
          />
        </View>
      ) : (
        <View style={styles.countContainer}>
          <Text style={styles.countValue}>{typeof value === "number" ? value.toLocaleString() : value}</Text>
          {change !== undefined && (
            <View style={styles.changeContainer}>
              {isIncreasing ? <ArrowUp size={12} color="#00a86b" /> : <ArrowDown size={12} color="#fc5a5a" />}
              <Text style={[styles.changeText, { color: isIncreasing ? "#00a86b" : "#fc5a5a" }]}>{change}%</Text>
            </View>
          )}
        </View>
      )}
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
  progressContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    height: 60,
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  countValue: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: "#232327",
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  changeText: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
    marginLeft: 2,
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    color: "#666666",
    fontFamily: "Poppins-Regular",
  },
})

export default MetricCard

