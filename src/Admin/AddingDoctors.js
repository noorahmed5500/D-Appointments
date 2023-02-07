import {
  ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, View
} from 'react-native'
import React, { useState } from 'react'
import { firebase } from "../../config";
import { FontAwesome } from '@expo/vector-icons';
import SelectList from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native';

//Adding Doctors | Admin
const AddDoctor = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [cat, setCat] = useState('');
  const [days, setDays] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAdd] = useState('');
  const [city, setCity] = useState('');
  let [lati, setLati] = useState(0.0);
  let [longi, setLongi] = useState(0.0);
  let [rate, setRate] = useState(0.0);
  const [imge, setImge] = useState('')


  //List of Doctors Category
  const [selected, setSelected] = useState('');
  const data = [
    { value: 'Physician' },
    { value: 'Brain' },
    { value: 'Heart' },
    { value: 'Lungs' },
    { value: 'Liver' },
    { value: 'Throat' },
    { value: 'Bone' },
  ];

  //List of Cities
  const [cityselected, setCitySelected] = useState('');
  const cities = [
    { value: 'Dadu' },
    { value: 'Bhan' },
    { value: 'Johi' },
    { value: 'K.N Shah' },
  ];

  //Adding Doctor to DB
  const Registerdoc = async () => {
    const db = firebase.firestore();
    db.collection("doctors").doc()
      .set({
        name: name, category: cat, days: days, time: time, phone: phone, latitude: lati,
        longitude: longi, rating: rate, imgUrl: imge, city: city, address: address
      }).then(() => {
        alert('Doctors data successfully added')
        console.log('data successfully added');
      }).catch((error) => console.log(error))
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text style={{ alignSelf: 'center', fontSize: 18, padding: 20, 
        fontWeight: 'bold' }}>ADD Doctors Data</Text>
        <View>
          <TextInput placeholder='Name' style={{ margin: 15, borderBottomWidth: 1 }}
            value={name}
            onChangeText={(txt) => { setName(txt) }}
          />
          <SelectList
            onSelect={() => setCat(selected)}
            setSelected={setSelected}
            data={data}
            arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
            searchicon={<FontAwesome name="search" size={12} color={'black'} />}
            search={false}
            placeholder="Choose Category"
          />
          <TextInput placeholder='Days' style={{ margin: 15, borderBottomWidth: 1 }}
            value={days}
            onChangeText={(txt) => { setDays(txt) }}
          />
          <SelectList
            onSelect={() => setCity(cityselected)}
            setSelected={setCitySelected}
            data={cities}
            arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
            searchicon={<FontAwesome name="search" size={12} color={'black'} />}
            search={false}
            placeholder="Choose Your City"
          />
          <TextInput placeholder='Address' style={{ margin: 15, borderBottomWidth: 1 }}
            value={address}
            onChangeText={(txt) => { setAdd(txt) }}
          />
          <TextInput placeholder='Time' style={{ margin: 15, borderBottomWidth: 1 }}
            value={time}
            onChangeText={(txt) => { setTime(txt) }}
          />
          <TextInput placeholder='Phone' style={{ margin: 15, borderBottomWidth: 1 }}
            value={phone}
            onChangeText={(txt) => { setPhone(txt) }}
          />
          <TextInput placeholder='latitude' style={{ margin: 15, borderBottomWidth: 1 }}
            value={lati}
            onChangeText={(txt) => { setLati(txt) }}
          />
          <TextInput placeholder='longitude' style={{ margin: 15, borderBottomWidth: 1 }}
            value={longi}
            onChangeText={(txt) => { setLongi(txt) }}
          />
          <TouchableOpacity
            onPress={() => { Registerdoc() }}
            style={{
              alignSelf: 'center', backgroundColor: 'skyblue'
              , borderRadius: 12, padding: 15
              , width: 150, justifyContent: 'center', alignItems: 'center'
            }}>
            <Text>Add Doctor</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
export default AddDoctor;
const styles = StyleSheet.create({})