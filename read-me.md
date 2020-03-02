## network request failed when running expo app on android device
# Firewall is not allowing access to port (3333) from api

## How to Check port enabled
sudo ufw status verbose
## How do I open tcp port #3333?
sudo ufw allow 3333/tcp
# font: http://cyberciti.biz/faq/how-to-open-firewall-port-on-ubuntu-linux-12-04-14-04-lts/



<KeyboardAvoidingView behavior="padding" style={styles.container}>
      
      <View style={styles.form}>
        <Text style={styles.label} >Github Username *</Text>
        <TextInput style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}                 
                  value={githubUsername}
                  onChangeText={setGithubUsername}
        />
        <Text style={styles.label} >Technologies *</Text>
        <TextInput style={styles.input}
                   placeholder="ReactJS, React-Native"
                   placeholderTextColor="#999"
                   autoCapitalize="none"
                   autoCorrect={false}                   
                   value={techs}
                   onChangeText={setTechs}
        />
        <Text style={styles.label} >Latitude</Text>
        <TextInput style={styles.input}                   
                   placeholderTextColor="#999"                   
                   autoCapitalize="none"
                   autoCorrect={false}
                   keyboardType="numeric"
                   value={latitude}
                   onChangeText={setLatitude}
        />
        <Text style={styles.label} >Longitude</Text>
        <TextInput style={styles.input}                   
                   placeholderTextColor="#999"                   
                   autoCapitalize="none"
                   autoCorrect={false}
                   keyboardType="numeric"
                   value={longitude}
                   onChangeText={setLongitude}
        />
        <TouchableOpacity style={styles.registerButton} onPress={registerDev} >
					<MaterialIcons name="add"  size={30} color="#FFF" />
        </TouchableOpacity>
        
      </View>
      
    </KeyboardAvoidingView>

    // StyleSheet
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    paddingVertical: 40,
    marginTop: 0
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  registerButton: {
    width: 50,
		height: 50,
		backgroundColor: '#8E4DFF',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 15,
		borderRadius: 25
  }

});
