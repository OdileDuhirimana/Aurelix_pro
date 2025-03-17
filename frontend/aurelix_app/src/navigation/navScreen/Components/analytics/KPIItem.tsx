import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowUp, ArrowDown, Target, Briefcase, Users } from 'lucide-react-native';

interface KPIItemProps {
  value: number | string;
  subtitle: string;
  color: string;
  percentageChange?: number;
  showCircle?: boolean;
  isCompact?: boolean;
  additionalData?: string;
  type: 'hitRate' | 'visitors' | 'deals';
  onPress?: () => void;
}

const KPIItem: React.FC<KPIItemProps> = ({
  value,
  subtitle,
  color,
  percentageChange,
  showCircle = true,
  isCompact = false,
  additionalData,
  type,
  onPress
}) => {
  // Format percentage change
  const formatPercentageChange = (change: number): string => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  // Get the appropriate icon based on KPI type
  const renderIcon = () => {
    switch (type) {
      case 'hitRate':
        return <Target size={18} color={color} />;
      case 'deals':
        return <Briefcase size={18} color={color} />;
      case 'visitors':
        return <Users size={18} color={color} />;
      default:
        return null;
    }
  };

  return (
    <View style={
      styles.kpiItemContainer
    }>
      <View style={[
        styles.kpiItem, 
        isCompact && styles.kpiItemCompact
      ]}>
        {showCircle && (
          <View style={[
            styles.circleContainer, 
            { borderColor: color },
            type === 'visitors' && styles.noCircle
          ]}>
            {renderIcon()}
          </View>
        )}
        
        <View style={styles.kpiContent}>
          <View style={styles.kpiValueContainer}>
            {!showCircle && (
              <Text style={styles.kpiValue}>{value}</Text>
            )}
            {showCircle && (
              <Text style={[styles.circleValue, { color: type === 'visitors' ? '#171725' : color }]}>
                {value}
              </Text>
            )}
            
            {percentageChange !== undefined && (
              <View style={styles.percentageChangeContainer}>
                <Text 
                  style={[
                    styles.percentageChangeText,
                    { color: percentageChange >= 0 ? '#fc5a5a' : '#fc5a5a' }
                  ]}
                >
                  {formatPercentageChange(percentageChange)}
                </Text>
                {percentageChange >= 0 ? (
                  <ArrowUp size={12} color="#fc5a5a" />
                ) : (
                  <ArrowDown size={12} color="#fc5a5a" />
                )}
              </View>
            )}
          </View>
          
          <Text style={styles.kpiSubtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  kpiItemContainer: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectedContainer: {
    borderWidth: 1,
    borderColor: '#001dff',
  },
  kpiItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  kpiItemCompact: {
    marginBottom: 0,
  },
  circleContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  noCircle: {
    borderWidth: 0,
  },
  circleValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  kpiContent: {
    // flex: 1,
  },
  kpiValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#171725',
    marginRight: 8,
  },
  percentageChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  percentageChangeText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 2,
  },
  kpiSubtitle: {
    fontSize: 14,
    color: '#767676',
  },
  additionalDataContainer: {
    backgroundColor: '#001dff',
    padding: 6,
    alignItems: 'center',
  },
  additionalDataText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default KPIItem;
