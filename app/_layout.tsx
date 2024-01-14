import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { RealmProvider } from '@realm/react';
import { WatchProgressSeason, WatchProgressMovie, ContinueWatching } from './realmModels'

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

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <RealmProvider schema={[WatchProgressSeason, WatchProgressMovie, ContinueWatching]}>
       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DarkTheme}>
          <Stack>
            <Stack.Screen name="screen" options={{ headerShown: false }} />
            <Stack.Screen name="player3" options={{ presentation: 'fullScreenModal', animation: 'none', headerShown: false, statusBarHidden: true }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="animeInfo" options={{ presentation: 'modal', headerShown: false }} />
            {/* <Stack.Screen name="animeInfo" options={{ presentation: 'modal', headerShown: Platform.OS === 'ios' ? false : true }} /> */}
          </Stack>
        </ThemeProvider>
     </RealmProvider>
   
  );
}
