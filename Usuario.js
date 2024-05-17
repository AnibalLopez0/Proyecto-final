import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Button } from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import MenuDrawer from 'react-native-side-drawer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Usuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      images: [] // Array para almacenar las URLs de las imágenes
    };
  }

  const navigation = this.props.navigation;

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages = async () => {
    try {
      const response = await axios.get('https://picsum.photos/v2/list?limit=10'); // Obtener una lista de imágenes
      const images = response.data.map(item => item.download_url); // Obtener las URLs de las imágenes
      this.setState({ images });
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  componentDidMount = async() =>{
    try{
      const value = await AsyncStorage.getItem('login');
      if(value !== null){
        //values previously storeaged
      } else{
        this.props.navigation.navigate('Tabs');

      }
    }
  }

  cerrarSesion = async () =>{
    try {
      await AsyncStorage.removeItem('login')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    
    return (
      
      
       <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
        <Text style={{fontSize:40, fontWeight:"bold", color: "transparent", }}>Close</Text>
        <Text style={{fontSize:40, fontWeight:"bold", color: "white", }}>Bienvenido {this.state.nombre}</Text>
        <View>
          <Button title='Salir de la sesion' onPress={this.cerrarSesion}></Button>
        </View>
        <Text style={{fontSize:10, fontWeight:"bold", color: "white", marginTop: 200 }}>Close</Text>
      </TouchableOpacity>
     
      
    );
  };

  renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  render() {
    const { images } = this.state;
    return (
      <View style={styles.container}>
        {/* Botón para abrir el cajón lateral */}
        <View style={{ height: 50, width: 50, marginRight: 340, marginTop:50 }}>
          <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
            <Text>Open</Text>
          </TouchableOpacity>
        </View>

        {/* Contenido fuera del cajón lateral */}
        <View style={styles.contentOutsideDrawer}>
          <FlatList
            data={images}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // Mostrar dos imágenes por fila
          />
        </View>

        {/* Cajón lateral */}
        <MenuDrawer
          open={this.state.open}
          position={'left'}
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#38C8EC",
    padding: 10
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812'
  },
  contentOutsideDrawer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: -10,
    marginBottom:50
  },
  imageContainer: {
    margin: 5,
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default Usuario;
