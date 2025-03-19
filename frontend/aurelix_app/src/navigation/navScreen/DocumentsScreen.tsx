import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  Image
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';


interface Document {
  id: string;
  title: string;
  description: string;
}

// List of documents
const documents: Document[] = [
  {
    id: '1',
    title: 'Certificate of Incorporation',
    description: 'Legal Proof that a business is officially registered'
  },
  {
    id: '2',
    title: 'Business Plan',
    description: 'Mission, market opportunity and business model'
  },
  {
    id: '3',
    title: 'Pitch Deck',
    description: 'Presentation of key business details'
  },
  {
    id: '4',
    title: 'Investment Proposal',
    description: 'Founding amount needed and how it will be used.'
  },
  {
    id: '5',
    title: 'Financial Statements',
    description: 'Balance sheet, Income and cash flow statement.'
  },
  {
    id: '6',
    title: 'Legal Documents',
    description: 'Business licenses, shareholder agreements and intellectual property rights.'
  }
];

// Document item component
const DocumentItem = ({ document }: { document: Document }) => {
  return (
    <TouchableOpacity style={styles.documentItem}>
      <Image 
        source={require('./assets/pdf-icon.png')} 
        style={styles.pdfIcon}
        defaultSource={require('./assets/pdf-icon.png')}
      />
      <View style={styles.documentInfo}>
        <Text style={styles.documentTitle}>{document.title}</Text>
        <Text style={styles.documentDescription}>{document.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Main component
const DocumentsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.title}>Canaberra Documents</Text>
          <TouchableOpacity style={styles.chatButton}>
            <View style={styles.chatIcon}>
              <Text style={styles.chatDots}>...</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Document List */}
        <ScrollView style={styles.documentList}>
          {documents.map((document) => (
            <DocumentItem key={document.id} document={document} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    fontSize: 20,
    fontWeight: '700',
    color: '#221F1F',
  },
  chatButton: {
    padding: 8,
  },
  chatIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00a86b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatDots: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -8,
  },
  documentList: {
    flex: 1,
    padding: 16,
  },
  documentItem: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  pdfIcon: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#221F1F',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default DocumentsScreen;