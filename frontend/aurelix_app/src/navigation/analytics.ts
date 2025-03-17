import { ReactNode } from 'react';

export interface KPI {
  id: string;
  title: string;
  value: number;
  previousValue: number;
  percentageChange: number;
  icon: ReactNode;
  color: string;
}

export interface PerformanceData {
  total: number;
  new: number;
  returning: number;
  percentageNew: number;
  percentageReturning: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string;
    strokeWidth?: number;
  }[];
  legend?: string[];
}

export interface ProfileView {
  id: string;
  country: string;
  company: string;
  count: number;
  previousCount: number;
  percentageChange: number;
  trend: number[];
}

export interface AnalyticsData {
  hitRate: {
    current: number;
    previous: number;
    percentageChange: number;
  };
  visitors: {
    current: number;
    previous: number;
    percentageChange: number;
  };
  deals: {
    current: number;
    previous: number;
    percentageChange: number;
  };
  performance: PerformanceData;
  timeSeriesData: {
    startDate: string;
    endDate: string;
    data: number[];
    labels: string[];
  };
  profileViews: {
    monthlyAverage: number;
    views: ProfileView[];
  };
}