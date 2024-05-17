import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InicioSesionScreen from './Login2';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

const NavegacionPrincipal = () => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  useEffect(() => {
    const cargarDatosSesion = async () => {
      try {
        const codigo = await AsyncStorage.getItem('codigo');
        const nip = await AsyncStorage.getItem('nip');
        const horaCreacion = await AsyncStorage.getItem('horaCreacion');

        // Si los datos de sesión existen, autenticar automáticamente al usuario
        if (codigo && nip && horaCreacion) {
          setUsuarioAutenticado(true);
        } else {
          setUsuarioAutenticado(false);
        }
      } catch (error) {
        console.error('Error al cargar los datos de sesión:', error);
      }
    };

    cargarDatosSesion();
  }, [usuarioAutenticado]); // Este efecto se ejecutará cada vez que usuarioAutenticado cambie

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {usuarioAutenticado ? (
          <Stack.Screen name="PantallaPrincipal" component={Tabs} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="InicioSesion" component={InicioSesionScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavegacionPrincipal;
