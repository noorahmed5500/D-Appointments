import { 
    ActivityIndicator, StyleSheet, Text, TextInput, View,
    TouchableOpacity, Alert, ScrollView } from 'react-native'

import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { firebase } from "../../config";


const SignupForNeedy = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fname, setFName] = useState('')
    const [address, setAdress] = useState('')
    const [phone, setPhone] = useState('')
    const [img, setImg] = useState('');
    const [act, setACT] = useState(false)

    //This function will authenticate user and save its data into firebase database
    const registerUser = async (email, password, fname, address, phone) => {
        try {
            //Authentication process
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            const currentUser = firebase.auth().currentUser;

            //Storing data into db process
            const db = firebase.firestore();
            db.collection("needy")
                .doc(currentUser.uid)
                .set({
                    email: currentUser.email,
                    name: fname,
                    addr: address,
                    ph: phone,
                    imgurl: img
                });
            //Whenever all processes done below functionality will move user to login Screen
            setACT(false)
            navigation.navigate('LoginScreen')
        } catch (err) {
            Alert.alert("There is something wrong!!!!", err.message);
            setACT(false)
        }
    }


    return (
        <View style={{ backgroundColor: 'white' }}>
            <ScrollView>
                <View style={styles.main}>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', 
                        fontVariant: ["small-caps"] }}>Recipient SignUp</Text>

                        <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
                            <Text style={{
                                backgroundColor: 'white',
                                fontWeight: 'bold', color: 'darkred', textAlign: 'center', padding: 8,
                                borderRadius: 6, elevation: 12, fontSize: 16
                            }}>Donor</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 10 }}>

                        <Text style={styles.inputlabel}>Name</Text>
                        <TextInput
                            placeholder='Your Name'
                            placeholderTextColor={'gray'}
                            style={styles.inputBox}
                            value={fname}
                            onChangeText={(fname) => setFName(fname)}
                        />

                        <Text style={styles.inputlabel}>Address</Text>
                        <TextInput
                            placeholder='Your home Address'
                            placeholderTextColor={'gray'}
                            style={styles.inputBox}
                            value={address}
                            onChangeText={(address) => setAdress(address)}
                        />

                        <Text style={styles.inputlabel}>Phone</Text>
                        <TextInput
                            placeholder='Phone'
                            placeholderTextColor={'gray'}
                            style={styles.inputBox}
                            value={phone}
                            onChangeText={(phone) => setPhone(phone)}
                        />

                        <Text style={styles.inputlabel}>Type Email</Text>
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor={'gray'}
                            style={styles.inputBox}
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                        />

                        <Text style={styles.inputlabel}>Password</Text>
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor={'gray'}
                            style={styles.inputBox}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>

                    <TouchableOpacity style={styles.upbtn} 
                        onPress={() => { registerUser(email, password, fname, 
                        address, phone), setACT(true) 
                    }}>
                        <Text style={{ fontSize: 18, padding: 10, fontWeight: 'bold', 
                        color: 'white' }}>Sign Up</Text>
                        {act ? <ActivityIndicator color={"white"} /> : null}
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', 
                    marginTop: 10, marginBottom: 20 }}>
                        <Text style={{ fontSize: 15 }}>Already Have an Account?</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen') }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5, color: "blue" }}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

export default SignupForNeedy;

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        marginTop: 10,
        marginHorizontal: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        elevation: 10,
    },
    inputBox: {
        width: "100%",
        padding: 10,
        fontSize: 18,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderTopRightRadius: 5,
        marginBottom: 8,
    },
    inputlabel: {
        marginTop: 10,
        fontSize: 14,
        paddingBottom: 3,
        color: 'black',
    },
    upbtn: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        backgroundColor: "darkred",
        borderWidth: 1,
        borderColor: "darkred",
        borderBottomLeftRadius: 5,
        elevation: 5
    }
})