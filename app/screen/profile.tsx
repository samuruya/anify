import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Link href="/modal" asChild style={styles.link}>
             <Text>Modal</Text>
        </Link>

      <Link href="/player" asChild style={styles.link}>
             <Text>Player 1</Text>
      </Link>

      <Link href="/player2" asChild style={styles.link}>
          <Text>Player 2</Text>
      </Link>
      
      <Link href="/player3" asChild style={styles.link}>
             <Text>Player 3</Text>
        </Link>
      {/* <EditScreenInfo path="app/screen/two.tsx" /> */}
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
  link: {
    margin: 20,
  },
});
