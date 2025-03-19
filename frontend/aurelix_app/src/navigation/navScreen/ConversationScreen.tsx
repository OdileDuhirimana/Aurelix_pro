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
import { ChevronLeft, Search, Paperclip, Mic, Send } from 'lucide-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import type { Message, User, Conversation } from '../index';
import { API, WebSocketService } from './mockup/api-convo';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

// API service for data fetching and operations


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
      const [participantData, messagesData] = await Promise.all([
        API.getUserProfile(participantId),
        API.getConversationMessages(conversationId)
      ]);
      
      setParticipant(participantData);
      setMessages(messagesData.messages);
      setHasMoreMessages(messagesData.hasMore);
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
          <View style={styles.titleContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color="#171725" />
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
          </View>
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
    marginBottom: 5,
    gap: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    gap : 10,
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
    gap: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171725',
  },
  searchButton: {
    width: 30,
    height: 30,
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
    padding: 15,
    borderRadius: 16,
  },
  currentUserBubble: {
    backgroundColor: '#00a86b',
    borderRadius: 10,
  },
  otherUserBubble: {
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
  },
  failedMessageBubble: {
    backgroundColor: '#ffebee',
  },
  messageText: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
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
    fontSize: 10,
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
    alignItems: 'center',
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
    alignSelf: 'flex-end',
  },
  micButton: {
    padding: 8,
    marginBottom: -4,
    alignSelf: 'flex-end',
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