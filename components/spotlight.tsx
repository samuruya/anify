import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import data from './spotlightData.json';
import { withLayoutContext } from 'expo-router';

const windowWidth = Dimensions.get('window').width;

export default function Spotlight() {

  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const resp = await fetch("https://api-aniwatch.onrender.com/anime/home");
  //       const jsonData = await resp.json();
  //       setData(jsonData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const renderItem = ({ item }: { item: any }) => (
    
    <View style={styles.itemContainer}>
      <View style={styles.detailsContainer}>
      <Image source={{ uri: item.poster }} style={styles.poster} />
        <Text style={styles.title}>{item.name}</Text>
        {/* <Text style={styles.description}>{item.description}</Text> */}
        <Text style={styles.info}>Episodes: {item.episodes.sub} sub, {item.episodes.dub} dub</Text>
        <Text style={styles.info}>Release Date: {item.otherInfo[2]}</Text>
      </View>
    </View>
  );

  return (
    // <Carousel
    //   data={data.spotlightAnimes}
    //   renderItem={renderItem}
    //   sliderWidth={300}
    //   itemWidth={300}
    // />
    <View>
    <Text style={styles.label}>Spotlight</Text>
    <FlatList
      data={data.spotlightAnimes}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      bounces={true}
    />
    </View>
  );
}


const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    // marginTop: 10,
    // borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    height: 300,
    width: windowWidth,
  },
  poster: {
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
 
});
