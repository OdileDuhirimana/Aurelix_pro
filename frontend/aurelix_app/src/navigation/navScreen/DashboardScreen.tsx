import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Svg, Path, Circle, G, Line, Text as SvgText, Stop, Defs, LinearGradient } from 'react-native-svg';


// Get screen dimensions for responsive design
const { width: screenWidth } = Dimensions.get('window');

// Mock data - would be fetched from backend in a real app
const initialData = {
  hitRate: 63,
  deals: 71,
  visitors: {
    count: 14254,
    change: 1.5
  },
  performance: {
    total: 40,
    new: 15,
    returning: 25
  },
  chartData: [
    { date: '1', value: 30 },
    { date: '2', value: 45 },
    { date: '3', value: 28 },
    { date: '4', value: 35 },
    { date: '5', value: 50 },
    { date: '6', value: 40 },
    { date: '7', value: 30 },
    { date: '8', value: 45 },
    { date: '9', value: 55 },
    { date: '10', value: 40 },
    { date: '11', value: 30 },
    { date: '12', value: 25 },
    { date: '13', value: 40 },
    { date: '14', value: 60 },
    { date: '15', value: 45 },
    { date: '16', value: 35 },
    { date: '17', value: 25 },
    { date: '18', value: 30 },
    { date: '19', value: 50 },
    { date: '20', value: 65 },
  ],
  profileViews: [
    {
      region: 'Rwandans',
      company: 'Bralirwa',
      count: 165,
      trend: 'up',
      chartData: [20, 30, 25, 40, 35]
    },
    {
      region: 'America',
      company: 'Google',
      count: 150,
      trend: 'down',
      chartData: [40, 30, 45, 25, 35]
    }
  ]
};

