import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import YoutubeIframe from 'react-native-youtube-iframe'
import data from './videos.json';

interface ParamPlayVideoInterface {
  playing: boolean;
  videos: any;
  search: string
}

const App = () => {

  const [paramsCustom, setParamsCustom] = useState<ParamPlayVideoInterface>({
    playing: false,
    videos: data.videos,
    search: ''
  });
  const setState = useCallback((keyName: string, value: string | boolean) => {
    setParamsCustom((state: any) => ({ ...state, [keyName]: value }));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => setState( "playing",item.id)}>
        <View style={styles.videoContainer}>
          <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const searchByTitle = (title: string) => {
    return paramsCustom.videos.filter((video: any) => video.title.includes(title));
  }
  const searchResults = searchByTitle(paramsCustom.search);
  return (
    <SafeAreaView style={styles.container}>
      <TextInput placeholder='Tìm kiếm video' style={styles.search} value={paramsCustom.search} onChangeText={(t) => setState("search", t)}/>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={paramsCustom.playing}
      />
      {paramsCustom.playing && (
        <YoutubeIframe
          height={300}
          play={paramsCustom.playing !== false}
          videoId={paramsCustom.playing}
          onChangeState={(state) => {
            if (state === 'ended') {
              setState("playing", false)
            }
          }}
        />
      )}
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10
  },
  videoContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    height: 70,
    width: 120,
    marginRight: 10,
    borderRadius: 8
  },
  title: {
    fontSize: 16,
  },
})
