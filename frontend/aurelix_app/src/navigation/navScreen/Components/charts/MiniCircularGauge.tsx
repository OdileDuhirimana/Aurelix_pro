import type React from "react"
import { View, StyleSheet } from "react-native"
import Svg, { Path } from "react-native-svg"

interface MiniLineChartProps {
  data: number[]
  width?: number
  height?: number
  color: string
}

const MiniLineChart: React.FC<MiniLineChartProps> = ({ data, width = 80, height = 30, color }) => {
  if (!data || data.length === 0) return null

  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue

  const xStep = width / (data.length - 1)

  // Generate points for the path
  const points = data.map((value, index) => {
    const x = index * xStep
    const y = height - ((value - minValue) / range) * height
    return `${x},${y}`
  })

  const pathData = `M${points.join(" L")}`

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <Path d={pathData} fill="none" stroke={color} strokeWidth="2" />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
})

export default MiniLineChart

