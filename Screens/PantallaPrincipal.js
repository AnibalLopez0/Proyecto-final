import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { Button } from '@rneui/base';
import axios from 'axios';

export default class PantallaPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      nombre: '',
      carrera: '',
      campus: '',
      horaCreacion: '',
      horasConectadas: 0,
    };
  }

  componentDidMount() {
    this.leerDatos();
    this.intervaloHorasConectadas = setInterval(this.actualizarHorasConectadas, 1000);
    //this.intervaloActualizarBD = setInterval(this.actualizarHorasEnBaseDeDatos, 30000); // Actualiza la BD cada 30 segundos
  }

  componentWillUnmount() {
    clearInterval(this.intervaloHorasConectadas);
    clearInterval(this.intervaloActualizarBD);
    this.actualizarHorasEnBaseDeDatos(); // Actualiza las horas en la base de datos al desmontar el componente
  }

  leerDatos = async () => {
    try {
      const codigo = await AsyncStorage.getItem('codigo');
      const nombre = await AsyncStorage.getItem('nombre');
      const carrera = await AsyncStorage.getItem('carrera');
      const campus = await AsyncStorage.getItem('campus');
      const horaCreacionString = await AsyncStorage.getItem('horaCreacion');
      const horaCreacion = parseInt(horaCreacionString, 10);

      this.setState({ codigo, nombre, carrera, campus, horaCreacion });
    } catch (error) {
      console.error('Error al leer los datos:', error);
    }
  };

  actualizarHorasEnBaseDeDatos = async () => {
    const { codigo, horasConectadas } = this.state;
    if (!codigo) {
      return;
    }

    try {
      const response = await axios.post('https://new-fashioned-bulk.000webhostapp.com/Modify.php', {
        codigo: codigo,
        tiempo_a_agregar: horasConectadas.toFixed(2) // Envía el valor correctamente redondeado
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al actualizar las horas en la base de datos:', error);
    }
  };

  cerrarSesion = async () => {
    await this.actualizarHorasEnBaseDeDatos(); // Asegúrate de actualizar las horas antes de cerrar sesión
    await AsyncStorage.removeItem('codigo');
    await AsyncStorage.removeItem('nip');
    await AsyncStorage.removeItem('horaCreacion');
    this.actualizarHorasEnBaseDeDatos();
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
    const diferenciaHoras = Math.abs(horaActual - horaInicio) / 36e5;
    this.setState({ horasConectadas: diferenciaHoras });
  };

  render() {
    const { nombre, carrera, campus, horasConectadas } = this.state;

    return (
      <View style={{ height: '100%', width: '100%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30, color: 'white' }}>Tiempo en línea:</Text>
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
