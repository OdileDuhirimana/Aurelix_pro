import type { Investor, Region, FilterOption, SortOption } from "../../index"

const investorsData = [
  { id: "1", name: "Mark Robinson", investments: "150+", industry: "Agriculture", location: "Rwanda", image: "./images/mark_robinson.jpg" },
  { id: "2", name: "John Doe", investments: "200+", industry: "Technology", location: "Rwanda", image: "./images/john_doe.jpg" },
  { id: "3", name: "Fred Jones", investments: "180+", industry: "Healthcare", location: "Rwanda", image: "./images/fred_jones.jpg" },
  { id: "4", name: "James Smith", investments: "220+", industry: "Real Estate", location: "Rwanda", image: "./images/james_smith.jpg" },
  { id: "5", name: "Emily Winner", investments: "160+", industry: "Finance", location: "Germany", image: "./images/emily_winner.jpg" },
  { id: "6", name: "Christopher Brown", investments: "175+", industry: "Retail", location: "Rwanda", image: "./images/christopher_brown.jpg" },
  { id: "7", name: "Natalie Clark", investments: "190+", industry: "Energy", location: "France", image: "./images/natalie_clark.jpg" },
  { id: "8", name: "Oliver White", investments: "140+", industry: "E-commerce", location: "Europe", image: "./images/oliver_white.jpg" },
  { id: "9", name: "Sophia Carter", investments: "250+", industry: "Biotech", location: "Singapore", image: "./images/sophia_carter.jpg" },
  { id: "10", name: "Henry Adams", investments: "130+", industry: "Education", location: "South Africa", image: "./images/henry_adams.jpg" },
  
  { id: "11", name: "Lucas Thompson", investments: "210+", industry: "Automotive", location: "Europe", image: "./images/lucas_thompson.jpg" },
  { id: "12", name: "Grace Wilson", investments: "270+", industry: "Pharmaceuticals", location: "Italy", image: "./images/grace_wilson.jpg" },
  { id: "13", name: "Ethan Johnson", investments: "190+", industry: "Fashion", location: "Brazil", image: "./images/ethan_johnson.jpg" },
  { id: "14", name: "Ava Miller", investments: "160+", industry: "Media", location: "UAE", image: "./images/ava_miller.jpg" },
  { id: "15", name: "Michael Garcia", investments: "140+", industry: "AI & Robotics", location: "China", image: "./images/michael_garcia.jpg" },
  { id: "16", name: "William Harris", investments: "230+", industry: "Blockchain", location: "Netherlands", image: "./images/william_harris.jpg" },
  { id: "17", name: "Charlotte Anderson", investments: "170+", industry: "Cybersecurity", location: "Sweden", image: "./images/charlotte_anderson.jpg" },
  { id: "18", name: "Daniel Martinez", investments: "200+", industry: "Cloud Computing", location: "South Korea", image: "./images/daniel_martinez.jpg" },
  { id: "19", name: "Mia Rodriguez", investments: "220+", industry: "Logistics", location: "Spain", image: "./images/mia_rodriguez.jpg" },
  { id: "20", name: "Benjamin Lee", investments: "280+", industry: "Gaming", location: "Russia", image: "./images/benjamin_lee.jpg" },
  
  { id: "21", name: "Elijah King", investments: "135+", industry: "Telecommunications", location: "Nigeria", image: "./images/elijah_king.jpg" },
  { id: "22", name: "Harper Scott", investments: "195+", industry: "Food & Beverage", location: "Mexico", image: "./images/harper_scott.jpg" },
  { id: "23", name: "David Young", investments: "170+", industry: "Aerospace", location: "Turkey", image: "./images/david_young.jpg" },
  { id: "24", name: "Ella Turner", investments: "155+", industry: "Tourism", location: "Thailand", image: "./images/ella_turner.jpg" },
  { id: "25", name: "Jack Hall", investments: "145+", industry: "Agritech", location: "Kenya", image: "./images/jack_hall.jpg" },
  { id: "26", name: "Amelia Lewis", investments: "250+", industry: "Fintech", location: "Poland", image: "./images/amelia_lewis.jpg" },
  { id: "27", name: "Matthew Allen", investments: "200+", industry: "Streaming Services", location: "Malaysia", image: "./images/matthew_allen.jpg" },
  { id: "28", name: "Lily Walker", investments: "275+", industry: "Insurance", location: "Switzerland", image: "./images/lily_walker.jpg" },
  { id: "29", name: "Nathan Perez", investments: "180+", industry: "Bioengineering", location: "Argentina", image: "./images/nathan_perez.jpg" },
  { id: "30", name: "Hannah Wright", investments: "240+", industry: "Crypto", location: "Philippines", image: "./images/hannah_wright.jpg" },
  
  // Add 20 more investors following the same pattern...
];


