import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';

export default function Player() {
  const video = React.useRef(null);

  const [status, setStatus] = React.useState({});
  const [isReady, setIsReady] = React.useState(false);
  const navigation = useNavigation();

  async function openFullscreenPlayer () {
    if (video.current) {
      await video.current.presentFullscreenPlayer();
      console.log("ready");
    }
  };

  
  
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://live-par-2-cdn-alt.livepush.io/live/bigbuckbunnyclip/index.m3u8',
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
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent', // Set the background to transparent
  },
  video: {
    ...StyleSheet.absoluteFillObject, // Make the video take up the entire space
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});