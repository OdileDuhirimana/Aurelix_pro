import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { MessageCircle } from "lucide-react-native"

import type { Business } from "../../index"

interface BusinessCardProps {
  business: Business
  onPress: () => void
  onChatPress: () => void
  style?: any
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onPress, onChatPress, style }) => {
  // Determine if image is a valid URL or use placeholder
  const hasValidImage = business.image.startsWith("http")

  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        {hasValidImage ? (
          <Image source={{ uri: business.image }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>{business.name.charAt(0)}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {business.name}
        </Text>
        <View style={styles.investorCountRow}>
          <Text style={styles.countNumber}>{business.investors}</Text>
          <Text style={styles.countText}> Investors</Text>
        </View>
        <Text style={styles.category}>{business.industry}</Text>
        <Text style={styles.location} numberOfLines={1}>
          {business.location}
        </Text>

        <TouchableOpacity
          style={styles.chatButton}
          onPress={onChatPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MessageCircle size={20} color="#00a86b" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
    flex: 1,
  },
  imageContainer: {
    height: 120,
    backgroundColor: "#F0F0F0",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E4E4E5",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    color: "#787777",
  },
  content: {
    padding: 12,
    position: "relative",
    paddingBottom: 24, // Extra space for the chat button
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#232327",
    lineHeight: 20,
  },
  investorCountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  countNumber: {
    color: "#00a86b",
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
  countText: {
    color: "#232327",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  category: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#787777",
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#787777",
    marginTop: 2,
    marginBottom: 16,
  },
  chatButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },
})

export default BusinessCard

