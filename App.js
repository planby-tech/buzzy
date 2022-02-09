import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios'
import SlidingUpPanel from 'rn-sliding-up-panel'
import BottomSheet from './pages/BottomSheet.js'
import ScrollViewInsidePanel from './pages/ScrollViewInsidePanel.js'

const App = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 36.35948,
    longitude: 127.37895,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  })
  const [placeName, setPlaceName] = useState("")

  useEffect(()=>{
    
  },[])

  const searchTest = async () => {
    const apiKey = "0d354750cc5df9c00497abcd507c89d5"
    const coord = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${placeName}`, {
      headers: { Authorization: `KakaoAK ${apiKey}` }
    })
    const location = coord.data.documents[0]
    const xCoord = location.x
    const yCoord = location.y
    
    setPlaceName(placeName)

    setMapRegion({
      ...mapRegion,
      latitude: Number(yCoord),
      longitude: Number(xCoord),
    })
  }

  return (
    <View style={styles.container}>
      {placeName === "" ?
      <View>
        <MapView
          style={styles.map}
          region={mapRegion}
        />
        <TextInput
          onChangeText={(searchName) => setPlaceName(searchName)}
          onSubmitEditing={()=>searchTest()}
          placeholder={'검색할 장소를 입력하세요'}
          style={styles.input}
        />
      </View>
      :
      <View>
        <MapView
          style={styles.map}
          region={mapRegion}
        >
          <Marker coordinate={mapRegion} title={placeName} description='우리 여기서 일해요'/>
        </MapView>
        <TextInput
        value={placeName}
        onChangeText={(searchName) => setPlaceName(searchName)}
        onSubmitEditing={()=>searchTest()}
        style={styles.input}
        />
        
        <SlidingUpPanel
          ref={c => (BottomSheet._panel = c)}
          draggableRange={{top: height / 1.75, bottom: 120}}
          animatedValue={BottomSheet._draggedValue}
          showBackdrop={false}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Text style={{color: '#FFF'}}>{placeName}</Text>
            </View>
            <View style={styles.container2}>
              <Text>Bottom Sheet Content</Text>
            </View>
          </View>
          <View style={styles.favoriteIcon}>
            <Image 
            style = {styles.heart}
            source = {require('./assets/heart.png')}/>
          </View>
        </SlidingUpPanel>

      </View>
      }
    </View>
  )
}
export default App

const {height} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container2: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container3: {
    flex: 1,
    zIndex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: "100%",
    height: "100%",
    zIndex: -1
  },
  input: {
    position: "absolute",
    zIndex: 2,
    justifyContent:"center",
    backgroundColor: "white",
    width: 200,
    height: 44,
    top: 40,
    left: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    height: 120,
    backgroundColor: '#b197fc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#FFDB58',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  },
  heart: {
    position: 'absolute',
    top: 7.5,
    right: 6
  },
  dragHandler: {
    alignSelf: 'stretch',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc'
  }
})