// 

import React, { useState, useCallback, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  Animated
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Feather, Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Types
type RootStackParamList = {
  Verification: undefined;
  Data: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Verification">;

// Reusable components
const Header = ({ onBack, title }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack}>
      <Feather name="chevron-left" size={24} color="black" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={{ width: 24 }} />
  </View>
);

const ProgressBar = ({ progress }: { progress: Animated.Value }) => (
  <View style={styles.progressBar}>
    <Animated.View
      style={[
        styles.progressFill,
        {
          width: progress.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
          }),
        },
      ]}
    />
  </View>
);

const FileInfo = ({ fileName, progress, progressValue }) => (
  <View style={styles.fileInfo}>
    <View style={styles.fileThumbnail}>
      <Ionicons name="document-outline" size={32} color="#666" />
    </View>
    <View style={styles.fileDetails}>
      <Text style={styles.fileName}>{fileName}</Text>
      <ProgressBar progress={progress} />
    </View>
    <Text style={styles.progressPercent}>{progressValue}%</Text>
  </View>
);

const ActionButton = ({ onPress, text, isCancel = false }) => (
  <TouchableOpacity 
    style={[styles.button, isCancel && styles.cancelButton]} 
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

export default function VerificationScreen({ navigation }: Props) {
  // State for document picking
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  
  // State for upload process
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Function to pick a document
  const pickDocument = useCallback(async () => {
    try {
      setIsSelecting(true);
      
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/png", "image/jpeg", "application/pdf"],
      });

      setIsSelecting(false);
      
      if (result.canceled) return;

      const fileName = result.assets[0].name;
      setSelectedFile(fileName);
      
      // Start the upload process
      setShowUploadProgress(true);
      simulateFileUpload();
      
    } catch (error) {
      setIsSelecting(false);
      setErrorMessage("Error picking document. Please try again.");
      console.error("Error picking document:", error);
    }
  }, []);

  // Simulate file upload
  const simulateFileUpload = useCallback(() => {
    setIsUploading(true);
    setErrorMessage("");
    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        progress = 100;
      }
      
      setUploadProgress(progress);
    }, 500);

    // Simulate potential error (10% chance)
    const simulateError = Math.random() > 0.9;
    
    if (simulateError) {
      setTimeout(() => {
        clearInterval(interval);
        setIsUploading(false);
        setErrorMessage("Failed to upload file");
      }, 2000);
    }

    return () => clearInterval(interval);
  }, []);

  // Handle button actions
  const handleRetry = () => {
    setErrorMessage("");
    setUploadProgress(0);
    simulateFileUpload();
  };

  const handleVerify = () => {
    navigation.navigate("Data");
  };

  const handleCancel = () => {
    setIsUploading(false);
    setShowUploadProgress(false);
    setSelectedFile(null);
    setUploadProgress(0);
    setErrorMessage("");
  };


  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: uploadProgress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [uploadProgress]);

  return (
    <View style={styles.container}>
      <Header 
        onBack={() => navigation.goBack()} 
        title="Verification" 
      />

      <View style={styles.content}>
        <Text style={styles.title}>Verify Eligibility</Text>

        {!showUploadProgress ? (
          <TouchableOpacity 
            style={styles.uploadArea} 
            onPress={pickDocument} 
            disabled={isSelecting}
          >
            {isSelecting ? (
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
        ) : (
          <>
            <View style={styles.uploadArea}>
              <Ionicons name="cloud-upload-outline" size={48} color="#00a86b" />
              <Text style={styles.uploadText}>
                {isUploading ? "Your file is being uploaded" : "Upload Complete"}
              </Text>
              <Text style={styles.supportedFormats}>Supports png, jpg, pdf</Text>
            </View>

            <View style={styles.progressContainer}>
              <FileInfo 
                fileName={selectedFile || "filename.png"}
                progress={progressAnim}
                progressValue={uploadProgress}
              />
            </View>

            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            <View style={styles.buttonContainer}>
              {isUploading ? (
                <ActionButton 
                  text="Cancel Upload"
                  onPress={handleCancel}
                  isCancel
                />
              ) : (
                <ActionButton 
                  text={errorMessage ? "Retry" : "Verify"}
                  onPress={errorMessage ? handleRetry : handleVerify}
                />
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
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
    justifyContent: "space-between",
    width: "100%",
    height: 40,
    marginTop: 60,
    marginBottom: 21,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    marginBottom: 48,
  },
  uploadArea: {
    width: "100%",
    maxWidth: 330,
    height: 200,
    borderWidth: 2,
    borderColor: "#E4E4E5",
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  browseText: {
    color: "#00a86b",
  },
  supportedFormats: {
    color: "#6b7280",
    marginTop: 5,
  },
  progressContainer: {
    marginTop: 20,
    width: "100%",
    maxWidth: 330,
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  fileThumbnail: {
    width: 60,
    height: 60,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00a86b",
  },
  progressPercent: {
    marginLeft: 10,
    marginBottom: 10,
    fontWeight: "500",
    fontSize: 15,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: "#00a86b",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    height: 60,
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#ff4d4d",
  },
  buttonText: {
    color: "#fce986",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});