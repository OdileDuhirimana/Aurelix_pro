import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView, 
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ImageBackground
} from 'react-native';
import { ChevronLeft, Play, Paperclip, Mic, Send } from 'lucide-react-native';
import Loader from 'react-native-three-dots';

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
}

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

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.sender === 'user';
  return (
    <View 
      style={[
        styles.messageBubble,
        isUser ? styles.userBubble : styles.aiBubble
      ]}
    >
      <Text style={isUser ? styles.messageTextUser : styles.messageText}>{message.text}</Text>
    </View>
  );
};

const VideoPlayer = ({ videoUrl, thumbnailUrl }: VideoFeedback) => {
  const handlePlayVideo = () => {
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
      >
        <View style={styles.playButton}>
          <Play size={24} color="#171725" fill="#ffffff" />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const AIScreen = ({ route, navigation }) => {
  const initialMessage = route?.params?.initialMessage || '';
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<any>(null);

  useEffect(() => {
    if (initialMessage) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: initialMessage,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([userMessage]);
      handleInitialResponse(initialMessage);
    }
  }, [initialMessage]);

  const handleInitialResponse = async (text: string) => {
    setIsLoading(true);
    try {
      const aiMessage = await simulateBackendResponse(text);
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleSend = async () => {
    if (inputText.trim() === '') return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    addMessage(userMessage);
    setInputText('');
    setIsLoading(true);
    
    try {
      const aiMessage = await simulateBackendResponse(inputText);
      addMessage(aiMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleAttachment = () => {
    console.log('Attachment button pressed');
  };

  const renderMessage = ({ item }: { item: Message }) => <MessageBubble message={item} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color="#171725" />
          </TouchableOpacity>
          <Text style={styles.title}>AI pitch coach</Text>
        </View>
        <View style={styles.chatContainer}>
          <VideoPlayer 
            id='1'
            videoUrl="https://example.com/video.mp4" 
            thumbnailUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/InveConnect-6sTve3hGqyi1Cm4zpGjDrR09Tw5RbP.png#crop=400,200,700,400"
          />
          <FlatList 
            ref={scrollViewRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Loader color='#00a86b' speed={150} />
          </View>
        )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 20,
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
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chatContent: {
    paddingBottom: 24,
  },
  videoContainer: {
    alignSelf: 'flex-end',
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    width: '60%',
    aspectRatio: 16 / 9,
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    alignSelf: 'flex-end',
    backgroundColor: '#00a86b',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 12.5,
    fontFamily: 'Poppins-Regular',
    color: '#171725',
  },
  messageTextUser: {
    fontSize: 12.5,
    color: '#ffffff',
  },
  loadingContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginHorizontal: 20,
    marginVertical: 10,
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
});

export default AIScreen;