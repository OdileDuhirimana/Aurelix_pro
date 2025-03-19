import type { Investor, Business, Region, FilterOption, SortOption, UserRole } from "../../index"
import { 
  fetchInvestors as fetchInvestorsData, 
  fetchRegions as fetchInvestorsRegions,
  fetchSectors as fetchInvestorsSectors,
  fetchSortOptions as fetchInvestorsSortOptions,
  fetchStats as fetchInvestorsStats
} from "./api_home"

import { 
  fetchBusinesses as fetchBusinessesData, 
  fetchRegions as fetchBusinessesRegions,
  fetchSectors as fetchBusinessesSectors,
  fetchSortOptions as fetchBusinessesSortOptions,
  fetchStats as fetchBusinessesStats
} from "./api_investor"

// Fetch items based on user role
export const fetchInvestors = async (
  region?: string,
  sector?: string,
  sortOptionId?: string | null,
  searchQuery?: string,
): Promise<Investor[]> => {
  return fetchInvestorsData(region, sector, sortOptionId, searchQuery)
}

export const fetchBusinesses = async (
  region?: string,
  sector?: string,
  sortOptionId?: string | null,
  searchQuery?: string,
): Promise<Business[]> => {
  return fetchBusinessesData(region, sector, sortOptionId, searchQuery)
}

// Fetch regions based on user role
export const fetchRegions = async (userRole: UserRole): Promise<Region[]> => {
  return userRole === 'investor' ? fetchBusinessesRegions() : fetchInvestorsRegions()
}

// Fetch sectors based on user role
export const fetchSectors = async (userRole: UserRole): Promise<FilterOption[]> => {
  return userRole === 'investor' ? fetchBusinessesSectors() : fetchInvestorsSectors()
}

// Fetch sort options based on user role
export const fetchSortOptions = async (userRole: UserRole): Promise<SortOption[]> => {
  return userRole === 'investor' ? fetchBusinessesSortOptions() : fetchInvestorsSortOptions()
}

// Fetch stats based on user role
export const fetchStats = async (userRole: UserRole) => {
  return userRole === 'investor' ? fetchBusinessesStats() : fetchInvestorsStats()
}