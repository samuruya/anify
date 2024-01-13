import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, Dimensions, Button, Pressable } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getWatchProgressMovie, } from './db'
import data from '../assets/json-data/animeinfo.json'
import episodeData from '../assets/json-data/episodeData.json'
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { useQuery, useRealm } from "@realm/react";
import AnimeInfoComp from '../components/AnimeInfoComp';


const windowWidth = Dimensions.get('window').width;
const overlayContainerTopWidth = 100;

export default function AnimeInfo() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const idNoPass = 'jujutsu-kaisen-2nd-season-18413'
  
  const render = [<AnimeInfoComp id={Array.isArray(id) ? id[0] : id} />]
  const [renderList, setRenderList] = useState([]);
  // const render = [<EditScreenInfo path={id} />]

  

  return (
    <>
    
      {render[render.length - 1]}
    
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
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
});
