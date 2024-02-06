import React, {useState, useEffect, useRef} from 'react';
import { Platform, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, Dimensions, Button, Pressable, ActivityIndicator, Modal, Animated} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import data from '../assets/json-data/animeinfo.json'
import episodeData from '../assets/json-data/episodeData.json'
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { useQuery, useRealm, Realm } from "@realm/react";
import { Skeleton } from '@rneui/themed';
import { host } from '../constants/Host';
import { setSetting } from '../app/db'
import Colors from '../constants/Colors';
import Divider from './misc/divider';


const windowWidth = Dimensions.get('window').width;
const overlayContainerTopWidth = 100;


export default function AnimeInfoComp({ id, newComponent }: { id: string; newComponent: (id: string) => void }) {
  const router = useRouter();
//   const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const continueWatchingeItem = useQuery("ContinueWatching").filtered('id == $0',id)[0]
  const language = useQuery("Settings").filtered('setting == $0','language')[0]
  const [continueWatchingTime, setContinueWatchingTime] = useState({});
  
  
  // const [data, setData] = useState([null]);
  // const [episodeData, setEpisodeData] = useState([null]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 500, // Adjust the duration as needed
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim]);
 
 
  useEffect(() => {
    // console.log('Passed ID', id);
    
    const fetchData = async () => {
      try {
        const [infoResp, episodesResp] = await Promise.all([
          fetch(`${host}/anime/info?id=${id}`).then((res) => res.json()),
          fetch(`${host}/anime/episodes/${id}`).then((res) => res.json()),
        ]);
        console.log("Done Fetching --->")
        setData(infoResp);
        setEpisodeData(episodesResp);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        router.back();
      }
    };

    setLoading(false);
    // fetchData();
  }, []);

  useEffect(() => {
    if(!loading){
      console.log("Loading FALSE -->");
    }
  }, [loading]);

  useEffect(() => {
    const continueWatching = async () => {
  
      if (continueWatchingeItem !== undefined && episodeData.episodes) {
        const find = episodeData.episodes.find((episode) => episode.episodeId === continueWatchingeItem.episodeId);
        const res = { timeInfo: continueWatchingeItem, episodeInfo: find }; 
        setContinueWatchingTime(res);
        // console.log('time: not NULL:', continueWatchingeItem);
      } else {
        setContinueWatchingTime(null);
        // console.log('time: NULL:', continueWatchingeItem);
      }
    };
  
    continueWatching()
    
  }, [continueWatchingeItem, episodeData]);


  async function updateInfo(id){
    try {
      const resp = await fetch(`${host}/anime/info?id=${id}`);
      const jsonData = await resp.json();
      setData(jsonData);

      const respEpisodes = await fetch(`${host}/anime/episodes/${id}`);
      const jsonDataEpisodes = await respEpisodes.json();
      setEpisodeData(jsonDataEpisodes);
      console.log("updated")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  

  function playCurrent(){
    if (continueWatchingTime) {
      router.push({ pathname: "/player", params: { episodeId: continueWatchingTime.timeInfo.episodeId, playStartTime: continueWatchingTime.timeInfo.time, titleId: data.anime?.info.id, poster: data.anime?.info.poster, number: continueWatchingTime.timeInfo.number, title: continueWatchingTime.timeInfo.title, language: language.value } })
    }else{
      const find = episodeData.episodes.find((episode) => episode.number === 1);
    //   console.info("info: ",data.anime?.info.id);
      router.push({ pathname: "/player", params: { episodeId: find.episodeId, playStartTime: 0, titleId: data.anime?.info.id, poster: data.anime?.info.poster, number: 1, title: find.title, language: language.value } })
    //   console.log(find);
    }
    
    // router.push({ pathname: "/player", params: { episodeId: continueWatchingTime.timeInfo.id, playStartTime: continueWatchingTime.timeInfo.time, titleId: data.anime?.info.id, poster: data.anime?.info.poster, number: continueWatchingTime.number, title: continueWatchingTime.title } })
  }

  const generateRandomID = () => {
    return Math.random().toString(36).substr(2, 9);
  };


  const [isExpanded, setIsExpanded] = useState(false);
  const [lang, setlang] = useState(false)



  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const words = data.anime?.info.description.split(' ');
  const truncatedText = isExpanded ? data.anime?.info.description : words?.slice(0, 20).join(' ') + '...';



  function setLanguage(value){
    const realm = new Realm();
    setSetting(realm, 'language', value)
    checklang()
    console.log(language.value)
    // setPopup(false)
  }

  function checklang(){
    if(language.value == 'dub') setlang(false)
    if(language.value == 'sub') setlang(true)
  }
  // async function playVideo(episodeId){
  //   try {
  //     const resp = await fetch(`${host}/anime/episode-srcs?id=${episodeId}&server=vidstreaming&category=dub`);
  //     const jsonData = await resp.json();
  //     const url = jsonData.sources[0].url
  //     router.push({ pathname: "/player", params: { url: url } })
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }


  // if (loading) {
  //   return (
  //     <View >
  //       <ActivityIndicator size="large" color="green" />
  //     </View>
  //   );
  // }
  function Episodes ({item}) {
    const res = useRealm().objects("WatchProgressSeason").filtered('episodeId == $0',item.episodeId)[0]
        
         return (
          <View key={item.episodeId} style={styles.episodeContainer}>
            <TouchableOpacity onPress={() =>  router.push({ pathname: "/player", params: { episodeId: item.episodeId, playStartTime: res?.time, titleId: data.anime?.info.id, poster: data.anime?.info.poster, number: item.number, title: item.title, language: language.value } }) }>
              <View style={styles.innerContainer}>
                <View style={styles.overlayContainerTop}>
                  {poster}
                    <View style={styles.overlayContainer}>
                      <FontAwesome name="play-circle" size={40} color='#777' style={{ zIndex: 1 }} />
                    </View>
                    {res?.time !== undefined && res?.length !== undefined ? (
                      <View>
                        <View style={styles.progressLineFull} />
                        <View style={[styles.progressLine, { width: (res?.time / res?.length) * overlayContainerTopWidth }]} />
                      </View>
                    ) : null}
                </View>
                <Text style={styles.episodeText }>{item.number}. {item.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );  
  }

  const poster = <Image source={{ uri: data.anime?.info.poster }} style={styles.episodeImg } />
  return (
    <>
    {loading ? (
      <View style={styles.skelleton}>

        <Skeleton
          width={windowWidth}
          height={220}
          animation="wave"
          style={styles.mainPosterSkeleton}
        />
        <Skeleton
          circle
          width={150}
          height={15}
          animation="wave"
          style={styles.titleSkeleton}
        />
        <Skeleton
          width={windowWidth - 150}
          height={40}
          animation="wave"
          style={styles.playButtonSkeleton}
        />
        <Skeleton
          width={windowWidth - 30}
          height={100}
          animation="wave"
          style={styles.descriptionSkeleton}
        />
        <Skeleton
          circle
          width={70}
          height={15}
          animation="wave"
          style={styles.subtitleSkeleton}
        />
        <View style={styles.seasonScrollContainer}>
        {[1, 2, 3].map((seasonId) => (
            <Skeleton
              key={seasonId}
              width={110}
              height={50}
              animation="wave"
              style={styles.seasonContainerSkeleton}
            />
        ))}
        </View>
        {Array.from({ length: 10 }).map((_, index) => (
          <View style={styles.episodeContainerSkeleton}>
          <Skeleton
            key={index}
            width={100}
            height={50}
            animation="wave"
            style={styles.episodePosterSkeleton}
          />
          <Skeleton
            circle
            key={index+":2"}
            width={150}
            height={15}
            animation="wave"
            style={styles.episodeTextSkeleton}
          />
          </View>
        ))}

      </View>
    ) : 

    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {Platform.OS === 'ios' && <View style={styles.line} />}

      <Image source={{ uri: data.anime?.info.poster }} style={styles.mainPoster} />
      <Text style={styles.title}>{data.anime?.info.name}</Text>
      
      {continueWatchingTime ? (
        <>
        <View>
            <TouchableOpacity style={styles.playButton} onPress={() => playCurrent()}>
                <Text style={styles.playButtonText}>Resume</Text>
            </TouchableOpacity>
          </View>
        
          {/* <Button title="Continue" onPress={() => playCurrent()} /> */}
          {continueWatchingTime.episodeInfo && (
            <Text style={styles.description2}>E{continueWatchingTime.episodeInfo.number}: {continueWatchingTime.episodeInfo.title}</Text>
          )}
          <View style={styles.continueContainer}>
            <View style={styles.progressLineFull} />
            {continueWatchingTime.timeInfo && (
              <View style={[ styles.progressLine, { width: (continueWatchingTime.timeInfo.time / continueWatchingTime.timeInfo.length) * (windowWidth - 50) } ]} />
            )}
          </View>
        </>
      ) : (
        <View>
        <TouchableOpacity style={styles.playButton} onPress={() => playCurrent()}>
            <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
      </View>
      )}
  
        <TouchableOpacity onPress={toggleText}>
         <Text style={styles.description}>{truncatedText}</Text>
        </TouchableOpacity>
        
      {/* Settings */}
      <View style={{flexDirection: 'row', }}>

      <TouchableOpacity style={{alignItems: 'center', marginHorizontal: 10, }} onPress={() => console.log("add list") }>
          <MaterialIcons  name="add" size={24} color="white" />
          <Text style={{fontSize: 10}} >Add</Text>
      </TouchableOpacity>
        
        <TouchableOpacity style={{alignItems: 'center', marginHorizontal: 10, }} onPress={() => {setPopup(true); checklang()}}>
          <MaterialCommunityIcons name="subtitles" size={24} color="white" />
          <Text style={{fontSize: 10}} >Settings</Text>
        </TouchableOpacity>
        
      </View>

      <Divider/>
      
      {/* Render seasons */}
      <Text style={styles.subtitle}>Seasons:</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.seasonScrollContainer}
      >
        {data.seasons?.map((season) => (
          <View key={season.id}>
            <TouchableOpacity onPress={() => updateInfo(season.id)}>
              <View style={styles.seasonContainer}>
                <Image
                  source={{ uri: season.poster }}
                  style={[styles.seasonPoster, season.id === data.anime?.info?.id && styles.seasonPosterSelect]}
                />
                <Text style={[styles.seasonText, season.id === data.anime?.info?.id && styles.seasonTextSelect]}>{season.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Render Episodes */}
      <View style={styles.episodeContainerOuther}> 
        <FlatList
          removeClippedSubviews
          data={episodeData?.episodes}
          renderItem={( {item} ) => ( <Episodes item={item} /> )}
        />
      </View>
      <Divider/>
      {/* Render most popular animes */}
      
      {/* <Text style={styles.subtitle}>Most Popular Animes:</Text> 
        {data.mostPopularAnimes?.map((mostPopularAnimes) => (
        <View key={mostPopularAnimes.id}>
          <Text>{mostPopularAnimes.name}</Text>
          <Image source={{ uri: mostPopularAnimes.poster }} style={styles.poster} />
        </View>
      ))} */}
      
      <FlatList
      data={data.mostPopularAnimes}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => newComponent(item.id) }>
        <View style={styles.flatlist}>
          <Image source={{ uri: item.poster }} style={styles.poster} />
          {/* <Text>{item.name}</Text> */}
        </View>
        </TouchableOpacity>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      // pagingEnabled
      key={generateRandomID()}
      bounces={true}
    />

      {/* Render related Animes */}
      <Text style={styles.subtitle}>Related Animes:</Text>
      <FlatList
        data={data.relatedAnimes}
        renderItem={({ item }) => (
          <Pressable onPress={() => newComponent(item.id) }>
          <View style={styles.flatlist}>
            <Image source={{ uri: item.poster }} style={styles.poster} />
            {/* <Text>{item.name}</Text> */}
          </View>
          </Pressable>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        // pagingEnabled
        key={generateRandomID()}
        bounces={true}
      />

    {/* Render recommended Animes	 */}
    <Text style={styles.subtitle}>Recommended Animes:</Text>
    <FlatList
      data={data.recommendedAnimes}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => newComponent(item.id) }>
        <View style={styles.flatlist}>
          <Image source={{ uri: item.poster }} style={styles.poster} />
          {/* <Text>{item.name}</Text> */}
        </View>
        </TouchableOpacity>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      // pagingEnabled
      key={generateRandomID()}
      bounces={true}
    />
    <Text style={styles.bottom}></Text>

    </View>
    </ScrollView>
    
    }
    
{/* popup  */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={popup}
      onRequestClose={() => {
        setPopup(false);
    }}>
        <View style={styles.popup}>
          <TouchableOpacity onPress={() => setPopup(false)}>
            <Entypo name="cross" size={48} color="white" style={{
              paddingTop: 10,
              paddingLeft: 10,
            }} />
          </TouchableOpacity>
          <Animated.View style={[styles.popupContent, {opacity: fadeAnim}]}>
          <View style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'transparent'
          }}>
          {lang ? (

            <View style={styles.rad}>
              <TouchableOpacity onPress={() => {
                setLanguage('dub')
                setlang(false)
                }} style={[styles.dubbtn ,styles.radin]}>
                <Text style={language.value === 'dub' && {color: 'black'}}>Dub</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setLanguage('sub')
                setlang(true)
                }} style={[styles.subbtn ,styles.radac]}>
                <Text style={language.value === 'sub' && {color: 'black'}}>Sub</Text>
              </TouchableOpacity>
            </View>
          
          ) : (
              <View style={styles.rad}>
                <TouchableOpacity onPress={() => {
                  setLanguage('dub')
                  setlang(false)
                  }} style={[styles.dubbtn, styles.radac]}>
                  <Text style={language.value === 'dub' && {color: 'black'}}>Dub</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  setLanguage('sub')
                  setlang(true)
                  }} style={[styles.subbtn, styles.radin]}>
                  <Text style={language.value === 'sub' && {color: 'black'}}>Sub</Text>
                </TouchableOpacity>
              </View>
          )}
          </View>
          </Animated.View>

        </View>
      </Modal>
    {popup ? (
      <Pressable style={styles.popupContainer} onPress={() => setPopup(false)}>
      </Pressable>
      ) : (null)}
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    // textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  description2: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 25,
    // marginBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
  },
  mainPoster: {
    width: windowWidth,
    height: 220,
    resizeMode: 'cover',
  },
  flatlist: {
    margin: 10,
  },
  bottom: {
    marginBottom: 20,
  },
  seasonContainer: {
    position: 'relative',
    margin: 10,
  },
  seasonPoster: {
    width: 110, 
    height: 50,  
    resizeMode: 'cover', 
    borderRadius: 10,
    borderWidth: 2, 
    borderColor: 'black',
  },
  seasonText: {
    position: 'absolute',
    width: '100%', 
    height: '100%',
    color: 'white', 
    fontSize: 13, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    textAlign: 'center',
    textAlignVertical:'center',
    borderRadius: 10,
  },
  seasonPosterSelect: {
    borderColor: '#ffdd95',
  },
  seasonTextSelect: {
    color: '#ffdd95', 
  },
  seasonScrollContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  line: {
    position: 'absolute',
    top: 0,
    height: 5, 
    width: 50,
    backgroundColor: 'rgba(119, 119, 119, 0.9)', 
    borderRadius: 5, 
    margin: 5,
    zIndex: 1000,
  },

  episodeContainer: {
    width: '100%',
    margin: 5,
    paddingLeft: 10,
    // backgroundColor: 'grey',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  episodeText: {
    flex: 1, 
    marginLeft: 10,
  },
  episodeImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  episodeContainerOuther: {
    width: '100%',
  },
  overlayContainer: {
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  progressLineFull: {
    position: 'absolute',
    bottom: 0,
    height: 3, 
    width: '100%',
    backgroundColor: 'rgba(119, 119, 119, 0.9)', 
  },
  progressLine: {
    position: 'absolute',
    bottom: 0,
    height: 3, 
    width: 0,
    backgroundColor: 'rgba(194, 61, 52, 0.9)', 
    borderRadius: 5, 
    zIndex: 1,
  },
  overlayContainerTop: {
    width: overlayContainerTopWidth,
    height: 60,
    overflow: 'hidden',
    borderRadius: 5,
  },
  continueContainer: {
    width: windowWidth - 50,
    height: 10,
    overflow: 'hidden',
    marginBottom: 20,
    // borderRadius: 5,
  },
  playButton: {
    backgroundColor: 'white',
    width: windowWidth -150,
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
  },
  playButtonText: {
    color: 'black',
    textAlign: 'center'
  },

  skelleton:{
    alignItems: 'center',
  },
  mainPosterSkeleton: {
    marginBottom: 10,
  },
  titleSkeleton: {
    margin: 15,
    marginBottom: 10,
    alignSelf: 'center',
  },
  playButtonSkeleton: {
    position: 'relative',
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
  },
  descriptionSkeleton: {
    margin: 15,
    marginBottom: 10,
  },
  subtitleSkeleton: {
    margin: 15,
    marginBottom: 10,
  },
  seasonContainerSkeleton: {
    margin: 10,
    borderRadius: 10,
  },
  episodeContainerSkeleton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginBottom: 5,
  
  },
  episodePosterSkeleton: {
    // margin: 10,
    marginBottom: 5,
    borderRadius: 5,
  
  },
  episodeTextSkeleton: {
    // margin: 10,
    marginBottom: 5,
    marginLeft: 10,
  
  },
  popupContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    zIndex: 2000,
  },
  popup: {
    position: 'absolute',
    gap: 20,
    bottom: 0,
    backgroundColor: Colors.altbc,
    width: '100%',
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 1000,
  },
  popupContent: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },  
  rad: {
    maxWidth: '50%',
    borderRadius: 20,
    position: 'relative',
    padding: 20,
    backgroundColor: Colors.onyx,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    rowGap: 10,
  },
  dubbtn: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  subbtn: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  radac: {
    backgroundColor: 'yellow',
    color: '#000'
  },
  radin: {
    backgroundColor: '#000',
  },
});