// Region filter options
const regionsData: Region[] = [
  { id: "1", name: "Rwanda", active: false },
  { id: "2", name: "Africa", active: true },
  { id: "3", name: "Europe", active: false },
  { id: "4", name: "America", active: false },
  { id: "5", name: "Asia", active: false },
]

// Sector filter options
const sectorsData: FilterOption[] = [
  { id: "1", name: "Agriculture" },
  { id: "2", name: "Technology" },
  { id: "3", name: "Healthcare" },
  { id: "4", name: "Finance" },
  { id: "5", name: "Education" },
]

// Sort options
export const sortOptionsData: SortOption[] = [
  { id: "nameAsc", name: "Name (A-Z)", field: "name", direction: "asc" },
  { id: "nameDesc", name: "Name (Z-A)", field: "name", direction: "desc" },
  { id: "locationAsc", name: "Location (A-Z)", field: "location", direction: "asc" },
  { id: "locationDesc", name: "Location (Z-A)", field: "location", direction: "desc" },
  { id: "industryAsc", name: "Industry (A-Z)", field: "industry", direction: "asc" },
  { id: "industryDesc", name: "Industry (Z-A)", field: "industry", direction: "desc" },
]

// Simulated API calls with delay to mimic network requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchInvestors = async (
  region?: string,
  sector?: string,
  sortOptionId?: string | null,
  searchQuery?: string,
): Promise<Investor[]> => {
  await delay(800) // Simulate network delay

  let filteredInvestors = [...investorsData]

  // Apply region filter
  if (region && region !== "All") {
    filteredInvestors = filteredInvestors.filter((investor) => investor.location === region)
  }

  // Apply sector filter
  if (sector) {
    filteredInvestors = filteredInvestors.filter((investor) => investor.industry === sector)
  }

  // Apply search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredInvestors = filteredInvestors.filter(
      (investor) =>
        investor.name.toLowerCase().includes(query) ||
        investor.industry.toLowerCase().includes(query) ||
        investor.location.toLowerCase().includes(query),
    )
  }

  // Apply sorting
  if (sortOptionId) {
    const sortOption = sortOptionsData.find((option) => option.id === sortOptionId)
    if (sortOption) {
      const { field, direction } = sortOption
      filteredInvestors.sort((a, b) => {
        const valueA = a[field as keyof Investor]
        const valueB = b[field as keyof Investor]

        if (direction === "asc") {
          return String(valueA).localeCompare(String(valueB))
        } else {
          return String(valueB).localeCompare(String(valueA))
        }
      })
    }
  }

  return filteredInvestors
}

export const fetchRegions = async (): Promise<Region[]> => {
  await delay(500)
  return regionsData
}

export const fetchSectors = async (): Promise<FilterOption[]> => {
  await delay(500)
  return sectorsData
}

export const fetchSortOptions = async (): Promise<SortOption[]> => {
  await delay(300)
  return sortOptionsData
}

export const fetchStats = async (): Promise<{
  visitors: string
  visitorsChange: string
  visitorsIncreasing: boolean
  newInvestors: string
  newInvestorsChange: string
  newInvestorsIncreasing: boolean
}> => {
  await delay(600)
  return {
    visitors: "14,254",
    visitorsChange: "1.5%",
    visitorsIncreasing: false,
    newInvestors: "100+",
    newInvestorsChange: "1.3%",
    newInvestorsIncreasing: true,
  }
}

