import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Importing Screens adding on Tab Menu
import Dashboard from './Dashboard';
import Chat from './Chat';

const Tab = createBottomTabNavigator();

function MainContainer() {
  const navigation = useNavigation();

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

          if (rn === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';

          } else if (rn === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={'Profile'} component={Dashboard} options={{
        headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, title: 'Profile',
        headerTintColor: "white", headerStyle:
          { backgroundColor: "darkred" }, headerLeft: () => (
            <TouchableOpacity
              onPress={() => { navigation.navigate("Main") }}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name={'arrow-back'} size={25} color='white' />
            </TouchableOpacity>
          )
      }} />
      <Tab.Screen name={'Messages'} component={Chat} options={{
        headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, title: 'Chats',
        headerTintColor: "white", headerStyle:
          { backgroundColor: "darkred" }, headerLeft: () => (
            <TouchableOpacity
              onPress={() => { navigation.navigate("Profile") }}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name={'arrow-back'} size={25} color='white' />
            </TouchableOpacity>
          )
      }} />
    </Tab.Navigator>
  );
}
export default MainContainer;