const DashboardScreen = ({ navigation }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate fetching data from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await api.getDashboardData();
        // setData(response.data);
        
        // Simulate API delay
        setTimeout(() => {
          setData(initialData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Circular Progress component
  const CircularProgress = ({ percentage, color, size = 60, strokeWidth = 6 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
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
    );
  };

  // Semi-circular gauge component
  const SemiCircularGauge = ({ value, maxValue, size = 180 }) => {
    const percentage = (value / maxValue) * 100;
    const radius = size / 2 - 10;
    const circumference = radius * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <Svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E6E6E6"
          strokeWidth={12}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference / 2}
          transform={`rotate(-180, ${size / 2}, ${size / 2})`}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#00a86b"
          strokeWidth={12}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference / 2 + strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-180, ${size / 2}, ${size / 2})`}
        />
        <G>
          <Circle cx={size / 2} cy={size / 2 + 10} r={20} fill="#f5f5f5" />
          <SvgText
            x={size / 2}
            y={size / 2 + 15}
            fontSize="16"
            fontWeight="bold"
            fill="#000"
            textAnchor="middle"
          >
            {value}
          </SvgText>
        </G>
      </Svg>
    );
  };

  // Line chart component
  const LineChart = ({ data, width, height }) => {
    if (!data || data.length === 0) return null;

    const maxValue = Math.max(...data.map(item => item.value));
    const minValue = Math.min(...data.map(item => item.value));
    const range = maxValue - minValue;
    
    const xStep = width / (data.length - 1);
    
    // Generate points for the path
    const points = data.map((item, index) => {
      const x = index * xStep;
      const y = height - ((item.value - minValue) / range) * height;
      return `${x},${y}`;
    });
    
    const pathData = `M${points.join(' L')}`;
    
    // Generate points for the area under the curve
    const areaPoints = [
      `0,${height}`,
      ...points,
      `${width},${height}`,
    ];
    
    const areaPathData = `M${areaPoints.join(' L')} Z`;

    return (
      <Svg width={width} height={height}>
        {/* Grid lines */}
        {[0, 1, 2, 3].map((_, i) => (
          <Line
            key={i}
            x1="0"
            y1={height * (i + 1) / 4}
            x2={width}
            y2={height * (i + 1) / 4}
            stroke="#E0E0E0"
            strokeWidth="1"
          />
        ))}
        
        {[0, 1, 2, 3, 4].map((_, i) => (
          <Line
            key={i}
            x1={width * i / 4}
            y1="0"
            x2={width * i / 4}
            y2={height}
            stroke="#E0E0E0"
            strokeWidth="1"
          />
        ))}
        
        {/* Area under the curve with gradient */}
        <Path
          d={areaPathData}
          fill="url(#gradient)"
          opacity={0.5}
        />
        
        {/* Line */}
        <Path
          d={pathData}
          fill="none"
          stroke="#00a86b"
          strokeWidth="3"
        />
        
        {/* Gradient definition */}
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#00a86b" stopOpacity="0.8" />
          <Stop offset="100%" stopColor="#00a86b" stopOpacity="0.1" />
        </LinearGradient>
      </Svg>
    );
  };

  // Mini line chart for profile views
  const MiniLineChart = ({ data, width = 80, height = 30, color }) => {
    if (!data || data.length === 0) return null;

    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    
    const xStep = width / (data.length - 1);
    
    // Generate points for the path
    const points = data.map((value, index) => {
      const x = index * xStep;
      const y = height - ((value - minValue) / range) * height;
      return `${x},${y}`;
    });
    
    const pathData = `M${points.join(' L')}`;

    return (
      <Svg width={width} height={height}>
        <Path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </Svg>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00a86b" />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              setLoading(true);
              setError(null);
              // Retry fetching data
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search and Notification */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search investors..."
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricItem}>
            <View style={styles.metricIconContainer}>
              <CircularProgress percentage={data.hitRate} color="#00a86b" />
              <Text style={styles.metricPercentage}>{data.hitRate}%</Text>
            </View>
            <Text style={styles.metricLabel}>Hit Rate this year</Text>
          </View>
          
          <View style={styles.metricItem}>
            <View style={styles.visitorContainer}>
              <Text style={styles.visitorCount}>{data.visitors.count.toLocaleString()}</Text>
              <View style={styles.changeContainer}>
                <Text style={[styles.changeText, { color: '#fc5a5a' }]}>
                  {data.visitors.change}% {data.visitors.change > 0 ? '↑' : '↓'}
                </Text>
              </View>
            </View>
            <Text style={styles.metricLabel}>Visitors this year</Text>
          </View>
        </View>

        <View style={styles.metricsContainer}>
          <View style={styles.metricItem}>
            <View style={styles.metricIconContainer}>
              <CircularProgress percentage={data.deals} color="#f8c82d" />
              <Text style={styles.metricPercentage}>{data.deals}%</Text>
            </View>
            <Text style={styles.metricLabel}>Deals made this year</Text>
          </View>
          <View style={styles.metricItem} />
        </View>

        {/* Overall Performance */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Overall Performance</Text>
          <View style={styles.performanceContainer}>
            <SemiCircularGauge value={data.performance.total} maxValue={100} />
            <View style={styles.performanceBreakdown}>
              <View style={styles.performanceItem}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#E6E6E6' }]} />
                  <Text style={styles.legendText}>New</Text>
                </View>
                <Text style={styles.performanceValue}>{data.performance.new}</Text>
              </View>
              <View style={styles.performanceItem}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#00a86b' }]} />
                  <Text style={styles.legendText}>Returning</Text>
                </View>
                <Text style={styles.performanceValue}>{data.performance.returning}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartPeriod}>Apr 30 - May 30</Text>
          <View style={styles.chart}>
            <LineChart 
              data={data.chartData} 
              width={screenWidth - 60} 
              height={180} 
            />
          </View>
          <View style={styles.chartTicks}>
            {[...Array(20)].map((_, i) => (
              <View key={i} style={styles.tick} />
            ))}
          </View>
        </View>

        {/* Profile Views */}
        <View style={styles.profileViewsContainer}>
          <View style={styles.profileViewsHeader}>
            <View>
              <Text style={styles.profileViewsTitle}>Profile views</Text>
              <Text style={styles.profileViewsSubtitle}>Monthly Average</Text>
            </View>
            <TouchableOpacity style={styles.investorsButton}>
              <Text style={styles.investorsButtonText}>Investors</Text>
              <Text style={styles.investorsButtonIcon}>▼</Text>
            </TouchableOpacity>
          </View>

          {data.profileViews.map((item, index) => (
            <View key={index} style={styles.profileViewItem}>
              <View>
                <Text style={styles.regionText}>{item.region}</Text>
                <Text style={styles.companyText}>{item.company}</Text>
              </View>
              <View style={styles.profileViewChart}>
                <MiniLineChart 
                  data={item.chartData} 
                  color={item.trend === 'up' ? '#00a86b' : '#fc5a5a'} 
                />
              </View>
              <View style={styles.profileViewCount}>
                <Text style={styles.countText}>{item.count}</Text>
                <Text style={[
                  styles.trendIcon, 
                  { color: item.trend === 'up' ? '#00a86b' : '#fc5a5a' }
                ]}>
                  {item.trend === 'up' ? '↑' : '↓'}
                </Text>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing to account for navigation */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  notificationButton: {
    marginLeft: 15,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    fontSize: 20,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  metricItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  metricIconContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricPercentage: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: 'bold',
  },
  metricLabel: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  visitorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visitorCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  changeContainer: {
    marginLeft: 8,
  },
  changeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  performanceContainer: {
    alignItems: 'center',
  },
  performanceBreakdown: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  performanceItem: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartPeriod: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
  },
  chartTicks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  tick: {
    width: 1,
    height: 4,
    backgroundColor: '#ccc',
  },
  profileViewsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileViewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileViewsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileViewsSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  investorsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  investorsButtonText: {
    fontSize: 14,
    color: '#00a86b',
    fontWeight: 'bold',
  },
  investorsButtonIcon: {
    fontSize: 12,
    color: '#00a86b',
    marginLeft: 5,
  },
  profileViewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  regionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  companyText: {
    fontSize: 14,
    color: '#666',
  },
  profileViewChart: {
    width: 80,
  },
  profileViewCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  trendIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsButton: {
    backgroundColor: '#00a86b',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#fc5a5a',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#00a86b',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;