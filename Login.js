import { Button, Input } from '@rneui/base';
import React, { Component } from 'react';
import { TouchableOpacity, View, Text, ImageBackground, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siono: 0,
      largo: -600,
      opacidad: 1,
      usuarios: {},
      correo: '',
      password: '',
      nombre: 'Juan',
      direccion: '',
      telefono: '',
      isAuthenticated: false,
    };
  }

  
  login = () => {
    console.log("Iniciando sesión...");
    axios.get('https://new-fashioned-bulk.000webhostapp.com/Login.php', {
      params: {
        correo: this.state.correo,
        password: this.state.password
      }
    })
    .then(async (response) => {
      console.log("Respuesta del servidor:", response.data);
      if (response.data === 1) {
        console.log("¡Inicio de sesión exitoso!");
        this.setState({ isAuthenticated: true });
        this.props.navigation.navigate('Tabs');
        try {
          await AsyncStorage.setItem('login', response.data);
        } catch (e) {
          // saving error
        }
      } else if (response.data === 0) {
        console.log("Credenciales incorrectas.");
        alert('Credenciales incorrectas');
      } else if (response.data === 3) {
        console.log("Correo no encontrado.");
        alert('Correo no encontrado');
      } else {
        console.log("Respuesta desconocida del servidor:", response.data);
        // Manejar otros casos según sea necesario
      }
    })
    .catch((error) => {
      console.error("Error de red:", error);
      alert('Error de red: No se pudo conectar al servidor');
    });
  };

  
  
  


  // Función para enviar los datos al servidor PHP
  enviarDatosAlServidor = async () => {
    try {
      console.log('Datos a enviar al servidor:', {
        nombre: this.state.nombre,
        direccion: this.state.direccion,
        telefono: this.state.telefono,
        correo: this.state.correo,
        password: this.state.password
      });
   console.log('https://new-fashioned-bulk.000webhostapp.com/Recuperar.php?nombre='+this.state.nombre+'&direccion='+this.state.direccion+'&telefono='+this.state.telefono+'&correo='+this.state.correo+'&password='+this.state.password);
      const response = await axios.get('https://new-fashioned-bulk.000webhostapp.com/Recuperar.php?nombre='+this.state.nombre+'&direccion='+this.state.direccion+'&telefono='+this.state.telefono+'&correo='+this.state.correo+'&password='+this.state.password, {
        nombre: this.state.nombre,
        direccion: this.state.direccion,
        telefono: this.state.telefono,
        correo: this.state.correo,
        password: this.state.password
      });
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };
  
  

  render() {
    const login = () => {
      this.setState({ siono: 1 });

      this.interval = setInterval(() => {
        this.setState({ largo: this.state.largo - 9 });
        console.log(this.state.largo);
        if (this.state.largo < -1400) {
          this.setState({ siono: 3 });
          clearInterval(this.interval);
          console.log(this.state.siono);
        }
      }, 10);
    };
    const alta = () => {
      this.setState({ siono: 2 });
    };

    const navigation = this.props.navigation; // Obtener la función de navegación

    return (
      <View>
        <ImageBackground
          source={require('./Imagenes/v859-katie-11.png')}
          style={{ width: 600, height: 1000 }}>
          <Animated.View
            style={{
              width: 400,
              height: 800,
              backgroundColor: 'transparent',
            }}>
            <Image
              source={require('./Imagenes/v859-katie-11.png')}
              style={{
                width: 600,
                height: 1900,
                marginTop: this.state.largo,
              }}></Image>
          </Animated.View>

          <View style={{ marginTop: -900 }}>
            <Button
              title="Login"
              onPress={login}
              icon={{
                name: 'user',
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
              }}
              containerStyle={{
                width: 200,
                marginTop: 600,
                marginLeft: 100,
              }}
            />
            <Button
              title="Alta"
              onPress={alta}
              icon={{
                name: 'user-plus',
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
              }}
              containerStyle={{
                width: 200,
                marginLeft: 100,
                marginTop: 30,
              }}
            />
          </View>
          {this.state.siono === 3 ? (
            <View>
              <View style={{ marginTop: -300, opacity: this.state.opacidad }}>
                <Input
                  placeholder="Correo"
                  placeholderTextColor={'white'}
                  onChangeText={correo => this.setState({ correo })}
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'envelope',
                    color: 'white',
                  }}
                  style={{ color: 'white' }}
                />
                <Input
                  placeholder="Password"
                  placeholderTextColor={'white'}
                  onChangeText={password => this.setState({ password })}
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'lock',
                    color: 'white',
                  }}
                  secureTextEntry={true}
                  style={{ color: 'white' }}
                />
                <View >
                <Button
              title="Enviar"
              onPress={this.login}
              icon={{
                name: 'envelope',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(1, 1, 100, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 100,
                marginLeft: 50,
                marginTop: -20,
              }}
            />
                </View>
              </View>
            </View>
          ) : null}

{this.state.siono === 2 ? (
  <View>
    <View style={{ marginTop: -500 }}>
      <Input
        placeholder="Correo"
        placeholderTextColor={'white'}
        onChangeText={correo => this.setState({ correo })}
        leftIcon={{
          type: 'font-awesome',
          name: 'envelope',
          color: 'white',
        }}
        style={{ color: 'white' }}
      />
      <Input
        placeholder="Password"
        placeholderTextColor={'white'}
        onChangeText={password => this.setState({ password })}
        leftIcon={{
          type: 'font-awesome',
          name: 'lock',
          color: 'white',
        }}
        secureTextEntry={true}
        style={{ color: 'white' }}
      />
      <Input
        placeholder="Nombre"
        placeholderTextColor={'white'}
        onChangeText={nombre => this.setState({ nombre })}
        leftIcon={{
          type: 'font-awesome',
          name: 'user',
          color: 'white',
        }}
        style={{ color: 'white' }}
      />
      <Input
        placeholder="Direccion"
        placeholderTextColor={'white'}
        onChangeText={direccion => this.setState({ direccion })}
        leftIcon={{ type: 'font-awesome', name: 'map', color: 'white' }}
        style={{ color: 'white' }}
      />
      <Input
        placeholder="Telefono"
        placeholderTextColor={'white'}
        onChangeText={telefono => this.setState({ telefono })}
        leftIcon={{
          type: 'font-awesome',
          name: 'phone',
          color: 'white',
        }}
        style={{ color: 'white' }}
      />
      <Button
        title="Enviar"
        onPress={this.enviarDatosAlServidor}
        icon={{
          name: 'envelope',
          type: 'font-awesome',
          size: 15,
          color: 'white',
        }}
        iconRight
        iconContainerStyle={{ marginLeft: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{
          backgroundColor: 'rgba(1, 1, 100, 1)',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 100,
          marginLeft: 50,
          marginTop: -20,
        }}
      />
    </View>
  </View>
) : null}

        </ImageBackground>
      </View>
    );
  }
}
