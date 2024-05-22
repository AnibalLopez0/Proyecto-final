import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { Button, Input } from '@rneui/base';

class Login2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      nip: '',
      isAuthenticated: false,
    };
  }

  registrarUsuario = async (codigo, nombre) => {
    try {
        const response = await fetch('https://new-fashioned-bulk.000webhostapp.com/Login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `codigo=${codigo}&nombre=${nombre}`,
        });

        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
};

  sendData = async () => {
    const { codigo, nip } = this.state;

    // Obtener la hora actual
    const horaCreacion = Date.now().toString();

    // Guardar el código, el NIP y la hora de creación en AsyncStorage
    try {
      const http = new XMLHttpRequest();
      const url = 'http://148.202.152.33/cucei/autentificacion_siauu_temporal.php';
      const params = `codigo=${codigo}&nip=${nip}`;
      
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.onreadystatechange = async () => {
        if (http.readyState == 4 && http.status == 200) {
          console.log(http.responseText);
          await AsyncStorage.setItem('codigo', codigo);
          await AsyncStorage.setItem('nip', nip);
          await AsyncStorage.setItem('horaCreacion', horaCreacion);
          const separado = http.responseText.split(',');
          await AsyncStorage.setItem('nombre', separado[2]);
          await AsyncStorage.setItem('carrera', separado[3]);
          await AsyncStorage.setItem('campus', separado[4]);

          //llamar registrar usuario
          await this.registrarUsuario(codigo,separado[2]);
          // Actualizar el estado de autenticación después de guardar los datos en AsyncStorage
          this.setState({ isAuthenticated: true });
          RNRestart.Restart();
          
        }
      };
      http.send(params);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <SafeAreaView>
        <View style={{ height: '100%', width: '100%', backgroundColor: 'black' }}>
          <View style={{ marginTop: '70%' }}>
            <Input
              placeholder="Codigo"
              placeholderTextColor={'white'}
              keyboardType="numeric"
              onChangeText={codigo => this.setState({ codigo })}
              leftIcon={{
                type: 'font-awesome',
                name: 'address-card',
                color: 'white',
              }}
              style={{ color: 'white' }}
            />
            <Input
              placeholder="NIP"
              placeholderTextColor={'white'}
              onChangeText={nip => this.setState({ nip })}
              leftIcon={{
                type: 'font-awesome',
                name: 'key',
                color: 'white',
              }}
              style={{ color: 'white' }}
            />
            <Button
              title="Entrar"
              onPress={this.sendData} // Aquí se llama al método sendData de la clase
              icon={{
                name: 'unlock',
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
            {/* Mostrar un mensaje si está autenticado */}
            {isAuthenticated && <Text style={{ color: 'white' }}>Autenticado correctamente</Text>}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Login2;
