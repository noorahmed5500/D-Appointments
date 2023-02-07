import {
    Image, StyleSheet, Text, View, Linking, TouchableOpacity, ScrollView,
    Modal, TextInput, ToastAndroid, FlatList
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from "../../config";
import { RatingComments } from '../../Msg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

//Doctor Profile + Rating Modal
const GettinData = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const docid = route.params.id;
    const [patientId, setPatientId] = useState('');
    const [pname, setPName] = useState('');
    const [comModal, setComM] = useState(false)
    let currentRate = route.params.rating;
    const [openthis, setOpen] = useState(false);
    let [getUserRate, setUserRate] = useState(0.0);
    let [updatedRate, setUpdatedRate] = useState(0.0)
    let NewRating = 0.0;
    const [commnt, setCommnt] = useState('');
    const [retrieveCom, setRetrieveCom] = useState([]);

    //Rating Funtionality
    const [S1color, setCOLOR1] = useState("star-outline");
    const [S2color, setCOLOR2] = useState("star-outline");
    const [S3color, setCOLOR3] = useState("star-outline");
    const [S4color, setCOLOR4] = useState("star-outline");
    const [S5color, setCOLOR5] = useState("star-outline");
    const [pcolor, setPColor] = useState("black");
    const [performnce, setPerform] = useState("");
    const ManageRating = (v) => {
        console.log(v);
        setUserRate(v)
    }

    //This function take phone number for call
    const mydetail = () => {
        Linking.openURL(`tel:${route.params.phone}`)
    }

    //Retrieving All Feedbacks
    useEffect(() => {
        try {
            firebase.database().ref('Comments/' + docid).
                once('value', function (snapshot) {
                    //console.log(snapshot);
                    const dta = [];
                    snapshot.forEach((doc) => {
                        const { name, rat, fword } = doc.val();
                        dta.push({
                            name: doc.val().name,
                            rat: doc.val().rating,
                            fword: doc.val().words,
                        })
                    })
                    console.log(dta)
                    setRetrieveCom(dta)
                });
        } catch (error) {
            console.log(error);
        }
    }, [])

    //Get currentUser's id.. for checking either user loggedIn or not
    const getId = async () => {
        const userID = await AsyncStorage.getItem('myid');
        const username = await AsyncStorage.getItem('cuname');
        console.log(userID)
        if (userID) {
            console.log(userID, "  | ", username)
            setPatientId(userID)
            setPName(username)
            console.log(getUserRate);
            return setOpen(true)
        }
        else {
            ToastAndroid.show(
                "You are not Logged In",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            navigation.navigate('LoginScreen')
        }
    }
    //Submit Feedback
    const submit = () => {
        if (commnt === '') {
            alert("Please write something about doctor...!")
            ToastAndroid.show(
                "Please write something about doctor...!",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        } else {
            let c = parseFloat(currentRate);
            let g = parseFloat(getUserRate);
            if (currentRate === 0) {
                if (g === 1) {
                    g = 1.0
                }
                if (g === 2) {
                    g = 2.0
                }
                if (g === 3) {
                    g = 3.0
                }
                if (g === 4) {
                    g = 4.0
                }
                if (g > 5) {
                    g = 5.0
                }
                console.log('IF Run')
                const db = firebase.firestore();
                const citiesRef = db.collection('doctors');
                citiesRef.doc(route.params.id).update({ rating: g })
                    .then(() => {
                        RatingComments(docid, patientId, pname, g, commnt)
                        console.log("Thanks for giving us Rating");
                        setOpen(false)
                    })
                    .catch((err) => { alert(err) })
            }
            else {
                console.log('ELSE Run', docid)
                NewRating = g + c / 5
                if (NewRating == 1) {
                    NewRating = 1.0
                }
                if (NewRating == 2) {
                    NewRating = 2.0
                }
                if (NewRating == 3) {
                    NewRating = 3.0
                }
                if (NewRating == 4) {
                    NewRating = 4.0
                }
                if (NewRating > 5) {
                    NewRating = 5.0
                }
                NewRating = NewRating.toFixed(1)
                console.log('final value:', NewRating);
                let finalRating = parseFloat(NewRating);
                console.log(typeof (finalRating));
                const db = firebase.firestore();
                const citiesRef = db.collection('doctors');
                citiesRef.doc(route.params.id).update({ rating: finalRating })
                    .then(() => {
                        RatingComments(docid, patientId, pname, g, commnt)
                        console.log("Thanks for giving us Rating");
                        setOpen(false)
                        alert('Thanks for Rating...!')
                    })
                    .catch((err) => { alert(err) })
            }

        }

    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                <View>
                    <View style={Styles.profile}>
                        <Image
                            style={{
                                width: 80, height: 80, borderWidth: 2,
                                borderColor: "black", borderRadius: 80 * 2
                            }}
                            source={require("../../assets/imgavtar.jpg")}
                        />
                        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 10 }}>
                            {route.params.name}</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => { getId(), console.log(docid) }}>
                            <Image
                                source={require('../../assets/star.png')}
                                style={{ width: 25, height: 25 }}
                            />
                            <Text style={{ marginLeft: 2, fontSize: 20, fontWeight: 'bold' }}>
                                {route.params.rating}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '50%', marginTop: 15, borderColor: 'gray', borderRadius: 8,
                                elevation: 10
                            }}
                            onPress={() => { mydetail() }}>
                            <Text style={Styles.callbtn}>Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={Styles.detailhead}>
                    <View style={Styles.profilebtns2}>
                        <Text style={{
                            fontSize: 18, color: 'white', padding: 10,
                            fontWeight: 'bold'
                        }}>Details: </Text>
                    </View>
                    <View style={Styles.content}>
                        <Text style={Styles.txttitle}>Days:</Text>
                        <Text style={Styles.textdesign}>{route.params.days}</Text>
                        <Text style={Styles.txttitle}>Time:</Text>
                        <Text style={Styles.textdesign}>{route.params.time}</Text>
                        <Text style={Styles.txttitle}>City:</Text>
                        <Text style={Styles.textdesign}>{route.params.city}</Text>
                        <Text style={Styles.txttitle}>Rating:</Text>
                        <Text style={Styles.textdesign}>{route.params.rating}</Text>
                        <Text style={Styles.txttitle}>Category:</Text>
                        <Text style={Styles.textdesign}>{route.params.category}</Text>
                        <Text style={Styles.txttitle}>Address:</Text>
                        <Text style={Styles.textdesign}>{route.params.address}</Text>
                    </View>
                </View>
                <View style={Styles.mapstyle}>
                    <View style={Styles.profilebtns2}>
                        <Text style={{
                            fontSize: 18, color: 'white', padding: 10,
                            fontWeight: 'bold'
                        }}>Map Location </Text>
                    </View>
                    <View style={{ marginHorizontal: 5, marginTop: 5 }}>
                        <TouchableOpacity onPress={() => {
                            const name = route.params.name;
                            const latitude = route.params.latitude;
                            const longitude = route.params.longitude;
                            navigation.navigate("Map", { name, latitude, longitude });
                        }}>

                            <Image source={require("../../assets/map.jpg")}
                                resizeMode={"cover"}
                                style={{ height: 300, width: "100%", borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
                            />
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={Styles.mapstyle}>
                    <TouchableOpacity
                        onPress={() => { setComM(true) }}
                        style={{
                            backgroundColor: "#004e92", borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                        }}>

                        <Text style={{
                            fontSize: 18, color: 'white'
                            , padding: 10, fontWeight: 'bold',
                        }}>
                            Comments</Text>

                    </TouchableOpacity>
                </View>

            </ScrollView>
            <Modal visible={openthis} animationType={'fade'} transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        width: 300, backgroundColor: 'white', borderWidth: 1, borderColor: 'blue', borderRadius: 15,
                        padding: 10, justifyContent: 'center', alignItems: 'center'
                    }}>

                        <TouchableOpacity onPress={() => { setOpen(false) }} style={{ alignSelf: 'flex-end' }}>
                            <Icon name={'close-circle'} size={25} color="black" />
                        </TouchableOpacity>

                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Rate Us</Text>
                        <Text
                            style={{
                                marginTop: 10, fontWeight: 'bold', fontSize: 25, padding: 5,
                                margin: 10, textAlign: 'center', color: pcolor
                            }}
                        >{performnce}</Text>

                        <View style={{ marginTop: 15, flexDirection: 'row' }}>

                            <TouchableOpacity
                                onPress={() => {
                                    setCOLOR1("star")
                                    setPerform('Poor')
                                    setPColor("#E40302")
                                    ManageRating(1)
                                    if (S1color === 'star') {
                                        setCOLOR1("star-outline")
                                        setCOLOR2("star-outline")
                                        setCOLOR3("star-outline")
                                        setCOLOR4("star-outline")
                                        setCOLOR5("star-outline")
                                        setPerform('')
                                        setPColor("")
                                        ManageRating(0)
                                    }
                                }}
                                style={{ marginRight: 2 }}
                            >
                                <Icon name={S1color} size={35} color="#FFDF00" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setCOLOR1("star")
                                    setCOLOR2("star")
                                    setPerform('Fair')
                                    setPColor("#E44C02")
                                    ManageRating(2)
                                    if (S2color === 'star') {
                                        setCOLOR2("star-outline")
                                        setCOLOR3("star-outline")
                                        setCOLOR4("star-outline")
                                        setCOLOR5("star-outline")
                                        setPerform('Poor')
                                        setPColor("#E40302")
                                        ManageRating(1)
                                    }
                                }}
                                style={{ marginRight: 5 }}
                            >
                                <Icon name={S2color} size={35} color="#FFDF00" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setCOLOR1("star")
                                    setCOLOR2("star")
                                    setCOLOR3("star")
                                    setPerform('Good')
                                    setPColor("#00B704")
                                    ManageRating(3)
                                    if (S3color === 'star') {
                                        setCOLOR3("star-outline")
                                        setCOLOR4("star-outline")
                                        setCOLOR5("star-outline")
                                        setPerform('Fair')
                                        setPColor("#E44C02")
                                        ManageRating(2)
                                    }
                                }}
                                style={{ marginRight: 5 }}
                            >
                                <Icon name={S3color} size={35} color="#FFDF00" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setCOLOR1("star")
                                    setCOLOR2("star")
                                    setCOLOR3("star")
                                    setCOLOR4("star")
                                    setPerform('Very Good')
                                    setPColor("#5F0098")
                                    ManageRating(4)
                                    if (S4color === 'star') {
                                        setCOLOR4("star-outline")
                                        setCOLOR5("star-outline")
                                        setPerform('Good')
                                        setPColor("#00B704")
                                        ManageRating(3)
                                    }
                                }}
                                style={{ marginRight: 5 }}
                            >
                                <Icon name={S4color} size={35} color="#FFDF00" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setCOLOR1("star")
                                    setCOLOR2("star")
                                    setCOLOR3("star")
                                    setCOLOR4("star")
                                    setCOLOR5("star")
                                    setPerform('Excellent')
                                    setPColor("#F50089")
                                    ManageRating(5)
                                    if (S5color === 'star') {
                                        setCOLOR5("star-outline")
                                        setPerform('Very Good')
                                        setPColor("#5F0098")
                                        ManageRating(4)
                                    }
                                }}
                            >
                                <Icon name={S5color} size={35} color="#FFDF00" />
                            </TouchableOpacity>
                        </View>

                        <Text
                            style={{ fontWeight: 'bold', fontSize: 20, padding: 10, margin: 10, borderBottomWidth: 1, borderBottomColor: "red", textAlign: 'center' }}
                        >Rating: {getUserRate}/5</Text>

                        <TextInput
                            multiline
                            maxLength={50}
                            style={{ borderBottomWidth: 1, height: 100, width: 180, marginTop: 15, marginBottom: 10 }}
                            placeholder='Write few words about doctor...'
                            value={commnt}
                            onChangeText={(txt) => { setCommnt(txt) }}
                        />

                        <TouchableOpacity
                            onPress={() => { submit() }}
                            style={{
                                fontSize: 20, padding: 10, margin: 10, borderWidth: 1, borderColor: 'blue',
                                borderRadius: 10
                            }}
                        >
                            <Text>Submit</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={comModal}>
                <View style={{
                    flex: 1, backgroundColor: 'white', marginTop: 150,
                    borderTopEndRadius: 10, borderTopStartRadius: 10
                }}>

                    <TouchableOpacity
                        onPress={() => { setComM(true) }}
                        style={{
                            backgroundColor: "#004e92", borderTopLeftRadius: 10, padding: 5,
                            borderTopRightRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center'
                        }}>

                        <Text style={{
                            flex: 1, fontSize: 20, color: 'white'
                            , padding: 10, fontWeight: 'bold',
                        }}>
                            Comments</Text>
                        <TouchableOpacity
                            style={{ marginRight: 15 }}
                            onPress={() => { setComM(false) }}>
                            <Icon name={"caret-down"} size={20} color="white" />
                        </TouchableOpacity>



                    </TouchableOpacity>

                    <FlatList
                        data={retrieveCom}
                        renderItem={({ item }) => {
                            return (

                                <View style={{
                                    borderRadius: 5, backgroundColor: 'white', marginHorizontal: 5,
                                    marginTop: 5, marginBottom: 8, padding: 5, borderBottomWidth: 1,
                                    borderBottomLeftRadius: 5,
                                    borderBottomRightRadius: 5,
                                    borderBottomColor: 'gray'
                                }}>
                                    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                                        <Text style={{ flex: 1, fontWeight: 'bold', color: 'gray' }}>{item.name}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon name={'star'} size={15} color="#FFDF00" />
                                            <Text style={{ fontWeight: 'bold' }}>{item.rat}</Text>
                                        </View>

                                    </View>
                                    <Text>{item.fword}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </Modal>

        </View>
    );
};

const Styles = StyleSheet.create({
    profile: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: 80,
        elevation: 8
    },
    profilebtns: {
        flexDirection: 'row',
        backgroundColor: "#004e92",
        height: 60,
        padding: 14,
        marginBottom: 5,
    },
    profilebtns2: {
        alignItems: 'flex-start',
        backgroundColor: "#004e92",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        elevation: 40
    },
    detailhead: {
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: "white",
        elevation: 25
    },
    detailchild: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    content: {
        padding: 10,
    },
    txttitle: {
        fontWeight: 'bold', color: 'gray', fontSize: 12
    },
    btnstyle: {
        marginTop: 20,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        backgroundColor: "white",
    },
    textdesign: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingRight: 10,
        paddingBottom: 15,
    },
    callbtn: {
        padding: 8,
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 10,
        backgroundColor: 'white',
        textAlign: 'center',
    },
    mapstyle: {
        marginTop: 20,
        paddingBottom: 5,
        marginBottom: 5,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 30,
        backgroundColor: 'white'
    }
})
export default GettinData;