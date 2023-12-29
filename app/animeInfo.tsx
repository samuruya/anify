import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useRoute, useNavigation } from '@react-navigation/native';
import data from './info.json'

interface AnimeInfoProps {
  route: { params: { id: string } };
}

export default function AnimeInfo() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || { id: '' };

  const fetchIP = `https://api-aniwatch.onrender.com/anime/info?id=${id}`;
  
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const resp = await fetch(fetchIP);
  //       const jsonData = await resp.json();
  //       setData(jsonData);
  //       console.log(fetchIP);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
    
      <Text style={styles.title}>{data.anime?.info.name}</Text>
      
      <Image source={{ uri: data.anime?.info.poster }} style={styles.poster} />
      <Text style={styles.description}>{data.anime?.info.description}</Text>
      
      {/* Render seasons */}
      <Text style={styles.subtitle}>Seasons:</Text>
      {data.seasons?.map((season) => (
        <View key={season.id}>
          <Text>{season.title}</Text>
          <Image source={{ uri: season.poster }} style={styles.poster} />
        </View>
      ))}

      {/* Render most popular animes */}
      <Text style={styles.subtitle}>Most Popular Animes:</Text>
      {/* {data.mostPopularAnimes?.map((mostPopularAnimes) => (
        <View key={mostPopularAnimes.id}>
          <Text>{mostPopularAnimes.name}</Text>
          <Image source={{ uri: mostPopularAnimes.poster }} style={styles.poster} />
        </View>
      ))} */}
      
      <FlatList
      data={data.mostPopularAnimes}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('animeInfo', { id: item.id })}>
        <View style={styles.flatlist} key={item.id}>
          <Image source={{ uri: item.poster }} style={styles.poster} />
          {/* <Text>{item.name}</Text> */}
        </View>
        </TouchableOpacity>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      // pagingEnabled
      bounces={true}
    />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  flatlist: {
    margin: 10,
  }
});
