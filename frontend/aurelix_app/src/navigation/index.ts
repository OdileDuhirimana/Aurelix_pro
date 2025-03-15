export interface Business {
  id: string
  name: string
  image: string
  investors: string
  industry: string
  location: string
  description?: string
  contact?: {
    phone?: string
    email?: string
    website?: string
  }
}

export interface Investor {
  id: string
  name: string
  image: string
  investments: string
  industry: string
  location: string
}

export interface Investor2 {
  id: string
  name: string
  profileImage: string
  investmentCount: number  // Changed from string to number
  industry: string
  location: string
  bio?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
  }
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

export interface User {
  id: string
  name: string
  avatar: string
  bio?: string
  industry?: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  status: 'sent' | 'delivered' | 'read' | 'failed'
  type: 'text' | 'image' | 'file' | 'audio'
  reactions?: string[]
  replyTo?: string
  metadata?: {
    fileName?: string
    fileSize?: number
    fileType?: string
    duration?: number
    width?: number
    height?: number
    thumbnailUrl?: string
  }
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage: Message
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  id: string
  name: string
  avatar: string
  activeSince: string
  email: string
  phone: string
  website: string
  isPremium: boolean
  hasBusinessDocuments: boolean
  createdAt: string
  updatedAt: string
}

export interface ProfileSection {
  id: string
  title: string
  icon: React.ReactNode
  action: () => void
  isPremium?: boolean
  isActive?: boolean
}
