import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios'

const App = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.35948,
    longitude: 127.37895,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  })

  useEffect(()=>{
    searchTest()
  },[])

  const searchTest = async () => {
    const key = "0d354750cc5df9c00497abcd507c89d5"
    const searching = "쿠오리노"
    const coord = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${searching}`, {
      headers: { Authorization: `KakaoAK ${key}` }
    })
    const location = coord.data.documents[0]
    const xCoord = location.x
    const yCoord = location.y

    setMapRegion({
      ...mapRegion,
      latitude: Number(yCoord),
      longitude: Number(xCoord),
    })
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='사무실' />
      </MapView>
    </View>
  )
}
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})