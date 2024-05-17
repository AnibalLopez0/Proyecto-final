import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import { WebView } from 'react-native-webview';
import axios from 'axios';

export class Usuario1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      videos: [] // Array para almacenar las URL de los videos de YouTube
    };
  }

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=trashermagazine&type=video&key=AIzaSyAbMNCSf8YKUeQ0HS46azwhXpklqcPW_Ks');
      const videos = response.data.items.map(item => item.id.videoId); // Obtener los IDs de los videos de YouTube
      this.setState({ videos });
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
      <Text style={{fontSize:40, fontWeight:"bold", color: "transparent", }}>Close</Text>
      <Text style={{fontSize:40, fontWeight:"bold", color: "white", }}>HOLA JUAN</Text>
      <Text style={{fontSize:10, fontWeight:"bold", color: "white", marginTop: 200 }}>Close</Text>
    </TouchableOpacity>
   
    );
  };

  renderVideo = ({ item }) => (
    <View style={styles.videoContainer}>
      <WebView
        style={styles.video}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: `https://www.youtube.com/embed/${item}` }}
      />
    </View>
  );

  render() {
    const { videos } = this.state;
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
            data={videos}
            renderItem={this.renderVideo}
            keyExtractor={(item, index) => index.toString()}
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
    marginBottom: 30
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9, // Ajuste el aspectRatio según su preferencia
    marginBottom: 10,
  },
  video: {
    flex: 1,
  },
});

export default Usuario1;
