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
				location: { latitude: -12.058683, longitude: -77.038726},
				name: 'Nombre',
			}
		const coordinate = new MapView.AnimatedRegion({
			latitude: driver.location.latitude ? driver.location.latitude : 0,
			longitude: driver.location.longitude ? driver.location.longitude : 0,
		});
		this.refresh = (cords) => {
			const newCoordinate = {
		   		latitude: cords.latitude,
		   		longitude: cords.longitude
			}
			this.marker._component.animateMarkerToCoordinate(
				newCoordinate,
				500
			)
		}
		this.cb = () => {
		    let gems_url = 'https://djgems.herokuapp.com/api/gems/';
		    fetch(gems_url+this.state.driver.uid)
		    .then(res => res.json())
		    .then( res => {
				this.setState({
					driver: {
		    			uid: this.state.driver.uid,
		    			location: {
		    				latitude: parseFloat(res.latitude), 
		    				longitude: parseFloat(res.longitude),
		    			},
		    			name: res.nombre,
		    		},
	    			coordinate: {
	    				latitude: parseFloat(res.latitude), 
	    				longitude: parseFloat(res.longitude),
	    			}
				});
				// this.refresh(this.state.coordinate);
			});
	  	}
		this.state = {
			driver: driver,
			coordinate: coordinate,
		}
	}
	/*
	componentDidMount() {
	  this.watchID = navigator.geolocation.watchPosition(
	    position => {
	      const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
	      const { latitude, longitude } = position.coords;

	      const newCoordinate = {
	        latitude,
	        longitude
	      };
	      if (Platform.OS === "android") {
	        if (this.marker) {
	          this.marker._component.animateMarkerToCoordinate(
	            newCoordinate,
	            500
	          );
	         }
	       } else {
	         coordinate.timing(newCoordinate).start();
	       }
	       this.setState({
	         latitude,
	         longitude,
	         routeCoordinates: routeCoordinates.concat([newCoordinate]),
	         distanceTravelled:
	         distanceTravelled + this.calcDistance(newCoordinate),
	         prevLatLng: newCoordinate
	       });
	     },
	     error => console.log(error),
	     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
	  );
	}
	*/
	render(){	
		return(
			<MapView.Marker.Animated
				coordinate={this.state.coordinate}
				anchor={{x: 0.35, y:0.32}}
				ref={marker => { this.marker = marker }}
				style= {{ width: 100, height: 100 }} 
				onPress={() => { this.cb() }}>
				<Image
					source={require('../assets/bus2.png')}
					style={{ width: 64, height: 24, }} />
			</MapView.Marker.Animated>
		)
	}
}