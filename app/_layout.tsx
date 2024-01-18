import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform, useColorScheme, StatusBar } from 'react-native';
import { RealmProvider } from '@realm/react';
import * as Device from 'expo-device';
import { WatchProgressSeason, WatchProgressMovie, ContinueWatching, HomeData } from './realmModels'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'screen',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />;
}
var t = 'portrait';

if(Device.deviceType === Device.DeviceType.TABLET){
   t = 'all'
   console.log("tablet")
}else{
   t = 'portrait'
   console.log("phone")
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <RealmProvider schema={[WatchProgressSeason, WatchProgressMovie, ContinueWatching, HomeData]}>
       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DarkTheme}>
          <Stack>
            <Stack.Screen name="screen" options={{ headerShown: false, orientation: t }} />
            <Stack.Screen name="player" options={{ presentation: 'fullScreenModal', animation: 'none', headerShown: false, orientation: 'all' }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="animeInfo" options={{ presentation: 'modal', headerShown: false, orientation: t }} />
            {/* <Stack.Screen name="animeInfo" options={{ presentation: 'modal', headerShown: Platform.OS === 'ios' ? false : true }} /> */}
          </Stack>
        </ThemeProvider>
     </RealmProvider>
   
  );
}
