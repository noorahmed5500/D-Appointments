import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

//Main Component
const MapScreen = () => {
  const route = useRoute();
  const latt = parseFloat(route.params.latitude)
  const lng = parseFloat(route.params.longitude)

  //Initialize mapRegion State
  const [mapRegion, setmapRegion] = useState({
    latitude: 26.7336321,
    longitude: 67.7647403,
    latitudeDelta: 0.0922,//0.0043, //
    longitudeDelta: 0.0421 //0.0034 //0.0421
  });

  const [mapMarker, setmapMarker] = useState({
    latitude: latt,
    longitude: lng,
    latitudeDelta: 0.0922,//0.0043, //
    longitudeDelta: 0.0421 //0.0034 //0.0421
  });

  return (
    <View>
      <MapView mapType='standard'
        style={{ height: '100%', width: '100%' }}
        region={mapRegion}>
        <Marker coordinate={mapMarker} title={route.params.name} />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({})

export default MapScreen;

