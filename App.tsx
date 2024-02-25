import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';


import HomeScreen from './src/screens/HomeScreen';
import SignupScreen from './src/screens/SignupScreen';
import BatsAreAwakeScreen from './src/screens/BatsAreAwakeScreen';
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [batsAwake, setBatsAwake] = useState(false);

  useEffect(() => {

    const checkBatsAwake = async () => {
      const url = process.env.EXPO_PUBLIC_URL + '/awake';
      console.log("url" + url);
      const response = await fetch(url);
      console.log("response" + response);
      if (!response.ok) {
        console.error('HTTP error', response.status);
        return;
      }
      const data = await response.json();
      const { batsAwake } = data;
      console.log("batsawkkk" + batsAwake);
      setBatsAwake(batsAwake);

      // TODO: FIX ERROR: can't make a request to the server
    
    }
    checkBatsAwake();

    const ckeckLoginStatus = async () => {
      //const response = await fetch('')
      //const { loggedIn: isLoggedIn } = await response.json();
      // setLoggedIn(isLoggedIn);
      // TODO: implement the above logic
      setLoading(false);
    };
    ckeckLoginStatus();
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();


  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }




  if (batsAwake) {
    return (
      <View
        style={styles.container}
        onLayout={onLayoutRootView}
      >
        <BatsAreAwakeScreen />
      </View>
    );
  }
  else if (loggedIn) {
    return (
      <View
        style={styles.container}
        onLayout={onLayoutRootView}
      >
        <HomeScreen />
      </View>
    );
  } else {
    return (
      <View
        style={styles.container}
        onLayout={onLayoutRootView}
      >
        <SignupScreen />
      </View>
    );
  }

  /*
  return (
    <View
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <Text>SplashScreen Demo! 👋</Text>
      <Entypo name="rocket" size={30} />
      <Image source={require('./assets/images/icon.png')} />
    </View>
  ); */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//     { flex: 1, alignItems: 'center', justifyContent: 'center' }