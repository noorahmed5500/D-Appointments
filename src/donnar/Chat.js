import {
  ActivityIndicator, FlatList, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../config';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
  const navigation = useNavigation()
  const [roomid, setROOMID] = useState([]);
  const currentUser = firebase.auth().currentUser.uid;

  useEffect(() => {
    try {
      firebase.database().ref('ulists/' + currentUser).
        once('value', function (snapshot) {
          console.log(snapshot.key);
          const dta = [];
          snapshot.forEach((doc) => {
            const { keyy, idd, name, msg } = doc.val();
            dta.push({
              keyy: doc.val().idd,
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

  const PUser = async (i, n) => {
    console.log(i, "   |   ", n);
    navigation.navigate('chat', { nalo: n, userid: i })
  }

  return (
    <View>
      <FlatList
        data={roomid}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={{
                marginTop: 8, marginBottom: 5, marginHorizontal: 8,
                borderRadius: 8, borderWidth: 1,
              }}>
                <TouchableOpacity
                  onPress={() => { PUser(item.keyy, item.name) }}
                  style={{ margin: 5, padding: 5 }}>
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
export default Chat
const styles = StyleSheet.create({})