import React, { useState, useEffect } from 'react';
import { StyleSheet,  View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import MapView from 'react-native-maps';

import api from "../services/api";

function DevRegister() {
  const [githubUsername, setGithubUsername] = useState();
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  // Getting current postion through GPS on device
  useEffect(()=> {
    async function loadPosition() {
      const {granted} = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({ enableHighAccuracy: true});
        const {latitude, longitude} = coords;
        setCurrentRegion({latitude, longitude, latitudeDelta: 0.02, longitudeDelta: 0.02});
      }
    }
    loadPosition();
  }, []);

  // Update location based on user change position in GPS
	function handleRegionChanged(region) {
		setCurrentRegion(region);
	}

  //  insert new developer
  async function registerDev() {
    const {latitude, longitude} = currentRegion;
    try {
      const response = await api.post('/devs', {
        githubUsername,
        techs,
        latitude,
        longitude
      });

    } catch (error) {
      Alert.alert("Error", error);
    }
  }


  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container} >
      <View style={styles.form} >
        <Text style={styles.label} >Github Username*</Text>
        <TextInput style={styles.input}
                   placeholder="Username ..."
                   placeholderTextColor="#333"
                   keyboardType="email-address"
                   autoCapitalize="none"
                   value={githubUsername}
                   onChangeText={setGithubUsername}
        />

        <Text style={styles.label} >Technologies*</Text>
        <TextInput style={styles.input}
                   placeholder="React-Native, Java, .NET ..."
                   placeholderTextColor="#333"                   
                   autoCapitalize="words"
                   value={techs}
                   onChangeText={setTechs}
        />
        <Text style={styles.label} >latitude*</Text>
        <TextInput style={styles.input}
                   placeholder={latitude}
                   placeholderTextColor="#333"                   
                   autoCapitalize="words"
                   value={latitude}
                   onChangeText={setLatitude}
        />
        <Text style={styles.label} >Longitude</Text>
        <TextInput style={styles.input}
                   placeholder={longitude}
                   placeholderTextColor="#333"                   
                   autoCapitalize="words"
                   value={longitude}
                   onChangeText={setLongitude}
        />

        <TouchableOpacity style={styles.cadastroButton} onPress={() => {}}>
					<MaterialIcons name="add"  size={20} color="#FFF" />
				</TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    marginTop: 0,
    alignSelf: "stretch",
    paddingHorizontal: 30,
    paddingVertical: 40
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 0,
    fontSize: 19
  },
  input: {
    paddingHorizontal: 20,
    marginBottom: 25,
		height: 50,
		backgroundColor: '#FFF',
		color: '#333',
		borderRadius: 25,		
		fontSize: 16,
		shadowColor: '#000',
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

});

export default DevRegister;