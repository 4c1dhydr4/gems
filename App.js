import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

import bgImage from './assets/background.png'
import logo from './assets/logo.jpg'
import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH } = Dimensions.get('window')
export default class Example extends Component {
  constructor(){
    super();
    this.state = {
      showPass: true,
      press: false,
      username: "",
      password: "",
    }
  }
  validation = () => {
    let res = {
      username: "hola",    
      password: "hola",
    }
    this.myValidate(res);
    /*
    const {username, password} = this.state;
    let gems_url = 'https://djgems.herokuapp.com/api/users/';
    fetch(gems_url+username)
    .then(res => res.json())
    .then( res => {
        console.log(res);
          myValidate(res);
      }
    );
    */
  }
  myValidate = (auth) =>{
    const {username, password} = this.state;
    if(username == auth.username && password == auth.password){
      Alert.alert('Autenticación Exitosa');
    }
    else if(username == auth.username && password != auth.password){
      Alert.alert('Contraseña Incorrecta');
    }
    else if(username == "" && password == ""){
      Alert.alert('Ingrese Usuario y Contraseña');
    }
    else if(username == ""){
      Alert.alert('Ingrese el Usuario');
    }
    else if(password == ""){
      Alert.alert('Ingrese la Contraseña');
    }
    else{
      Alert.alert('Usuario no encontrado');
    }
  }
  showPassw = () =>{
    if(this.state.press == false){
      this.setState({showPass: false, press:true});
    }else{
      this.setState({showPass: true, press:false});
    }
  }
  render(){
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer} >
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}>GEMS APP</Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon style={styles.inputIcon} name={'ios-person'} 
          size={28} color={'rgba(255,255,255,0.7)'} />
          <TextInput 
            style={styles.input}
            placeholder={ 'Usuario'}
            placeholderTextColor={ 'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText={username => this.setState({username})}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon style={styles.inputIcon} name={'ios-lock'} 
          size={28} color={'rgba(255,255,255,0.7)'} />
          <TextInput 
            style={styles.input}
            placeholder={ 'Password'}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={ 'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText={password => this.setState({password})}
          />
          <TouchableOpacity style={styles.btnEye} 
            onPress={this.showPassw.bind(this)}>
            <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255,255,255,0.7)'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.btnLogin}
          onPress={this.validation.bind(this)}>
          <Text style={styles.text}
            onPress={this.validation.bind(this)}>
            Ingresar
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer:{
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer:{
    alignItems: 'center',
    marginBottom: 20,
  },
  logo:{
    width:150,
    height:150,
  },
  logoText:{
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    opacity: 0.9,
  },
  inputContainer:{
    marginTop: 10,
  },
  input:{
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },
  inputIcon:{
    position: 'absolute',
    top: 10,
    left: 37,
  },
  btnEye:{
    position: 'absolute',
    top: 10,
    right: 37,
  },
  btnLogin:{
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#FF7F60',
    justifyContent: 'center',
    marginTop: 20,
  },
  text:{
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 16,
    textAlign: 'center',
  },
});