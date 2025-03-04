import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [userType, setUserType] = useState('entrepreneur');
  const [businessName, setBusinessName] = useState('');
  const [sector, setSector] = useState('');
  const [status, setStatus] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [employees, setEmployees] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const handleContinue = () => {
    console.log({
      userType,
      businessName,
      sector,
      status,
      website,
      location,
      employees,
    });
    navigation.navigate('Success');
  };

  const dropdownData = {
    sector: ['Agriculture', 'Technology', 'Healthcare', 'Education', 'Finance'],
    status: ['Startup', 'SME', 'Enterprise'],
    employees: ['1-10', '11-50', '51-100', '100+'],
  };

  const openDropdown = (type) => {
    setDropdownOptions(dropdownData[type]);
    setSelectedDropdown(type);
    setDropdownVisible(true);
  };

  const selectOption = (option) => {
    if (selectedDropdown === 'sector') setSector(option);
    if (selectedDropdown === 'status') setStatus(option);
    if (selectedDropdown === 'employees') setEmployees(option);
    setDropdownVisible(false);
  };

  const renderDropdownField = (label, value, placeholder, type, optional = false) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>
          {label}
          {optional && <Text style={styles.optionalText}> (Optional)</Text>}
        </Text>
        <TouchableOpacity
          style={styles.dropdownInput}
          onPress={() => openDropdown(type)}>
          <TextInput
            style={styles.inputText}
            placeholder={placeholder}
            placeholderTextColor="#AAAAAA"
            value={value}
            editable={false}
          />
          <Ionicons name="chevron-down" size={20} color="#333" style={styles.dropdownIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTextField = (label, value, placeholder, onChange, optional = false) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>
          {label}
          {optional && <Text style={styles.optionalText}> (Optional)</Text>}
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#AAAAAA"
          value={value}
          onChangeText={onChange}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Type Selection */}
        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[
              styles.userTypeOption,
              userType === 'entrepreneur' && styles.userTypeOptionSelected,
            ]}
            onPress={() => setUserType('entrepreneur')}
          >
            <View
              style={[
                styles.radioButton,
                userType === 'entrepreneur' && styles.radioButtonSelected,
              ]}
            >
              {userType === 'entrepreneur' && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.userTypeText}>Entrepreneur</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.userTypeOption,
              userType === 'investor' && styles.userTypeOptionSelected,
            ]}
            onPress={() => setUserType('investor')}
          >
            <View
              style={[
                styles.radioButton,
                userType === 'investor' && styles.radioButtonSelected,
              ]}
            >
              {userType === 'investor' && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.userTypeText}>Investor</Text>
          </TouchableOpacity>
        </View>

        {renderTextField(
          'Business Name',
          businessName,
          'Ex: Mc Donalds',
          setBusinessName
        )}

        {renderDropdownField(
          'Sector/Type',
          sector,
          'Ex: Agriculture',
          'sector'
        )}

        {renderDropdownField(
          'Status',
          status,
          'Ex: Startup',
          'status'
        )}

        {renderTextField(
          'Website',
          website,
          'Ex: www.example.com',
          setWebsite,
          true
        )}

        {renderTextField(
          'Location',
          location,
          'Ex: Kigali KG44 ST',
          setLocation,
          true
        )}

        {renderDropdownField(
          'Number of Employees',
          employees,
          'Ex: 70',
          'employees',
          true
        )}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* Dropdown Modal */}
        <Modal visible={dropdownVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={dropdownOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.option} 
                    onPress={() => selectOption(item)}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setDropdownVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
      flex: 1, 
      backgroundColor: "#F9F9F9", 
      padding: 20
  },
  header: { 
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    gap: 65,
    marginTop: 40,
    marginBottom: 10,
  },
  headerTitle: { 
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 38,
    marginBottom: 20,
  },
  userTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    width: '48%',
  },
  userTypeOptionSelected: {
    borderColor: '#00B074',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A3A2A3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#00B074',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#00B074',
  },
  userTypeText: {
    fontSize: 12,
    fontFamily: 'Poppins-ExtraLight',
    color: '#A3A2A3',
    height: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingVertical: 1,
    paddingHorizontal: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#787777',
    marginBottom: 10,
  },
  optionalText: {
    color: '#999999',
    fontWeight: '400',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#221F1F1A',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333333',
  },
  dropdownInput: {
    borderWidth: 1,
    borderColor: '#221F1F1A',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 7,
    fontSize: 16,
    color: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333333',
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  continueButton: {
    backgroundColor: '#00B074',
    width: 170,
    borderRadius: 32,
    paddingVertical: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#FFEB3B',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    maxHeight: '60%',
  },
  option: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  optionText: { fontSize: 16, color: '#333' },
  closeButton: { marginTop: 15, alignItems: 'center' },
  closeButtonText: { color: 'red', fontSize: 16 },
});

export default ProfileScreen;
