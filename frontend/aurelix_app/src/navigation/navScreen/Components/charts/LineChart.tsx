import type React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import Svg, { Path, Line, LinearGradient, Stop, Defs } from "react-native-svg"

interface DataPoint {
  date: string
  value: number
}

interface LineChartProps {
  data: DataPoint[]
  width?: number
  height?: number
  color?: string
  showGrid?: boolean
  periodLabel?: string
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width = Dimensions.get("window").width - 60,
  height = 180,
  color = "#00a86b",
  showGrid = true,
  periodLabel,
}) => {
  if (!data || data.length === 0) return null

  const maxValue = Math.max(...data.map((item) => item.value))
  const minValue = Math.min(...data.map((item) => item.value))
  const range = maxValue - minValue

  const xStep = width / (data.length - 1)

  // Generate points for the path
  const points = data.map((item, index) => {
    const x = index * xStep
    const y = height - ((item.value - minValue) / range) * height
    return `${x},${y}`
  })

  const pathData = `M${points.join(" L")}`

  // Generate points for the area under the curve
  const areaPoints = [`0,${height}`, ...points, `${width},${height}`]

  const areaPathData = `M${areaPoints.join(" L")} Z`

  return (
    <View style={styles.container}>
      {periodLabel && <Text style={styles.periodLabel}>{periodLabel}</Text>}
      <Svg width={width} height={height}>
        {/* Gradient definition */}
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </LinearGradient>
        </Defs>

        {/* Grid lines */}
        {showGrid &&
          [0, 1, 2, 3].map((_, i) => (
            <Line
              key={`h-${i}`}
              x1="0"
              y1={(height * (i + 1)) / 4}
              x2={width}
              y2={(height * (i + 1)) / 4}
              stroke="#E0E0E0"
              strokeWidth="1"
            />
          ))}

        {showGrid &&
          [0, 1, 2, 3, 4].map((_, i) => (
            <Line
              key={`v-${i}`}
              x1={(width * i) / 4}
              y1="0"
              x2={(width * i) / 4}
              y2={height}
              stroke="#E0E0E0"
              strokeWidth="1"
            />
          ))}

        {/* Area under the curve with gradient */}
        <Path d={areaPathData} fill="url(#gradient)" opacity={0.5} />

        {/* Line */}
        <Path d={pathData} fill="none" stroke={color} strokeWidth="3" />
      </Svg>

      {/* X-axis ticks */}
      <View style={styles.chartTicks}>
        {data.map((_, i) => (
          <View key={i} style={styles.tick} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  periodLabel: {
    textAlign: "center",
    fontSize: 14,
    color: "#666666",
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
  },
  chartTicks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  tick: {
    width: 1,
    height: 4,
    backgroundColor: "#cccccc",
  },
})

export default LineChart

