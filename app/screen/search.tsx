import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from '@react-native-community/blur';
// import data from '../search.json'

const windowWidth = Dimensions.get('window').width;



export default function SearchScreen() {
  const [data, setData] = useState([]);

   const search = async (query) => {
    console.log("search >", query);
  
      const fetchData = async () => {
        try {
          const resp = await fetch(`https://api-aniwatch.onrender.com/anime/search?q=${query}`);
          const jsonData = await resp.json();
          setData(jsonData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
  }

  const navigation = useNavigation();
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      // style={styles.itemContainer}
      onPress={() => navigation.navigate('animeInfo', { id: item.id })}
    >
      <Image source={{ uri: item.poster }} style={styles.poster} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.searchContainer}>
        <FontAwesome
          name="search"
          size={25}
          color='#777'
        />
        <TextInput 
          style={styles.input} 
          placeholder='Search'
          onSubmitEditing={(event) => search(event.nativeEvent.text.trim())}
        />
      
      </View>

    <View style={styles.searchResult}>
      <FlatList
        data={data?.animes}
        renderItem={renderItem}
        contentContainerStyle={styles.containerFlatList}
      />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  searchContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'backdrop-filter: blur(2px)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    color: '#777',
    backgroundColor: '#323232',
    padding: 8,
    margin: 10,
    width: windowWidth - 100,
  },
  searchResult: {

  },
  poster: {
    width: 100,
    height: 150,
    // margin: 5,
    marginBottom: 30,
  },
  containerFlatList: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    // paddingVertical: 20,
  },
});
