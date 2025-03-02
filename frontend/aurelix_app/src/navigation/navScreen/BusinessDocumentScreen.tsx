import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Document type definition
type DocumentStatus = 'completed' | 'in-progress' | 'error' | 'pending';

interface Document {
  id: string;
  title: string;
  description: string;
  status: DocumentStatus;
  progress?: number;
}

const BusinessDocumentsScreen = ({ navigation }) => {
  // State for documents - in a real app, this would be fetched from an API
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching documents from an API
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // In a real app, this would be an API call
        // await api.getBusinessDocuments()
        
        // Simulating API response
        setTimeout(() => {
          setDocuments([
            {
              id: '1',
              title: 'Certificate of Incorporation',
              description: 'Legal Proof that a business is officially registered',
              status: 'completed',
            },
            {
              id: '2',
              title: 'Business Plan',
              description: 'Mission, market opportunity and business model',
              status: 'completed',
            },
            {
              id: '3',
              title: 'Pitch Deck',
              description: 'Presentation of key business details',
              status: 'in-progress',
              progress: 90,
            },
            {
              id: '4',
              title: 'Investment Proposal',
              description: 'Founding amount needed and how it will be used.',
              status: 'in-progress',
              progress: 60,
            },
            {
              id: '5',
              title: 'Financial Statements',
              description: 'Balance sheet, Income and cash flow statement.',
              status: 'error',
            },
            {
              id: '6',
              title: 'Legal Documents',
              description: 'Business licenses, shareholder agreements and intellectual property rights.',
              status: 'error',
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load documents');
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Function to handle document upload - would connect to backend
  const handleDocumentUpload = (documentId: string) => {
    // In a real app, this would open a document picker and upload to backend
    console.log(`Upload document with ID: ${documentId}`);
    
    // Example of how you would update the state after successful upload
    // setDocuments(prevDocs => 
    //   prevDocs.map(doc => 
    //     doc.id === documentId 
    //       ? { ...doc, status: 'in-progress', progress: 10 } 
    //       : doc
    //   )
    // );
  };

  // Render status indicator based on document status
  const renderStatusIndicator = (document: Document) => {
    switch (document.status) {
      case 'completed':
        return (
          <View style={styles.statusCompleted}>
            <Ionicons name="checkmark" size={20} color="#ffffff" />
          </View>
        );
      case 'in-progress':
        return (
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${document.progress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{document.progress}%</Text>
          </View>
        );
      case 'error':
        return (
          <View style={styles.statusError}>
            <Ionicons name="alert" size={20} color="#ffffff" />
          </View>
        );
      default:
        return (
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => handleDocumentUpload(document.id)}
          >
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00a86b" />
        <Text style={styles.loadingText}>Loading documents...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={50} color="#ff3b30" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            setError(null);
            // Retry fetching documents
          }}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Business Documents</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.introText}>
            Upload the following documents to verify your business eligibility.
          </Text>
          
          {/* Documents List */}
          <View style={styles.documentsList}>
            {documents.map((document) => (
              <View key={document.id} style={styles.documentItem}>
                <View style={styles.documentInfo}>
                  <Text style={styles.documentTitle}>{document.title}</Text>
                  <Text style={styles.documentDescription}>{document.description}</Text>
                </View>
                {renderStatusIndicator(document)}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Note: Bottom navigation is assumed to be provided elsewhere */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#221f1f',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#221f1f',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00a86b',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  introText: {
    fontSize: 18,
    color: '#221f1f',
    marginBottom: 24,
  },
  documentsList: {
    marginTop: 10,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  documentInfo: {
    flex: 1,
    marginRight: 16,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 14,
    color: '#221f1f',
  },
  statusCompleted: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00a86b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusError: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    alignItems: 'flex-end',
    width: 100,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#c2c2c2',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00a86b',
  },
  progressText: {
    marginTop: 4,
    fontSize: 14,
    color: '#221f1f',
  },
  uploadButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#00a86b',
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BusinessDocumentsScreen;