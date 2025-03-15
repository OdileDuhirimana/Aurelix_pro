import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Types
interface FieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChange?: (text: string) => void;
  onPress?: () => void;
  optional?: boolean;
  isDropdown?: boolean;
}

// Reusable components
const Header = ({ onBack, title }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="chevron-back" size={24} color="#333" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const UserTypeSelector = ({ userType, onSelect }) => (
  <View style={styles.userTypeContainer}>
    {['entrepreneur', 'investor'].map((type) => (
      <TouchableOpacity
        key={type}
        style={[
          styles.userTypeOption,
          userType === type && styles.userTypeOptionSelected,
        ]}
        onPress={() => onSelect(type)}
      >
        <View
          style={[
            styles.radioButton,
            userType === type && styles.radioButtonSelected,
          ]}
        >
          {userType === type && <View style={styles.radioButtonInner} />}
        </View>
        <Text style={styles.userTypeText}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const FormField = ({ 
  label, 
  value, 
  placeholder, 
  onChange, 
  onPress, 
  optional = false,
  isDropdown = false 
}: FieldProps) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>
      {label}
      {optional && <Text style={styles.optionalText}> (Optional)</Text>}
    </Text>
    {isDropdown ? (
      <TouchableOpacity style={styles.dropdownInput} onPress={onPress}>
        <TextInput
          style={styles.inputText}
          placeholder={placeholder}
          placeholderTextColor="#AAAAAA"
          value={value}
          editable={false}
        />
        <Ionicons name="chevron-down" size={20} color="#333" style={styles.dropdownIcon} />
      </TouchableOpacity>
    ) : (
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#AAAAAA"
        value={value}
        onChangeText={onChange}
      />
    )}
  </View>
);

const DropdownModal = ({ visible, options, onSelect, onClose }) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <FlatList
          data={options}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.option} onPress={() => onSelect(item)}>
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const ProfileScreen = ({ navigation }) => {
  // State
  const [userType, setUserType] = useState('entrepreneur');
  const [formData, setFormData] = useState({
    businessName: '',
    fullName: '',
    sector: '',
    status: '',
    website: '',
    location: '',
    employees: '',
    investmentPreference: '',
    budget: '',
    linkedIn: '',
    twitter: '',
  });
  
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);

  // Dropdown data
  const dropdownData = {
    sector: ['Agriculture', 'Technology', 'Healthcare', 'Education', 'Finance'],
    status: ['Startup', 'SME', 'Enterprise'],
    employees: ['1-10', '11-50', '51-100', '100+'],
    investmentPreference: ['Startup', 'SME', 'Large enterprise', 'All'],
  };

  // Update form data
  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Open dropdown
  const openDropdown = useCallback((type) => {
    setDropdownOptions(dropdownData[type]);
    setSelectedDropdown(type);
    setDropdownVisible(true);
  }, [dropdownData]);

  // Select dropdown option
  const selectOption = useCallback((option) => {
    updateFormData(selectedDropdown, option);
    setDropdownVisible(false);
  }, [selectedDropdown, updateFormData]);

  // Handle continue button
  const handleContinue = useCallback(() => {
    console.log({ userType, ...formData });
    navigation.navigate('Success');
  }, [userType, formData, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Header 
        onBack={() => navigation.goBack()} 
        title="Profile" 
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <UserTypeSelector 
          userType={userType} 
          onSelect={setUserType} 
        />

        {userType === 'entrepreneur' ? (
          // Entrepreneur fields
          <>
            <FormField
              label="Business Name"
              value={formData.businessName}
              placeholder="Ex: Mc Donalds"
              onChange={(value) => updateFormData('businessName', value)}
            />

            <FormField
              label="Sector/Type"
              value={formData.sector}
              placeholder="Ex: Agriculture"
              isDropdown
              onPress={() => openDropdown('sector')}
            />

            <FormField
              label="Status"
              value={formData.status}
              placeholder="Ex: Startup"
              isDropdown
              onPress={() => openDropdown('status')}
            />

            <FormField
              label="Website"
              value={formData.website}
              placeholder="Ex: www.example.com"
              onChange={(value) => updateFormData('website', value)}
              optional
            />

            <FormField
              label="Location"
              value={formData.location}
              placeholder="Ex: Kigali KG44 ST"
              onChange={(value) => updateFormData('location', value)}
              optional
            />

            <FormField
              label="Number of Employees"
              value={formData.employees}
              placeholder="Ex: 70"
              isDropdown
              onPress={() => openDropdown('employees')}
              optional
            />
          </>
        ) : (
          // Investor fields
          <>
            <FormField
              label="Full name"
              value={formData.fullName}
              placeholder="Ex: Mark Robinson"
              onChange={(value) => updateFormData('fullName', value)}
            />

            <FormField
              label="Investment Preference"
              value={formData.investmentPreference}
              placeholder="Ex: Startup, Large enterprise, SMEs"
              isDropdown
              onPress={() => openDropdown('investmentPreference')}
            />

            <FormField
              label="Sector"
              value={formData.sector}
              placeholder="Ex: Agriculture, Technology"
              isDropdown
              onPress={() => openDropdown('sector')}
            />

            <FormField
              label="Budget"
              value={formData.budget}
              placeholder="Estimated amount"
              onChange={(value) => updateFormData('budget', value)}
            />

            <FormField
              label="LinkedIn account link"
              value={formData.linkedIn}
              placeholder=""
              onChange={(value) => updateFormData('linkedIn', value)}
            />

            <FormField
              label="X (formely twitter) account link"
              value={formData.twitter}
              placeholder=""
              onChange={(value) => updateFormData('twitter', value)}
            />
          </>
        )}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={
            styles.continueButtonText}>
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <DropdownModal
        visible={dropdownVisible}
        options={dropdownOptions}
        onSelect={selectOption}
        onClose={() => setDropdownVisible(false)}
      />
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
  investorContinueButton: {
    width: '100%',
    height: 60,
    borderRadius: 40,
  },
  continueButtonText: {
    color: '#FFEB3B',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  investorContinueButtonText: {
    color: '#FFEB3B',
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
  option: { 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#EEE' 
  },
  optionText: { 
    fontSize: 16, 
    color: '#333' 
  },
  closeButton: { 
    marginTop: 15, 
    alignItems: 'center' 
  },
  closeButtonText: { 
    color: 'red', 
    fontSize: 16 
  },
});

export default ProfileScreen;