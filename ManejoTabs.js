import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Usuario from './Usuario';
import Usuario1 from './Usuario1';
import Usuario2 from './Usurio2';

const Tab = createMaterialBottomTabNavigator();

class ManejoTabs extends Component {
  render() {
    const { nombre } = this.props;
    console.log("Nombre de usuario en ManejoTabs:", nombre);

    return (
      <Tab.Navigator
        initialRouteName="Inicio"
        activeColor="#e91e63"
        inactiveColor="#e91e63"
        barStyle={{ backgroundColor: 'tomato' }}>
        <Tab.Screen
          name="Inicio"
          component={Usuario}
          initialParams={{ nombre }}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color, size = 30 }) => (
              <MaterialCommunityIcons
                name="image"
                color={color}
                size={size}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Videos"
          component={Usuario1}
          initialParams={{ nombre }}
          options={{
            tabBarLabel: 'Videos',
            tabBarIcon: ({ color, size = 30 }) => (
              <MaterialCommunityIcons
                name="video"
                color={color}
                size={size}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Musica"
          component={Usuario2}
          initialParams={{ nombre }}
          options={{
            tabBarLabel: 'Musica',
            tabBarIcon: ({ color, size = 30 }) => (
              <MaterialCommunityIcons
                name="music-box"
                color={color}
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

export default ManejoTabs;
