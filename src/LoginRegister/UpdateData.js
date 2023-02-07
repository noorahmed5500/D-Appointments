import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from 'react-native'
import React, { useState } from 'react';
import { firebase } from '../../config';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

//This Screen only update the profile picture of User
const UpdateData = () => {

  const [image, setImage] = useState(null);
  const route = useRoute()
  const [Uploading, setUploading] = useState(false)
  const MyUID = route.params.currentUserUID;
  const DBname = route.params.typee;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    console.log(result);
    setImage(source)
  };

  const uploadImage = async () => {
    setUploading(true)
    const response = await fetch(image.uri)
    const blob = await response.blob()
    const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
    var ref = firebase.storage().ref(MyUID).child(filename).put(blob);
    firebase.firestore().collection(DBname).doc(MyUID).update({ imgurl: image.uri })
      .then(() => {
        Alert.alert('Photo Uploaded Successfully')
      })
    setUploading(false)
    setImage(null);

  }

  return (
    <View style={{ flex: 1, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar backgroundColor={"darkred"} />
      <TouchableOpacity
        style={{ margin: 10, borderRadius: 10, padding: 5, borderWidth: 1 }}
        onPress={() => { pickImage() }}>
        <Text>Choose Image</Text>
      </TouchableOpacity>
      <View>
        {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />}
        <TouchableOpacity
          style={{ margin: 10, borderRadius: 10, padding: 5, borderWidth: 1 }}
          onPress={() => { uploadImage() }}>
          <Text>Upload Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default UpdateData
const styles = StyleSheet.create({})