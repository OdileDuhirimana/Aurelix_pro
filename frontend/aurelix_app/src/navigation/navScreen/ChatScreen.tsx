import type React from "react"
import { useState, useCallback } from "react"
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
  TextInput,
} from "react-native"
import { ChevronLeft, Search } from "lucide-react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { useFocusEffect } from "@react-navigation/native"

// Import the API and types from separate file
import { MessagesAPI, type Conversation } from "./mockup/api_message-api"
import { formatTime } from "./util/formatters"

type RecentMessagesScreenNavigationProp = StackNavigationProp<any, "RecentMessages">

interface Props {
  navigation: RecentMessagesScreenNavigationProp
  route: {
    params?: {
      userId?: string
    }
  }
}

const RecentMessagesScreen: React.FC<Props> = ({ navigation, route }) => {
  // State management
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [hasMoreConversations, setHasMoreConversations] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<Conversation[]>([])
  const [error, setError] = useState<string | null>(null)

  // Get current user ID from route params or use default
  const userId = route.params?.userId || "currentUser"

  // Fetch conversations when component mounts or when user navigates back to this screen
  useFocusEffect(
    useCallback(() => {
      fetchConversations()

      // Clean up function
      return () => {
        // Any cleanup needed when screen loses focus
      }
    }, []),
  )

  // Fetch conversations from API
  const fetchConversations = async (refresh = false) => {
    try {
      setError(null)

      if (refresh) {
        setIsRefreshing(true)
        setPage(1)
      } else if (!isLoading && !refresh) {
        setIsLoadingMore(true)
      }

      const currentPage = refresh ? 1 : page
      const { conversations: newConversations, hasMore } = await MessagesAPI.getRecentConversations(userId, currentPage)

      if (refresh || currentPage === 1) {
        setConversations(newConversations)
      } else {
        setConversations((prevConversations) => [...prevConversations, ...newConversations])
      }

      setHasMoreConversations(hasMore)

      if (!refresh && currentPage === 1) {
        setIsLoading(false)
      }

      if (hasMore && !refresh) {
        setPage(currentPage + 1)
      }
    } catch (error) {
      console.error("Error fetching conversations:", error)
      setError("Failed to load conversations. Please try again.")
    } finally {
      setIsRefreshing(false)
      setIsLoadingMore(false)
      if (currentPage === 1) {
        setIsLoading(false)
      }
    }
  }

  // Handle pull-to-refresh
  const handleRefresh = () => {
    fetchConversations(true)
  }

  // Handle loading more conversations when reaching end of list
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMoreConversations && !isSearching) {
      fetchConversations()
    }
  }

  // Handle conversation item press
  const handleConversationPress = async (conversation: Conversation) => {
    try {
      // If there are unread messages, mark as read
      if (conversation.unreadCount > 0) {
        await MessagesAPI.markConversationAsRead(conversation.id)

        // Update local state to reflect read status
        setConversations((prevConversations) =>
          prevConversations.map((conv) =>
            conv.id === conversation.id
              ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, read: true } }
              : conv,
          ),
        )
      }

      // Navigate to conversation detail screen
      navigation.navigate("Conversation", {
        conversationId: conversation.id,
        participantName: conversation.participantName,
        participantAvatar: conversation.participantAvatar,
      })
    } catch (error) {
      console.error("Error handling conversation press:", error)
      // Show error toast or notification
    }
  }

  // Handle search query changes
  const handleSearchChange = (text: string) => {
    setSearchQuery(text)

    if (text.length > 0) {
      setIsSearching(true)
      searchConversations(text)
    } else {
      setIsSearching(false)
      setSearchResults([])
    }
  }

  // Search conversations
  const searchConversations = async (query: string) => {
    try {
      const results = await MessagesAPI.searchConversations(query, userId)
      setSearchResults(results)
    } catch (error) {
      console.error("Error searching conversations:", error)
    }
  }

  // Render conversation item
  const renderConversationItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity style={styles.conversationItem} onPress={() => handleConversationPress(item)}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.participantAvatar }} style={styles.avatar} />
      </View>

      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.participantName}>{item.participantName}</Text>
          <Text style={styles.timestamp}>{formatTime(item.lastMessage.timestamp)}</Text>
        </View>

        <View style={styles.messagePreviewContainer}>
          <Text
            style={[styles.messagePreview, item.unreadCount > 0 && styles.unreadMessagePreview]}
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
  )

  // Render loading indicator
  const renderFooter = () => {
    if (!isLoadingMore) return null

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#00a86b" />
      </View>
    )
  }

  // Render empty state
  const renderEmptyState = () => {
    if (isLoading) return null

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>
          {isSearching ? "No conversations match your search" : "No recent conversations"}
        </Text>
        {!isSearching && (
          <TouchableOpacity
            style={styles.startConversationButton}
            onPress={() => navigation.navigate("NewConversation")}
          >
            <Text style={styles.startConversationButtonText}>Start a conversation</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  // Render error state
  const renderErrorState = () => {
    if (!error) return null

    return (
      <View style={styles.errorState}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchConversations(true)}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        
        <View style={styles.headerTitleContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#171725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recents</Text>
        </View>
        

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            setIsSearching(!isSearching)
            if (isSearching) {
              setSearchQuery("")
              setSearchResults([])
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
              colors={["#00a86b"]}
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
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  container: {
    flex: 1,
  },
  headerTitleContainer:{
    flexDirection: "row",
    alignItems: 'center',
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 8,
    gap: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Inter-Variable",
    fontSize: 18,
    fontWeight: "700",
    color: "#221F1F",
  },
  searchButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  conversationsList: {
    flexGrow: 1,
    marginHorizontal: 12,
    paddingBottom: 16,
  },
  conversationItem: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  conversationContent: {
    flex: 1,
    justifyContent: "center",
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  participantName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#221F1F",
  },
  timestamp: {
    fontSize: 14,
    fontWeight: "400",
    color: "#221F1FB2",
  },
  messagePreviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messagePreview: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: "#737373",
  },
  unreadMessagePreview: {
    color: "#171725",
  },
  unreadBadge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#00a86b",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 9,
    fontWeight: "600",
    color: "#ffffff",
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#737373",
    textAlign: "center",
    marginBottom: 16,
  },
  startConversationButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#00a86b",
    borderRadius: 8,
  },
  startConversationButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  errorState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: "#e53935",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#00a86b",
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  }
})

export default RecentMessagesScreen

