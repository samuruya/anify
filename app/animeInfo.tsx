import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useRoute, useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import data from '../assets/json-data/animeinfo.json'
import episodeData from '../assets/json-data/episodeData.json'


const windowWidth = Dimensions.get('window').width;

export default function AnimeInfo() {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params.id;
  console.log('ID',id);
  
  
  // const [data, setData] = useState([]);
  // const [episodeData, setEpisodeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`https://api-aniwatch.onrender.com/anime/info?id=${id}`);
        const jsonData = await resp.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
      const fetchEpisodes = async () => {
      try {
        const resp = await fetch(`https://api-aniwatch.onrender.com/anime/episodes/${id}`);
        const jsonData = await resp.json();
        setEpisodeData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    // fetchData();
    //fetchEpisodes();
  }, []);

  async function updateInfo(id){
    try {
      const resp = await fetch(`https://api-aniwatch.onrender.com/anime/info?id=${id}`);
      const jsonData = await resp.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // async function playVideo(episodeId){
  //   try {
  //     const resp = await fetch(`https://api-aniwatch.onrender.com/anime/episode-srcs?id=${episodeId}&server=vidstreaming&category=dub`);
  //     const jsonData = await resp.json();
  //     const url = jsonData.sources[0].url
  //     navigation.navigate('player3', { url: url })
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {Platform.OS === 'ios' && <View style={styles.line} />}
      <Image source={{ uri: data.anime?.info.poster }} style={styles.mainPoster} />
      <Text style={styles.title}>{data.anime?.info.name}</Text>
      <Text style={styles.description}>{data.anime?.info.description}</Text>
      
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
      {episodeData.episodes?.map((episode) => (
          <View key={episode.episodeId} style={styles.episodeContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('player3', { episodeId: episode.episodeId }) }>
              <View style={styles.innerContainer}>
                <Image source={{ uri: data.anime.info.poster }} style={styles.episodeImg } />
                <View style={styles.overlayContainer}>
                  <FontAwesome name="play-circle" size={40} color='#777' style={{ zIndex: 1 }} />
                </View>
                <Text style={styles.episodeText }>{episode.number}. {episode.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}

      {/* Render most popular animes */}
      <Text style={styles.subtitle}>Most Popular Animes:</Text>
      {/* {data.mostPopularAnimes?.map((mostPopularAnimes) => (
        <View key={mostPopularAnimes.id}>
          <Text>{mostPopularAnimes.name}</Text>
          <Image source={{ uri: mostPopularAnimes.poster }} style={styles.poster} />
        </View>
      ))} */}
      
      <FlatList
      data={data.mostPopularAnimes}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('animeInfo', { id: item.id })}>
        <View style={styles.flatlist} key={item.id}>
          <Image source={{ uri: item.poster }} style={styles.poster} />
          {/* <Text>{item.name}</Text> */}
        </View>
        </TouchableOpacity>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      // pagingEnabled
      bounces={true}
    />
    {/* Render related Animes */}
    <Text style={styles.subtitle}>Related Animes:</Text>
    <FlatList
      data={data.relatedAnimes}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('animeInfo', { id: item.id })}>
        <View style={styles.flatlist} key={item.id}>
          <Image source={{ uri: item.poster }} style={styles.poster} />
          {/* <Text>{item.name}</Text> */}
        </View>
        </TouchableOpacity>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      // pagingEnabled
      bounces={true}
    />
    {/* Render recommended Animes	 */}
    <Text style={styles.subtitle}>Recommended Animes:</Text>
    <FlatList
      data={data.recommendedAnimes}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('animeInfo', { id: item.id })}>
        <View style={styles.flatlist} key={item.id}>
          <Image source={{ uri: item.poster }} style={styles.poster} />
          {/* <Text>{item.name}</Text> */}
        </View>
        </TouchableOpacity>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      // pagingEnabled
      bounces={true}
    />
    <Text style={styles.bottom}></Text>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
    </ScrollView>
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
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
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
    // fontFamily: '',
    position: 'absolute',
    width: '100%', 
    height: '100%',
    top: 0,
    left: 0,
    color: 'white', 
    fontSize: 13, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 1,
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
    paddingLeft: 20,
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
    width: 100,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  overlayContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    left: 34,
    backgroundColor: 'transparent',
  },
});
