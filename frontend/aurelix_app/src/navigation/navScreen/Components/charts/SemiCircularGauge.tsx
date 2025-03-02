import type React from "react"
import Svg, { Circle, G, Text as SvgText } from "react-native-svg"

interface SemiCircularGaugeProps {
  value: number
  maxValue: number
  size?: number
  strokeWidth?: number
  color?: string
}

const SemiCircularGauge: React.FC<SemiCircularGaugeProps> = ({
  value,
  maxValue,
  size = 180,
  strokeWidth = 12,
  color = "#00a86b",
}) => {
  const percentage = (value / maxValue) * 100
  const radius = size / 2 - 10
  const circumference = radius * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <Svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#E6E6E6"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={circumference / 2}
        transform={`rotate(-180, ${size / 2}, ${size / 2})`}
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={circumference / 2 + strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-180, ${size / 2}, ${size / 2})`}
      />
      <G>
        <Circle cx={size / 2} cy={size / 2 + 10} r={20} fill="#f5f5f5" />
        <SvgText x={size / 2} y={size / 2 + 15} fontSize="16" fontWeight="bold" fill="#000" textAnchor="middle">
          {value}
        </SvgText>
      </G>
    </Svg>
  )
}

export default SemiCircularGauge

