// Types
export interface User {
    id: string;
    name: string;
    avatar: string;
    email?: string;
    phone?: string;
    title?: string;
    company?: string;
  }
  
  export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    type: 'text' | 'image' | 'file' | 'audio';
    timestamp: string;
    status: 'sent' | 'delivered' | 'read' | 'failed';
  }
  
  export interface Conversation {
    id: string;
    participants: string[]; // User IDs
    participantId: string; // The other user's ID
    participantName: string; // The other user's name
    participantAvatar: string; // The other user's avatar
    lastMessage: {
      content: string;
      timestamp: string;
      senderId: string;
      read: boolean;
    };
    unreadCount: number;
  }
  
  // Mock data
  const users: User[] = [
    {
      id: 'currentUser',
      name: 'You',
      avatar: 'https://s3-alpha-sig.figma.com/img/4b07/3cce/73f6c12d8d50448c6c5457d2dca5a5c7?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NdDLaM-KXxKx2ayfOTbHlAW0Nig2AB2xcqb~uFVxpvUQNY0XOAFLYXFI4kCusWxDWK1v1xZ~GSIjKNSju1pAxhlB2IKtE6ulVii~D60-QVaMzrO2IKQa6~E4QsvCiQq1D4hBT8B3TLzRPNEc79kjcOdNOYu6s81NMqbSxACKzxS0z-7iEQQZ6WaFr8lPrm0E5sThoIBo3DcZbJeqhwPdy10-AqO26A--U5Z7muI-ktPhd7gc6-N1GfRTNmgnuu44H3dsS7-ozct1qOkiwXVi9Kezq5ZagFll8P4VniJKnfiqU69zbHZdDmHPULw1MHNf81xZQBWlwjLztCHm0MR~EQ__',
      email: 'you@example.com',
      title: 'Founder',
      company: 'Canaberra'
    },
    {
      id: 'user1',
      name: 'John Smith',
      avatar: 'https://s3-alpha-sig.figma.com/img/e9a1/3591/c3d108ad4985871e6da26a9c79aee760?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XRvDXYSlMJCnKMCs4frPWkazeEH7OxG1J-El-0HYSwNAGyE5hlclJhZWC-5f2U8YI4gNA7XktvpOuG2vNGnXiU3Bn9UL9NfrL3H9Wyh7q-awLgxfyQhV1006G5bqMP4aC3UAi~GFHpgMJ7K1sglmBScxKfCkdAdf~E9E3JUklIYfS7uov0vREY7pskqjFuNA~3G55TxhytCDTPynuILLWAQmJzNeu~SdbNINzgszFC7KSXPmEw2QCBn6j-ZcOaTgndOIiCHIyFATpJTO1p1cuursVSuYLg0YygGnYtpmzkLRuiiQMt2fQFEYL7JmdWRS1wSHjhOi74RbEOkEeM0Oag__',
      email: 'john@example.com',
      title: 'Investor',
      company: 'Venture Capital Inc.'
    },
    {
      id: 'user2',
      name: 'Sarah Johnson',
      avatar: 'https://s3-alpha-sig.figma.com/img/f047/9482/198a71cefee106ee862131ff6c1c18ba?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gCR9jdLoARurFAiwjBgL~yZa0IBpjfPiUWtRf9M-JVfDdAnwqBN-l~YTowXzyuHJU~uE~iM56nsp9U1DOVgvrZft-AZCINMH1B2HLuwGXl4oBgludrKOf5lcLW5Rwo09EQWwC2wdBaOlLXiAiNTGNmGCnQlpzTWaR1V21Ud54Xlqr-BpF8vP-roLbWItoYLGfwPpK86mzLEQ-wwN9CzJ9ZNnHwByyBK1IquWB5tmsEemLoG~wfldM3Ijn5awxFmkLplgN2KgDJwv9Q16QxTYnaZAaz0gp2FThJ89HB5X7CPKbQyf4eHlQEDugZvR0ph1OxCxnGb9fn2mMRByasslMw__',
      email: 'sarah@example.com',
      title: 'Angel Investor',
      company: 'Angel Group'
    },
    {
      id: 'user3',
      name: 'Michael Chen',
      avatar: 'https://s3-alpha-sig.figma.com/img/6feb/39e0/4a8c69cd3b29f2c30d51ee546c840ab3?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VDQ-XdGG1sgy8X9aKI2TyBaUnfnibzY7sgQwU8116XIkrjxEtHz9Baw47RYPjWXs0im3TfFCv66CwLW4ZnbORBSa-U3IyT0eUXa3KP399TXHiZR4FJH-rei8kypCJz1GQO8VG0Z6okL3FURViu4U8A5Gwgnr2p4SS4TVM665twvevqUuVA6ZTt1zDJxAA46fTi3f7iIJT5lUP-VZaDmdu-J9nxPRQbig3x88-7aFSjKrV~Rsb-dHeonH2Ip84A5QQo5s6smVWQGjH9gcGSgUA7GejVFf4F1ujERkJ9y2CRmau13wZLSVRZ8184VoboN7VYCnc8hu5Osg5k0Xt4USNw__',
      email: 'michael@example.com',
      title: 'Investment Manager',
      company: 'Growth Fund'
    }
  ];
  
  const conversations: Conversation[] = [
    {
      id: 'conv1',
      participants: ['currentUser', 'user1'],
      participantId: 'user1',
      participantName: 'John Smith',
      participantAvatar: 'https://s3-alpha-sig.figma.com/img/e9a1/3591/c3d108ad4985871e6da26a9c79aee760?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XRvDXYSlMJCnKMCs4frPWkazeEH7OxG1J-El-0HYSwNAGyE5hlclJhZWC-5f2U8YI4gNA7XktvpOuG2vNGnXiU3Bn9UL9NfrL3H9Wyh7q-awLgxfyQhV1006G5bqMP4aC3UAi~GFHpgMJ7K1sglmBScxKfCkdAdf~E9E3JUklIYfS7uov0vREY7pskqjFuNA~3G55TxhytCDTPynuILLWAQmJzNeu~SdbNINzgszFC7KSXPmEw2QCBn6j-ZcOaTgndOIiCHIyFATpJTO1p1cuursVSuYLg0YygGnYtpmzkLRuiiQMt2fQFEYL7JmdWRS1wSHjhOi74RbEOkEeM0Oag__',
      lastMessage: {
        content: 'I\'m interested in your startup. Can we schedule a call?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        senderId: 'user1',
        read: false
      },
      unreadCount: 1
    },
    {
      id: 'conv2',
      participants: ['currentUser', 'user2'],
      participantId: 'user2',
      participantName: 'Sarah Johnson',
      participantAvatar: 'https://s3-alpha-sig.figma.com/img/f047/9482/198a71cefee106ee862131ff6c1c18ba?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gCR9jdLoARurFAiwjBgL~yZa0IBpjfPiUWtRf9M-JVfDdAnwqBN-l~YTowXzyuHJU~uE~iM56nsp9U1DOVgvrZft-AZCINMH1B2HLuwGXl4oBgludrKOf5lcLW5Rwo09EQWwC2wdBaOlLXiAiNTGNmGCnQlpzTWaR1V21Ud54Xlqr-BpF8vP-roLbWItoYLGfwPpK86mzLEQ-wwN9CzJ9ZNnHwByyBK1IquWB5tmsEemLoG~wfldM3Ijn5awxFmkLplgN2KgDJwv9Q16QxTYnaZAaz0gp2FThJ89HB5X7CPKbQyf4eHlQEDugZvR0ph1OxCxnGb9fn2mMRByasslMw__',
      lastMessage: {
        content: 'Thanks for sending your pitch deck. I\'ll review it and get back to you.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        senderId: 'user2',
        read: true
      },
      unreadCount: 0
    },
    {
      id: 'conv3',
      participants: ['currentUser', 'user3'],
      participantId: 'user3',
      participantName: 'Michael Chen',
      participantAvatar: 'https://s3-alpha-sig.figma.com/img/6feb/39e0/4a8c69cd3b29f2c30d51ee546c840ab3?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VDQ-XdGG1sgy8X9aKI2TyBaUnfnibzY7sgQwU8116XIkrjxEtHz9Baw47RYPjWXs0im3TfFCv66CwLW4ZnbORBSa-U3IyT0eUXa3KP399TXHiZR4FJH-rei8kypCJz1GQO8VG0Z6okL3FURViu4U8A5Gwgnr2p4SS4TVM665twvevqUuVA6ZTt1zDJxAA46fTi3f7iIJT5lUP-VZaDmdu-J9nxPRQbig3x88-7aFSjKrV~Rsb-dHeonH2Ip84A5QQo5s6smVWQGjH9gcGSgUA7GejVFf4F1ujERkJ9y2CRmau13wZLSVRZ8184VoboN7VYCnc8hu5Osg5k0Xt4USNw__',
      lastMessage: {
        content: 'Let\'s discuss your financial projections in more detail.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        senderId: 'currentUser',
        read: true
      },
      unreadCount: 0
    }
  ];
  
  const messages: { [key: string]: Message[] } = {
    'conv1': [
      {
        id: 'msg1-1',
        conversationId: 'conv1',
        senderId: 'currentUser',
        receiverId: 'user1',
        content: 'Hello John, thank you for connecting!',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        status: 'read'
      },
      {
        id: 'msg1-2',
        conversationId: 'conv1',
        senderId: 'user1',
        receiverId: 'currentUser',
        content: 'Hi there! I saw your startup on Canaberra and I\'m quite impressed.',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
        status: 'read'
      },
      {
        id: 'msg1-3',
        conversationId: 'conv1',
        senderId: 'user1',
        receiverId: 'currentUser',
        content: 'I\'m interested in your startup. Can we schedule a call?',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        status: 'delivered'
      }
    ],
    'conv2': [
      {
        id: 'msg2-1',
        conversationId: 'conv2',
        senderId: 'currentUser',
        receiverId: 'user2',
        content: 'Hi Sarah, I\'ve attached our pitch deck for your review.',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
        status: 'read'
      },
      {
        id: 'msg2-2',
        conversationId: 'conv2',
        senderId: 'user2',
        receiverId: 'currentUser',
        content: 'Thanks for sending your pitch deck. I\'ll review it and get back to you.',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        status: 'read'
      }
    ],
    'conv3': [
      {
        id: 'msg3-1',
        conversationId: 'conv3',
        senderId: 'user3',
        receiverId: 'currentUser',
        content: 'Your financial projections look promising, but I have a few questions.',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), // 25 hours ago
        status: 'read'
      },
      {
        id: 'msg3-2',
        conversationId: 'conv3',
        senderId: 'currentUser',
        receiverId: 'user3',
        content: 'Let\'s discuss your financial projections in more detail.',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 24 hours ago
        status: 'read'
      }
    ]
  };
  
  // Message Service API
  const messageService = {
    // Get user profile
    getUserProfile: async (userId: string): Promise<User> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = users.find(u => u.id === userId);
          if (user) {
            resolve(user);
          } else {
            reject(new Error('User not found'));
          }
        }, 300);
      });
    },
  
    // Get recent conversations
    getRecentConversations: async (userId: string, page = 1, limit = 10): Promise<{ conversations: Conversation[], hasMore: boolean }> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const userConversations = conversations.filter(conv => conv.participants.includes(userId));
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedConversations = userConversations.slice(startIndex, endIndex);
          
          resolve({
            conversations: paginatedConversations,
            hasMore: endIndex < userConversations.length
          });
        }, 500);
      });
    },
  
    // Get conversation messages
    getConversationMessages: async (conversationId: string, options = { limit: 20, before: undefined }): Promise<{ messages: Message[], hasMore: boolean }> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const conversationMessages = messages[conversationId] || [];
          
          // Sort messages by timestamp (oldest first)
          const sortedMessages = [...conversationMessages].sort((a, b) => 
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
          
          resolve({
            messages: sortedMessages,
            hasMore: false // For simplicity, we're not implementing pagination for messages in this mock
          });
        }, 500);
      });
    },
  
    // Send a message
    sendMessage: async (message: Omit<Message, 'id' | 'status' | 'timestamp'>): Promise<Message> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newMessage: Message = {
            ...message,
            id: `msg-${Date.now()}`,
            status: 'sent',
            timestamp: new Date().toISOString()
          };
          
          // Update messages
          if (!messages[message.conversationId]) {
            messages[message.conversationId] = [];
          }
          messages[message.conversationId].push(newMessage);
          
          // Update conversation last message
          const conversation = conversations.find(c => c.id === message.conversationId);
          if (conversation) {
            conversation.lastMessage = {
              content: newMessage.content,
              timestamp: newMessage.timestamp,
              senderId: newMessage.senderId,
              read: false
            };
            
            // If the message is from the other participant, increment unread count
            if (message.senderId !== 'currentUser') {
              conversation.unreadCount += 1;
            }
          }
          
          resolve(newMessage);
        }, 300);
      });
    },
  
    // Mark messages as read
    markMessagesAsRead: async (conversationId: string, messageIds: string[]): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const conversationMessages = messages[conversationId] || [];
          
          // Update message status
          conversationMessages.forEach(message => {
            if (messageIds.includes(message.id)) {
              message.status = 'read';
            }
          });
          
          // Update conversation unread count
          const conversation = conversations.find(c => c.id === conversationId);
          if (conversation) {
            conversation.unreadCount = 0;
            conversation.lastMessage.read = true;
          }
          
          resolve();
        }, 200);
      });
    },
  
    // Mark conversation as read
    markConversationAsRead: async (conversationId: string): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const conversation = conversations.find(c => c.id === conversationId);
          if (conversation) {
            conversation.unreadCount = 0;
            conversation.lastMessage.read = true;
          }
          
          // Mark all messages as read
          const conversationMessages = messages[conversationId] || [];
          conversationMessages.forEach(message => {
            if (message.receiverId === 'currentUser') {
              message.status = 'read';
            }
          });
          
          resolve();
        }, 200);
      });
    },
  
    // Search conversations
    searchConversations: async (query: string, userId: string): Promise<Conversation[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const userConversations = conversations.filter(conv => conv.participants.includes(userId));
          const results = userConversations.filter(conv => 
            conv.participantName.toLowerCase().includes(query.toLowerCase()) ||
            conv.lastMessage.content.toLowerCase().includes(query.toLowerCase())
          );
          
          resolve(results);
        }, 300);
      });
    }
  };
  
  // WebSocket Service for real-time messaging
  export const WebSocketService = {
    callbacks: new Map<string, Function>(),
    typingCallbacks: new Map<string, Function>(),
    
    connect: (userId: string, messageCallback: (message: Message) => void) => {
      console.log(`WebSocket connected for user ${userId}`);
      WebSocketService.callbacks.set(userId, messageCallback);
    },
    
    disconnect: () => {
      console.log('WebSocket disconnected');
      WebSocketService.callbacks.clear();
      WebSocketService.typingCallbacks.clear();
    },
    
    sendMessage: (message: Message) => {
      // Simulate sending message to server
      console.log('Sending message via WebSocket:', message);
      
      // Simulate receiving message from server (for demo purposes)
      setTimeout(() => {
        const receiverCallback = WebSocketService.callbacks.get(message.receiverId);
        if (receiverCallback) {
          receiverCallback(message);
        }
      }, 500);
    },
    
    sendTypingIndicator: (conversationId: string, isTyping: boolean) => {
      console.log(`Typing indicator for conversation ${conversationId}: ${isTyping}`);
      
      // Simulate sending typing indicator to other participants
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation) {
        const otherParticipantId = conversation.participants.find(p => p !== 'currentUser');
        if (otherParticipantId) {
          const typingCallback = WebSocketService.typingCallbacks.get(otherParticipantId);
          if (typingCallback) {
            typingCallback(isTyping);
          }
        }
      }
    },
    
    onTypingIndicator: (userId: string, callback: (isTyping: boolean) => void) => {
      WebSocketService.typingCallbacks.set(userId, callback);
    }
  };
  
  export default messageService;