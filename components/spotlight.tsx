import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import data from './spotlightData.json';
import { withLayoutContext } from 'expo-router';


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
    <Carousel
      data={data.spotlightAnimes}
      renderItem={renderItem}
      sliderWidth={300}
      itemWidth={300}
    />
  );
}


const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // justifyContent: 'flex-end',
    alignItems: 'center',
  },
  poster: {
    width: 500,
    height: 200,
    // margin: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    zIndex: 1000,
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
    maxHeight: 300,
  },
});
