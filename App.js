import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import { DestinationButton } from './components/DestinationButton';
import { CurrentLocationButton } from './components/CurrentLocationButton';
import Driver  from './components/Driver';

export default class App extends React.Component {
  constructor(props){
    super(props);
   this.state = {
      region: null,
    }
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if(status !== 'granted')
      console.log('Permiso de acceso a GPS denegado.')

    let location = await Location.getCurrentPositionAsync({enabledHighAcurracy: true})

    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    }

    this.setState(
      {
        region: region,
      }
    )
  }

  componentDidMount(){
    // this.getGems();
  }

  getLocation(){}
  centerMap(){
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.region;
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    })
  }
  getGem = (uid) => {
    let gems_url = 'https://djgems.herokuapp.com/api/gems/';
    return fetch(gems_url+uid)
    .then(res => res.json())
    .then( res => {
      let loc = {latitude:res.latitude, longitude:res.longitude};
      console.log(loc);
      return loc;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>React Native App! - Gems UPN Public Bus Manager</Text>
        <DestinationButton/>
        <CurrentLocationButton cb={() => { this.centerMap() }}/>
        <MapView
          initialRegion={this.state.region}
          showsUserLocation={true}
          showsCompass={true}
          rotateEnabled={false}
          ref={(map) => {this.map = map}}
          style={{flex: 1}}
        >
        <Driver driver={{ uid: '1', location: {latitude:0,longitude:0} }}/>
        <Driver driver={{ uid: '2', location: {latitude:0,longitude:0} }}/>
        <Driver driver={{ uid: '3', location: this.getGem(3) }}/>
        </MapView>
      </View>
    );
  }
  // this.getGem(1)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
