export interface Investor {
    id: string
    name: string
    investments: string
    industry: string
    location: string
    image: string
  }
  
  export interface Region {
    id: string
    name: string
    active: boolean
  }
  
  export interface FilterOption {
    id: string
    name: string
  }
  
  export interface SortOption {
    id: string
    name: string
    field: string
    direction: "asc" | "desc"
  }
  
  export interface DashboardData {
    hitRate: number
    deals: number
    visitors: {
      count: number
      change: number
    }
    performance: {
      total: number
      new: number
      returning: number
    }
    chartData: ChartDataPoint[]
    profileViews: ProfileView[]
  }
  
  export interface ChartDataPoint {
    date: string
    value: number
  }
  
  export interface ProfileView {
    region: string
    company: string
    count: number
    trend: "up" | "down"
    chartData: number[]
  }
  export interface ChatMessage {
    id: string
    text: string
    sender: "user" | "assistant"
    timestamp: string
    isError?: boolean
  }
  
  