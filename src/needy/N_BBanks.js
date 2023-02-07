import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import React, { useState } from 'react';

const N_BBanks = () => {

  const [mapRegion, setmapRegion] = useState({
    latitude: 26.7336321,
    longitude: 67.7647403,
    latitudeDelta: 0.0922,//0.0043, //
    longitudeDelta: 0.0421 // 0.0034 //
  });

  const [alibb, setAlibb] = useState({
    latitude: 26.729866,
    longitude: 67.773731,
    latitudeDelta: 0.0043, //0.0922
    longitudeDelta: 0.0034 //0.0421
  });

  const [daniyal, setDaniyal] = useState({
    latitude: 26.730729,
    longitude: 67.775898,
    latitudeDelta: 0.0043, //0.0922
    longitudeDelta: 0.0034 //0.0421
  });

  return (
    <View>
      <MapView mapType='standard'
        style={{ height: '100%', width: '100%' }}
        region={mapRegion}>
        <Marker coordinate={alibb} title="Ali Laboratory"
          description='Phone: 03144444448' />
        <Marker coordinate={daniyal} title="Daniyal Laboratory"
          description='Phone: 03144444444' />
      </MapView>
    </View>
  )
}
export default N_BBanks
const styles = StyleSheet.create({})