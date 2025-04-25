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
import { ChevronLeft } from 'lucide-react-native';

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
              title: '3D Model of Product',
              description: 'A 3D model of your product for investors to get AR view of your product',
              status: 'completed',
            },
            {
              id: '2',
              title: 'Certificate of Incorporation',
              description: 'Legal Proof that a business is officially registered',
              status: 'completed',
            },
            {
              id: '3',
              title: 'Business Plan',
              description: 'Mission, market opportunity and business model',
              status: 'completed',
            },
            {
              id: '4',
              title: 'Pitch Deck',
              description: 'Presentation of key business details',
              status: 'in-progress',
              progress: 90,
            },
            {
              id: '5',
              title: 'Investment Proposal',
              description: 'Founding amount needed and how it will be used.',
              status: 'in-progress',
              progress: 60,
            },
            {
              id: '6',
              title: 'Financial Statements',
              description: 'Balance sheet, Income and cash flow statement.',
              status: 'error',
            },
            {
              id: '7',
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
            <Ionicons name="checkmark" size={15} color="#ffffff"  />
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
            <Ionicons name="alert" size={15} color="#ffffff" />
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
      <View style={styles.headerTitleContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#171725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Business Documents</Text>
        </View>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.uploadArea}>
                <Ionicons name="cloud-upload-outline" size={48} color="#00a86b" />
                <Text style={styles.uploadText}>
                  Drop File Here or Browse
                </Text>
                <Text style={styles.supportedFormats}>Supports png, jpg, pdf</Text>
              </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F9F9F9",
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
    backgroundColor: "#F9F9F9",
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
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: "#E4E4E5",
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    height: 200,
    backgroundColor: "#E4E4E580",
  },
  uploadText: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 10,
  },
  supportedFormats: {
    color: "#6b7280",
    marginTop: 5,
  },
  contentContainer: {
    // padding: 20,
  },
  introText: {
    fontSize: 13,
    fontWeight: "300",
    color: '#221f1f',
  },
  documentsList: {
    marginTop: 10,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  documentInfo: {
    flex: 1,
    marginRight: 16,
  },
  documentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 13,
    fontWeight: "400",
    color: '#221f1f',
  },
  statusCompleted: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00a86b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  check:{
    fontSize: 15,
    fontWeight: "700",
  },
  statusError: {
    width: 24,
    height: 24,
    borderRadius: 12,
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
    height: 7,
    backgroundColor: '#E4E4E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00a86b',
  },
  progressText: {
    marginTop: 2,
    fontSize: 12,
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