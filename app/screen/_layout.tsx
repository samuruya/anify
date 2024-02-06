import {FontAwesome, Entypo} from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { color } from '@rneui/themed/dist/config';
import { BlurView } from 'expo-blur';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      
      screenOptions={{
        headerBackgroundContainerStyle: {
          backgroundColor: Colors.onyx
        },
        headerTitleAlign: 'center',
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          marginTop: 20,
          backgroundColor: 'transparent',
          position: 'absolute',
          height: 70,
          borderTopColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarItemStyle: {
          position: 'relative',
        },
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <BlurView  intensity={50} style={{width: '100%', height: '100%', backgroundColor: 'rgba(5, 5, 5, 0.7)', backgroundBlendMode: 'hidden'}}  />
        ),
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo size={28} style={{ marginBottom: -3 }} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
