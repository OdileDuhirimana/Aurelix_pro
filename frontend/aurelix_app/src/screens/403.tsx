import { View, Text, StyleSheet, Image } from "react-native"

const sad_face = require("../../assets/Vector.png");

export default function ForbiddenScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.errorCodeContainer}>
        <Text style={styles.errorCode}>
          4
        </Text>
          <View style={styles.sadFace}>
            <Image source={sad_face} style={styles.sadFaceImage} />
          </View>
        <Text style={styles.errorCode}>
          3
        </Text>
        </View>
        
        <Text style={styles.errorMessage}>
          Sorry, you do not have permission{"\n"}to access this resource. You should{"\n"}have 18+ years.
        </Text>
      </View>
      <View style={styles.dotsContainer}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  errorCodeContainer:{
    flexDirection: "row",
  },
  errorCode: {
    fontSize: 110,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: -20,
  },
  sadFace: {
    width: 95,
    height: 110,
    borderRadius: 9999,
    backgroundColor: "#00a86b",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  sadFaceImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain', // Ensures the image fits correctly inside the circle
  },
  errorMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#6b7280",
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d9d9d9",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#00a86b",
    width: 32,
  },
})
