import {
  FlatList, Modal, StyleSheet, Text, Image,
  TouchableOpacity, View, Linking, TextInput
} from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';


//List of Donnars Component
const N_ListDonnars = () => {
  const navigation = useNavigation();
  const [vmodal, setVModal] = useState(false);
  const [nalo, setNalo] = useState('');//-> nalo means name
  const [bgg, setBg] = useState('');//-> bg means bloodgroup
  const [ad, setAD] = useState('');
  const [num, setNUM] = useState('');
  const [userid, setUserId] = useState('');
  const [sname, setSName] = useState('');
  const myid = firebase.auth().currentUser.uid;

  //It will redirect user to phonetab for call
  const docall = () => {
    Linking.openURL(`tel:${num}`)
  }

  //It will take&set particular donors details
  const modal = (i, n, bg, add, mobi) => {
    console.log(i, "|", n, "|", bg, "|", add, "|", mobi, myid)
    setUserId(i)
    setNalo(n)
    setBg(bg)
    setNUM(mobi)
    setAD(add)
    setVModal(true)
  }

  //Here We will get All donors Details
  const [users, setUsers] = useState([])
  const MyInfo = firebase.firestore().collection('donnars')
  useEffect(() => {
    async function Takedata() {
      const temname = await AsyncStorage.getItem("cuname");
      setSName(temname);
      MyInfo
        .onSnapshot(
          querySnapshot => {
            const users = [];
            querySnapshot.forEach((doc) => {
              const { name, bloodGrourp, addr, email, ph } = doc.data()
              users.push({
                id: doc.id,
                name,
                bloodGrourp,
                addr,
                ph,
                email,
              })
            })
            setUsers(users)
          })

    }
    Takedata();
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <FlatList
        data={users}
        keyExtractor={(item) => { return item.id }}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={styles.maincontainer}>
                <TouchableOpacity
                  onPress={() => { modal(item.id, item.name, item.bloodGrourp, item.addr, item.ph) }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, padding: 10 }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                    </View>
                    <View style={{
                      padding: 10, borderWidth: 1, borderColor: 'darkred', borderLeftColor: 'white',
                      backgroundColor: 'darkred', borderBottomRightRadius: 8, borderTopRightRadius: 8, 
                      width: 70, alignItems: 'center'
                    }}>
                      <Text style=
                        {{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{item.bloodGrourp}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      />
      <Modal
        animationType="slide"
        visible={vmodal}
        transparent={true}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{
            width: 300, backgroundColor: 'white', marginHorizontal: 20,
            borderRadius: 10, elevation: 10,
          }}>
            <View style={{
              borderRadius: 10, borderColor: 'white', backgroundColor: 'white',
              paddingHorizontal: 8
            }}>

              <TouchableOpacity
                onPress={() => { setVModal(false) }}
                style={{ alignSelf: 'flex-end' }}>
                <Text style={{ padding: 8, fontSize: 18, fontWeight: 'bold' }}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
              <Image source={require('../../assets/imgavtar.jpg')}
                style={{ margin: 10, height: 100, width: 100, borderRadius: 2 * 100 }}
              />
              <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 5 }}>{nalo}</Text>

              <View style={{
                marginBottom: 15, marginTop: 10, backgroundColor: "white",
                flexDirection: 'row'
              }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('chat', { nalo, userid, myid, sname }),
                    setVModal(false)
                  }}
                  style={{
                    backgroundColor: 'white', color: 'white',
                    padding: 8, borderRadius: 5, elevation: 10
                  }}>
                  <Text style={{ paddingHorizontal: 20, fontSize: 16, fontWeight: 'bold' }}>Message</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => { docall() }}
                  style={{
                    marginLeft: 5, backgroundColor: 'maroon', color: 'white',
                    padding: 8, borderRadius: 5, elevation: 10
                  }}>
                  <Text style={{
                    color: 'white', paddingHorizontal: 25, fontSize: 16,
                    fontWeight: 'bold'
                  }}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{
              borderWidth: 0.5, borderColor: 'gray',
              marginHorizontal: 10
            }}>
            </View>

            <View style={{ padding: 10 }}>
              <Text style={{ paddingVertical: 4, fontSize: 16, color: 'gray' }}>Blood Group:</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'darkred' }}>| </Text>
                {bgg}</Text>
              <Text style={{ paddingVertical: 4, fontSize: 16, color: 'gray' }}>Phone Number:</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'darkred' }}>| </Text>
                {num}</Text>
              <Text style={{ paddingVertical: 4, fontSize: 16, color: 'gray' }}>Address:</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'darkred' }}>| </Text>
                {ad}</Text>
            </View>
          </View>

        </View>
      </Modal>
    </View>
  )
}

export default N_ListDonnars

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 4,
  }
})