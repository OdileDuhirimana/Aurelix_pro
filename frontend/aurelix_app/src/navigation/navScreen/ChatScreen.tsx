import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TextInput
} from 'react-native';
import { ChevronLeft, Search, Home, BarChart2, Crown, MessageSquare, User } from 'lucide-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

// Define TypeScript interfaces for data structures
interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: Message;
  unreadCount: number;
}

// API service for data fetching
const API = {
  baseUrl: 'https://api.example.com',
  
  // Fetch recent conversations
  async getRecentConversations(userId: string, page: number = 1, limit: number = 20): Promise<{ 
    conversations: Conversation[], 
    totalCount: number,
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
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      
      // Mock conversations data
      const mockConversations: Conversation[] = [
        {
          id: '1',
          participantId: 'user1',
          participantName: 'Ange Curtis',
          participantAvatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,260,150,360',
          lastMessage: {
            id: 'msg1',
            senderId: 'user1',
            receiverId: 'currentUser',
            content: "Thank you, I'm interested in your startup...",
            timestamp: '2023-03-01T14:11:00Z',
            read: false
          },
          unreadCount: 2
        },
        {
          id: '2',
          participantId: 'user2',
          participantName: 'Joselyn Gouse',
          participantAvatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,410,150,510',
          lastMessage: {
            id: 'msg2',
            senderId: 'user2',
            receiverId: 'currentUser',
            content: "Thank you, I'm interested in your startup...",
            timestamp: '2023-03-01T14:11:00Z',
            read: true
          },
          unreadCount: 0
        },
        {
          id: '3',
          participantId: 'user3',
          participantName: 'Jaylon Dias',
          participantAvatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,560,150,660',
          lastMessage: {
            id: 'msg3',
            senderId: 'user3',
            receiverId: 'currentUser',
            content: "Thank you, I'm interested in your startup...",
            timestamp: '2023-03-01T14:11:00Z',
            read: true
          },
          unreadCount: 0
        },
        {
          id: '4',
          participantId: 'user4',
          participantName: 'Ange Curtis',
          participantAvatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,710,150,810',
          lastMessage: {
            id: 'msg4',
            senderId: 'user4',
            receiverId: 'currentUser',
            content: "Thank you, I'm interested in your startup...",
            timestamp: '2023-03-01T14:11:00Z',
            read: false
          },
          unreadCount: 1
        },
        {
          id: '5',
          participantId: 'user5',
          participantName: 'Ange Curtis',
          participantAvatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,860,150,960',
          lastMessage: {
            id: 'msg5',
            senderId: 'user5',
            receiverId: 'currentUser',
            content: "Thank you, I'm interested in your startup...",
            timestamp: '2023-03-01T14:11:00Z',
            read: true
          },
          unreadCount: 0
        }
      ];
      
      return {
        conversations: mockConversations,
        totalCount: 15, // Total number of conversations
        hasMore: page * limit < 15 // Whether there are more conversations to load
      };
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
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
      await new Promise(resolve => setTimeout(resolve, 300));
      console.log(`Marked conversation ${conversationId} as read`);
    } catch (error) {
      console.error('Error marking conversation as read:', error);
      throw error;
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
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter mock data based on query
      const mockConversations: Conversation[] = [
        {
          id: '1',
          participantId: 'user1',
          participantName: 'Ange Curtis',
          participantAvatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,260,150,360',
          lastMessage: {
            id: 'msg1',
            senderId: 'user1',
            receiverId: 'currentUser',
            content: "Thank you, I'm interested in your startup...",
            timestamp: '2023-03-01T14:11:00Z',
            read: false
          },
          unreadCount: 2
        },
        {
          id: '2',
          participantId: 'user2',
          participantName: 'Joselyn Gouse',
          participantAvatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-QA5mHRpu87RQ33e6vnSHVTYpABzH64.png#crop=50,410,150,510',
          lastMessage: {
            id: 'msg2',
            senderId: 'user2',
            receiverId: 'currentUser',
            content: "Thank you, I'm interested in your startup...",
            timestamp: '2023-03-01T14:11:00Z',
            read: true
          },
          unreadCount: 0
        }
      ];
      
      return mockConversations.filter(conv => 
        conv.participantName.toLowerCase().includes(query.toLowerCase()) ||
        conv.lastMessage.content.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching conversations:', error);
      throw error;
    }
  },
  
  // Get authentication token (would be implemented with secure storage)
  async getAuthToken(): Promise<string> {
    // This would retrieve the token from secure storage
    return 'mock-auth-token';
  }
};

type RecentMessagesScreenNavigationProp = StackNavigationProp<any, 'RecentMessages'>;

interface Props {
  navigation: RecentMessagesScreenNavigationProp;
  route: {
    params?: {
      userId?: string;
    }
  }
}

