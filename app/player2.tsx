import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, StatusBar, Dimensions, Pressable } from 'react-native';
import { Video, Audio, ResizeMode } from 'expo-av';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import Loading from '../components/loading';
import { setWatchProgressSeason, setContinueWatching } from './db'
import { useRealm } from "@realm/react";
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Player() {
  const realm = useRealm();
  const router = useRouter();
  const { episodeId, playStartTime, titleId, poster, number, title } = useLocalSearchParams();


  const url = 'https://live-par-2-cdn-alt.livepush.io/live/bigbuckbunnyclip/index.m3u8'
  const video = useRef(null);
  const [status, setStatus] = React.useState({});
  // const [url, setUlr] = useState([]);
  const [isReady, setIsReady] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    async function playVideo(episodeId){
      try {
        const resp = await fetch(`https://api-aniwatch.onrender.com/anime/episode-srcs?id=${episodeId}&server=vidstreaming&category=dub`);
        const jsonData = await resp.json();
        setUlr(jsonData.sources[0].url)
        console.log("done Fetching URL", jsonData.sources[0].url);
        //  console.log("playtime",playStartTime);
      } catch (error) {
        console.error("Error fetching data:", error);
        router.back()
      }
    }

    // playVideo(episodeId)
 
  }, []);

  async function openFullscreenPlayer () {
    if (video.current) {
      await video.current.presentFullscreenPlayer();
      setIsLoading(false);
    }
  };

  function showControlls(){
    console.log("§")
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipBackward = async () => {
    if (video.current) {
      const status = await video.current.getStatusAsync();
      const newPosition = Math.max(status.positionMillis - 10000, 0);
      video.current.setPositionAsync(newPosition);
    }
  };

  const handleSkipForward = async () => {
    if (video.current) {
      const status = await video.current.getStatusAsync();
      const newPosition = Math.min(status.positionMillis + 10000, status.durationMillis);
      video.current.setPositionAsync(newPosition);
    }
  };


  return (
    <Pressable style={styles.container} onPress={() => showControlls()}>
      <StatusBar barStyle={'light-content'} hidden={true} />
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: url,
        }}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={false}
        isMuted={false}
        positionMillis={playStartTime ? parseFloat(playStartTime) : 0}
        onPlaybackStatusUpdate={(newStatus) => {
          setStatus(() => newStatus);
          if (!isReady && newStatus.isLoaded) {
            setIsReady(true);
            setIsLoading(false);
            setIsPlaying(true)
            video.current.playAsync();
            // openFullscreenPlayer(); 
          }
        }}
        onFullscreenUpdate={(e)=>{
          if (e.fullscreenUpdate === 3) {
            // console.log("realm-------->", "TitleID:",titleId, "EpisodeID:",episodeId, "Title:",title, "Number:",number, "Time:",status.positionMillis, "Duration:",status.durationMillis, "Url:",url, "PosterURL:",poster);
           
            // setWatchProgressSeason(realm, episodeId, status.positionMillis, status.durationMillis)
            // setContinueWatching(realm, titleId, episodeId, title, parseInt(number), status.positionMillis, status.durationMillis, url, poster)
  
            router.back()
          }
        }}
      />

      

      {isLoading ? 
        <Loading /> :
        <View style={styles.playCtl} >
          <TouchableOpacity style={styles.buttons} onPress={handleSkipBackward}>
            <MaterialIcons name="replay-10" size={40} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButtons} onPress={handlePlayPause}>
            {isPlaying ? <Entypo name="controller-paus" size={50} color='#fff' /> : <Entypo name="controller-play" size={50} color='#fff' />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={handleSkipForward}>
            <MaterialIcons name="forward-10" size={40} color='#fff' />
          </TouchableOpacity>
        </View> 
      }
      
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  video: {
    display: 'flex',
    position: 'absolute',
    alignSelf: 'center',
    width: windowWidth,
    height: windowHeight,
    // zIndex: 10,
  },
  playButtons: {
    marginHorizontal: 30,
    height: 50,
    width: 45,
  },
  buttons: {
    // margin: 10,
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  playCtl: {
    position: 'absolute',
    color: 'white',
    flexDirection: 'row',
    alignSelf: 'center',
    zIndex: 100,
  },
});
