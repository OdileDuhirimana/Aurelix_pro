import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DotSpinner from '../components/DotSpinner';

// Define the user data type for type safety
interface UserData {
  fullName: string;
  nationality: string;
  idNumber: string;
  sex: string;
  dateOfBirth: string;
  isVerified: boolean;
}

const IDVerifyScreen = ({ navigation }) => {
  // State to store user data (would come from API/params in real app)
  const [userData, setUserData] = useState<UserData>({
    fullName: 'MUKARUSINE Rose',
    nationality: 'Rwandese',
    idNumber: '1 1996 X XXXXX X XX',
    sex: 'F',
    dateOfBirth: '30.04.1996',
    isVerified: false,
  });

  const [userAge, setUserAge] = useState<number>(16);
  
  const [isLoading, setIsLoading] = useState(false);
  const [fieldsVerified, setFieldsVerified] = useState({
    fullName: true,
    nationality: true,
    idNumber: true,
    sex: true,
    dateOfBirth: true,
  });

  // This would be replaced with actual API call in production
  const handleVerify = async () => {
    setIsLoading(true);
    setUserAge(20);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // This would be the response from your backend
      const verificationSuccessful = true;
      
      if (verificationSuccessful) {
        setUserData(prev => ({
          ...prev,
          isVerified: true,
        }));

        if(userAge < 18){
          navigation.navigate('Forbidden')
        } else{
          navigation.navigate('ProfileSetup')
        }
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('An error occurred during verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Field component for consistent styling
  const FieldItem = ({ label, value }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldValueContainer}>
        <Text style={styles.fieldValue}>{value}</Text>
        {fieldsVerified[label.toLowerCase().replace(' ', '')] && (
          <View style={styles.checkmarkContainer}>
            <Ionicons name="checkmark" size={15} color="#fff" />
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" style={styles.loader}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification</Text>
      </View>
      {isLoading? (
        //   <View style={styles.modalContainer}>
        //   <View style={styles.modalContent}>
        //     <ActivityIndicator size={150} color="#00A86B" />
        //     <Text style={styles.modalText}>Still verifying please wait...</Text>
        //   </View>
        // </View>
        <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <DotSpinner size={100} color="#00B074"/>
      <Text style={styles.modalText}>Still verifying please wait...</Text>
    </View>
  </View>
      ):(
      <View style={styles.content}>
      <Text style={styles.title}>Verify Eligibility</Text>
      
      <View style={styles.fieldsContainer}>
        <FieldItem label="Full Name" value={userData.fullName} />
        <FieldItem label="Nationality" value={userData.nationality} />
        <FieldItem label="ID Number" value={userData.idNumber} />
        <FieldItem label="Sex" value={userData.sex} />
        <FieldItem label="Date of Birth" value={userData.dateOfBirth} />
      </View>
      
      {/* Verify Button */}
      <TouchableOpacity 
        style={styles.verifyButton}
        onPress={handleVerify}>
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
    // paddingHorizontal: 24,
    // paddingTop: 20,
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
    width: 334,
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
  modalContainer: {
    marginTop: 125,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F9F9F9',
  },
  modalContent: {
    backgroundColor: '#F9F9F9',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    marginTop: 50,
    fontFamily: 'Inter-Variable',
    fontSize: 20,
    color: '#221F1FCC',
    fontWeight: '600',
  },
  loader:{
    //To be implemeneted further
  },
});

export default IDVerifyScreen;
