import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Link, useRouter  } from 'expo-router';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  const renderItem = <EditScreenInfo path="app/modal.tsx" />;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="app/modal.tsx" /> */}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {renderItem}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Link href="/modal" asChild>
             <Text>Modal</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
