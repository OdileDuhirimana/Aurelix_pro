import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { Feather, Ionicons } from "@expo/vector-icons"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

type RootStackParamList = {
  Verification: undefined;
  VerifyEligibility: undefined;
  Uploading: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Verification">

// Simulate a file upload request to the backend
const simulateFileUpload = (file: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (file) {
        resolve("File uploaded successfully")
      } else {
        reject("File upload failed")
      }
    }, 2000)
  })
}

export default function VerificationScreen({ navigation }: Props) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Optimized file picker handler using useCallback
  const pickDocument = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/png", "image/jpeg", "application/pdf"],
      })

      if (result.canceled) return

      setSelectedFile(result.assets[0].name)
      setUploadError(null) // Reset any previous error
    } catch (error) {
      console.error("Error picking document:", error)
    }
  }, [])

  // Handle file upload (simulated backend call)
  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      const response = await simulateFileUpload(selectedFile)
      setIsUploading(false)
      // Navigate to the next screen or show success
      navigation.navigate("Uploading")
    } catch (error) {
      setIsUploading(false)
      setUploadError(error as string)
    }
  }

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
        <TouchableOpacity style={styles.uploadArea} onPress={pickDocument}>
          <Ionicons name="cloud-upload-outline" size={48} color="#00a86b" />
          <Text style={styles.uploadText}>
            {selectedFile ? selectedFile : "Drop File here or "}
            {!selectedFile && <Text style={styles.browseText}>Browse</Text>}
          </Text>
          <Text style={styles.supportedFormats}>Supports png, jpg, pdf</Text>
        </TouchableOpacity>

        {/* Upload Error Message */}
        {uploadError && <Text style={styles.errorText}>{uploadError}</Text>}

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.button, !selectedFile && styles.disabledButton]}
          disabled={!selectedFile || isUploading}
          onPress={handleUpload}
        >
          {isUploading ? (
            <ActivityIndicator size="small" color="#FCE986" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
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
  errorText: {
    color: "#ff0000",
    marginTop: 10,
  },
  button: {
    width: "100%",
    maxWidth: 330,
    backgroundColor: "#00a86b",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#a5d6a7",
  },
  buttonText: {
    color: "#FCE986",
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
})
