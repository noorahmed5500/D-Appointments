//Importing Libraries/Components
import { StyleSheet} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DocList from './src/doctor/DocList';
import GettinData from './src/doctor/GettinData';
import MainScreen from './src/screens/MainScreen';
import MapScreen from './src/screens/MapScreen';
import LoginSc from './src/LoginRegister/LoginSc';
import SignUpSc from './src/LoginRegister/SignUpSc';
import Dashboard from './src/donnar/Dashboard';
import MainContainer from './src/donnar/MainContainer';
import SignupForNeedy from './src/LoginRegister/SignupForNeedy';
import N_MainContainer from './src/needy/N_MainContainer';
import N_ListDonnars from './src/needy/N_ListDonnars';
//import Search from './src/needy/Search';
import {firebase} from "./config";
import { useEffect, useState } from 'react';
import ChatScreen from './src/LoginRegister/ChatScreen';
import Hello from './src/Admin/AddingDoctors';
import D_Category from './src/doctor/D_Category';
import ListCatDoc from './src/doctor/ListCatDoc';
import UpdateData from './src/LoginRegister/UpdateData';
import DocHome from './src/doctor/DocHome';
import WhoCanDonate from './src/LoginRegister/WhoCanDonate';

//Main Component
export default function App() {
  const Stack = createNativeStackNavigator();
  const [intializing, setIntializing] =useState(true);
  const [user, setUser] = useState();


  const onAuthStateChanged = () =>{
    setUser(user);
    if(intializing) setIntializing(false);
  }
  useEffect(() =>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if(intializing) return null;

  
  return (

    //Initializing Screens in Navigation 
    <NavigationContainer>
    <Stack.Navigator>
    
    <Stack.Screen name="Main" component={MainScreen} 
    options={{ title: 'WELCOME', headerTintColor: "white", headerTitleAlign: "center", headerStyle: 
    {backgroundColor: "#004e92"},statusBarColor:"#004e92"
    }}/>

    <Stack.Screen name="WCD" component={WhoCanDonate} options={{headerShown:false, statusBarColor:'darkred'}} />
    



    <Stack.Screen name="Update" component={UpdateData} options={{ headerTitleStyle:{fontSize:20,fontWeight:'bold'},title: 'Update', headerTintColor: "white", headerStyle: 
    {backgroundColor: "darkred", statusBarColor:"#darkred"}}} />
    
    <Stack.Screen name="NC" component={DocHome} options={{ headerTitleStyle:{fontSize:20,fontWeight:'bold'},title: 'Doctors Home', headerTintColor: "white", headerStyle: 
    {backgroundColor: "#004e92"}, statusBarColor:"#004e92"}} />
    

    <Stack.Screen name="ADMIN" component={Hello} 
    options={{ title: 'WELCOME Admin', headerTintColor: "white", headerTitleAlign: "center", headerStyle: 
    {backgroundColor: "#004e92"}, statusBarColor:'#004e92'}}/>
    
    <Stack.Screen name="Home" component={DocList} options={{ headerTitleStyle:{fontSize:20,fontWeight:'bold'},title: 'Doctors List', headerTintColor: "white", headerStyle: 
    {backgroundColor: "#004e92"}}} />   
    
    
    
    <Stack.Screen name="Category" component={D_Category} 
    options={{ title: 'Category of Doctors', headerTintColor: "white", headerTitleAlign: "center", headerStyle: 
    {backgroundColor: "#004e92"}}}/>

    <Stack.Screen name="CATDOC" component={ListCatDoc} 
    options={{ title: 'Category Wise Doctors', headerTintColor: "white", headerTitleAlign: "center", headerStyle: 
    {backgroundColor: "#004e92"}, statusBarColor:"#004e92"}}/>

    <Stack.Screen name="board" component={Dashboard} 
    options={{ title: 'Dashboard', headerTintColor: "white", headerStyle: 
    {backgroundColor: "darkred"}}}/>
    
    <Stack.Screen name="chat" component={ChatScreen} options={{headerShown: false, statusBarColor:'darkred'}} />
    
   
    <Stack.Screen name="Dlist" component={N_ListDonnars} />
       
    <Stack.Screen name="RegNeedy" component={SignupForNeedy} 
      options={{ headerTitleStyle:{fontSize:20,fontWeight:'bold'},title: 'Register', headerTintColor: "white", headerStyle: 
      {backgroundColor: "darkred"}, statusBarColor:'darkred'}}/>

    <Stack.Screen name="Register" component={SignUpSc} 
      options={{ headerTitleStyle:{fontSize:20,fontWeight:'bold'}, title: 'Register', headerTintColor: "white",  headerStyle: 
      {backgroundColor: "darkred"}, statusBarColor:'darkred'}}/>


    <Stack.Screen name="LoginScreen" component={LoginSc} 
      options={{ headerTitleStyle:{fontSize:20,fontWeight:'bold'},title: 'Blood Donation', headerTintColor: "white", headerStyle: 
      {backgroundColor: "darkred"}, statusBarColor:'darkred'}}/>

       <Stack.Screen name="Dashboard" component={GettinData} options={{ headerTitleStyle:{fontSize:20,fontWeight:'bold'},title: 'Doctor Profile', headerTintColor: "white", headerStyle: 
       {backgroundColor: "#004e92"}, statusBarColor:"#004e92"}} />
  


      <Stack.Screen name="MContainer" component={MainContainer} 
      options={{headerShown:false, statusBarColor:'darkred'}} />

      <Stack.Screen name="NMContainer" component={N_MainContainer} 
      options={{headerShown:false, headerStyle: 
        {backgroundColor: "darkred"}, statusBarColor:'darkred'}}/>


        
      <Stack.Screen name="Map" component={MapScreen}  options={{headerShown:false, statusBarColor:"#004e92"}}/>    
    
    </Stack.Navigator>
  </NavigationContainer> 
  );
}

const styles = StyleSheet.create({});
