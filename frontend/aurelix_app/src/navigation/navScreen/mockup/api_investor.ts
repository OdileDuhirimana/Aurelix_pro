import type { Business, Region, FilterOption, SortOption } from "../../index"

// Define continents and their countries for better region filtering
const continentMapping: Record<string, string[]> = {
  Africa: ["Rwanda", "South Africa", "Kenya", "Nigeria"],
  Europe: ["Germany", "France", "Italy", "Netherlands", "Sweden", "Switzerland", "Poland", "Russia", "Spain", "Turkey"],
  America: ["Brazil", "Mexico", "Argentina", "United States", "Canada"],
  Asia: ["Singapore", "China", "South Korea", "UAE", "Thailand", "Malaysia", "Philippines"],
}


const businessesData: Business[] = [
    {
      id: "1",
      image: "https://cdn.builder.io/api/v1/image/assets/e6237926690d4236ab3eacc5cc13de41/e99a07fee84a8d1799a02fd8fe6e4654332c1a051012d37f7adb4797ae053852?placeholderIfAbsent=true",
      name: "Canaberra",
      investors: "15+",
      industry: "Cafe",
      location: "Rwanda",
      description: "Located in the heart of Kigali, Canaberra Café blends premium Rwandan coffee, artisanal pastries, and a stylish co-working space. Catering to both locals and tourists, we offer a unique coffee experience in Rwanda's thriving hospitality market. Invest in Canaberra and be part of Kigali's growing café culture!"
    },
    {
      id: "2",
      image: "https://cdn.builder.io/api/v1/image/assets/e6237926690d4236ab3eacc5cc13de41/8ff2a825c15ec0d9002d569aeecb4aa95d0d21074e9856e2fd134ddc9b784542?placeholderIfAbsent=true",
      name: "MediConnect",
      investors: "5+",
      industry: "Medical Care",
      location: "Rwanda",
      description: "MediConnect is revolutionizing healthcare accessibility in Rwanda by providing seamless digital patient management and telemedicine services. With a focus on efficiency and quality care, we connect patients with trusted healthcare professionals. Join us in shaping the future of digital health solutions!"
    },
    {
      id: "3",
      image: "https://cdn.builder.io/api/v1/image/assets/e6237926690d4236ab3eacc5cc13de41/2ed84fe87e660368665b997a5438b1450d59a6bbc3584bb46c4804c8648604a3?placeholderIfAbsent=true",
      name: "Motorolla",
      investors: "10+",
      industry: "Electronics",
      location: "USA",
      description: "Motorolla is a leader in innovative electronic solutions, pioneering advancements in communication, security, and consumer electronics. With a strong market presence, we continue to redefine how people connect. Invest in cutting-edge technology with Motorolla and be part of the future!"
    },
    {
      id: "4",
      image: "https://cdn.builder.io/api/v1/image/assets/e6237926690d4236ab3eacc5cc13de41/5793c200de9b916819edd8e3ce29d09dad03680129736ced41128f4cd27cc370?placeholderIfAbsent=true",
      name: "Mac Donalds",
      investors: "80+",
      industry: "Fast Food",
      location: "Worldwide",
      description: "As one of the world's most recognizable brands, Mac Donalds delivers fast, delicious meals to millions daily. With a commitment to quality and innovation, we continue to dominate the global fast-food industry. Invest in a franchise that has stood the test of time!"
    },
    {
      id: "5",
      image: "https://cdn.builder.io/api/v1/image/assets/e6237926690d4236ab3eacc5cc13de41/6d570afa606556f7c0cbbfb4ef930b8ecbba30f002b3006e770382db0a1d8dfa?placeholderIfAbsent=true",
      name: "Mark Robinson",
      investors: "150+",
      industry: "Agriculture",
      location: "Rwanda",
      description: "Mark Robinson is at the forefront of sustainable agriculture in Rwanda, producing high-quality organic crops while empowering local farmers. With a focus on food security and innovation, we are shaping the future of farming. Join us in revolutionizing agriculture in Africa!"
    },
    {
      id: "6",
      image: "https://cdn.builder.io/api/v1/image/assets/e6237926690d4236ab3eacc5cc13de41/c0a5677aeea5cdb6d81bbbc3490c1854ba12c97c459ace8afb16312af141b01f?placeholderIfAbsent=true",
      name: "HerInTech",
      investors: "8+",
      industry: "Technology",
      location: "Rwanda",
      description: "HerInTech is a pioneering initiative empowering women in technology through innovation, mentorship, and career development. By bridging the gender gap in STEM, we create opportunities for women to lead in the tech industry. Invest in the future of women-led technology startups!"
    },
    {
      id: "7",
      image: "https://cdn.builder.io/api/v1/image/assets/e6237926690d4236ab3eacc5cc13de41/bad046e2ae131cc9be73816e8938afaf231c186545881676d5073dccb36d02cd?placeholderIfAbsent=true",
      name: "Christopher Brown",
      investors: "150+",
      industry: "Agriculture",
      location: "Rwanda",
      description: "Christopher Brown Agriculture is dedicated to modern farming techniques and high-yield crops, boosting Rwanda’s agricultural economy. With a focus on sustainability, we produce top-quality goods while empowering local farmers. Join us in cultivating a greener future!"
    },
    {
      id: "8",
      image: "https://cdn.builder.io/api/v1/image/assets/e6237926690d4236ab3eacc5cc13de41/41aab7e86a94d98ee939952e1d3b01bd5fa72f430580e757a10260d04fe86c7c?placeholderIfAbsent=true",
      name: "Rwanda Coffee",
      investors: "150+",
      industry: "Agriculture",
      location: "Rwanda",
      description: "Rwanda Coffee is committed to delivering premium, organic coffee sourced from Rwanda’s rich volcanic soil. With a global market reach, we bring the best of Rwandan coffee to the world. Invest in excellence and be part of Rwanda’s booming coffee industry!"
    },
    {
      id: "9",
      image: "https://cdn.builder.io/api/v1/image/assets/e6237926690d4236ab3eacc5cc13de41/25ca32c2885aa3618dab9f04c88d8f091748846a9fb03c5183b8bef5cea81420?placeholderIfAbsent=true",
      name: "Volkswagen",
      investors: "1M+",
      industry: "Automobile",
      location: "Germany",
      description: "As a global automotive leader, Volkswagen combines innovation, sustainability, and performance to produce high-quality vehicles. With a commitment to electric mobility and cutting-edge design, we are redefining transportation. Invest in a legacy of excellence!"
    },
    {
      id: "10",
      image: "https://cdn.builder.io/api/v1/image/assets/e6237926690d4236ab3eacc5cc13de41/b9ba5295f57d0a3ef122a17ca1cddc0a6ea556cf080cc7510ac8a43e4205f4b5?placeholderIfAbsent=true",
      name: "Bralirwa",
      investors: "1K+",
      industry: "Drinks",
      location: "Rwanda",
      description: "Bralirwa is Rwanda’s leading beverage company, producing iconic brands that bring people together. With a focus on quality, sustainability, and innovation, we dominate the drinks industry. Be part of Rwanda’s favorite brewery and soft drink brand!"
    },
    {
      id: "11",
      image: "https://cdn.builder.io/api/v1/image/assets/e6237926690d4236ab3eacc5cc13de41/a793afb28bd8a04158a0d58faa58f41a92bdfc09a3aca6c2a0d3fb46272d28a6?placeholderIfAbsent=true",
      name: "Equity",
      investors: "1K+",
      industry: "Banking",
      location: "EAC",
      description: "Equity Bank is revolutionizing financial services across East Africa by providing inclusive banking solutions. With a strong commitment to economic empowerment, we support individuals and businesses in their financial growth. Invest in the future of African banking!"
    }
  ];
     

