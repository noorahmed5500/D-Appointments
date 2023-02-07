import { StyleSheet} from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import D_Category from './D_Category';
import DocList from './DocList';
//Main Container of Doctors
const DocHome = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Names" component={DocList} />
      <Tab.Screen name="Category" component={D_Category} />
    </Tab.Navigator>
  )
}
export default DocHome
const styles = StyleSheet.create({})