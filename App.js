import React, { Component } from 'react';

import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';

import { createAppContainer, createStackNavigator } from 'react-navigation';

import Login from './components/Login'

import Profile from './components/Profile'

import Maps from './components/Maps'


const AppNavigator = createStackNavigator(
  {
   First: { screen: Login },
 
   Profile: { screen: Profile },

   Maps: { screen: Maps },
  }
);

export default Project = createAppContainer(AppNavigator);

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