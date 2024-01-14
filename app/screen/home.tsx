import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Pressable, ScrollView } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import data from '../../assets/json-data/spotlightData.json';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { BlurView } from 'expo-blur';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useQuery, useRealm } from "@realm/react";
import { HomeData } from '../realmModels';
import { BSON } from 'realm';

const windowWidth = Dimensions.get('window').width;
const conWatchingItemConWith = 200;

export default function TabOneScreen() {
  const realm = useRealm();
  const router = useRouter();
  const params = useLocalSearchParams();
 
  const continueWatchingeItems = useQuery("ContinueWatching").sorted("datetime", true)
  // const homeData = useQuery("HomeData")[0]
  

  
  // const [data, setData] = useState([]);
  // useEffect(() => {

  //   const jsonHomeData = JSON.parse(homeData.data)
  //   setData(jsonHomeData);
  //   fetchData()

//   }, []);

  const fetchData = async () => {
    try {
      const resp = await fetch("https://api-aniwatch.onrender.com/anime/home");
      const jsonData = await resp.json();
      updateHomeData(data)
  //    setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function ####################
  function updateHomeData(data){
    const toUpdate = realm.objects(HomeData)[0]

    if(toUpdate !== undefined) {
        console.info("Realm: Update Home");
        realm.write(() => {
            toUpdate.data = JSON.stringify(data)
          });

    }else{
        console.info("Realm: First Start");
        realm.write(() => {
            realm.create(HomeData, {
                _id: new BSON.UUID(),
                data: JSON.stringify(data)
            });
        });
    }
    
}
  // End ##############






  const generateRandomID = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const renderItem = ({ item }: { item: any }) => (
    
    <Link href={{ pathname: "/animeInfo", params: { id: item.id } }} asChild>
      <Pressable>
          <View style={styles.itemContainer}>
            <View style={styles.detailsContainer}>
              <Image source={{ uri: item.poster }} style={styles.spotlightPoster} />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.info}>Episodes: {item.episodes.sub} sub, {item.episodes.dub} dub</Text>
              <Text style={styles.info}>Release Date: {item.otherInfo[2]}</Text>
            </View>
          </View>
        </Pressable>
      </Link>
  );

  return (
    // <Carousel
    //   data={data.spotlightAnimes}
    //   renderItem={renderItem}
    //   sliderWidth={300}
    //   itemWidth={300}
    // />
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        <Text style={styles.label}>Spotlight</Text>
        <FlatList
          key={generateRandomID()}
          data={data?.spotlightAnimes}
          renderItem={renderItem} 
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={true}
        />

        {/* Render Contine Watching */}
        <Text style={styles.subtitle}>Continue Watching:</Text>
        <FlatList
          key={generateRandomID()}
          data={continueWatchingeItems}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push({ pathname: "/player3", params: { episodeId: item.episodeId, playStartTime: item.time, titleId: item.id, poster: item.posterUrl, number: item.number, title: item.title } }) }>
              <View style={styles.flatlist} >
                <View style={styles.conWatchingItemCon}>
                  <View style={styles.overlayContainer}>
                          <FontAwesome name="play-circle" size={60} color='#777' />
                    </View>
                  <Image source={{ uri: item.posterUrl }} style={styles.conWatchPoster} />
                    <Pressable onPress={() => router.push({ pathname: "/animeInfo", params: { id: item.id } }) }>
                      <BlurView intensity={10} style={styles.blurContainer} >
                        <Text style={styles.description2}>E{item.number}: {item.title}</Text>
                      </BlurView>
                    </Pressable>
                  <View style={styles.progressLineFull} />
                  <View style={[styles.progressLine, { width: (item.time / item.length) * conWatchingItemConWith }]} />
                </View>
                {/* <Text>{item.name}</Text> */}
              </View>
            </Pressable>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          // pagingEnabled
          bounces={true}
        />

        {/* Render trending Animes */}
        <Text style={styles.subtitle}>Trending Animes:</Text>
        <FlatList
          key={generateRandomID()}
          data={data?.trendingAnimes}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push({ pathname: "/animeInfo", params: { id: item.id } }) }>
            <View style={styles.flatlist}>
              <Image source={{ uri: item.poster }} style={styles.poster} />
              {/* <Text>{item.name}</Text> */}
            </View>
            </Pressable>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          // pagingEnabled
          bounces={true}
        />
        {/* Render latest Episode Animes */}
        <Text style={styles.subtitle}>latest Episodes:</Text>
        <FlatList
          key={generateRandomID()}
          data={data?.latestEpisodeAnimes}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push({ pathname: "/animeInfo", params: { id: item.id } }) }>
            <View style={styles.flatlist}>
              <Image source={{ uri: item.poster }} style={styles.poster} />
              {/* <Text>{item.name}</Text> */}
            </View>
            </Pressable>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          // pagingEnabled
          bounces={true}
        />
        {/* Render topUpcoming Animes */}
        <Text style={styles.subtitle}>top Upcoming Animes:</Text>
        <FlatList
          key={generateRandomID()}
          data={data?.topUpcomingAnimes}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push({ pathname: "/animeInfo", params: { id: item.id } }) }>
            <View style={styles.flatlist}>
              <Image source={{ uri: item.poster }} style={styles.poster} />
              {/* <Text>{item.name}</Text> */}
            </View>
            </Pressable>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          // pagingEnabled
          bounces={true}
        />
        {/* Render top10 Animes */}
        <Text style={styles.subtitle}>top 10 Animes:</Text>
        <FlatList
          key={generateRandomID()}
          data={data.top10Animes?.today}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push({ pathname: "/animeInfo", params: { id: item.id } }) }>
            <View style={styles.flatlist}>
              <Image source={{ uri: item.poster }} style={styles.poster} />
              {/* <Text>{item.name}</Text> */}
            </View>
            </Pressable>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          // pagingEnabled
          bounces={true}
        />
        {/* Render topAiring Animes */}
            {/* //errorStuff */}

        
        
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    // marginTop: 10,
    // borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    height: 300,
    width: windowWidth,
  },
  spotlightPoster: {
    width: 350,
    height: 200,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  info: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  detailsContainer: {
    flex: 1,
    // maxHeight: 300,
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 10,
    color: '#555',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  poster: {
    width: 100,
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
  },
  flatlist: {
    margin: 10,
    marginLeft: 20,
  },
  conWatchingItemCon: {
    width: conWatchingItemConWith,
    height: 150,
    borderRadius: 5,
    overflow: 'hidden'
  },
  description2: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
    position: 'absolute',
    flex: 1,
    bottom: 18,
  },
  blurContainer: {
    // backgroundColor: 'rgba(119, 119, 119, 0.9)',
    position: 'absolute',
    alignSelf: 'flex-start',
    bottom: 0,
    width: '100%',
    height: 50,
    zIndex: 1000,
  },
  conWatchPoster: {
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 30,
    zIndex: 100,
  },
  progressLineFull: {
    position: 'absolute',
    bottom: 0,
    height: 5, 
    width: '100%',
    backgroundColor: 'rgba(119, 119, 119, 0.9)', 
  },
  progressLine: {
    position: 'absolute',
    bottom: 0,
    height: 5, 
    width: 0,
    backgroundColor: 'rgba(194, 61, 52, 0.9)', 
    // borderRadius: 5, 
    zIndex: 1,
  },

});
