import type React from "react"
import { StatusBar as RNStatusBar, type StatusBarProps } from "react-native"

const StatusBar: React.FC<StatusBarProps> = (props) => {
  return <RNStatusBar barStyle="dark-content" {...props} />
}

export default StatusBar

