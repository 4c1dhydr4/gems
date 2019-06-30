import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import { DestinationButton } from './components/DestinationButton';
import { CurrentLocationButton } from './components/CurrentLocationButton';
import Driver  from './components/Driver';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.gems_url = 'https://djgems.herokuapp.com/api/gems/';
    this._getGems();
    this.state = {
      region: null,
      gems_url: this.gems_url,
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
  _getGems = async () => {
    fetch(this.gems_url)
    .then(res => res.json())
    .then( res => {
      this.state.gems = res;
      // console.log(this.state.gems);
    });
  }

  componentDidMount(){
    // this.getGems();
  }


  centerMap(){
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.region;
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    })
  }

  getLocation(id){
    let loc = {
      longitude: 0,
      latitude: 0,
    };
    let gems = this.state.gems ? this.state.gems : [];
    gems.forEach(function(gem){
      if(gem.id == id){
        loc = {
          longitude: gem.longitude,
          latitude: gem.latitude,
        }
      }
    });
    console.log("Loc");
    console.log(loc);
    return loc;
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
        <Driver driver={{uid: '1', location: this.getLocation(1),}}/>
        <Driver driver={{uid: '2', location: this.getLocation(2),}}/>
        <Driver driver={{uid: '3', location: this.getLocation(3),}}/>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
