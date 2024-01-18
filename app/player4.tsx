import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isReady, setIsReady] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreenPlayer = async () => {
    if (video.current && isReady) {
      await video.current.presentFullscreenPlayerAsync();
    }
  };

  const dismissFullscreenPlayer = () => {
    if (video.current) {
      video.current.dismissFullscreenPlayer();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenUpdate = (event) => {
      if (event.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT) {
        setIsFullscreen(true);
      } else if (event.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS) {
        setIsFullscreen(false);
        console.log("Nav-back");
        ; // Add your navigation logic here
      }
    };

    
    return () => {
      video.current.setOnFullscreenUpdate(null);
    };
  }, []);

  const onPlaybackStatusUpdate = (newStatus) => {
    setStatus(() => newStatus);

    if (!isReady && newStatus.isLoaded) {
      setIsReady(true);
      setIsLoading(false); // Set loading to false once the video is loaded
      openFullscreenPlayer();
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={isFullscreen ? styles.fullscreenVideo : styles.video}
        source={{
          uri: 'https://live-par-2-cdn-alt.livepush.io/live/bigbuckbunnyclip/index.m3u8',
        }}
        useNativeControls={false} // Disable native controls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      {isFullscreen && (
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={dismissFullscreenPlayer}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
        </View>
      )}
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
    ...StyleSheet.absoluteFillObject,
  },
  fullscreenVideo: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  closeButton: {
    color: '#fff',
    fontSize: 18,
  },
});
