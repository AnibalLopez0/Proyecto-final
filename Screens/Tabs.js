import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PantallaPrincipal from './PantallaPrincipal';
import UsuariosScreen from './UsuariosScreen';

const Tab = createMaterialBottomTabNavigator();

class Tabs extends Component {
  render() {
    const { nombre } = this.props;

    return (
      <Tab.Navigator
        initialRouteName="Inicio"
        activeColor="#ffff"
        inactiveColor="ffff"
        barStyle={{ backgroundColor: '#C72B62' }}>
        <Tab.Screen
          name="Inicio"
          component={PantallaPrincipal}
          initialParams={{ nombre }}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({  size = 30 }) => (
              <MaterialCommunityIcons
                name="home"
                color={'white'}
                size={size}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Usuarios"
          component={UsuariosScreen}
          initialParams={{ nombre }}
          options={{
            tabBarLabel: 'Usuarios',
            tabBarIcon: ({  size = 30 }) => (
              <MaterialCommunityIcons
                name="account-clock"
                color={'white'}
                size={size}
              />
            ),
            headerShown: false,
          }}
        />
        
        
      </Tab.Navigator>
    );
  }
}

export default Tabs;
