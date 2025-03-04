import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { Feather, Ionicons } from "@expo/vector-icons"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"

type RootStackParamList = {
  Verification: undefined;
  VerifyEligibility: undefined;
  Uploading: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Verification">

export default function VerificationScreen({ navigation }: Props) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Function to pick a document
  const pickDocument = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/png", "image/jpeg"],
      })

      if (result.canceled) return

      const fileName = result.assets[0].name
      const fileType = result.assets[0].mimeType

      setSelectedFile(fileName)

      // If it's an image, show loading indicator before navigating
      if (fileType === "image/png" || fileType === "image/jpeg") {
        setIsUploading(true) // Show ActivityIndicator
        setTimeout(() => {
          setIsUploading(false) // Hide ActivityIndicator
          navigation.navigate("Uploading")
        }, 2000) // Simulate a 2-second upload
      }
    } catch (error) {
      console.error("Error picking document:", error)
    }
  }, [navigation])

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.stitle}>Verify Eligibility</Text>

        {/* File Upload Section */}
        <TouchableOpacity 
          style={styles.uploadArea} 
          onPress={pickDocument} 
          disabled={isUploading} // Disable button while uploading
        >
          {isUploading ? (
            <ActivityIndicator size="large" color="#00a86b" />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={48} color="#00a86b" />
              <Text style={styles.uploadText}>
                {selectedFile ? selectedFile : "Drop File here or "}
                {!selectedFile && <Text style={styles.browseText}>Browse</Text>}
              </Text>
              <Text style={styles.supportedFormats}>Supports png, jpg, pdf</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

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
    gap: 56,
    marginTop: 60,
    marginBottom: 21,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  stitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
    marginBottom: 48,
  },
  content: {
    alignItems: "center",
  },
  uploadArea: {
    width: "100%",
    maxWidth: 330,
    height: 200,
    borderWidth: 2,
    borderColor: "#d9d9d9",
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 16,
    marginTop: 10,
  },
  browseText: {
    color: "#00a86b",
  },
  supportedFormats: {
    color: "#6b7280",
    marginTop: 5,
  },
})
