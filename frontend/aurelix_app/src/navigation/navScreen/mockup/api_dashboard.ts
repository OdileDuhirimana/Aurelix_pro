import type { DashboardData } from "../../index"

// Mock data - would be fetched from backend in a real app
const initialData: DashboardData = {
  hitRate: 63,
  deals: 71,
  visitors: {
    count: 14254,
    change: 1.5,
  },
  performance: {
    total: 40,
    new: 15,
    returning: 25,
  },
  chartData: [
    { date: "1", value: 30 },
    { date: "2", value: 45 },
    { date: "3", value: 28 },
    { date: "4", value: 35 },
    { date: "5", value: 50 },
    { date: "6", value: 40 },
    { date: "7", value: 30 },
    { date: "8", value: 45 },
    { date: "9", value: 55 },
    { date: "10", value: 40 },
    { date: "11", value: 30 },
    { date: "12", value: 25 },
    { date: "13", value: 40 },
    { date: "14", value: 60 },
    { date: "15", value: 45 },
    { date: "16", value: 35 },
    { date: "17", value: 25 },
    { date: "18", value: 30 },
    { date: "19", value: 50 },
    { date: "20", value: 65 },
  ],
  profileViews: [
    {
      region: "Rwandans",
      company: "Bralirwa",
      count: 165,
      trend: "up",
      chartData: [20, 30, 25, 40, 35],
    },
    {
      region: "America",
      company: "Google",
      count: 150,
      trend: "down",
      chartData: [40, 30, 45, 25, 35],
    },
  ],
}

// Simulated API calls with delay to mimic network requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    // Simulate API delay
    await delay(1000)
    return initialData
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    throw new Error("Failed to load dashboard data")
  }
}

export const fetchFilteredDashboardData = async (filter: string): Promise<DashboardData> => {
  try {
    // Simulate API delay
    await delay(800)

    // In a real app, this would filter based on the parameter
    // For now, just return the same data
    return initialData
  } catch (error) {
    console.error("Error fetching filtered dashboard data:", error)
    throw new Error("Failed to load filtered dashboard data")
  }
}

