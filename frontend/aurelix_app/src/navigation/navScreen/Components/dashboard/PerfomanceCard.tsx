import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import SemiCircularGauge from "../charts/SemiCircularGauge"

interface PerformanceCardProps {
  total: number
  new: number
  returning: number
  maxValue?: number
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ total, new: newValue, returning, maxValue = 100 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overall Performance</Text>
      <View style={styles.gaugeContainer}>
        <SemiCircularGauge value={total} maxValue={maxValue} size={180} color="#00a86b" />
      </View>
      <View style={styles.breakdown}>
        <View style={styles.breakdownItem}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#E6E6E6" }]} />
            <Text style={styles.legendText}>New</Text>
          </View>
          <Text style={styles.breakdownValue}>{newValue}</Text>
        </View>
        <View style={styles.breakdownItem}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#00a86b" }]} />
            <Text style={styles.legendText}>Returning</Text>
          </View>
          <Text style={styles.breakdownValue}>{returning}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#232327",
  },
  gaugeContainer: {
    alignItems: "center",
  },
  breakdown: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  breakdownItem: {
    marginHorizontal: 15,
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Poppins-Regular",
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    marginTop: 5,
    color: "#232327",
  },
})

export default PerformanceCard