// Region filter options
const regionsData: Region[] = [
  { id: "1", name: "All", active: true },
  { id: "2", name: "Rwanda", active: false },
  { id: "3", name: "Africa", active: false },
  { id: "4", name: "Europe", active: false },
  { id: "5", name: "America", active: false },
  { id: "6", name: "Asia", active: false },
]

// Sector filter options
const sectorsData: FilterOption[] = [
  { id: "1", name: "Agriculture" },
  { id: "2", name: "Technology" },
  { id: "3", name: "Medical Care" },
  { id: "4", name: "Fast Food" },
  { id: "5", name: "Banking" },
  { id: "6", name: "Automobile" },
  { id: "7", name: "Electronics" },
  { id: "8", name: "Fashion" },
  { id: "9", name: "Drink" },
]

// Sort options
export const sortOptionsData: SortOption[] = [
  { id: "nameAsc", name: "Name (A-Z)", field: "name", direction: "asc" },
  { id: "nameDesc", name: "Name (Z-A)", field: "name", direction: "desc" },
  { id: "locationAsc", name: "Location (A-Z)", field: "location", direction: "asc" },
  { id: "locationDesc", name: "Location (Z-A)", field: "location", direction: "desc" },
  { id: "industryAsc", name: "Industry (A-Z)", field: "industry", direction: "asc" },
  { id: "industryDesc", name: "Industry (Z-A)", field: "industry", direction: "desc" },
  { id: "trendingDesc", name: "Trending", field: "investors", direction: "desc" },
]

