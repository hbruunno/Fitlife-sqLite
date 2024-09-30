import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MainTabNavigation from './src/maintab/MainTabNavigation';
import Login from './src/login/Login';
import 'react-native-gesture-handler';



import 'react-native-gesture-handler';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login"  screenOptions={{ headerShown: false }}>   
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Main' component={MainTabNavigation}/>      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
