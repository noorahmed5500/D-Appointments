import {
  StyleSheet, Text, View, FlatList,
  Image, TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react'
import { firebase } from "../../config";
import { useNavigation } from '@react-navigation/native';

//Doctors Name
const DocList = () => {
  const navigation = useNavigation();

  //This function carries data and send to Profile screen
  const getData = (
    id, name, category, days, time, city, address, phone, rating, latitude, longitude, imgUrl) => {
    console.log({ name, category, days, time, city, address, phone, rating, latitude, longitude, imgUrl });
    navigation.navigate('Dashboard', {
      id, name, category, days, time, city, address,
      phone, rating, latitude, longitude, imgUrl
    });
  }

  //All doctors info available here
  const [doctor, setDoctor] = useState([])
  const MyInfo = firebase.firestore().collection('doctors')
  useEffect(() => {
    async function wathdata() {
      MyInfo
        .onSnapshot(
          querySnapshot => {
            const users = [];
            querySnapshot.forEach((doc) => {
              const { id, name, category, city, address, days, time, phone, rating,
                imgUrl, longitude, latitude } = doc.data()
              users.push({
                id: doc.id,
                name,
                category,
                days,
                time, imgUrl, phone, rating, longitude, latitude, city, address
              })
            })
            setDoctor(users)
          })
    }
    wathdata();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={doctor}
        keyExtractor={(key) => key.id}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              <TouchableOpacity
                style={{
                  marginBottom: 8, marginTop: 5, backgroundColor: 'white', marginHorizontal: 10,
                  borderRadius: 10, elevation: 5
                }}
                onPress={() => {
                  return getData(
                    item.id, item.name, item.category, item.days,
                    item.time, item.city, item.address, item.phone,
                    item.rating, item.latitude, item.longitude, item.imgUrl)
                }}>
                <View style={{ padding: 12, flexDirection: 'row', }}>
                  <Image
                    style={{
                      paddingRight: 10, width: 60, height: 60, borderWidth: 2,
                      borderColor: "black", borderRadius: 60 * 2
                    }}
                    source={require("../../assets/imgavtar.jpg")}
                  />
                  <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ marginTop: 4, color: 'gray' }}>{item.category}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }} />
    </View>
  );
}
const Styles = StyleSheet.create({
  tabbar: {
    backgroundColor: "#004e92",
    flexDirection: 'row',
    height: 60,
    padding: 14,
    marginBottom: 5,
    elevation: 10
  },
})
export default DocList
