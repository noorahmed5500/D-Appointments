import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Animated, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
    const navigation = useNavigation();
    //for Doctors Animation
    const doctor = new Animated.ValueXY({ x: 80, y: 0 });
    Animated.timing(doctor, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        duration: 1000
    }).start();

    //for Donation Animation
    const donation = new Animated.ValueXY({ x: 0, y: 80 });
    Animated.timing(donation, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        duration: 1000
    }).start();


    //for Naasa Animation
    const naasa = new Animated.ValueXY({ x: 0, y: 80 });
    Animated.timing(naasa, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        duration: 1000
    }).start();

    const checkk = () => {
        navigation.navigate('LoginScreen');
    }

    return (
        <View style={styles.main}>
            <View style={{ alignItems: 'center' }}>

                <Text style={{
                    fontSize: 30, marginTop: 20, marginBottom: 25,
                    fontWeight: 'bold', color: "red"
                }}>
                    D-Appointments
                </Text>

            </View>
            <View>

                <Animated.View style={{
                    transform: [
                        { translateX: doctor.x },
                        { translateY: doctor.y }
                    ]
                }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row', elevation: 18, marginHorizontal: 18,
                            backgroundColor: 'white', borderRadius: 15
                        }}
                        onPress={() => { navigation.navigate('NC') }}>

                        <View style={{ flex: 1, marginHorizontal: 5, padding: 10, justifyContent: 'center' }}>
                            <Text style={{ color: '#004e92', fontSize: 25, fontWeight: 'bold' }}>Doctors</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Time</Text>
                        </View>
                        <Image
                            resizeMode='contain'
                            style={{ width: 100, height: 100, marginRight: 4 }}
                            //source={{uri: item.imgurl}}
                            source={require("../../assets/doc.png")}
                        />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={{
                    transform: [
                        { translateX: donation.x },
                        { translateY: donation.y }
                    ]
                }}>
                    <TouchableOpacity
                        style={{
                            marginTop: 18, flexDirection: 'row', elevation: 18,
                            marginHorizontal: 18, backgroundColor: 'white', borderRadius: 15
                        }}
                        onPress={() => { checkk() }}>

                        <View style={{ flex: 1, marginHorizontal: 5, padding: 10, justifyContent: 'center' }}>
                            <Text style={{ color: 'darkred', fontSize: 25, fontWeight: 'bold' }}>Blood</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Donation</Text>
                        </View>
                        <Image
                            resizeMode='contain'
                            style={{ width: 100, height: 100, marginRight: 4 }}
                            //source={{uri: item.imgurl}}
                            source={require("../../assets/blood.png")}
                        />
                    </TouchableOpacity>

                </Animated.View>

            </View>




            <Animated.View style={{
                transform: [
                    { translateX: donation.x },
                    { translateY: donation.y }
                ]
                , position: 'absolute', bottom: 0, right: 0,
                backgroundColor: '#004e92', borderTopLeftRadius: 15, padding: 5
            }}>
                <TouchableOpacity onPress={() => { navigation.navigate('ADMIN') }}>
                    <Text style={{
                        textAlign: 'center', paddingBottom: 1, color: 'white',
                        fontSize: 10, fontWeight: 'bold', padding: 2
                    }}>BY:  NAASA</Text>
                </TouchableOpacity>

            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default MainScreen
