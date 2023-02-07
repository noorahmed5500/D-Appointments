import {
  ActivityIndicator, StatusBar, StyleSheet, Text,
  Image, TextInput, TouchableOpacity, View, Alert
} from 'react-native'

import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from "../../config";

const LoginSc = () => {
  const [hact, setHACT] = useState(false); //For Activity Indicator
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Login Process
  const loginuser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      console.log("successfully loggedIn")
      const currentUserUID = firebase.auth().currentUser.uid
      const doc = await firebase
        .firestore()
        .collection('donnars')
        .doc(currentUserUID)
        .get();

      //This process check that in which collection user exists
      if (!doc.exists) {
        console.log('No user data found from donnar table!, Now go to needy table')
        setEmail('')
        setPassword('')
        setHACT(false)
        navigation.navigate('NMContainer')// ->Needy Main Container
      } else {
        console.log("We are going to donnar table")
        setEmail('')
        setPassword('')
        setHACT(false)
        navigation.navigate('MContainer')// ->Donnar Container
      }

    } catch (error) {
      Alert.alert(error.message);
      setHACT(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor={'darkred'} />
      <View style={styles.loginmain}>

        <Image
          source={require('../../assets/maleuser.png')}
          style={{ alignSelf: 'center', height: 70, width: 70 }}
        />
        <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 25, fontWeight: 'bold', 
        fontVariant: ["small-caps"] }}>Login</Text>

        <View style={styles.fieldstyle}>

          <TextInput style={styles.textinputstyle}
            blurOnSubmit={true}
            placeholder='Email'
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />


          <TextInput secureTextEntry={true} placeholder='Password' textContentType="password"
            blurOnSubmit={true}
            style={styles.textinputstyle}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />

        </View>

        <TouchableOpacity style={styles.btn}
          onPress={() => { loginuser(email, password), setHACT(true) }}>
          <Text style={{ fontSize: 18, padding: 10, fontWeight: 'bold', color: 'white' }}>LogIn</Text>
          {hact ? <ActivityIndicator color={"white"} /> : null}
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 15 }}>Haven't Account?</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
            <Text style={{ fontSize: 15, paddingLeft: 5, color: "blue" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>


      </View>


    </View>
  )
}


const styles = StyleSheet.create({
  loginmain: {
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    elevation: 25,
  },
  fieldstyle: {
    marginTop: 15,
    paddingVertical: 10,
  },
  textinputstyle: {
    width: "100%",
    padding: 10,
    fontSize: 18,
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    marginBottom: 20,
    elevation: 15
  },
  btn: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    width: "100%",
    backgroundColor: "darkred",
    borderWidth: 2,
    borderColor: "darkred",
    borderTopLeftRadius: 5,
  }
})

export default LoginSc

