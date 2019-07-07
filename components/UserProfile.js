import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

export default class UserProfile extends Component {
  constructor(){
    super();
    this.state = {
      user: {},
      loading:true,
    }
  }
  async componentDidMount(){
    this._getUser();
  }

  OpenMaps = () =>
  {
    this.props.navigation.navigate('Maps');
    
  }

  Logout = () =>
  {
    this.props.navigation.navigate('First');
    
  }

  _getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('USER');
      if (value !== null) {
        const USER = JSON.parse(value)
        this.setState({user: USER, loading:false})
        // console.log(this.state.user)
      }
    } catch (error) {
      console.log("Error Obteniendo Usuario");
    }
  };

  render() {
    const { user, loading } = this.state;
    console.log(user)
    if(!loading) {
      return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: user.photo}}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}> {user.nombre} {user.apellidos} </Text>
                <Text style={styles.info}>Usuario: {user.username}</Text>
                <Text style={styles.description}>Gems App Profile</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={ this.OpenMaps }>
                  <Text style={styles.text}
                    onPress={this.OpenMaps}>
                    Ingresar a Gems Map
                  </Text>
                </TouchableOpacity>              
                <TouchableOpacity style={styles.buttonContainer} onPress={ this.Logout }>
                  <Text style={styles.text}
                    onPress={this.Logout}>
                    Salir
                  </Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      );
    }else {
        return <ActivityIndicator />
    }
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  text:{
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 16,
    textAlign: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  btn:{
    backgroundColor: "#696969",
  },
});
 