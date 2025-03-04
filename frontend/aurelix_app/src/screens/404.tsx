import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"

const sad_face = require("../../assets/Vector.png");

export default function NotFoundScreen({navigation}) {
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
          4
        </Text>
        </View>
        
        <Text style={styles.errorMessage}>
          Sorry for the inconvenience go back{"\n"}we'll be back soon...
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Go back</Text>
        </TouchableOpacity>
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
    backgroundColor: "#F9F9F9",
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
    fontFamily: 'Poppins-Black',
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: -20,
  },
  sadFace: {
    width: 95,
    height: 110,
    borderRadius: "100%",
    backgroundColor: "#00a86b",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    position: 'relative',
    top: 10,
  },
  sadFaceImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain', // Ensures the image fits correctly inside the circle
  },
  errorMessage: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    textAlign: "center",
    color: "#6b7280",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: "#00a86b",
    fontSize: 18,
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
