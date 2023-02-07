import { StyleSheet, Text, TouchableOpacity, 
  View, Alert, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { firebase } from "../../config";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Needy profile/Dashboard
const N_Profile = () => {

  const navigation = useNavigation();
  const currentUserUID = firebase.auth().currentUser.uid;
  const typee = 'Recepient';
  const [firstName, setFirstName] = useState('');
  const [email, setEamil] = useState('');
  const [addd, setAddd] = useState('');
  const [phone, setPhone] = useState('');
  const [imgurl, setImgUrl] = useState('');

  //SignOut Process
  const onSignoutPress = async () => {
    await firebase.auth().signOut()
      .then(async () => {
        await AsyncStorage.removeItem('myid');
        await AsyncStorage.removeItem('cuname');
        console.log('Signed Out Successfully...!');
        navigation.navigate('LoginScreen');
      }).catch((err) => {
        console.log(err)
    })
  }

  //It will navigate to update screen where user can update his/her Profile
  const DoUpdate = () => {
    navigation.navigate("Update", { currentUserUID, typee })
  }
  //It will retrieve current user data
  useEffect(() => {
    const getUserInfo = async () => {
      const doc = await firebase
        .firestore()
        .collection('needy')
        .doc(currentUserUID)
        .get();

      if (!doc.exists) {
        Alert.alert('No user data found!')
      } else {
        let dataObj = doc.data();
        setFirstName(dataObj.name)
        setAddd(dataObj.addr)
        setEamil(dataObj.email)
        setPhone(dataObj.ph)
        setImgUrl(dataObj.imgurl)
      }
      await AsyncStorage.setItem("myid", currentUserUID);
      await AsyncStorage.setItem("cuname", firstName);
    }
    getUserInfo();
  })

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.maindesign}>
          <View style={styles.profile}>
            <Image
              style={{ width: 100, height: 100, borderWidth: 2, 
              borderColor: "black", borderRadius: 100 * 2 }}
              //source={{uri: item.imgurl}}
              source={imgurl ? { uri: imgurl } : require("../../assets/imgavtar.jpg")}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 10 }}>{firstName}</Text>
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Dadu</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={{ padding: 10 }}>Name:</Text>
              <Text style={{ padding: 10 }}>Phone:</Text>
              <Text style={{ padding: 10 }}>Address:</Text>
              <Text style={{ padding: 10 }}>Email:</Text>
              <Text style={{ padding: 10 }}>Type:</Text>
            </View>

            <View>
              <Text style={{ padding: 10, fontWeight: 'bold' }}>{firstName}</Text>
              <Text style={{ padding: 10, fontWeight: 'bold' }}>{phone}</Text>
              <Text style={{ padding: 10, fontWeight: 'bold' }}>{addd}</Text>
              <Text style={{ padding: 10, fontWeight: 'bold' }}>{email}</Text>
              <Text style={{ padding: 10, fontWeight: 'bold' }}>Recipient</Text>
            </View>

          </View>

          <TouchableOpacity onPress={() => { DoUpdate() }}
            style={{ borderRadius: 8, backgroundColor: 'skyblue', margin: 30, alignItems: 'center' }}
          >
            <Text style={{ fontSize: 18, padding: 10, fontWeight: 'bold' }}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onSignoutPress()}
            style={{ borderRadius: 8, backgroundColor: 'darkred', margin: 30, alignItems: 'center' }}
          >
            <Text style={{ fontSize: 18, padding: 10, fontWeight: 'bold', color: 'white' }}>SignOut</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  )
}
export default N_Profile
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