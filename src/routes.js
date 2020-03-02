import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import DevRegister from "./pages/DevRegister";

const Routes = createAppContainer(
	createStackNavigator({
		Main: {
			screen: Main, 
			navigationOptions: {
				title: 'DevRadar'
			}
		},
		Profile: {
			screen: Profile,
			navigationOptions: {
				title: 'Perfil no GitHub'
			}
		},
		DevRegister: {
			screen: DevRegister,
			navigationOptions: {
				title: 'Register new Developer'
			}
		}
			
	},{
		defaultNavigationOptions: {
			headerTintColor: '#FFF',
			headerTitleAlign: 'center',            
			headerStyle: {                
				backgroundColor: '#7D40E7',
			}
		}
	})
);

export default Routes;