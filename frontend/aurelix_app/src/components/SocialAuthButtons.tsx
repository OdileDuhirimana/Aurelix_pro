import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { ResponseType } from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Divider = ({ text }) => (
  <View style={styles.divider}>
    <View style={styles.dividerLine} />
    <Text style={styles.dividerText}>{text}</Text>
    <View style={styles.dividerLine} />
  </View>
)

WebBrowser.maybeCompleteAuthSession()

const GOOGLE_CLIENT_ID = {
  expo: '323596051383-oharki8qb0a9bupb565hdg6qq42hg6ug.apps.googleusercontent.com',
  android: '323596051383-oharki8qb0a9bupb565hdg6qq42hg6ug.apps.googleusercontent.com',
  ios: '323596051383-9hho4affs38pd97jv7ljipslok0ces3r.apps.googleusercontent.com',
  web: '323596051383-4npuru6680eodcn8nt844vgjoma378p8.apps.googleusercontent.com'
}

const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID'

export const SocialAuthButtons = ({ onAuthSuccess, onAuthError }) => {
  const [googleRequest, googleResponse, promptGoogleAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID.expo,
    androidClientId: GOOGLE_CLIENT_ID.android,
    iosClientId: GOOGLE_CLIENT_ID.ios,
    webClientId: GOOGLE_CLIENT_ID.web,
    responseType: ResponseType.Token,
    scopes: ['profile', 'email']
  })

  const [fbRequest, fbResponse, promptFacebookAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_APP_ID,
    responseType: ResponseType.Token,
    scopes: ['public_profile', 'email']
  })

  React.useEffect(() => {
    handleAuthResponse(googleResponse, 'google')
  }, [googleResponse])

  React.useEffect(() => {
    handleAuthResponse(fbResponse, 'facebook')
  }, [fbResponse])

  const handleAuthResponse = async (response, provider) => {
    if (response?.type === 'success') {
      const { authentication } = response
      try {
        const userInfo = await fetchUserInfo(authentication.accessToken, provider)
        await AsyncStorage.setItem(`@${provider}_user`, JSON.stringify(userInfo))
        onAuthSuccess(userInfo)
      } catch (error) {
        onAuthError(error.message)
      }
    } else if (response?.type === 'error') {
      onAuthError(`${provider} authentication failed`)
    }
  }

  const fetchUserInfo = async (token, provider) => {
    const endpoint = provider === 'google' 
      ? 'https://www.googleapis.com/userinfo/v2/me'
      : 'https://graph.facebook.com/me?fields=id,name,email,picture'

    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${provider} user info`)
    }

    return response.json()
  }

  return (
    <View style={styles.maincontainer}>
     <Divider text={'OR'}/>
     <View style={styles.container}>
      <TouchableOpacity 
        style={styles.Button} 
        onPress={() => promptGoogleAsync()}
      >
        <Image 
          source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }} 
          style={styles.socialIcon} 
        />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.Button} 
        onPress={() => promptFacebookAsync()}
      >
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png' }} 
          style={styles.socialIcon} 
        />
        <Text style={styles.buttonText}>Sign in with Facebook</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  maincontainer: {
      alignItems: 'center',
  },
  container: {
    width: '100%',
    gap: 12,
    alignItems: 'center',  
},
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 330,
    marginBottom: 28,
  },
  dividerLine: { 
    flex: 1, 
    height: 1, 
    backgroundColor: "#E5E5E5" 
  },
  dividerText: {
    fontFamily: "Poppins-Regular",
    paddingHorizontal: 14,
    color: "#9CA3AF",
  },
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    width: '80%',
    maxWidth: 310,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#221F1F',
    flex: 1,
    textAlign: 'center'
  }
})