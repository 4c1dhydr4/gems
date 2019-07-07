import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import { DestinationButton } from '../components/DestinationButton';
import { CurrentLocationButton } from '../components/CurrentLocationButton';
import Driver  from '../components/Driver';

export default class Maps extends React.Component {
  static navigationOptions =
  {
    title: 'Gems Map',
    headerVisible: false,
  };
  constructor(props){
   super(props);
   this.first_loc = { latitude: -12.060583, longitude: -77.059000};
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
        <Driver driver={{ uid: '1', location: this.first_loc }}/>
        <Driver driver={{ uid: '2', location: this.first_loc }}/>
        <Driver driver={{ uid: '3', location: this.first_loc }} />
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
