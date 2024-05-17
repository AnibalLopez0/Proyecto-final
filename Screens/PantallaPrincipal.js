import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { Button } from '@rneui/base';

export default class PantallaPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      carrera: '',
      campus: '',
      horaCreacion: '',
      horasConectadas: 0,
    };
  }

  componentDidMount() {
    // Leer los datos de AsyncStorage cuando el componente se monte
    this.leerDatos();
    // Iniciar el intervalo para actualizar las horas conectadas cada segundo
    this.intervaloHorasConectadas = setInterval(this.actualizarHorasConectadas, 1000);
  }

  componentWillUnmount() {
    // Limpiar el intervalo al desmontar el componente
    clearInterval(this.intervaloHorasConectadas);
  }

  leerDatos = async () => {
    try {
      // Leer los datos de AsyncStorage
      const nombre = await AsyncStorage.getItem('nombre');
      const carrera = await AsyncStorage.getItem('carrera');
      const campus = await AsyncStorage.getItem('campus');
      const horaCreacionString = await AsyncStorage.getItem('horaCreacion');
      const horaCreacion = parseInt(horaCreacionString, 10); // Convertir la cadena de nuevo a una marca de tiempo en milisegundos

      // Actualizar el estado con los datos leídos
      this.setState({ nombre, carrera, campus, horaCreacion });
    } catch (error) {
      console.error('Error al leer los datos:', error);
    }
  };

  cerrarSesion = async () => {
    // Elimina los datos de sesión de AsyncStorage
    await AsyncStorage.removeItem('codigo');
    await AsyncStorage.removeItem('nip');
    await AsyncStorage.removeItem('horaCreacion');

    // Muestra un mensaje de confirmación al usuario
    alert('Sesión cerrada correctamente');
    RNRestart.Restart();
  };

  actualizarHorasConectadas = () => {
    const { horaCreacion } = this.state;
    if (!horaCreacion) {
      return;
    }
    const horaInicio = new Date(horaCreacion);
    const horaActual = new Date();
    const diferenciaHoras = Math.abs(horaActual - horaInicio) / 36e5; // Convertir la diferencia a horas
    this.setState({ horasConectadas: diferenciaHoras });
  };

  render() {
    const { nombre, carrera, campus, horasConectadas } = this.state;

    return (
      <View style={{ height: '100%', width: '100%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30, color: 'white' }}>Tiempo en linea:</Text>
        <Text style={{ fontSize: 24, color: 'white', marginVertical: 10 }}>{horasConectadas.toFixed(2)} horas</Text>
        <Text style={{ color: 'white' }}>Nombre: {nombre}</Text>
        <Text style={{ color: 'white' }}>Carrera: {carrera}</Text>
        <Text style={{ color: 'white' }}>Campus: {campus}</Text>
        <Button
          title="Cerrar Sesión"
          onPress={this.cerrarSesion}
          icon={{
            name: 'close',
            type: 'font-awesome',
            size: 15,
            color: 'white',
          }}
          iconRight
          iconContainerStyle={{ marginLeft: 10 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'rgba(199, 43, 98, 1)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
            marginTop: 30,
          }}
          containerStyle={{
            width: 200,
          }}
        />
      </View>
    );
  }
}
