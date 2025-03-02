import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { MessageCircle } from "lucide-react-native"

interface Investor {
    id: string
    name: string
    investments: string
    industry: string
    location: string
    image: string
  }
  
interface InvestorCardProps {
  investor: Investor
  onPress: (investor: Investor) => void
  onChatPress: (investor: Investor) => void
  style?: object
}

const InvestorCard: React.FC<InvestorCardProps> = ({ investor, onPress, onChatPress, style }) => {
  return (
    <TouchableOpacity style={[styles.investorCard, style]} onPress={() => onPress(investor)} activeOpacity={0.8}>
      <Image source={{ uri: investor.image }} style={styles.investorImage} resizeMode="cover" />
      <View style={styles.investorDetails}>
        <Text style={styles.investorName} numberOfLines={1}>
          {investor.name}
        </Text>
        <View style={styles.investmentRow}>
          <Text style={styles.investmentCount}>{investor.investments}</Text>
          <Text style={styles.investmentText}> Investments</Text>
        </View>
        <Text style={styles.industryText}>{investor.industry}</Text>
        <View style={styles.locationRow}>
          <Text style={styles.locationText}>{investor.location}</Text>
          <TouchableOpacity style={styles.chatButton} onPress={() => onChatPress(investor)}>
            <MessageCircle size={20} color="#00a86b" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  investorCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    overflow: "hidden",
  },
  investorImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  investorDetails: {
    padding: 12,
  },
  investorName: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#232327",
    marginBottom: 4,
  },
  investmentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  investmentCount: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#00a86b",
  },
  investmentText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#232327",
  },
  industryText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#232327",
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#232327",
  },
  chatButton: {
    padding: 4,
  },
})

export default InvestorCard

