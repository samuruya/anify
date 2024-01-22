import React, {useState, useEffect} from 'react';
import { Platform, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, Dimensions, Button, Pressable, BackHandler, StatusBar  } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
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
  
  const render = [<AnimeInfoComp id={Array.isArray(id) ? id[0] : id} newComponent={newComponent} />]
  const [renderList, setRenderList] = useState([render]);
  
  // const render = [<EditScreenInfo path={id} />]

  function newComponent(id){
    // const newComp = <AnimeInfoComp id={Array.isArray(id) ? id[0] : id} newComponent={newComponent} />;
    setRenderList((prevRenderList) => [
      ...prevRenderList,
      <AnimeInfoComp key={id} id={id} newComponent={newComponent} />,
    ]);
    // console.log("newComponentID:",id);
    // render.push(<AnimeInfoComp id={Array.isArray(id) ? id[0] : id} newComponent={newComponent} />)
    // console.log("Length:",render.length)
    // setRenderList(render)
  }
  const goBack = () => {

    // console.info("renderList:",renderList.length)
    // setRenderList((prevRenderList) => prevRenderList.slice(0, -1));
    // console.log("new renderList:",renderList.length)
    
    if(renderList.length > 1){
      console.log("sliceList")
    }else{
      console.log("goBack")
    }
    // console.log("back:",render.length);
    // render.pull(render.length)
    // setRenderList(render)
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', goBack);
    };
  }, [renderList]);


  return (
    <>
      <StatusBar barStyle={'light-content'}/>
      {/* {render[render.length - 1]} */}
      {renderList[renderList.length - 1]}
      {renderList.length > 1 && (
        <Pressable style={styles.backButton} onPress={() => goBack()}>
          <FontAwesome name="chevron-left" size={40} color='grey' style={{ zIndex: 1 }} />
        </Pressable>
      )}
    
    </>
  );
}

const styles = StyleSheet.create({
  backButton:{
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 30,
    backgroundColor: 'transparent'
  }

});
