import * as React from 'react';
//import { StatusBar } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Importing Components/Screens for adding in TabMenu
import N_Profile from './N_Profile';
import N_ListDonnar from './N_ListDonnars';
import N_Messages from './N_Messages';
import N_BBanks from './N_BBanks';

function N_MainContainer() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={'Profile'}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'darkred',
        tabBarInactiveTintColor: 'grey',
        tabBarlabel: { paddingTop: 12, paddingBottom: 10, fontSize: 10, },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === 'Donnars') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (rn === 'Blood Banks') {
            iconName = focused ? 'medkit' : 'medkit-outline';
          } else if (rn === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (rn === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={'darkred'} />;
        },
      })}
    >

      <Tab.Screen name={'Donnars'} component={N_ListDonnar} options={{
        headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, title: 'List of Donnars', 
        headerTintColor: "white", headerStyle:{ backgroundColor: "darkred" }, 
        statusBarColor: 'darkred'
      }} />

      <Tab.Screen name={'Blood Banks'} component={N_BBanks} options={{
        headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, title: 'Blood Banks', 
        headerTintColor: "white", headerStyle:{ backgroundColor: "darkred" }
      }} />

      <Tab.Screen name={'Messages'} component={N_Messages} options={{
        headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, title: 'Chats', 
        headerTintColor: "white", headerStyle:{ backgroundColor: "darkred" }
      }} />

      <Tab.Screen name={'Profile'} component={N_Profile} options={{
        headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, title: 'Profile', 
        headerTintColor: "white", headerStyle:{ backgroundColor: "darkred" }, statusBarColor:"darkred"
      }} />

    </Tab.Navigator>
  );
}
export default N_MainContainer;