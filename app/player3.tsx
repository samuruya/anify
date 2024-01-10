import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Video, Audio, ResizeMode } from 'expo-av';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import Loading from '../components/loading';

export default function Player() {
  const router = useRouter();
  const { episodeId,  playStartTime } = useLocalSearchParams();
  console.log("playtime",playStartTime);

  // const url = 'https://live-par-2-cdn-alt.livepush.io/live/bigbuckbunnyclip/index.m3u8'
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [url, setUlr] = useState([]);
  const [isReady, setIsReady] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    async function playVideo(episodeId){
      Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      try {
        const resp = await fetch(`https://api-aniwatch.onrender.com/anime/episode-srcs?id=${episodeId}&server=vidstreaming&category=dub`);
        const jsonData = await resp.json();
        setUlr(jsonData.sources[0].url)
        console.log("done Fetching URL");
        
      } catch (error) {
        console.error("Error fetching data:", error);
        router.back()
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
            router.back()
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