const RecentMessagesScreen: React.FC<Props> = ({ navigation, route }) => {
  // State management
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreConversations, setHasMoreConversations] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Conversation[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Get current user ID from route params or use default
  const userId = route.params?.userId || 'currentUser';
  
  // Fetch conversations when component mounts or when user navigates back to this screen
  useFocusEffect(
    useCallback(() => {
      fetchConversations();
      
      // Clean up function
      return () => {
        // Any cleanup needed when screen loses focus
      };
    }, [])
  );
  
  // Fetch conversations from API
  const fetchConversations = async (refresh: boolean = false) => {
    try {
      setError(null);
      
      if (refresh) {
        setIsRefreshing(true);
        setPage(1);
      } else if (!isLoading && !refresh) {
        setIsLoadingMore(true);
      }
      
      const currentPage = refresh ? 1 : page;
      const { conversations: newConversations, hasMore } = await API.getRecentConversations(userId, currentPage);
      
      if (refresh || currentPage === 1) {
        setConversations(newConversations);
      } else {
        setConversations(prevConversations => [...prevConversations, ...newConversations]);
      }
      
      setHasMoreConversations(hasMore);
      
      if (!refresh && currentPage === 1) {
        setIsLoading(false);
      }
      
      if (hasMore && !refresh) {
        setPage(currentPage + 1);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setError('Failed to load conversations. Please try again.');
    } finally {
      setIsRefreshing(false);
      setIsLoadingMore(false);
      if (currentPage === 1) {
        setIsLoading(false);
      }
    }
  };
  
  // Handle pull-to-refresh
  const handleRefresh = () => {
    fetchConversations(true);
  };
  
  // Handle loading more conversations when reaching end of list
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMoreConversations && !isSearching) {
      fetchConversations();
    }
  };
  
  // Handle conversation item press
  const handleConversationPress = async (conversation: Conversation) => {
    try {
      // If there are unread messages, mark as read
      if (conversation.unreadCount > 0) {
        await API.markConversationAsRead(conversation.id);
        
        // Update local state to reflect read status
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === conversation.id 
              ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, read: true } } 
              : conv
          )
        );
      }
      
      // Navigate to conversation detail screen
      navigation.navigate('Conversation', { 
        conversationId: conversation.id,
        participantName: conversation.participantName,
        participantAvatar: conversation.participantAvatar
      });
    } catch (error) {
      console.error('Error handling conversation press:', error);
      // Show error toast or notification
    }
  };
  
  // Handle search query changes
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    
    if (text.length > 0) {
      setIsSearching(true);
      searchConversations(text);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };
  
  // Search conversations
  const searchConversations = async (query: string) => {
    try {
      const results = await API.searchConversations(query, userId);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching conversations:', error);
      // Show error toast or notification
    }
  };
  
  // Format timestamp to display time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Render conversation item
  const renderConversationItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => handleConversationPress(item)}
    >
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: item.participantAvatar }} 
          style={styles.avatar}
        />
      </View>
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.participantName}>{item.participantName}</Text>
          <Text style={styles.timestamp}>{formatTime(item.lastMessage.timestamp)}</Text>
        </View>
        
        <View style={styles.messagePreviewContainer}>
          <Text 
            style={[
              styles.messagePreview,
              item.unreadCount > 0 && styles.unreadMessagePreview
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMessage.content}
          </Text>
          
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
  
  // Render loading indicator
  const renderFooter = () => {
    if (!isLoadingMore) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#00a86b" />
      </View>
    );
  };
  
  // Render empty state
  const renderEmptyState = () => {
    if (isLoading) return null;
    
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>
          {isSearching 
            ? 'No conversations match your search' 
            : 'No recent conversations'}
        </Text>
        {!isSearching && (
          <TouchableOpacity 
            style={styles.startConversationButton}
            onPress={() => navigation.navigate('NewConversation')}
          >
            <Text style={styles.startConversationButtonText}>Start a conversation</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  // Render error state
  const renderErrorState = () => {
    if (!error) return null;
    
    return (
      <View style={styles.errorState}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => fetchConversations(true)}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color="#171725" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Recents</Text>
        
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => {
            // Toggle search input visibility
            setIsSearching(!isSearching);
            if (isSearching) {
              setSearchQuery('');
              setSearchResults([]);
            }
          }}
        >
          <Search size={24} color="#171725" />
        </TouchableOpacity>
      </View>
      
      {/* Search Input */}
      {isSearching && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            value={searchQuery}
            onChangeText={handleSearchChange}
            autoFocus
          />
        </View>
      )}
      
      {/* Conversations List */}
      {error ? (
        renderErrorState()
      ) : (
        <FlatList
          data={isSearching ? searchResults : conversations}
          renderItem={renderConversationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.conversationsList}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#00a86b']}
              tintColor="#00a86b"
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#F9F9F9',
    },
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginTop: 20,
      marginBottom: 10,
      gap: 10,
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  headerTitle: {
    fontFamily: 'Inter-Variable',
    fontSize: 20,
    fontWeight: '700',
    color: '#221F1F',
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  conversationsList: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  conversationItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  conversationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  participantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171725',
  },
  timestamp: {
    fontSize: 14,
    color: '#737373',
  },
  messagePreviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messagePreview: {
    flex: 1,
    fontSize: 14,
    color: '#737373',
  },
  unreadMessagePreview: {
    color: '#171725',
  },
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00a86b',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#737373',
    textAlign: 'center',
    marginBottom: 16,
  },
  startConversationButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#00a86b',
    borderRadius: 8,
  },
  startConversationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#e53935',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#00a86b',
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 24,
    height: 2,
    backgroundColor: '#00a86b',
  },
  crownContainer: {
    position: 'relative',
  },
});

export default RecentMessagesScreen;