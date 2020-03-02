import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../services/api";

function Main( {navigation} ) {
	// Usando um State
	const [devs, setDevs] = useState([]);
	const [currentRegion, setCurrentRegion] = useState(null);
	const [techs, setTechs] = useState(''); // para o input

	// Getting the position using the GPS from mobile
	useEffect(()=> {
		async function loadInitialPosition(){
			const { granted } = await requestPermissionsAsync();
			if (granted) {
				const { coords } = await getCurrentPositionAsync({ enableHighAccuracy: true,});
				const { latitude, longitude } = coords;
				setCurrentRegion({ latitude, longitude, latitudeDelta: 0.02, longitudeDelta: 0.02, })
			}
		}
		loadInitialPosition();
	}, []);

	// Buscar devs na API
	async function loadDevs() {	
		const {latitude, longitude} = currentRegion;
		console.log(`Current Region - Longitude: ${longitude}| Latitude: ${latitude}`);

		try {
			const response = await api.get('/search', {
				params: {
					latitude, 
					longitude, 
					techs
				}
			});
			setDevs(response.data.devs);
		} catch (err) {
			Alert.alert(err);
		}		
	}
  // Toda vez que a o usuario mudar a posição no mapa ele deve atualizar a latitude/longitude 
	function handleRegionChanged(region) {
		console.log('handleRegionChanged()');
		console.log(region);
		setCurrentRegion(region);
	}

	if (!currentRegion) {
		return null;
	}

	return (
		<>		
			<MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>			
				{ devs.map(dev => (
					<Marker 
						key={dev._id}
						coordinate={ { longitude: dev.location.coordinates[0], latitude: dev.location.coordinates[1] } } >					
						
						<Image style={styles.avatar} source={ {uri: dev.avatar_url} } />
						<Callout onPress={() => { navigation.navigate('Profile', {github_username: dev.github_username});}} >
							<View style={styles.callout}>
								<Text style={styles.devName} >{dev.name}</Text>
								<Text style={styles.devBio} >{dev.bio}</Text>
								<Text style={styles.devTech} >{dev.techs.join(', ')}</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>	
			<View style={styles.searchForm}>
				<TextInput	style={styles.searchInput}
										placeholder="Buscar devs por techs..."
										placeholderTextColor="#999" autoCapitalize="words"
										autoCorrect={false} value={techs}
										onChangeText={text => setTechs(text)} />

				<TouchableOpacity style={styles.loadButton} onPress={loadDevs} >
					<MaterialIcons name="search"  size={20} color="#FFF" />
				</TouchableOpacity>

				<TouchableOpacity style={styles.cadastroButton} onPress={() => {navigation.navigate('DevRegister')}} >
					<MaterialIcons name="add"  size={20} color="#FFF" />
				</TouchableOpacity>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
    justifyContent: "center",
    alignItems: "center"
	},
	map: {
		flex: 1,
	},
	avatar: {
		width: 54,
		height: 54,	
		borderRadius: 4,
		borderWidth: 4,
		borderColor: '#FFF',
	},
	callout: {
		width: 260,
	},
	devName: {
		fontWeight: 'bold',
		fontSize: 16,
	}, 
	devBio: {
		color: '#666',
		marginTop: 5,
	},
	devTech: {
		marginTop: 5,

	},
	searchForm: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		zIndex: 5,		
		flexDirection: 'row'
	},
	searchInput: {
		flex: 1,
		height: 50,
		backgroundColor: '#FFF',
		color: '#333',
		borderRadius: 25,
		paddingHorizontal: 20,
		fontSize: 16,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 4,
			height: 4,
		},
		elevation: 2,
	},
	loadButton: {
		width: 50,
		height: 50,
		backgroundColor: '#8E4DFF',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 15,
		borderRadius: 25,
	},
	cadastroButton: {
		width: 50,
		height: 50,
		backgroundColor: '#8E4DFF',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 15,
		borderRadius: 25,
	}
})

export default Main;