import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import ManejoTabs from './ManejoTabs';

const Stack = createNativeStackNavigator();

export class StackInit extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
           <Stack.Screen name="Tabs" component={ManejoTabs} options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default StackInit
