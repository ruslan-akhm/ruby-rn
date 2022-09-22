import React, { useRef, useEffect } from "react";
// import HomeScreen from "./screens/HomeScreen";
// import ModifyScreen from "./screens/ModifyScreen";
import { createStore, combineReducers } from "redux";
import cycleReducer from "./store-1/reducers/cycle";
import notesReducer from "./store-1/reducers/notes";
import { Provider } from "react-redux";
// import CalendarScreen from "./screens/CalendarScreen";
// import HistoryScreen from "./screens/HistoryScreen";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userReducer from "./store-1/reducers/user";
//import { enableScreens } from "react-native-screens";
// import NewUser from "./screens/NewUser";
// import { useSelector } from "react-redux";
import HydratedApp from "./HydratedApp";

import { useFonts } from "expo-font";
import LogoScreen from "./screens/LogoScreen";
// import AppLoading from "expo-app-loading";

const rootReducers = combineReducers({
	cycles: cycleReducer,
	notes: notesReducer,
	user: userReducer,
});

const store = createStore(rootReducers);

//enableScreens(true);

// const Stack = createNativeStackNavigator();

export default function App() {
	let [fontsLoaded] = useFonts({
		"Avenir-Light": require("./assets/fonts/Avenir-Light.ttf"),
	});
	if (!fontsLoaded) {
		return <LogoScreen />;
	}

	return (
		<NavigationContainer>
			<Provider store={store}>
				<HydratedApp />
			</Provider>
		</NavigationContainer>
	);
}
