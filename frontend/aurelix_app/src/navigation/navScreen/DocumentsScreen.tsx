import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  ActivityIndicator,
  Platform,
  Share,
  Alert
} from 'react-native';
import { ChevronLeft, Download, Share2 } from 'lucide-react-native';
// Note: You'll need to install react-native-pdf
// import Pdf from 'react-native-pdf';

const DocumentsScreen = ({ route, navigation }) => {
  const { uri, title } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDownload = async () => {
    try {
      // In a real app, you would implement file download functionality
      // For example, using react-native-fs
      Alert.alert('Download', `Downloading ${title}...`);
    } catch (error) {
      console.error('Error downloading document:', error);
      Alert.alert('Error', 'Failed to download document');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this document: ${title}`,
        url: uri, // iOS only
      });
    } catch (error) {
      console.error('Error sharing document:', error);
      Alert.alert('Error', 'Failed to share document');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <ChevronLeft size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleDownload}
            >
              <Download size={20} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Share2 size={20} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* PDF Viewer */}
        <View style={styles.pdfContainer}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#00a86b" />
              <Text style={styles.loadingText}>Loading document...</Text>
            </View>
          )}
          
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => setLoading(true)}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {/* Uncomment when you have react-native-pdf installed */}
          {/* <Pdf
            source={{ uri }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
              setLoading(false);
            }}
            onError={(error) => {
              console.error('Error loading PDF:', error);
              setError('Failed to load document');
              setLoading(false);
            }}
            style={styles.pdf}
          /> */}
          
          {/* Placeholder for PDF viewer */}
          <View style={styles.pdfPlaceholder}>
            <Text style={styles.pdfPlaceholderText}>
              PDF Viewer would be displayed here.
            </Text>
            <Text style={styles.pdfPlaceholderSubtext}>
              Install react-native-pdf and uncomment the Pdf component.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#221F1F',
    flex: 1,
    marginHorizontal: 16,
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#00a86b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  pdfPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pdfPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
  },
  pdfPlaceholderSubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
});

export default DocumentsScreen;