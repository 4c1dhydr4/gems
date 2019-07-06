import React, { Component } from 'react';

import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';

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

  OpenMaps = () =>
  {
    this.props.navigation.navigate('Maps');
    
  }

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