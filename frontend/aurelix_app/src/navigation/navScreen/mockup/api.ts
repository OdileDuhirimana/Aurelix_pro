import type { Investor, Region, FilterOption, SortOption } from "../../index"

// Mock data for investors
const investorsData: Investor[] = [
  {
    id: "1",
    name: "Mark Robinson",
    investments: "150+",
    industry: "Agriculture",
    location: "Rwanda",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-REd9M7FqoOgx3wvOSnUBXgy7UsBLuw.png#crop=30,390,220,580",
  },
  {
    id: "2",
    name: "John Doe",
    investments: "150+",
    industry: "Agriculture",
    location: "Rwanda",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-REd9M7FqoOgx3wvOSnUBXgy7UsBLuw.png#crop=240,390,430,580",
  },
  {
    id: "3",
    name: "Fred Jones",
    investments: "150+",
    industry: "Agriculture",
    location: "Rwanda",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-REd9M7FqoOgx3wvOSnUBXgy7UsBLuw.png#crop=30,700,220,890",
  },
  {
    id: "4",
    name: "James Smith",
    investments: "150+",
    industry: "Agriculture",
    location: "Rwanda",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-REd9M7FqoOgx3wvOSnUBXgy7UsBLuw.png#crop=240,700,430,890",
  },
  {
    id: "5",
    name: "Emily Winner",
    investments: "150+",
    industry: "Agriculture",
    location: "Rwanda",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-REd9M7FqoOgx3wvOSnUBXgy7UsBLuw.png#crop=30,1010,220,1200",
  },
  {
    id: "6",
    name: "Christopher Brown",
    investments: "150+",
    industry: "Agriculture",
    location: "Rwanda",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-REd9M7FqoOgx3wvOSnUBXgy7UsBLuw.png#crop=240,1010,430,1200",
  },
]

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

