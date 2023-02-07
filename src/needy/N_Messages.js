import {
  ActivityIndicator, FlatList, StyleSheet,
  Text, TouchableOpacity, View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { firebase } from '../../config';
import { useNavigation } from '@react-navigation/native';

//Needy Chats
const N_Messages = () => {
  const navigation = useNavigation();
  const [nalo, setNalo] = ('');
  const [userid, setUserId] = ('');
  const [roomid, setROOMID] = useState('');
  const [getusers, setGetUsers] = useState('')
  const currentUser = firebase.auth().currentUser.uid;

  //It will retrieve chats of current user
  useEffect(() => {
    try {
      firebase.database().ref('ulists/' + currentUser).
        once('value', function (snapshot) {
          const dta = [];
          snapshot.forEach((doc) => {
            const { idd, name, msg } = doc.val();
            dta.push({
              idd: doc.val().idd,
              name: doc.val().name,
              msg: doc.val().msg,
            })
          })
          console.log(dta)
          setROOMID(dta)
        });
    } catch (error) {
      console.log(error);
    }
  }, [])

  //It will redirect current user to chat screen for chatting
  const GoForChat = async (i, n) => {
    navigation.navigate('chat', { nalo: n, userid: i })//->nalo means name
  }

  return (
    <View>
      <FlatList
        data={roomid}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={{ marginTop: 8, marginBottom: 5, marginHorizontal: 8, 
                borderRadius: 8, borderWidth: 1, }}>

                <TouchableOpacity
                  onPress={() => { GoForChat(item.idd, item.name) }}
                  style={{ margin: 5, padding: 5 }}
                >
                  <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 5 }}>{item.name}</Text>

                </TouchableOpacity>


              </View>
            </View>
          )
        }}

      />
    </View>
  )
}

export default N_Messages

const styles = StyleSheet.create({})