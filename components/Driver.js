import React from 'react';
import{
	Image,
	View,
} from 'react-native';
import { MapView } from 'expo';

export default class Driver extends React.Component {
	constructor(props){
		super(props);
		const driver = this.props.driver ? 
			this.props.driver :
			{
				uid: "noDriversPassed",
				location: { latitude: 0, longitude: 0}
			}
		const coordinate = new MapView.AnimatedRegion({
			latitude: driver.location.latitude,
			longitude: driver.location.longitude,
		})
		this.state = {
			driver: driver,
			coordinate: coordinate,
		}
	}
	render(){
		return(
			<MapView.Marker.Animated
				coordinate={this.state.coordinate}
				anchor={{x: 0.35, y:0.32}}
				ref={marker => { this.marker = marker }}
				style= {{ width: 100, height: 100 }} >
				<Image
					source={require('../assets/bus2.png')}
					style={{ width: 64, height: 24, }} />
			</MapView.Marker.Animated>
		)
	}
}