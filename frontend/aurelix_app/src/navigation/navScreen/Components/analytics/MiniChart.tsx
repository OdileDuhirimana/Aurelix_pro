import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface MiniChartProps {
  data: number[];
  color: string;
  fillColor?: string;
}

const MiniChart: React.FC<MiniChartProps> = ({ 
  data, 
  color,
  fillColor
}) => {
  // Normalize data to fit in the mini chart
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  const width = 90;
  const height = 20;
  
  // Calculate points for the path
  const getLinePath = () => {
    return data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const normalizedValue = range === 0 ? 0.5 : (value - minValue) / range;
      const y = height - (normalizedValue * height);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };
  
  // Calculate area path (line + bottom enclosure)
  const getAreaPath = () => {
    const linePath = getLinePath();
    const lastX = width;
    const lastY = height;
    const firstX = 0;
    
    return `${linePath} L ${lastX} ${lastY} L ${firstX} ${lastY} Z`;
  };
  
  const linePath = getLinePath();
  const areaPath = getAreaPath();
  const gradientId = `gradient-${color.replace('#', '')}`;
  
  return (
    <View style={styles.miniChart}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.5" />
            <Stop offset="1" stopColor={color} stopOpacity="0.1" />
          </LinearGradient>
        </Defs>
        
        {/* Area fill */}
        <Path
          d={areaPath}
          fill={`url(#${gradientId})`}
          stroke="none"
        />
        
        {/* Line */}
        <Path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  miniChart: {
    width: 60,
    height: 20,
  },
});

export default MiniChart;