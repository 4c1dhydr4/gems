import React, { Component } from 'react';

import { 
  AppRegistry, 
  StyleSheet, 
  Text, 
  View, 
  Button,
  AsyncStorage,
} from 'react-native';

import { createAppContainer, createStackNavigator } from 'react-navigation';

class Profile extends Component {
  static navigationOptions =
  {
    title: 'Profile',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
  };
  constructor(){
    super();
    this.state = {
      user: {},
    }
    this._getUser();
  }

  OpenMaps = () =>
  {
    this.props.navigation.navigate('Maps');
    
  }

  _getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('USER');
      if (value !== null) {
        this.setState({user: value})
        console.log(this.state.user)
      }
    } catch (error) {
      console.log("Error Guardando Usuario");
    }
  };

  render()
  {
    return(
       <View style = { styles.MainContainer }>

         <View style={{marginBottom: 20}}>

          <Text style = { styles.TextStyle }> This is Profile </Text>

         </View>

          <Button onPress = { this.OpenMaps } title = 'Click Here To Open Maps'/>
        
       </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create(
{
 MainContainer:
 {
    justifyContent: 'center',
    flex:1,
    margin: 10
  
 },

 TextStyle:
 {
    fontSize: 23,
    textAlign: 'center',
    color: '#000',
 },

});