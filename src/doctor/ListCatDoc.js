import {
    FlatList, StyleSheet, Text, View,
    TouchableOpacity, Image
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { firebase } from '../../config';

//Categorywise Doctors name
const ListCatDoc = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const getname = route.params.catname;
    const [watal, setdat] = useState([]);

    //Here we are getting data related to a particular category & Orderby rating 
    useEffect(() => {
        async function gettingdata11() {
            const db = firebase.firestore();
            const citiesRef = db.collection('doctors');
            const snapshot = await citiesRef.orderBy('rating', 'desc')
                .where('category', '==', getname).get();
            if (snapshot.empty) {
                console.log('No matching documents.');
                alert("No Data Found about this Category..!")
                return;
            }
            const doctors = [];
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data())
                const { id, name, category, days, time, phone, imgUrl, rating, latitude, longitude, city, address } = doc.data()
                doctors.push({
                    id: doc.id, name, time, days, latitude, longitude, phone, imgUrl, rating, category,
                    address, city
                })
                setdat(doctors)
            })
        }
        gettingdata11();
    }, [])

    //Getting data for profile screen
    const getData = (id, name, category, days, time, city, address, phone, rating, latitude, longitude, imgUrl) => {
        console.log({ id, name, category, days, time, city, address, phone, rating, latitude, longitude, imgUrl });
        navigation.navigate('Dashboard', {
            id, name, category, days, time, city, address,
            phone, rating, latitude, longitude, imgUrl
        });
    }
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
                data={watal}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                marginTop: 10, borderRadius: 8, marginHorizontal: 10
                                , elevation: 5, backgroundColor: 'white', alignItems: 'center',
                                padding: 5, marginBottom: 5
                            }}
                            onPress={() => {
                                getData(item.id, item.name, item.category, item.days,
                                    item.time, item.city, item.address, item.phone,
                                    item.rating, item.latitude, item.longitude, item.imgUrl)
                            }}>
                            <View style={{
                                alignItems: 'center',
                                flexDirection: "row",
                                paddingVertical: 5, paddingHorizontal: 5
                            }}>
                                <Image
                                    source={require('../../assets/imgavtar.jpg')}
                                    style={{
                                        width: 50, height: 50, borderWidth: 1, borderColor: 'gray',
                                        borderRadius: 25, padding: 2
                                    }}
                                />
                                <Text style={{
                                    marginLeft: 8, flex: 1, fontSize: 20,
                                    fontWeight: 'bold'
                                }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={require('../../assets/star.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.rating}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }} />
        </View>
    )
}
export default ListCatDoc
const styles = StyleSheet.create({})
