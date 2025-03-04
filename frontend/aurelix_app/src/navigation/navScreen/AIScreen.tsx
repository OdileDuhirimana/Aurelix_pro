import React, { useState, useRef, useEffect, useReducer, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { 
  ChevronLeft, 
  Paperclip, 
  Mic, 
  Send, 
  Video, 
  Lightbulb, 
  BarChart2 
} from 'lucide-react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define TypeScript interfaces for data structures
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
}

type AICoachScreenNavigationProp = StackNavigationProp<any, 'AICoach'>;

interface Props {
  navigation: AICoachScreenNavigationProp;
}

// State management for handling loading and conversation data
const initialState = {
  inputText: '',
  isRecording: false,
  isLoading: false,
  recentConversations: [],
};

type Action = 
  | { type: 'SET_INPUT_TEXT'; payload: string }
  | { type: 'TOGGLE_RECORDING' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CONVERSATIONS'; payload: any[] };

const reducer = (state: typeof initialState, action: Action): typeof initialState => {
  switch (action.type) {
    case 'SET_INPUT_TEXT':
      return { ...state, inputText: action.payload };
    case 'TOGGLE_RECORDING':
      return { ...state, isRecording: !state.isRecording };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CONVERSATIONS':
      return { ...state, recentConversations: action.payload };
    default:
      return state;
  }
};

const AICoachScreen: React.FC<Props> = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef<TextInput>(null);

  // Quick actions data
  const quickActions: QuickAction[] = [
    {
      id: 'pitch',
      label: 'Pitch',
      icon: <Video size={16} color="#666" />,
      prompt: 'Help me prepare a pitch for my startup idea about...'
    },
    {
      id: 'brainstorm',
      label: 'Brainstorm',
      icon: <Lightbulb size={16} color="#666" />,
      prompt: 'Let\'s brainstorm ideas for solving the problem of...'
    },
    {
      id: 'analyze',
      label: 'Analyze',
      icon: <BarChart2 size={16} color="#666" />,
      prompt: 'Analyze the market potential for my product that...'
    }
  ];

  // Fetch recent conversations on component mount
  useEffect(() => {
    fetchRecentConversations();
  }, []);

  const fetchRecentConversations = async () => {
    try {
      // Simulating backend fetch call with setTimeout
      setTimeout(() => {
        const conversations = [
          { id: '1', title: 'Startup pitch feedback', lastUpdated: new Date() },
          { id: '2', title: 'Market analysis for SaaS product', lastUpdated: new Date() }
        ];
        dispatch({ type: 'SET_CONVERSATIONS', payload: conversations });
      }, 1000);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleSend = async () => {
    if (state.inputText.trim() === '') return;
    
    // Simulate navigation to chat screen with initial message
    navigation.navigate('AIChat', { initialMessage: state.inputText });
    dispatch({ type: 'SET_INPUT_TEXT', payload: '' });
  };

  const handleQuickAction = useCallback((action: QuickAction) => {
    dispatch({ type: 'SET_INPUT_TEXT', payload: action.prompt });
    inputRef.current?.focus();
  }, []);

  const handleRecording = useCallback(() => {
    dispatch({ type: 'TOGGLE_RECORDING' });
  }, []);

  const handleAttachment = useCallback(() => {
    // Simulate attachment functionality (e.g., document picker)
    console.log("Attachment clicked");
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color="#171725" />
          </TouchableOpacity>
          <Text style={styles.title}>AI pitch coach</Text>
          {/* <View style={styles.placeholder} /> */}
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Heading with sparkle icon */}
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>What can I help with</Text>
            <View style={styles.sparkleContainer}>
              <Text style={styles.sparkle}>✧</Text>
            </View>
          </View>

          {/* Input area */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Type a message..."
                placeholderTextColor="#9e9e9e"
                value={state.inputText}
                onChangeText={(text) => dispatch({ type: 'SET_INPUT_TEXT', payload: text })}
                multiline
              />
              <View style={styles.inputIcons}>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={handleAttachment}
                >
                  <Paperclip size={20} color="#9e9e9e" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={handleRecording}
                >
                  <Mic size={20} color={state.isRecording ? "#00a86b" : "#9e9e9e"} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSend}
              disabled={state.inputText.trim() === ''}
            >
              <Send size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id}
                style={styles.actionButton}
                onPress={() => handleQuickAction(action)}
              >
                {action.icon}
                <Text style={styles.actionText}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Loading indicator */}
          {state.isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#00a86b" />
              <Text style={styles.loadingText}>Processing...</Text>
            </View>
          )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 120,
    gap: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Variable',
    fontSize: 20,
    fontWeight: '700',
    color: '#221F1F',
  },
  placeholder: {
    width: 40,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171725',
  },
  sparkleContainer: {
    marginLeft: 8,
  },
  sparkle: {
    fontSize: 24,
    color: '#00a86b',
    transform: [{ rotate: '45deg' }],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FBFBFB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    color: '#171725',
    alignSelf: 'center',
    padding: 0,
  },
  inputIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00a86b',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: -3,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 8,
  },
  actionButton: {
    // width: 76,
    // height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#f9f9f9',
    gap: 4,
  },
  actionText: {
    fontSize: 10,
    color: '#221F1FB2',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});

export default AICoachScreen;
