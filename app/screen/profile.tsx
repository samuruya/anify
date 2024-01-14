import { Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Link } from 'expo-router';
import { useQuery, useRealm } from '@realm/react';
import { setWatchProgressSeason } from '../db';
import { useState } from 'react';

export default function ProfileScreen() {
  const realm = useRealm()
const ContinueWatching = useQuery("ContinueWatching").sorted("datetime", true)
const WatchProgressSeason = useQuery("WatchProgressSeason")
const res = useQuery("WatchProgressSeason").filtered('episodeId == $0',"jujutsu-kaisen-2nd-season-18413?ep=102662")[0]

const testData = useRealm().objects("HomeData")[0]

const [data, setData] = useState([null]);

  const printDb = () => {
    console.info(ContinueWatching);
    console.log("res:", res);
    // if (res !== undefined) {
    //   console.log("nicht undefiniert");
    // }else{
    //   console.log("undefiniert");
    // }
    ContinueWatching.map((s, index) => (
      console.log("q:", s.number)
    ))
  }

  const test = () => {
    

    console.log("res:", data[0]);
    // console.log("res:", testData);

  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings (dev)</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <Pressable onPress={() => printDb() } style={styles.link}>
             <Text>Print DB</Text>
      </Pressable>

      <Pressable onPress={() => console.log(ContinueWatching) } style={styles.link}>
          <Text>ContinueWatching</Text>
      </Pressable>
      
      <Pressable onPress={() => console.log(WatchProgressSeason) } style={styles.link}>
             <Text>WatchProgressSeason</Text>
      </Pressable>

      <Pressable onPress={() => test() } style={styles.link}>
             <Text>Test</Text>
        </Pressable>

      {/* <Link href="/modal" asChild style={styles.link}>
             <Text>Modal 1</Text>
      </Link> */}

      {/* <Link href="/player2" asChild style={styles.link}>
          <Text>Player 2</Text>
      </Link> */}
      
      {/* <Link href="/player3" asChild style={styles.link}>
             <Text>Player 3</Text>
        </Link> */}
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
    margin: 10,
    padding: 20,
    backgroundColor: 'grey'
  },
});
