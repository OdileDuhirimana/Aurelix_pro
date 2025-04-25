import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

interface PerformanceData {
  total: number;
  new: number;
  returning: number;
}

interface PerformanceGaugeProps {
  performance: PerformanceData;
}

const PerformanceGauge: React.FC<PerformanceGaugeProps> = ({ performance }) => {
  const data = {
    total: performance?.total || 40,
    new: performance?.new || 15,
    returning: performance?.returning || 25,
  };

  // Calculate the percentage for the gauge (180 degrees is full)
  const maxValue = 100;
  const percentage = Math.min(data.total / maxValue, 1);

  // Calculate the angle for the filled arc (0 to 180 degrees)
  const angle = percentage * 180;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overall Performance</Text>

      <View style={styles.gaugeContainer}>
        <Svg width={200} height={110} viewBox="0 0 200 110" style={styles.svgContainer}>
          <Path
            d="M 11 100 A 90 90 0 0 1 190 100"
            stroke="#ECECEE"
            strokeWidth="10"
            fill="none"
          />

          <Path
            d={`M 10 100 A 90 90 0 0 1 ${10 + Math.sin((angle * Math.PI) / 180) * 180} ${100 - Math.cos((angle * Math.PI) / 180) * 90}`}
            stroke="#00a86b"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
          />

          {/* User icon */}
          <G transform="translate(100, 100)">
            <Path
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              fill="#00a86b"
              transform="translate(-10, -10)"
            />
          </G>
        </Svg>

        {/* Center value */}
        <View style={styles.centerValue}>
          <Text style={styles.valueText}>{data.total}</Text>
        </View>

        {/* Labels */}
        <View style={styles.labelsContainer}>
          <View style={styles.labelItem}>
            <View style={[styles.dot, styles.grayDot]} />
            <Text style={styles.labelText}>New</Text>
            <Text style={styles.labelValue}>{data.new}</Text>
          </View>

          <View style={styles.labelItem}>
            <View style={[styles.dot, styles.greenDot]} />
            <Text style={styles.labelText}>Returning</Text>
            <Text style={styles.labelValue}>{data.returning}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#171725',
    marginBottom: 24,
  },
  gaugeContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  svgContainer: {
    marginBottom: 16,
  },
  centerValue: {
    position: 'absolute',
    top: 55,
    alignItems: 'center',
  },
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#171725',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  labelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  grayDot: {
    backgroundColor: '#ECECEE',
  },
  greenDot: {
    backgroundColor: '#00a86b',
  },
  labelText: {
    fontSize: 14,
    color: '#767676',
    marginRight: 4,
  },
  labelValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171725',
  },
});

export default PerformanceGauge;