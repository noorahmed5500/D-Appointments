import {
  StyleSheet, Text, TouchableOpacity, View,
  Alert, Image, ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react';
import { firebase } from "../../config";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Donor's Dashboard/Profile
const Dashboard = () => {

  const currentUserUID = firebase.auth().currentUser.uid;
  const typee = 'donnars';
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [bName, setBName] = useState('');
  const [addd, setAddd] = useState('');
  const [pnmbr, setPnmbr] = useState('');
  const [imgurl, setImgUrl] = useState("");

  //SignOut Process
  const onSignoutPress = async () => {
    await firebase.auth().signOut()
      .then(async () => {
        await AsyncStorage.removeItem("myid");
        await AsyncStorage.removeItem("cuname");
        console.log('Signed Out Successfully...!');
        navigation.goBack();
      }).catch((err) => {
        console.log(err)
      })
  }

  //Profile Picture Update
  const DoUpdate = () => {
    navigation.navigate("Update", { currentUserUID, typee })
  }

  //Retrieving Current User data
  useEffect(() => {
    const getUserInfo = async () => {
      const doc = await firebase
        .firestore()
        .collection('donnars')
        .doc(currentUserUID)
        .get();

      if (!doc.exists) {
        Alert.alert('No user data found!')
      } else {
        let dataObj = doc.data();
        setFirstName(dataObj.name)
        setBName(dataObj.bloodGrourp)
        setAddd(dataObj.addr)
        setPnmbr(dataObj.ph)
        setImgUrl(dataObj.imgurl)
      }      
      await AsyncStorage.setItem("myid", currentUserUID);
      await AsyncStorage.setItem("cuname", firstName);
    }
    getUserInfo();
  })
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={styles.maindesign}>

          <View style={styles.profile}>
            <Image
              style={{
                width: 100, height: 100, borderWidth: 2, borderColor: "black",
                borderRadius: 100 * 2
              }}
              source={imgurl ? { uri: imgurl } : require("../../assets/imgavtar.jpg")}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 10 }}>{firstName}</Text>
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Dadu</Text>
          </View>
          <View>
            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 12 }}>Name:</Text>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{firstName}</Text>
              <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 12 }}>Phone:</Text>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{pnmbr}</Text>
              <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 12 }}>Blood Group:</Text>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{bName}</Text>
              <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 12 }}>Type:</Text>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Donnar</Text>
              <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 12 }}>Address:</Text>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{addd}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => { DoUpdate() }}
            style={{
              borderRadius: 8, backgroundColor: 'skyblue', margin: 30,
              alignItems: 'center'
            }}>
            <Text style={{ fontSize: 18, padding: 10, fontWeight: 'bold' }}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSignoutPress()}
            style={{
              borderRadius: 8, backgroundColor: 'darkred', margin: 30,
              alignItems: 'center'
            }}>
            <Text style={{ fontSize: 18, padding: 10, fontWeight: 'bold', color: 'white' }}>SignOut</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
export default Dashboard
const styles = StyleSheet.create({
  maindesign: {
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    elevation: 15,
  },
  profile: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  }
})