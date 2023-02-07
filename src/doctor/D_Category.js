import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const D_Category = () => {

    const navigation = useNavigation();
    const categories = [
        {
            id: 0,
            img: 'https://img.icons8.com/external-icematte-lafs/512/external-Phusician-medical-menu-icematte-lafs.png',
            name: "Physician"
        },
        {
            id: 1,
            img: 'https://img.icons8.com/color/2x/brain--v1.png',
            name: "Brain"
        },
        {
            id: 2,
            img: 'https://img.icons8.com/color/2x/medical-heart.png',
            name: "Heart"
        },
        {
            id: 3,
            img: 'https://img.icons8.com/color/2x/lungs.png',
            name: "Lungs",
        },
        {
            id: 4,
            img: 'https://img.icons8.com/color/2x/liver.png',
            name: "Liver",
        },
        {
            id: 5,
            img: 'https://img.icons8.com/color/2x/throat.png',
            name: "Throat",
        },
        {
            id: 6,
            img: 'https://img.icons8.com/color/2x/broken-bone.png',
            name: "Bone",
        },

    ]

    const getcatname = (catname) => {
        navigation.navigate('CATDOC', { catname });
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                data={categories}
                keyExtractor={(key) => { return key.id }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                marginTop: 5, marginHorizontal: 12, padding: 5,
                                borderRadius: 8, elevation: 5, backgroundColor: 'white',
                                flexDirection: 'row', alignItems: 'center', marginBottom: 10
                            }}
                            onPress={() => { getcatname(item.name) }}>
                            <Image source={{ uri: item.img }} style={{ height: 50, width: 50 }} />
                            <Text style={{ marginLeft: 15, fontSize: 20, fontWeight: 'bold' }}>
                                {item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}
export default D_Category
const styles = StyleSheet.create({})