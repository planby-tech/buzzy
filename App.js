import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios'

const App = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 36.35948,
    longitude: 127.37895,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  })
  const [placeName, setPlaceName] = useState('')

  useEffect(()=>{
    
  },[])

  const searchTest = async () => {
    const apiKey = "cbba1c0648b87a1d0b5ef5b55c462d5f"
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
        
        
      </View>
      }
      
      
    </View>
  )
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
})