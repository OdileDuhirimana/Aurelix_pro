import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react-native';
import { ProfileView as ProfileViewType } from '../../../analytics';
import MiniChart from './MiniChart';

interface ProfileViewsProps {
  monthlyAverage: number;
  views: ProfileViewType[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onDetailsPress: () => void;
}

const ProfileViews: React.FC<ProfileViewsProps> = ({
  monthlyAverage,
  views,
  selectedFilter,
  onFilterChange,
  onDetailsPress
}) => {
  return (
    <View style={styles.profileViewsContainer}>
      <View style={styles.profileViewsHeader}>
        <View>
          <Text style={styles.profileViewsTitle}>Profile views</Text>
          <Text style={styles.profileViewsSubtitle}>Monthly Average</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => onFilterChange(selectedFilter === 'Investors' ? 'Countries' : 'Investors')}
        >
          <Text style={styles.filterButtonText}>{selectedFilter}</Text>
          <ChevronDown size={16} color="#00a86b" />
        </TouchableOpacity>
      </View>
      
      {views.map((view) => (
        <View key={view.id} style={styles.profileViewItem}>
          <View style={styles.profileViewInfo}>
            <Text style={styles.profileViewCountry}>{view.country}</Text>
            <Text style={styles.profileViewCompany}>{view.company}</Text>
          </View>
          
          <View style={styles.profileViewTrendContainer}>
            <View style={styles.miniChartContainer}>
              <MiniChart 
                data={view.trend} 
                color={view.percentageChange >= 0 ? '#00a86b' : '#fc5a5a'} 
              />
            </View>
            
            <View style={styles.profileViewCountContainer}>
              <Text style={styles.profileViewCount}>{view.count}</Text>
              {view.percentageChange >= 0 ? (
                <ArrowUp size={12} color="#00a86b" />
              ) : (
                <ArrowDown size={12} color="#fc5a5a" />
              )}
            </View>
          </View>
        </View>
      ))}
      
      <TouchableOpacity 
        style={styles.detailsButton}
        onPress={onDetailsPress}
      >
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileViewsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  profileViewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    gap: 120, 
  },
  profileViewsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171725',
  },
  profileViewsSubtitle: {
    fontSize: 14,
    color: '#221F1F99',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#00a86b',
    marginRight: 4,
  },
  profileViewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileViewInfo: {
    flex: 1,
  },
  profileViewCountry: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171725',
    marginBottom: 2,
  },
  profileViewCompany: {
    fontSize: 14,
    color: '#221F1F99',
  },
  profileViewTrendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 80,
  },
  miniChartContainer: {
    width: 60,
    height: 20,
    marginRight: 12,
  },
  profileViewCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
  },
  profileViewCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171725',
    marginRight: 4,
  },
  detailsButton: {
    width: 215,
    backgroundColor: '#00a86b',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FCE986',
  },
});

export default ProfileViews;