import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import Svg, { Circle } from "react-native-svg"

interface CircularProgressProps {
  percentage: number
  color: string
  size?: number
  strokeWidth?: number
  showPercentage?: boolean
  label?: string
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  color,
  size = 60,
  strokeWidth = 6,
  showPercentage = true,
  label,
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E6E6E6"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          />
        </Svg>
        {showPercentage && <Text style={styles.percentageText}>{percentage}%</Text>}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  progressContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: "#232327",
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    color: "#666666",
    fontFamily: "Poppins-Regular",
  },
})

export default CircularProgress

