import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { MessageCircle } from "lucide-react-native"

// Unified type that can represent both Business and Investor
interface EntityCardProps {
  entity: {
    id: string
    name: string
    image: string
    location: string
    industry: string
    investors?: string
    investments?: string
  }
  type: "business" | "investor"
  onPress: () => void
  onChatPress: () => void
  style?: any
}

const EntityCard: React.FC<EntityCardProps> = ({ entity, type, onPress, onChatPress, style }) => {
  const hasValidImage = entity.image && entity.image.startsWith("http")

  const countValue = type === "business" ? entity.investors : entity.investments
  const countLabel = type === "business" ? "Investors" : "Investments"

  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        {hasValidImage ? (
          <Image source={{ uri: entity.image }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>{entity.name.charAt(0)}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {entity.name}
        </Text>
        <View style={styles.countRow}>
          <Text style={styles.countNumber}>{countValue}</Text>
          <Text style={styles.countText}> {countLabel}</Text>
        </View>
        <Text style={styles.category}>{entity.industry}</Text>
        <Text style={styles.location} numberOfLines={1}>
          {entity.location}
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
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  imageContainer: {
    height: 150,
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
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#221F1F",
    lineHeight: 20,
  },
  countRow: {
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
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  category: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginTop: 4,
    marginBottom: 16,
  },
  chatButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },
})

export default EntityCard