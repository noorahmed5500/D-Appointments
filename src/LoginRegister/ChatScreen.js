import {
    Image, FlatList, StyleSheet, Text, TextInput,
    TouchableOpacity, View, Dimensions
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SendMessage, RecieveMessage, SendName, ReceiveName } from '../../Msg';
import { firebase } from "../../config";
import Icon from 'react-native-vector-icons/Ionicons';

const ChatScreen = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const UserName = route.params.nalo;
    const currentUid = firebase.auth().currentUser.uid;
    const guestUid = route.params.userid;
    const SenderNAME = route.params.sname;
    const [message, setMessage] = useState('');
    const [getmsgs, setGetMSGS] = useState([]);


    //It will retreive msgs form db
    useEffect(() => {
        try {
            firebase.database().
                ref('messages').
                child(currentUid).
                child(guestUid).
                on("value", (dataSnapshot) => {
                    let message = [];
                    dataSnapshot.forEach((data) => {
                        message.push({
                            sendBy: data.val().message.sender,
                            receiveBy: data.val().message.reciever,
                            msg: data.val().message.msg
                        });
                    })
                    setGetMSGS(message)
                    console.log(message)
                })

        } catch (error) {
            console.log(error)
        }
    }, []);

    //It will set msgs for sender & receiver in db
    const sendmsg = async () => {
        if (message) {
            SendMessage(currentUid, guestUid, message, UserName).
                then(() => {
                    setMessage('')
                }).catch((error) => {
                    alert(error)
                })

            RecieveMessage(currentUid, guestUid, message, UserName).
                then(() => {
                    setMessage('')
                }).catch((error) => {
                    alert(error)
                })

            SendName(currentUid, guestUid, UserName, message).
                then(() => {
                    console.log('name successfully added');
                }).catch((error) => {
                    alert(error)
                })

            ReceiveName(currentUid, guestUid, SenderNAME, message).
                then(() => {
                    console.log('name successfully added');
                }).catch((error) => {
                    alert(error)
                })

        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={{
                elevation: 10, flexDirection: 'row', backgroundColor: 'darkred',
                padding: 10, paddingVertical: 15, borderBottomWidth: 0.2
            }}>
                <TouchableOpacity style={{ marginRight: 30, alignSelf: 'flex-start' }} onPress={() => { navigation.goBack() }}>
                    <Icon name={'arrow-back'} size={25} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{UserName}</Text>
            </View>
            <FlatList

                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 60 }}
                data={getmsgs}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            marginVertical: 4, paddingHorizontal: 5,
                            maxWidth: Dimensions.get('window').width / 2 + 10,
                            alignSelf: currentUid === item.sendBy ? 'flex-end' : "flex-start"
                        }}>
                            <View style={{
                                borderTopRightRadius: 15, borderBottomEndRadius: 15,
                                borderBottomStartRadius: 15,
                                backgroundColor: currentUid === item.sendBy ? '#b22222' : "#a3c1ad"
                            }}>
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15, padding: 10 }}>{item.msg}</Text>
                            </View>

                        </View>
                    )
                }}
            />
            <View style={{
                padding: 5, backgroundColor: 'white', flexDirection: "row",
                position: 'absolute', bottom: 0, left: 0, right: 0
            }}>
                <TextInput
                    style={{ paddingHorizontal: 10, marginLeft: 2, flex: 1, fontSize: 15, 
                    borderRadius: 10, borderWidth: 1, borderColor: 'gray' }}
                    placeholder='Type message here'
                    value={message}
                    onChangeText={(txt) => { setMessage(txt) }}
                />

                <TouchableOpacity onPress={() => { sendmsg() }}>
                    <Image
                        source={require('../../assets/send.png')}
                        style={{ width: 45, height: 45, padding: 5 }}
                    />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})