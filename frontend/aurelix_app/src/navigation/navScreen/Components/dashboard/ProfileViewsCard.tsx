"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { ChevronDown } from "lucide-react-native"
import MiniLineChart from "../charts/MiniCircularGauge"

interface ProfileView {
  region: string
  company: string
  count: number
  trend: "up" | "down"
  chartData: number[]
}

interface ProfileViewsCardProps {
  data: ProfileView[]
  onDetailsPress: () => void
}

const ProfileViewsCard: React.FC<ProfileViewsCardProps> = ({ data, onDetailsPress }) => {
  const [filterType, setFilterType] = useState("Investors")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Profile views</Text>
          <Text style={styles.subtitle}>Monthly Average</Text>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            // Toggle between filter types in a real app
            setFilterType(filterType === "Investors" ? "Companies" : "Investors")
          }}
        >
          <Text style={styles.filterText}>{filterType}</Text>
          <ChevronDown size={16} color="#00a86b" />
        </TouchableOpacity>
      </View>

      {data.map((item, index) => (
        <View key={index} style={[styles.item, index < data.length - 1 && styles.itemBorder]}>
          <View>
            <Text style={styles.regionText}>{item.region}</Text>
            <Text style={styles.companyText}>{item.company}</Text>
          </View>
          <View style={styles.chartContainer}>
            <MiniLineChart data={item.chartData} color={item.trend === "up" ? "#00a86b" : "#fc5a5a"} />
          </View>
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{item.count}</Text>
            <Text style={[styles.trendIcon, { color: item.trend === "up" ? "#00a86b" : "#fc5a5a" }]}>
              {item.trend === "up" ? "↑" : "↓"}
            </Text>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.detailsButton} onPress={onDetailsPress}>
        <Text style={styles.detailsText}>Details</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: "#232327",
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Poppins-Regular",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    fontSize: 14,
    color: "#00a86b",
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
    marginRight: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  regionText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
    color: "#232327",
  },
  companyText: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Poppins-Regular",
  },
  chartContainer: {
    width: 80,
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    marginRight: 5,
    color: "#232327",
  },
  trendIcon: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsButton: {
    backgroundColor: "#00a86b",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 15,
  },
  detailsText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
  },
})

export default ProfileViewsCard

