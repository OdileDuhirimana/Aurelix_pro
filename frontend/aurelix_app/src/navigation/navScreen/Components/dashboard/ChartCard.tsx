import type React from "react"
import { View, StyleSheet } from "react-native"
import LineChart from "../charts/LineChart"

interface DataPoint {
  date: string
  value: number
}

interface ChartCardProps {
  data: DataPoint[]
  periodLabel: string
}

const ChartCard: React.FC<ChartCardProps> = ({ data, periodLabel }) => {
  return (
    <View style={styles.container}>
      <LineChart data={data} periodLabel={periodLabel} showGrid={true} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
})

export default ChartCard

