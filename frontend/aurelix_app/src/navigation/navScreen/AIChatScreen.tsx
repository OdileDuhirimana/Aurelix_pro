import React, { useState, useRef, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  SafeAreaView, 
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ImageStyle,
  ImageBackground
} from 'react-native';
import { ChevronLeft, Play, Paperclip, Mic, Send } from 'lucide-react-native';

// Define TypeScript interfaces for data structures
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface VideoFeedback {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  feedback?: string;
}

// Context to manage the messages globally (for scalability)
const MessagesContext = React.createContext<any>(null);

// Simulating backend data fetching
const simulateBackendResponse = (inputText: string): Promise<Message> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: (Date.now() + 1).toString(),
        text: `AI feedback for: "${inputText}". Your pitch can improve by adding more specific data points and speaking slowly. Eye contact is important. Rating: 7/10.`,
        sender: 'ai',
        timestamp: new Date(),
      });
    }, 3500);
  });
};

// Message bubble component
const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.sender === 'user';
  return (
    <View 
      style={[
        styles.messageBubble,
        isUser ? styles.userBubble : styles.aiBubble
      ]}
    >
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );
};

const VideoPlayer = ({ videoUrl, thumbnailUrl }: VideoFeedback) => {
  const handlePlayVideo = () => {
    // Simulate video play action
    console.log('Playing video:', videoUrl);
  };

  return (
    <TouchableOpacity 
      style={styles.videoContainer}
      onPress={handlePlayVideo}
    >
      <ImageBackground 
        source={{ uri: thumbnailUrl }} 
        style={styles.videoThumbnail}
         // For customizing the background image
      >
        <View style={styles.playButton}>
          <Play size={24} color="#171725" fill="#ffffff" />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const AIScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<any>(null);

  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleSend = async () => {
    if (inputText.trim() === '') return;
    
    // Add user message to state
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    addMessage(userMessage);
    setInputText('');
    setIsLoading(true);
    
    // Simulate API call and get AI response
    try {
      const aiMessage = await simulateBackendResponse(inputText);
      addMessage(aiMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      // Scroll to bottom after AI response
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleRecording = () => {
    // Toggle recording state (simulate audio recording)
    setIsRecording(!isRecording);
  };

  const handleAttachment = () => {
    // Simulate attachment action
    console.log('Attachment button pressed');
  };

  // Render messages using FlatList for performance
  const renderMessage = ({ item }: { item: Message }) => <MessageBubble message={item} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft size={24} color="#171725" />
          </TouchableOpacity>
          <Text style={styles.title}>AI pitch coach</Text>
          {/* <View style={styles.placeholder} /> */}
        </View>

        {/* Chat content */}
        <FlatList 
          ref={scrollViewRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Video thumbnail */}
          <VideoPlayer 
            id='1'
            videoUrl="https://example.com/video.mp4" 
            thumbnailUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-6sTve3hGqyi1Cm4zpGjDrR09Tw5RbP.png#crop=400,200,700,400"
          />
        </FlatList>

        {/* Loading indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>AI is thinking...</Text>
          </View>
        )}

        {/* Input area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#9e9e9e"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity 
              style={styles.attachButton}
              onPress={handleAttachment}
            >
              <Paperclip size={20} color="#9e9e9e" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.micButton}
              onPress={handleRecording}
            >
              <Mic size={20} color={isRecording ? "#00a86b" : "#9e9e9e"} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSend}
            disabled={inputText.trim() === ''}
          >
            <Send size={20} color="#ffffff" fill="#00a86b" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default AIScreen;


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
  // placeholder: {
  //   width: 40,
  // },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 24,
  },
  videoContainer: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    width: '60%',
    aspectRatio: 16 / 9,
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    justifyContent: 'center', // Center the play button
    alignItems: 'center', // Center the play button
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#00a86b',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#171725',
  },
  loadingContainer: {
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#737373',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FBFBFB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    color: '#171725',
  },
  attachButton: {
    padding: 8,
  },
  micButton: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00a86b',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  imageStyle: {
    borderRadius: 12, // Rounded corners for the image inside ImageBackground
  },
});
