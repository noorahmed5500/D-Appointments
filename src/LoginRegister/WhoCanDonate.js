import { StyleSheet, Text, View, Image, ScrollView, 
  TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const WhoCanDonate = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor={'darkred'} barStyle={'default'} />
      <View style={{
        backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
        borderBottomRightRadius: 20, borderBottomLeftRadius: 20, elevation: 10

      }}>
        <Image
          source={require('../../assets/wcd.png')}
          resizeMode='contain'
          style={{ marginTop: 30, height: 120, width: 200 }}
        />
        <Text
          style={{ fontSize: 22, fontWeight: 'bold', padding: 20 }}
        >Who Can Donate?</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 15, marginTop: 10, marginBottom: 15 }}>
          <Text style={styles.normaltxt}>
            Blood donation is a safe and simple process that can save lives.
            However, not everyone is eligible to donate blood. To ensure the
            safety of both donors and recipients, certain criteria must be met
            before donating.
          </Text>

          <Text style={styles.titletxt}>Age:</Text>
          <Text style={styles.normaltxt}>
            In most countries, you must be at least 17 years old
            to donate blood. Some countries require a minimum age of 18.
          </Text>

          <Text style={styles.titletxt}>Weight:</Text>
          <Text style={styles.normaltxt}>
            You must weight at least 50 kg (110 lbs) to donate blood.
          </Text>

          <Text style={styles.titletxt}>Medical Conditions:</Text>
          <Text style={styles.normaltxt}>
            Certain medical conditions can disqualify you from donating blood.
            These include, but are not limited to:
            <View>
              <Text style={styles.normaltxt}>- Active cancer</Text>
              <Text style={styles.normaltxt}>- HIV or AIDS</Text>
              <Text style={styles.normaltxt}>- Hepatitis B or C</Text>
              <Text style={styles.normaltxt}>- Recent surgery</Text>
              <Text style={styles.normaltxt}>- Pregnancy</Text>
              <Text style={styles.normaltxt}>- Recent heart attack or stroke</Text>
              <Text style={styles.normaltxt}>- Recent travel to certain countries</Text>
            </View>
          </Text>


          <Text style={styles.titletxt}>Restrictions:</Text>
          <Text style={styles.normaltxt}>
            Some groups may have additional restrictions on blood donation. These include:
          </Text>
          <Text style={styles.normaltxt}>- Pregnant Women</Text>
          <Text style={styles.normaltxt}>- The frequency of donation every 3-12 months</Text>
          <Text style={styles.normaltxt}>- Individuals who have injected drugs in the last 12 months</Text>


          <TouchableOpacity
            onPress={() => { navigation.navigate("Register") }}
            style={{
              marginTop: 25, backgroundColor: 'darkred', marginHorizontal: 10
              , borderRadius: 15
            }}
          >
            <Text style={{
              textAlign: 'center', fontSize: 18, fontWeight: 'bold'
              , padding: 10, color: 'white'
            }}>Ready to Donate</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  )
}
export default WhoCanDonate
const styles = StyleSheet.create({
  normaltxt: {
    fontSize: 16
  },
  titletxt: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold'
  }
})