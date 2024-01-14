import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Video, Audio, ResizeMode } from 'expo-av';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import Loading from '../components/loading';
import { setWatchProgressSeason, setContinueWatching } from './db'
import { useRealm } from "@realm/react";

export default function Player() {
  const realm = useRealm();
  const router = useRouter();
  const { episodeId, playStartTime, titleId, poster, number, title } = useLocalSearchParams();

  // const url = 'https://live-par-2-cdn-alt.livepush.io/live/bigbuckbunnyclip/index.m3u8'
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [url, setUlr] = useState([]);
  const [isReady, setIsReady] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

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
        positionMillis={playStartTime ? parseFloat(playStartTime) : 0}
        onPlaybackStatusUpdate={(newStatus) => {
          setStatus(() => newStatus);
          if (!isReady && newStatus.isLoaded) {
            setIsReady(true);
            openFullscreenPlayer(); 
          }
        }}
        onFullscreenUpdate={(e)=>{
          if (e.fullscreenUpdate === 3) {
            // console.log("realm-------->", "TitleID:",titleId, "EpisodeID:",episodeId, "Title:",title, "Number:",number, "Time:",status.positionMillis, "Duration:",status.durationMillis, "Url:",url, "PosterURL:",poster);
            setWatchProgressSeason(realm, episodeId, status.positionMillis, status.durationMillis)
            setContinueWatching(realm, titleId, episodeId, title, parseInt(number), status.positionMillis, status.durationMillis, url, poster)
  
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
