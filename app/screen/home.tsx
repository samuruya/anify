import { StyleSheet } from 'react-native';

import Spotlight from '../../components/spotlight';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Home</Text> */}
      {/* <View style={styles} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <Spotlight />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },
});
