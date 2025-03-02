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
  
  