// Define TypeScript interfaces for data structures
export interface Message {
    id: string
    senderId: string
    receiverId: string
    content: string
    timestamp: string
    read: boolean
  }
  
  export interface Conversation {
    id: string
    participantId: string
    participantName: string
    participantAvatar: string
    lastMessage: Message
    unreadCount: number
  }
  
  // API service for data fetching
  export const MessagesAPI = {
    baseUrl: "https://api.example.com",
  
    // Fetch recent conversations
    async getRecentConversations(
      userId: string,
      page = 1,
      limit = 20,
    ): Promise<{
      conversations: Conversation[]
      totalCount: number
      hasMore: boolean
    }> {
      try {
        // This would be replaced with an actual API call
        // const response = await fetch(
        //   `${this.baseUrl}/users/${userId}/conversations?page=${page}&limit=${limit}`,
        //   {
        //     headers: {
        //       'Authorization': `Bearer ${await this.getAuthToken()}`
        //     }
        //   }
        // );
        // if (!response.ok) throw new Error('Failed to fetch conversations');
        // return await response.json();
  
        // Mock data for demonstration
        await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate network delay
  
        // Mock conversations data
        const mockConversations: Conversation[] = [
          {
            id: "1",
            participantId: "user1",
            participantName: "Ange Curtis",
            participantAvatar:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,260,150,360",
            lastMessage: {
              id: "msg1",
              senderId: "user1",
              receiverId: "currentUser",
              content: "Thank you, I'm interested in your startup...",
              timestamp: "2023-03-01T14:11:00Z",
              read: false,
            },
            unreadCount: 2,
          },
          {
            id: "2",
            participantId: "user2",
            participantName: "Joselyn Gouse",
            participantAvatar:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,410,150,510",
            lastMessage: {
              id: "msg2",
              senderId: "user2",
              receiverId: "currentUser",
              content: "Thank you, I'm interested in your startup...",
              timestamp: "2023-03-01T14:11:00Z",
              read: true,
            },
            unreadCount: 0,
          },
          {
            id: "3",
            participantId: "user3",
            participantName: "Jaylon Dias",
            participantAvatar:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,560,150,660",
            lastMessage: {
              id: "msg3",
              senderId: "user3",
              receiverId: "currentUser",
              content: "Thank you, I'm interested in your startup...",
              timestamp: "2023-03-01T14:11:00Z",
              read: true,
            },
            unreadCount: 0,
          },
          {
            id: "4",
            participantId: "user4",
            participantName: "Ange Curtis",
            participantAvatar:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,710,150,810",
            lastMessage: {
              id: "msg4",
              senderId: "user4",
              receiverId: "currentUser",
              content: "Thank you, I'm interested in your startup...",
              timestamp: "2023-03-01T14:11:00Z",
              read: false,
            },
            unreadCount: 1,
          },
          {
            id: "5",
            participantId: "user5",
            participantName: "Ange Curtis",
            participantAvatar:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,860,150,960",
            lastMessage: {
              id: "msg5",
              senderId: "user5",
              receiverId: "currentUser",
              content: "Thank you, I'm interested in your startup...",
              timestamp: "2023-03-01T14:11:00Z",
              read: true,
            },
            unreadCount: 0,
          },
        ]
  
        return {
          conversations: mockConversations,
          totalCount: 15, // Total number of conversations
          hasMore: page * limit < 15, // Whether there are more conversations to load
        }
      } catch (error) {
        console.error("Error fetching conversations:", error)
        throw error
      }
    },
  
    // Mark conversation as read
    async markConversationAsRead(conversationId: string): Promise<void> {
      try {
        // This would be replaced with an actual API call
        // const response = await fetch(`${this.baseUrl}/conversations/${conversationId}/read`, {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Bearer ${await this.getAuthToken()}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // if (!response.ok) throw new Error('Failed to mark conversation as read');
  
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))
        console.log(`Marked conversation ${conversationId} as read`)
      } catch (error) {
        console.error("Error marking conversation as read:", error)
        throw error
      }
    },
  
    // Search conversations
    async searchConversations(query: string, userId: string): Promise<Conversation[]> {
      try {
        // This would be replaced with an actual API call
        // const response = await fetch(
        //   `${this.baseUrl}/users/${userId}/conversations/search?q=${encodeURIComponent(query)}`,
        //   {
        //     headers: {
        //       'Authorization': `Bearer ${await this.getAuthToken()}`
        //     }
        //   }
        // );
        // if (!response.ok) throw new Error('Failed to search conversations');
        // return await response.json();
  
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))
  
        // Filter mock data based on query
        const mockConversations: Conversation[] = [
          {
            id: "1",
            participantId: "user1",
            participantName: "Ange Curtis",
            participantAvatar:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,260,150,360",
            lastMessage: {
              id: "msg1",
              senderId: "user1",
              receiverId: "currentUser",
              content: "Thank you, I'm interested in your startup...",
              timestamp: "2023-03-01T14:11:00Z",
              read: false,
            },
            unreadCount: 2,
          },
          {
            id: "2",
            participantId: "user2",
            participantName: "Joselyn Gouse",
            participantAvatar:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,410,150,510",
            lastMessage: {
              id: "msg2",
              senderId: "user2",
              receiverId: "currentUser",
              content: "Thank you, I'm interested in your startup...",
              timestamp: "2023-03-01T14:11:00Z",
              read: true,
            },
            unreadCount: 0,
          },
        ]
  
        return mockConversations.filter(
          (conv) =>
            conv.participantName.toLowerCase().includes(query.toLowerCase()) ||
            conv.lastMessage.content.toLowerCase().includes(query.toLowerCase()),
        )
      } catch (error) {
        console.error("Error searching conversations:", error)
        throw error
      }
    },
  
    // Get authentication token (would be implemented with secure storage)
    async getAuthToken(): Promise<string> {
      // This would retrieve the token from secure storage
      return "mock-auth-token"
    },
  }
  
  