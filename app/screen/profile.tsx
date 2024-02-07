import { Modal, Pressable, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Link, useRouter } from 'expo-router';
import { useQuery, useRealm } from '@realm/react';
import { setWatchProgressSeason } from '../db';
import { useState } from 'react';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Divider from '../../components/misc/divider';

export default function ProfileScreen() {

  const router = useRouter();
  const realm = useRealm()
  const ContinueWatching = useQuery("ContinueWatching").sorted("datetime", true)
  const WatchProgressSeason = useQuery("WatchProgressSeason")
  const res = useQuery("WatchProgressSeason").filtered('episodeId == $0',"jujutsu-kaisen-2nd-season-18413?ep=102662")[0]
  const language = useQuery("Settings").filtered('setting == $0','language')[0]

  const testData = useRealm().objects("HomeData")[0]
  const [showDev, setShowDev] = useState(false);

  const [data, setData] = useState([null]);

    const printDb = () => {
      console.info(language);
      
    }

    const test = () => {
      

       //  episodeId: item.episodeId, playStartTime: item.time, titleId: item.id, poster: item.posterUrl, number: item.number, title: item.title
       router.push({ pathname: "/player", params: { episodeId: "item.episodeId", playStartTime: 0, titleId: "item.id", poster: "item.posterUrl", number: 2, title: "Hidden Inventory" } }) 

    }
  
    return (
      <View style={styles.container}>
        <View style={{
        height: 100
        }}></View>
        <StatusBar barStyle={'light-content'}/>

        {/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />*/}
        
        <View style={styles.prof}>
          <View style={styles.profI}>
            <View style={{
              height: 100,
              width: 100,
              backgroundColor: Colors.onyx,
              borderRadius: 50,
            }}></View>
          </View>
          <View style={styles.profI}>
            <TouchableOpacity onPress={() => setShowDev(true)}>
              <View style={styles.popbtn}>
                <Text style={styles.title}>Settings (dev)</Text>
                <AntDesign name="calculator" size={24} color={Colors.back} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.popbtn}>
                <Text style={styles.title}>Settings</Text>
                <Ionicons name="settings-sharp" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Divider/>
          
        <Modal 
          animationType='slide'
          transparent={true}
          visible={showDev}
          onRequestClose={() => {
            setShowDev(false);
          }}
          style={styles.popcont}
        >
          <View style={styles.popup}>
            <View style={{
              width: '100%',
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row-reverse'
            }}>
              <TouchableOpacity onPress={() => setShowDev(false)}>
                <Entypo name="cross" size={48} color="white" style={{
                  paddingTop: 10,
                  paddingLeft: 10,
                }} />
              </TouchableOpacity>
              <Text style={{
                textAlignVertical: 'center',
                textAlign: 'center',
                fontSize: 20,
              }}>Settings (dev)</Text>
              <View style={{width: 50}}/>
            </View>

            <View style={styles.popcontent}>
              <Pressable onPress={() => printDb() } style={styles.link}>
                <Text style={{fontWeight: 'bold'}}>Print DB</Text>
              </Pressable>

              <Pressable onPress={() => console.log(ContinueWatching) } style={styles.link}>
                <Text style={{fontWeight: 'bold'}}>ContinueWatching</Text>
              </Pressable>
            </View>

            <View style={styles.popcontent}>
              <Pressable onPress={() => console.log(WatchProgressSeason) } style={styles.link}>
                    <Text style={{fontWeight: 'bold'}}>WatchProgressSeason</Text>
              </Pressable>

              <Pressable onPress={() => test() } style={styles.link}>
                  <Text style={{fontWeight: 'bold'}}>Player</Text>
              </Pressable>
            </View>
        


          </View>
        </Modal>
        {showDev ? (
        <Pressable style={styles.popupContainer} onPress={() => setShowDev(false)}>
        </Pressable>
        ) : (null)}
        

        {/* <Link href="/modal" asChild style={styles.link}>
              <Text>Modal 1</Text>
        </Link> */}

        {/* <Link href="/player2" asChild style={styles.link}>
            <Text>Player 2</Text>
        </Link> */}
        
        {/* <Link href="/player" asChild style={styles.link}>
              <Text>Player 3</Text>
          </Link> */}
        {/* <EditScreenInfo path="app/screen/two.tsx" /> */}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.back,
    },
    prof: {
      width: '100%',
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'space-around'
    },
    profI: {
      gap: 20,

    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    link: {
      borderRadius: 15,
      margin: 10,
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: Colors.back,
    },
    popbtn: {
      backgroundColor: Colors.wht,
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 15,
      gap: 10
    },
    popup: {
      width: '100%',
      height: 300,
      position: 'absolute',
      bottom: 0,
      backgroundColor: Colors.onyx,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      zIndex:  1000,
    },
    popcont: {
      zIndex: 100,
    },
    popcontent: {
      backgroundColor: 'transparent',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    popitem: {

    },
    popupContainer: {
      position: 'absolute',
      top: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '100%',
      height: '100%',
      zIndex: 2000,
    },

});
