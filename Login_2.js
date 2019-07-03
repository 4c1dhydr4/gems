import React, { Component } from 'react'
import { View, Text, Image, Alert } from 'react-native'
import { Button, Input, Item } from 'native-base'
import styles from './styles'

class Login extends Component {
	constructor(props){
		super(props);

		this.state = {
			username: "",
			password: "",
		}
	}

	validation = () => {
		const {username, password} = this.state;
		let gems_url = 'https://djgems.herokuapp.com/api/users/';
		fetch(gems_url+username)
		.then(res => res.json())
		.then( res => {
				console.log(res);
	  			myValidate(res);
			}
		);
	}

	function myValidate(auth){
		const {username, password} = this.state;
		if(username == auth.username && password == auth.password){
			Alert.alert('Autenticación Exitosa');
		}
		else if(username == auth.username && password =! auth.password){
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
			Alert.alert('Error');
		}
	}

	render(){
		return(
			<View style={{height:667, backgroundColor: "#192879" }}>
				<View style={styles.mainbody}>
					<Image style={styles.imglogin} source={require("../assets/logo.png")} />
					<View style={{marginBottom: 16}}>
						<Text style={styles.labeluser}>
							Username
						</Text>
						<Item regular style={styles.inputuser}>
							<Input onChangeText={inputUsername => this.setState({inputUsername})}
								autoCapitalize="none" style={{color: "#8382E0"}} />
						</Item>
					</View>

					<View style={{marginBottom: 16}}>
						<Text style={styles.labeluser}>
							Password
						</Text>
						<Item regular style={styles.inputuser}>
							<Input onChangeText={inputPassword => this.setState({inputPassword})}
								secureTextEntry={true} autoCapitalize="none" style={{color: "#8382E0"}} />
						</Item>
					</View>
					<Button onPress={this.validation} style={styles.btnsignin} block>
						Ingresar
					</Button>
				</View>
			</View>
		)
	}
}