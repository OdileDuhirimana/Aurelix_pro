import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface TimeSeriesChartProps {
  startDate: string;
  endDate: string;
  data: number[];
  labels: string[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  startDate = 'Apr 30',
  endDate = 'May 30',
  data = [50, 40, 60, 35, 55, 45, 60, 40, 65, 50, 35, 55, 40, 50, 65],
  labels = []
}) => {
  // Screen dimensions for responsive design
  const screenWidth = Dimensions.get('window').width;
  
  // Format the date range to match the design
  const formattedDateRange = `${startDate} - ${endDate}`;
  
  // Prepare chart data
  const prepareChartData = () => {
    // Create empty labels for minimal x-axis
    const visibleLabels = Array(6).fill('');
    
    return {
      labels: visibleLabels,
      datasets: [
        {
          data: data,
          color: (opacity = 1) => `rgba(0, 168, 107, ${opacity})`, // Green color
          strokeWidth: 2.5
        }
      ]
    };
  };
  
  const chartData = prepareChartData();
  
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartDateRange}>{formattedDateRange}</Text>
      
      <LineChart
        data={chartData}
        width={screenWidth - 38} 
        height={180}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 168, 107, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(118, 118, 118, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '0', 
            strokeWidth: '0',
          },
          propsForBackgroundLines: {
            strokeDasharray: '',
            stroke: '#E9EDF0',
            strokeWidth: 0.8
          },
          fillShadowGradient: '#00a86b',
          fillShadowGradientOpacity: 1,
          fillShadowGradientFrom: '#00a86b',
          fillShadowGradientTo: '#ffffff',
          useShadowColorFromDataset: false
        }}
        bezier
        style={styles.chart}
        withInnerLines={false}
        withOuterLines={false}
        withHorizontalLines={false}
        withVerticalLines={true}
        withVerticalLabels={false}
        withHorizontalLabels={false}
        withDots={false}
        segments={5}
        formatXLabel={() => ''}
        renderDotContent={() => null}
        getDotColor={() => 'transparent'}
        hidePointsAtIndex={[]}
        fromZero={true}
        transparent={true}
      />
      
      {/* Custom X-axis tick marks */}
      <View style={styles.tickContainer}>
        {Array(20).fill(0).map((_, index) => (
          <View key={index} style={styles.tick} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  chartDateRange: {
    fontSize: 14,
    fontWeight: '500',
    color: '#171725',
    textAlign: 'center',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  tickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -15,
    marginBottom: -5,
  },
  tick: {
    width: 1,
    height: 4,
    backgroundColor: '#CCCCCC',
  }
});

export default TimeSeriesChart;