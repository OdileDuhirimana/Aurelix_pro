import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DotSpinner from '../components/DotSpinner';

// Types
interface UserData {
  fullName: string;
  nationality: string;
  idNumber: string;
  sex: string;
  dateOfBirth: string;
  isVerified: boolean;
}

interface FieldItemProps {
  label: string;
  value: string;
  isVerified: boolean;
  onPress?: () => void;
}

// Reusable components
const Header = ({ onBack, title }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="chevron-back" size={24} color="#000" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const FieldItem = ({ label, value, isVerified, onPress }: FieldItemProps) => (
  <TouchableOpacity 
    style={styles.fieldContainer} 
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.fieldValueContainer}>
      <Text style={styles.fieldValue}>{value}</Text>
      {isVerified && (
        <View style={styles.checkmarkContainer}>
          <Ionicons name="checkmark" size={15} color="#fff" />
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const LoadingView = () => (
  <View style={styles.loadingContainer}>
    <DotSpinner size={100} color="#00B074"/>
    <Text style={styles.loadingText}>Still verifying please wait...</Text>
  </View>
);

const IDVerifyScreen = ({ navigation }) => {
  // State
  const [userData, setUserData] = useState<UserData>({
    fullName: 'MUKARUSINE Rose',
    nationality: 'Rwandese',
    idNumber: '1 1996 X XXXXX X XX',
    sex: 'F',
    dateOfBirth: '30.04.1996',
    isVerified: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedFields, setVerifiedFields] = useState({
    fullName: true,
    nationality: true,
    idNumber: true,
    sex: true,
    dateOfBirth: true,
  });

  // Toggle field verification status when clicked
  const toggleFieldVerification = (field: string) => {
    setVerifiedFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Handle verification
  const handleVerify = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Simulate backend response
      const userAge = 20; // This would come from backend
      const verificationSuccessful = true;
      
      if (verificationSuccessful) {
        setUserData(prev => ({
          ...prev,
          isVerified: true,
        }));

        // Navigate based on age
        navigation.navigate(userAge < 18 ? 'Forbidden' : 'ProfileSetup');
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('An error occurred during verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Header 
        onBack={() => navigation.goBack()} 
        title="Verification" 
      />
      
      {isLoading ? (
        <LoadingView />
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>Verify Eligibility</Text>
          
          <View style={styles.fieldsContainer}>
            {Object.entries(userData)
              .filter(([key]) => key !== 'isVerified')
              .map(([key, value]) => {
                // Format the label (e.g., "fullName" -> "Full Name")
                const label = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase());
                
                return (
                  <FieldItem 
                    key={key}
                    label={label}
                    value={value}
                    isVerified={verifiedFields[key]}
                    onPress={() => toggleFieldVerification(key)}
                  />
                );
              })}
          </View>
          
          <TouchableOpacity 
            style={styles.verifyButton}
            onPress={handleVerify}
          >
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    gap: 65,
    marginTop: 60,
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    marginBottom: 65,
  },
  fieldsContainer: {
    marginBottom: 40,
  },
  fieldContainer: {
    width: "100%",
    maxWidth: 334,
    height: 41,
    marginBottom: 24,
  },
  fieldLabel: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: '#787777',
    marginBottom: 4,
  },
  fieldValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#221F1F',
  },
  checkmarkContainer: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: '#00A86B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButton: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: "#00a86b",
    padding: 15,
    borderRadius: 32,
    alignItems: "center",
    height: 65,
    justifyContent: "center",
    alignSelf: 'center',
  },
  verifyButtonText: {
    color: "#fce986",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 50,
    fontFamily: 'Inter-Variable',
    fontSize: 20,
    color: '#221F1FCC',
    fontWeight: '600',
  },
});

export default IDVerifyScreen;