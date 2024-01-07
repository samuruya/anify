import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';
import Loading from '../components/loading';

export default function Player() {
  const route = useRoute();
  const episodeId = route.params.episodeId;
  // const url = route.params.url;
  // const url = 'https://live-par-2-cdn-alt.livepush.io/live/bigbuckbunnyclip/index.m3u8'
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [url, setUlr] = useState([]);
  const [isReady, setIsReady] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    async function playVideo(episodeId){
      try {
        const resp = await fetch(`https://api-aniwatch.onrender.com/anime/episode-srcs?id=${episodeId}&server=vidstreaming&category=dub`);
        const jsonData = await resp.json();
        setUlr(jsonData.sources[0].url)
        console.log("doen Fetching URL");
      } catch (error) {
        console.error("Error fetching data:", error);
        navigation.goBack()
      }
    }
    playVideo(episodeId)
 
  }, []);

  async function openFullscreenPlayer () {
    if (video.current) {
      await video.current.presentFullscreenPlayer();
      setIsLoading(false);
    }
  };

  
  
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: url,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isMuted={false}
        onPlaybackStatusUpdate={(newStatus) => {
          setStatus(() => newStatus);
          if (!isReady && newStatus.isLoaded) {
            setIsReady(true);
            openFullscreenPlayer(); 
          }
        }}
        onFullscreenUpdate={(e)=>{
          if (e.fullscreenUpdate === 3) {
            navigation.goBack()
          }
        }}
      />

      {isLoading && <Loading />}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  video: {
    display: 'none',
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