// Improved delay function with timeout and error handling
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      resolve()
    }, ms)

    // Simulate occasional network errors (1% chance)
    if (Math.random() < 0.01) {
      clearTimeout(timeout)
      reject(new Error("Network request failed"))
    }
  })
}

/**
 * Fetch businesses with filtering, sorting, and search capabilities
 */
export const fetchBusinesses = async (
  region?: string,
  sector?: string,
  sortOptionId?: string | null,
  searchQuery?: string,
): Promise<Business[]> => {
  try {
    await delay(800) // Simulate network delay

    let filteredBusinesses = [...businessesData]

    // Apply region filter with continent support
    if (region && region !== "All") {
      if (Object.keys(continentMapping).includes(region)) {
        // If region is a continent, include all countries in that continent
        const countriesInContinent = continentMapping[region]
        filteredBusinesses = filteredBusinesses.filter(
          (business) => countriesInContinent.includes(business.location) || business.location === region,
        )
      } else {
        // If region is a specific country
        filteredBusinesses = filteredBusinesses.filter((business) => business.location === region)
      }
    }

    // Apply sector filter
    if (sector) {
      filteredBusinesses = filteredBusinesses.filter((business) => business.industry === sector)
    }

    // Apply search query - improved to search across multiple fields
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim()
      filteredBusinesses = filteredBusinesses.filter((business) => {
        return (
          business.name.toLowerCase().includes(query) ||
          business.industry.toLowerCase().includes(query) ||
          business.location.toLowerCase().includes(query) ||
          business.investors.toLowerCase().includes(query)
        )
      })
    }

    // Apply sorting
    if (sortOptionId) {
      const sortOption = sortOptionsData.find((option) => option.id === sortOptionId)
      if (sortOption) {
        const { field, direction } = sortOption
        filteredBusinesses.sort((a, b) => {
          const valueA = a[field as keyof Business] || ""
          const valueB = b[field as keyof Business] || ""

          if (direction === "asc") {
            return String(valueA).localeCompare(String(valueB))
          } else {
            return String(valueB).localeCompare(String(valueA))
          }
        })
      }
    }

    return filteredBusinesses
  } catch (error) {
    console.error("Error fetching businesses:", error)
    throw error
  }
}

/**
 * Fetch available regions
 */
export const fetchRegions = async (): Promise<Region[]> => {
  try {
    await delay(500)
    return regionsData
  } catch (error) {
    console.error("Error fetching regions:", error)
    throw error
  }
}

/**
 * Fetch available sectors
 */
export const fetchSectors = async (): Promise<FilterOption[]> => {
  try {
    await delay(500)
    return sectorsData
  } catch (error) {
    console.error("Error fetching sectors:", error)
    throw error
  }
}

/**
 * Fetch available sort options
 */
export const fetchSortOptions = async (): Promise<SortOption[]> => {
  try {
    await delay(300)
    return sortOptionsData
  } catch (error) {
    console.error("Error fetching sort options:", error)
    throw error
  }
}

/**
 * Fetch statistics data
 */
export const fetchStats = async (): Promise<{
  businesses: string
  businessesChange: string
  businessesIncreasing: boolean
  newBusinesses: string
  newBusinessesChange: string
  newBusinessesIncreasing: boolean
}> => {
  try {
    await delay(600)
    return {
      businesses: "100+",
      businessesChange: "2.5%",
      businessesIncreasing: true,
      newBusinesses: "80+",
      newBusinessesChange: "1.3%",
      newBusinessesIncreasing: true,
    }
  } catch (error) {
    console.error("Error fetching stats:", error)
    throw error
  }
}

