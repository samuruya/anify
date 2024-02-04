import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, StatusBar, Dimensions, Pressable, Animated, BackHandler } from 'react-native';
import { Video, Audio, ResizeMode } from 'expo-av';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import Loading from '../components/loading';
import { setWatchProgressSeason, setContinueWatching } from './db'
import { useRealm } from "@realm/react";
import Slider from '@react-native-community/slider';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { host } from '../constants/Host';

var isVisible = true 
const fadeAnim = new Animated.Value(1);
var isPlaying = false

export default function Player2() {
  const realm = useRealm();
  const router = useRouter();
  const { episodeId, playStartTime, titleId, poster, number, title, language } = useLocalSearchParams();
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // const url = 'https://eno.tendoloads.com/_v6/e4b7462bd2d95d38a6070bce1e930ef2d91de98a86a27c1258350511b2611ce82602aaf03cad6d5364fb74b7c355e8b29c700915e6deb79ae5629ba0f3ed6cb7072b51075e8499b9a747b92fcb1ab1087316d7aed902239b0b606991eb5e2b4dfc466fffd7e8ef9163092a3e7a2235ded246ad93abf5c3c1434ae92b5c83a49f/master.m3u8'
  const video = useRef(null);
  const slider = useRef(null);
  const [status, setStatus] = React.useState({});
  const [url, setUlr] = useState([]);
  const [urlSub, setUlrSub] = useState([]);
  const [isReady, setIsReady] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isVisible, setIsVisible] = useState(true);
  // const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    async function playVideo(episodeId){
      try {
        const resp = await fetch(`${host}/anime/episode-srcs?id=${episodeId}&server=vidstreaming&category=${language}`);
        const jsonData = await resp.json();
        setUlr(jsonData.sources[0].url)
        // setUlrSub(jsonData.subtitles[1].url)
        console.log("done Fetching URL", jsonData.sources[0].url);
        //  console.log("playtime",playStartTime);
      } catch (error) {
        console.error("Error fetching data:", error);
        router.back()
      }
    }

    playVideo(episodeId)
 
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', goBack);
    };
  }, [status]);

  const goBack = () => {
    // console.log("realm-------->", "TitleID:",titleId, "EpisodeID:",episodeId, "Title:",title, "Number:",number, "Time:",status.positionMillis, "Duration:",status.durationMillis, "Url:",url, "PosterURL:",poster);
    
    setWatchProgressSeason(realm, episodeId, parseInt(status.positionMillis), parseInt(status.durationMillis))
    setContinueWatching(realm, titleId, episodeId, title, parseInt(number), parseInt(status.positionMillis), parseInt(status.durationMillis), url, poster)

    router.back()
    return true;
  };


  function showControlls(){
    // console.log("§")
   
    if(isVisible){
      fadeOut()
      console.log("fadeOut")
    }else{
      fadeIn()
      console.log("fadeIn")
    }
    
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      video.current.pauseAsync();
      fadeIn();
    } else {
      video.current.playAsync();
      fadeOut();
    }
    // setIsPlaying(!isPlaying);
    isPlaying = !isPlaying
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

  function formate(duration) {
    var seconds = parseInt((duration/1000)%60)     
    var minutes = parseInt((duration/(1000*60))%60)
    var hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? null + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if(hours){
      return hours + ":" + minutes + ":" + seconds;
    }else{
      return minutes + ":" + seconds;
    }
  }

 
  const fadeOut = () => {
    isVisible = false
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500, 
      useNativeDriver: false,
    }).start(() => {
      
    });
  }

  const fadeIn = () => {
    isVisible = true
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, 
      useNativeDriver: false, 
    }).start(() => {
      
      if(isPlaying){
        setTimeout(() => {
          // console.log(isPlaying)
          
          fadeOut();
          
        }, 4000);
      }
      
    })
  
  }
 

  function xButton(){
    if(fadeAnim._value === 1){
     goBack()
    }
  }


  return (
    <Pressable style={styles.container} onPress={() => showControlls()}>
      <StatusBar barStyle={'light-content'} hidden={true} />
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: url }}
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
            // setIsPlaying(true)
            isPlaying = true
            fadeOut();
            video.current.playAsync();
            // openFullscreenPlayer(); 
          }
        }}
        
      />

      <Animated.View style={{ ...styles.epInfo, opacity: fadeAnim }}>
        <Text style={{color: 'white', fontSize: 20,}}>E{number}: {title}</Text>
        <Entypo name="cross" size={24} color="white" style={{backgroundColor: 'transparent', padding: 10}} onPress={()=> { xButton() }}/>
      </Animated.View>

      {isLoading ? 
        <Loading /> :
        <>
        <Animated.View style={{ ...styles.playCtl, opacity: fadeAnim }}>
          <TouchableOpacity style={styles.buttons} onPress={handleSkipBackward}>
            <MaterialIcons name="replay-10" size={40} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButtons} onPress={handlePlayPause}>
            {isPlaying ? <Entypo name="controller-paus" size={50} color='#fff' /> : <Entypo name="controller-play" size={50} color='#fff' />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={handleSkipForward}>
            <MaterialIcons name="forward-10" size={40} color='#fff' />
          </TouchableOpacity>
        </Animated.View> 
      

        <Animated.View style={{ ...styles.timeStamp, opacity: fadeAnim }}>
          <Text style={{color: 'white'}}>{formate(status.positionMillis)}</Text>
          <Slider
            style={{flex: 1, height: 40}}
            minimumValue={0}
            maximumValue={status.durationMillis}
            step={1000}
            tapToSeek={false}
            disabled={!isVisible}
            value={status.positionMillis}
            onValueChange={(value) => {
              // console.log(formate(value))
              video.current.setPositionAsync(value);
            }}
            minimumTrackTintColor="#b70710"
            maximumTrackTintColor="#666666"
            thumbTintColor="#e50914"
          />
          <Text style={{color: 'white'}}>{formate(status.durationMillis)}</Text>
      </Animated.View>
      </>
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
    // flex: 1,
    display: 'flex',
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    // zIndex: 10,
  },
  playButtons: {
    marginHorizontal: 40,
    height: 50,
    width: 60,
  },
  buttons: {
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
  timeStamp: {
    position: 'absolute',
    bottom: 0,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    color: 'white',
    zIndex: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
  epInfo: {
    position: 'absolute',
    flexDirection:'row',
    width:'100%' ,
    justifyContent:'space-between',
    alignItems: 'center',
    top: 0,
    paddingLeft: 20,
    paddingRight: 10,
  },
});
