import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Mensajes = () => {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = () => {
    fetch('https://new-fashioned-bulk.000webhostapp.com/Mensajes.php')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error:', error));
      
  };

  useEffect(() => {
    // Llamar fetchUsuarios inmediatamente
    fetchUsuarios();
    console.log('usuarios');

    // Establecer un temporizador para llamar fetchUsuarios cada 10 segundos
    const interval = setInterval(() => {
      fetchUsuarios();
      console.log('Mensajes');
    }, 10000);

    // Limpieza: detener el temporizador cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <Text style={styles.codigo}>Fecha: {item.fecha}</Text>
      <Text style={styles.nombre}> {item.mensaje}</Text>
      
      
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={usuarios}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  codigo: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nombre: {
    color: 'white',
    fontSize: 14,
  },
  tiempoTotal: {
    color: 'white',
    fontSize: 14,
  },
});

export default Mensajes;
