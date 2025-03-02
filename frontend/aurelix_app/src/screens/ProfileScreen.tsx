import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

// Define types
type RootStackParamList = {
  Profile: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

type UserType = "entrepreneur" | "investor";

type FormData = {
  businessName: string;
  sector: string;
  status: string;
  website: string;
  location: string;
  employees: string;
};

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [userType, setUserType] = useState<UserType>("entrepreneur");
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    sector: "",
    status: "",
    website: "",
    location: "",
    employees: "",
  });

  const [sectors, setSectors] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulated API call
        setSectors(["Agriculture", "Tech", "Healthcare", "Finance"]);
        setStatuses(["Startup", "Established", "Growing"]);
      } catch (error) {
        Alert.alert("Error", "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleContinue = useCallback(async () => {
    const { businessName, sector, status } = formData;
    if (!businessName || !sector || !status) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }
    setLoading(true);
    try {
      // Simulated backend call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Alert.alert("Success", "Profile submitted successfully!");
    } catch (error) {
      Alert.alert("Error", "Submission failed.");
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Feather name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {loading && <ActivityIndicator size="large" color="#00A86B" style={styles.loader} />}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.typeContainer}>
          {["entrepreneur", "investor"].map((type) => (
            <TouchableOpacity
              key={type}
              style={styles.typeOption}
              onPress={() => setUserType(type as UserType)}
            >
              <View style={[styles.radio, userType === type && styles.radioSelected]}>
                {userType === type && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.typeText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {["businessName", "sector", "status", "website", "location", "employees"].map((field) => (
          <View key={field} style={styles.formGroup}>
            <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${field}`}
              placeholderTextColor="#9CA3AF"
              value={formData[field as keyof FormData]}
              onChangeText={(text) => handleInputChange(field as keyof FormData, text)}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue} disabled={loading}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, marginTop: 38, marginBottom: 24 },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 16, fontWeight: "600" },
  content: { flex: 1, paddingHorizontal: 24 },
  typeContainer: { flexDirection: "row", marginBottom: 16 },
  typeOption: { flexDirection: "row", alignItems: "center", marginRight: 16 },
  typeText: { fontSize: 14, color: "#000" },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#D1D5DB", alignItems: "center", justifyContent: "center" },
  radioSelected: { borderColor: "#00A86B" },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#00A86B" },
  formGroup: { marginBottom: 24 },
  label: { fontSize: 14, color: "#6B7280" },
  input: { height: 40, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, paddingHorizontal: 10 },
  continueButton: { backgroundColor: "#00A86B", borderRadius: 10, height: 50, justifyContent: "center", alignItems: "center" },
  continueButtonText: { color: "#FFEB3B", fontSize: 18, fontWeight: "600" },
  loader: { marginVertical: 10 }
});

export default ProfileScreen;
