import { useState, useEffect, useCallback, useRef } from "react";
import { 
  View, Text, TouchableOpacity, StyleSheet, Animated 
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  ProfileSetup: undefined;
  Uploading: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Uploading">;

export default function UploadingScreen({ navigation }: Props) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userAge, setUserAge] = useState<number>(20); // Add age state

  const progressAnim = useRef(new Animated.Value(uploadProgress)).current;

  // Simulate backend file upload process
  const simulateFileUpload = useCallback(async () => {
    setIsUploading(true);
    setErrorMessage("");
    let progress = 0;

    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadProgress(100);
      } else {
        progress += 5; // Increment progress
        setUploadProgress(progress);
      }
    }, 500);

    try {
      // Simulate an API call to upload the file
      await new Promise((resolve, reject) => setTimeout(resolve, 3000)); // Simulate delay
    } catch (error) {
      setErrorMessage("Failed to upload file");
      setIsUploading(false);
      clearInterval(interval);
    }
  }, []);

  // Retry upload functionality
  const handleRetry = () => {
    setErrorMessage("");
    setUploadProgress(0);
    simulateFileUpload();
  };

  const handleVerify = () => {
    // Age-based navigation logic (could simulate backend validation)
    if (userAge < 18) {
      navigation.navigate("ProfileSetup");
    } else {
      navigation.navigate("ProfileSetup");
    }
  };

  useEffect(() => {
    if (uploadProgress === 0 && !isUploading) {
      simulateFileUpload();
    }
  }, [uploadProgress, isUploading, simulateFileUpload]);

  // Simulating Backend API response for upload success/failure
  const simulateApiCall = useCallback(() => {
    return new Promise((resolve, reject) => {
      // Simulating network delay with a timeout
      setTimeout(() => {
        if (uploadProgress === 100) {
          resolve("Upload successful");
        } else {
          reject("Error during upload");
        }
      }, 5000);
    });
  }, [uploadProgress]);

  // Sync the progress animation with upload progress
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: uploadProgress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [uploadProgress]);

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

      {/* Title */}
      <Text style={styles.title}>Verify Eligibility</Text>

      {/* Upload Area */}
      <View style={styles.uploadArea}>
        <Ionicons name="cloud-upload-outline" size={48} color="#00a86b" />
        <Text style={styles.uploadText}>
          {isUploading ? "Your file is being uploaded" : "Upload Complete"}
        </Text>
        <Text style={styles.supportedFormats}>Supports png, jpg, pdf</Text>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.fileInfo}>
          <View style={styles.fileThumbnail}>
            <Ionicons name="document-outline" size={32} color="#666" />
          </View>
          <View style={styles.fileDetails}>
            <Text style={styles.fileName}>filename.png</Text>
            <ProgressBar progress={progressAnim} />
          </View>
          <Text style={styles.progressPercent}>{uploadProgress}%</Text>
        </View>
      </View>

      {/* Error Message */}
      {errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      <View style={styles.buttonContainer}>
        {/* Retry Button or Cancel Button based on upload state */}
        {isUploading ? (
          <TouchableOpacity style={styles.cancelButton} onPress={() => setIsUploading(false)}>
            <Text style={styles.buttonText}>Cancel Upload</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleVerify}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
            {errorMessage && (
              <TouchableOpacity style={styles.button} onPress={handleRetry}>
                <Text style={styles.buttonText}>Retry</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
}

// ProgressBar Component
function ProgressBar({ progress }: { progress: Animated.Value }) {
  return (
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
}

// Styles
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
  title: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    marginBottom: 48,
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
  progressContainer: {
    marginTop: 20,
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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
  },
  button: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: "#00a86b",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    height: 60,
    justifyContent: "center",
    alignContent: "center",
  },
  cancelButton: {
    width: '100%',
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
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
  },
});
