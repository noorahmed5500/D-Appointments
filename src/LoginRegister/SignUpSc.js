import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, 
    ScrollView, ActivityIndicator, Modal, Button } from 'react-native'

import React, {useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import SelectList from 'react-native-dropdown-select-list'
import { firebase } from "../../config";
import Icon from 'react-native-vector-icons/Ionicons';

const SignUpSc = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fname, setFName] = useState('')
    const [bgroup, setBGROUP] = useState('')
    const [address, setAdress] = useState('')
    const [phone, setPhone] = useState('')
    const [img, setImg] = useState('');
    const [act, setACT] = useState(false)
    const [notice, setNotice] = useState(true);

    //Blood Group Array list
    const [selected, setSelected] = useState('');
    const data = [
        { value: 'B+' },
        { value: 'A-' },
        { value: 'AB+' },
        { value: 'O+' },
    ];

    //Register Donnar
    const registerUser = async (email, password, fname, bgroup) => {
        try {
            //Authentication process
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            const currentUser = firebase.auth().currentUser;
            //Storing data into db process
            const db = firebase.firestore();
            db.collection("donnars")
                .doc(currentUser.uid)
                .set({
                    email: currentUser.email,
                    name: fname,
                    bloodGrourp: bgroup,
                    addr: address,
                    ph: phone,
                    imgurl: img
                });
            setACT(false)
            navigation.navigate('LoginScreen')
        } catch (err) {
            Alert.alert("There is something wrong!!!!", err.message);
            setACT(false)
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.main}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', 
                        fontVariant: ["small-caps"] }}>Donor SignUp</Text>

                        <TouchableOpacity onPress={() => { navigation.navigate('RegNeedy') }}>
                            <Text style={{
                                backgroundColor: 'white',
                                fontWeight: 'bold', color: 'darkred', textAlign: 'center', padding: 8,
                                borderRadius: 6, elevation: 12, fontSize: 16
                            }}>Recipient</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.inputlabel}>Name</Text>
                        <TextInput
                            placeholder='Your Name'
                            placeholderTextColor={'gray'}
                            style={styles.inputBox}
                            value={fname}
                            onChangeText={(fname) => setFName(fname)}
                        />

                        <Text style={styles.inputlabel}>Blood Group</Text>
                        <SelectList
                            onSelect={() => setBGROUP(selected)}
                            setSelected={setSelected}
                            data={data}
                            arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                            searchicon={<FontAwesome name="search" size={12} color={'black'} />}
                            search={false}
                            placeholder="Select Blood Group"
                        />

                        <Text style={styles.inputlabel}>Address</Text>
                        <TextInput
                            placeholder='Your Home Address'
                            placeholderTextColor={'gray'}
                            style={styles.inputBox}
                            value={address}
                            onChangeText={(address) => setAdress(address)}
                        />

                        <Text style={styles.inputlabel}>Phone</Text>
                        <TextInput
                            keyboardType="number-pad"
                            placeholder='Your Phone Number'
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
                        onPress={() => { registerUser(email, password, fname, bgroup),
                             setACT(true) }}>
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

            <Modal animationType="slide" visible={notice} transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        justifyContent: 'center', alignItems: 'center', height: 250,
                        width: 300, backgroundColor: 'white', borderRadius: 20, borderWidth: 1
                    }}>
                        <Icon name={'help-circle'} size={80} color="darkred" />
                        <Text
                            style={{ fontWeight: 'bold', fontSize: 25, textAlign: 'center' }}
                        >Do you know Who Can Donate?</Text>
                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 35 }}>
                            <TouchableOpacity onPress={() => { setNotice(false) }}
                                style={{ backgroundColor: "#004e92", flex: 1, marginRight: 8, 
                                borderRadius: 8 }}>
                                <Text style={{ color: 'white', textAlign: 'center', padding: 8, 
                                fontSize: 15, fontWeight: 'bold' }}>Yes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => { navigation.navigate('WCD'), setNotice(false) }}
                                style={{ backgroundColor: "darkred", flex: 1, borderRadius: 8 }}
                            >
                                <Text style={{ color: 'white', textAlign: 'center', padding: 5, 
                                fontSize: 15, fontWeight: 'bold' }}>No</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default SignUpSc

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        marginTop: 10,
        marginHorizontal: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        elevation: 30,
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
        flexDirection: 'row',
        justifyContent: 'center',
        width: "100%",
        backgroundColor: "darkred",
        borderWidth: 2,
        borderColor: "darkred",
        borderBottomLeftRadius: 5,
    }
})