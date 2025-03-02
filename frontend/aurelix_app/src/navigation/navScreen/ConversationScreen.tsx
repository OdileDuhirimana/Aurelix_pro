import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
  Animated,
  Dimensions
} from 'react-native';
import { ArrowLeft, Search, Paperclip, Mic, Send } from 'lucide-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

// Define TypeScript interfaces for data structures
interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  industry?: string;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  type: 'text' | 'image' | 'file' | 'audio';
  metadata?: {
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    duration?: number;
    width?: number;
    height?: number;
    thumbnailUrl?: string;
  };
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessageId: string;
  createdAt: string;
  updatedAt: string;
}

// API service for data fetching and operations
const API = {
  baseUrl: 'https://api.example.com',
  
  // Fetch user profile
  async getUserProfile(userId: string): Promise<User> {
    try {
      // This would be replaced with an actual API call
      // const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      //   headers: {
      //     'Authorization': `Bearer ${await this.getAuthToken()}`
      //   }
      // });
      // if (!response.ok) throw new Error('Failed to fetch user profile');
      // return await response.json();
      
      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      
      return {
        id: userId,
        name: userId === 'user1' ? 'Ange Curtis' : 'Mark Robinson',
        avatar: userId === 'user1' 
          ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-N37aON483X5DxlZsTNEoIzlbbz4mvj.png#crop=140,140,180,180' 
          : 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-wJTLlqFNCoxV9SG5qmxIDKnmpdGI5P.png#crop=0,150,550,550',
        bio: userId === 'user1' 
          ? 'Founder of AgriNexa, working on innovative solutions for Agriculture.' 
          : 'Dedicated investor passionate about transforming the agricultural sector through innovation and sustainability.',
        industry: 'Agriculture'
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  
  // Fetch conversation messages
  async getConversationMessages(
    conversationId: string, 
    options: { limit?: number; before?: string } = {}
  ): Promise<{ messages: Message[]; hasMore: boolean }> {
    try {
      // This would be replaced with an actual API call
      // const queryParams = new URLSearchParams();
      // if (options.limit) queryParams.append('limit', options.limit.toString());
      // if (options.before) queryParams.append('before', options.before);
      // 
      // const response = await fetch(
      //   `${this.baseUrl}/conversations/${conversationId}/messages?${queryParams}`,
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${await this.getAuthToken()}`
      //     }
      //   }
      // );
      // if (!response.ok) throw new Error('Failed to fetch messages');
      // return await response.json();
      
      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      
      const mockMessages: Message[] = [
        {
          id: 'msg1',
          conversationId,
          senderId: 'user1',
          receiverId: 'currentUser',
          content: 'Hello, My name is Ange Curtis and I have a startup called AgriNexa. We are working on innovative solutions for Agriculture.',
          timestamp: '2023-03-01T14:30:00Z',
          status: 'read',
          type: 'text'
        },
        {
          id: 'msg2',
          conversationId,
          senderId: 'user1',
          receiverId: 'currentUser',
          content: 'I was wondering whether you are interested as an investor, as your description mentioned your interest in Agriculture.',
          timestamp: '2023-03-01T14:31:00Z',
          status: 'read',
          type: 'text'
        },
        {
          id: 'msg3',
          conversationId,
          senderId: 'currentUser',
          receiverId: 'user1',
          content: "Yes, I'm interested in Agriculture field and I have been searching an agriculture related startup. Can I get to know more about you?",
          timestamp: '2023-03-01T14:35:00Z',
          status: 'read',
          type: 'text'
        }
      ];
      
      return {
        messages: mockMessages,
        hasMore: false
      };
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },
  
  // Send a message
  async sendMessage(message: Omit<Message, 'id' | 'status' | 'timestamp'>): Promise<Message> {
    try {
      // This would be replaced with an actual API call
      // const response = await fetch(`${this.baseUrl}/messages`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${await this.getAuthToken()}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(message)
      // });
      // if (!response.ok) throw new Error('Failed to send message');
      // return await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a mock response
      const newMessage: Message = {
        ...message,
        id: `msg-${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };
      
      return newMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
  
  // Mark messages as read
  async markMessagesAsRead(conversationId: string, messageIds: string[]): Promise<void> {
    try {
      // This would be replaced with an actual API call
      // const response = await fetch(`${this.baseUrl}/conversations/${conversationId}/read`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${await this.getAuthToken()}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ messageIds })
      // });
      // if (!response.ok) throw new Error('Failed to mark messages as read');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      console.log(`Marked messages ${messageIds.join(', ')} as read`);
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  },
  
  // Upload file (image, document, audio)
  async uploadFile(file: { uri: string; type: string; name: string }): Promise<{ url: string }> {
    try {
      // This would be replaced with an actual API call
      // const formData = new FormData();
      // formData.append('file', {
      //   uri: file.uri,
      //   type: file.type,
      //   name: file.name
      // });
      // 
      // const response = await fetch(`${this.baseUrl}/uploads`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${await this.getAuthToken()}`,
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   body: formData
      // });
      // if (!response.ok) throw new Error('Failed to upload file');
      // return await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        url: `https://example.com/uploads/${file.name}`
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },
  
  // Get authentication token (would be implemented with secure storage)
  async getAuthToken(): Promise<string> {
    // This would retrieve the token from secure storage
    return 'mock-auth-token';
  }
};

// WebSocket service for real-time messaging
const WebSocketService = {
  socket: null as WebSocket | null,
  
  // Connect to WebSocket server
  connect(userId: string, onMessageReceived: (message: Message) => void): void {
    // This would be replaced with an actual WebSocket connection
    // this.socket = new WebSocket(`wss://api.example.com/ws?userId=${userId}`);
    // 
    // this.socket.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   if (data.type === 'message') {
    //     onMessageReceived(data.payload);
    //   }
    // };
    // 
    // this.socket.onclose = () => {
    //   console.log('WebSocket connection closed');
    //   // Implement reconnection logic here
    // };
    
    console.log(`WebSocket connected for user ${userId}`);
  },
  
  // Disconnect from WebSocket server
  disconnect(): void {
    if (this.socket) {
      // this.socket.close();
      this.socket = null;
      console.log('WebSocket disconnected');
    }
  },
  
  // Send typing indicator
  sendTypingIndicator(conversationId: string, isTyping: boolean): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      // this.socket.send(JSON.stringify({
      //   type: 'typing',
      //   payload: {
      //     conversationId,
      //     isTyping
      //   }
      // }));
      
      console.log(`Typing indicator sent: ${isTyping}`);
    }
  }
};

type ConversationScreenNavigationProp = StackNavigationProp<any, 'Conversation'>;

interface Props {
  navigation: ConversationScreenNavigationProp;
  route: {
    params: {
      conversationId: string;
      participantId: string;
    }
  }
}

const ConversationScreen: React.FC<Props> = ({ navigation, route }) => {
  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [participant, setParticipant] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isParticipantTyping, setIsParticipantTyping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  
  // Refs
  const scrollViewRef = useRef<ScrollView>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Animation values
  const typingIndicatorOpacity = useRef(new Animated.Value(0)).current;
  
  // Get conversation and participant IDs from route params
  const { conversationId, participantId } = route.params;
  const currentUserId = 'currentUser'; // This would come from authentication context
  
  // Fetch initial data when component mounts
  useFocusEffect(
    useCallback(() => {
      fetchInitialData();
      
      // Connect to WebSocket for real-time messaging
      WebSocketService.connect(currentUserId, handleIncomingMessage);
      
      // Clean up function
      return () => {
        // Disconnect from WebSocket when leaving screen
        WebSocketService.disconnect();
        
        // Clear typing timeout
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      };
    }, [])
  );
  
  // Fetch participant profile and conversation messages
  const fetchInitialData = async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Fetch participant profile and messages in parallel
      const [participantData, messagesData] = await Promise.all([
        API.getUserProfile(participantId),
        API.getConversationMessages(conversationId)
      ]);
      
      setParticipant(participantData);
      setMessages(messagesData.messages);
      setHasMoreMessages(messagesData.hasMore);
      
      // Mark unread messages as read
      const unreadMessageIds = messagesData.messages
        .filter(msg => msg.senderId === participantId && msg.status !== 'read')
        .map(msg => msg.id);
      
      if (unreadMessageIds.length > 0) {
        API.markMessagesAsRead(conversationId, unreadMessageIds);
      }
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setError('Failed to load conversation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load more messages (for pagination)
  const loadMoreMessages = async () => {
    if (!hasMoreMessages || isLoadingMore) return;
    
    try {
      setIsLoadingMore(true);
      
      const oldestMessageId = messages.length > 0 ? messages[0].id : undefined;
      const messagesData = await API.getConversationMessages(conversationId, {
        limit: 20,
        before: oldestMessageId
      });
      
      setMessages(prevMessages => [...messagesData.messages, ...prevMessages]);
      setHasMoreMessages(messagesData.hasMore);
    } catch (error) {
      console.error('Error loading more messages:', error);
      // Show error toast or notification
    } finally {
      setIsLoadingMore(false);
    }
  };
  
  // Handle incoming message from WebSocket
  const handleIncomingMessage = (message: Message) => {
    // Add new message to state
    setMessages(prevMessages => [...prevMessages, message]);
    
    // Mark message as read
    API.markMessagesAsRead(conversationId, [message.id]);
    
    // Reset participant typing indicator
    setIsParticipantTyping(false);
    fadeOutTypingIndicator();
    
    // Scroll to bottom
    scrollToBottom();
  };
  
  // Handle sending a message
  const handleSendMessage = async () => {
    if (inputText.trim() === '' || isSending) return;
    
    try {
      setIsSending(true);
      
      // Prepare message object
      const messageToSend: Omit<Message, 'id' | 'status' | 'timestamp'> = {
        conversationId,
        senderId: currentUserId,
        receiverId: participantId,
        content: inputText.trim(),
        type: 'text'
      };
      
      // Clear input field immediately for better UX
      setInputText('');
      
      // Add optimistic message to UI
      const optimisticMessage: Message = {
        ...messageToSend,
        id: `temp-${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };
      
      setMessages(prevMessages => [...prevMessages, optimisticMessage]);
      
      // Scroll to bottom
      scrollToBottom();
      
      // Send message to API
      const sentMessage = await API.sendMessage(messageToSend);
      
      // Replace optimistic message with actual message from server
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === optimisticMessage.id ? sentMessage : msg
        )
      );
      
      // Clear typing indicator
      handleStopTyping();
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Update optimistic message to show error
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id.startsWith('temp-') 
            ? { ...msg, status: 'failed' } 
            : msg
        )
      );
      
      // Show error toast or notification
    } finally {
      setIsSending(false);
    }
  };
  
  // Handle text input changes
  const handleInputChange = (text: string) => {
    setInputText(text);
    
    // Send typing indicator if not already typing
    if (!isTyping && text.length > 0) {
      handleStartTyping();
    } else if (isTyping && text.length === 0) {
      handleStopTyping();
    }
    
    // Reset typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new typing timeout
    if (text.length > 0) {
      typingTimeoutRef.current = setTimeout(() => {
        handleStopTyping();
      }, 3000); // Stop typing indicator after 3 seconds of inactivity
    }
  };
  
  // Handle start typing
  const handleStartTyping = () => {
    setIsTyping(true);
    WebSocketService.sendTypingIndicator(conversationId, true);
  };
  
  // Handle stop typing
  const handleStopTyping = () => {
    setIsTyping(false);
    WebSocketService.sendTypingIndicator(conversationId, false);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };
  
  // Handle participant typing indicator
  const handleParticipantTypingIndicator = (isTyping: boolean) => {
    setIsParticipantTyping(isTyping);
    
    if (isTyping) {
      fadeInTypingIndicator();
    } else {
      fadeOutTypingIndicator();
    }
  };
  
  // Fade in typing indicator animation
  const fadeInTypingIndicator = () => {
    Animated.timing(typingIndicatorOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };
  
  // Fade out typing indicator animation
  const fadeOutTypingIndicator = () => {
    Animated.timing(typingIndicatorOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };
  
  // Scroll to bottom of messages
  const scrollToBottom = (animated: boolean = true) => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated });
      }
    }, 100);
  };
  
  // Format timestamp to display time
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Group messages by date
  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [date: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return Object.entries(groups).map(([date, messages]) => ({
      date,
      messages
    }));
  };
  
  // Render message status indicator
  const renderMessageStatus = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Text style={styles.messageStatus}>✓</Text>;
      case 'delivered':
        return <Text style={styles.messageStatus}>✓✓</Text>;
      case 'read':
        return <Text style={styles.messageStatusRead}>✓✓</Text>;
      case 'failed':
        return <Text style={styles.messageStatusFailed}>!</Text>;
      default:
        return null;
    }
  };
  
  // Render message bubble
  const renderMessage = (message: Message) => {
    const isCurrentUser = message.senderId === currentUserId;
    
    return (
      <View 
        key={message.id}
        style={[
          styles.messageBubbleContainer,
          isCurrentUser ? styles.currentUserMessageContainer : styles.otherUserMessageContainer
        ]}
      >
        <View 
          style={[
            styles.messageBubble,
            isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
            message.status === 'failed' && styles.failedMessageBubble
          ]}
        >
          <Text style={styles.messageText}>{message.content}</Text>
          <View style={styles.messageFooter}>
            <Text style={styles.messageTime}>{formatMessageTime(message.timestamp)}</Text>
            {isCurrentUser && renderMessageStatus(message.status)}
          </View>
        </View>
        
        {message.status === 'failed' && (
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              // Implement retry logic
              console.log('Retry sending message:', message.id);
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  // Render date separator
  const renderDateSeparator = (date: string) => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
    
    let displayDate = date;
    if (date === today) {
      displayDate = 'Today';
    } else if (date === yesterday) {
      displayDate = 'Yesterday';
    }
    
    return (
      <View key={date} style={styles.dateSeparator}>
        <Text style={styles.dateSeparatorText}>{displayDate}</Text>
      </View>
    );
  };
  
  // Render typing indicator
  const renderTypingIndicator = () => {
    if (!isParticipantTyping) return null;
    
    return (
      <Animated.View 
        style={[
          styles.typingIndicatorContainer,
          { opacity: typingIndicatorOpacity }
        ]}
      >
        <View style={styles.typingIndicatorBubble}>
          <Text style={styles.typingIndicatorText}>
            {participant?.name} is typing
            <Text style={styles.typingDots}>...</Text>
          </Text>
        </View>
      </Animated.View>
    );
  };
  
  // Render loading state
  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00a86b" />
        <Text style={styles.loadingText}>Loading conversation...</Text>
      </View>
    );
  };
  
  // Render error state
  const renderError = () => {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchInitialData}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#171725" />
          </TouchableOpacity>
          
          {participant && (
            <TouchableOpacity 
              style={styles.profileContainer}
              onPress={() => {
                // Navigate to participant profile
                navigation.navigate('InvestorProfile', { investorId: participantId });
              }}
            >
              <Image 
                source={{ uri: participant.avatar }} 
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{participant.name}</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => {
              // Implement search functionality
              console.log('Search in conversation');
            }}
          >
            <Search size={24} color="#171725" />
          </TouchableOpacity>
        </View>
        
        {/* Content */}
        {isLoading ? (
          renderLoading()
        ) : error ? (
          renderError()
        ) : (
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            onContentSizeChange={() => scrollToBottom(false)}
            onLayout={() => scrollToBottom(false)}
          >
            {/* Load more button */}
            {hasMoreMessages && (
              <TouchableOpacity 
                style={styles.loadMoreButton}
                onPress={loadMoreMessages}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <ActivityIndicator size="small" color="#00a86b" />
                ) : (
                  <Text style={styles.loadMoreButtonText}>Load earlier messages</Text>
                )}
              </TouchableOpacity>
            )}
            
            {/* Messages grouped by date */}
            {groupMessagesByDate(messages).map(group => (
              <React.Fragment key={group.date}>
                {renderDateSeparator(group.date)}
                {group.messages.map(renderMessage)}
              </React.Fragment>
            ))}
            
            {/* Typing indicator */}
            {renderTypingIndicator()}
          </ScrollView>
        )}
        
        {/* Input area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#9e9e9e"
              value={inputText}
              onChangeText={handleInputChange}
              multiline
            />
            
            <TouchableOpacity 
              style={styles.attachButton}
              onPress={() => {
                // Implement attachment functionality
                console.log('Attach file');
              }}
            >
              <Paperclip size={20} color="#9e9e9e" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.micButton}
              onPress={() => {
                // Implement voice recording functionality
                console.log('Record voice message');
              }}
            >
              <Mic size={20} color="#9e9e9e" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              inputText.trim() === '' && styles.sendButtonDisabled
            ]}
            onPress={handleSendMessage}
            disabled={inputText.trim() === '' || isSending}
          >
            <Send size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171725',
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#737373',
  },
  errorContainer: {
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
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  loadMoreButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    marginBottom: 16,
  },
  loadMoreButtonText: {
    fontSize: 14,
    color: '#737373',
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dateSeparatorText: {
    fontSize: 12,
    color: '#737373',
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  messageBubbleContainer: {
    marginBottom: 8,
    maxWidth: '80%',
  },
  currentUserMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherUserMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  currentUserBubble: {
    backgroundColor: '#e9e9e9',
    borderBottomRightRadius: 4,
  },
  otherUserBubble: {
    backgroundColor: '#00a86b',
    borderBottomLeftRadius: 4,
  },
  failedMessageBubble: {
    backgroundColor: '#ffebee',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#171725',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  messageTime: {
    fontSize: 12,
    color: '#737373',
    marginRight: 4,
  },
  messageStatus: {
    fontSize: 12,
    color: '#737373',
  },
  messageStatusRead: {
    fontSize: 12,
    color: '#00a86b',
  },
  messageStatusFailed: {
    fontSize: 12,
    color: '#e53935',
  },
  retryButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#00a86b',
    borderRadius: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  retryButtonText: {
    fontSize: 12,
    color: '#ffffff',
  },
  typingIndicatorContainer: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  typingIndicatorBubble: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
  },
  typingIndicatorText: {
    fontSize: 14,
    color: '#737373',
  },
  typingDots: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f9f9f9',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    color: '#171725',
    padding: 0,
  },
  attachButton: {
    padding: 8,
    marginBottom: -4,
  },
  micButton: {
    padding: 8,
    marginBottom: -4,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#00a86b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
});

export default ConversationScreen;