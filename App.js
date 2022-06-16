import React, { useRef, useEffect } from "react";
import HomeScreen from "./screens/HomeScreen";
import { createStore, combineReducers } from "redux";
import cycleReducer from "./store/reducers/cycle";
import notesReducer from "./store/reducers/notes";
import { Provider } from "react-redux";
import CalendarScreen from "./screens/CalendarScreen";
import HistoryScreen from "./screens/HistoryScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userReducer from "./store/reducers/user";
//import { enableScreens } from "react-native-screens";

const rootReducers = combineReducers({
	cycles: cycleReducer,
	notes: notesReducer,
	user: userReducer,
});

const store = createStore(rootReducers);

//enableScreens(true);

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Provider store={store}>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{
							title: "",
							headerStyle: {
								backgroundColor: "purple",
							},
						}}
					/>
					<Stack.Screen
						name="Calendar"
						component={CalendarScreen}
						options={{
							title: "",
							headerStyle: {
								backgroundColor: "blue",
							},
							headerTintColor: "#fff",
						}}
					/>
					<Stack.Screen
						name="History"
						component={HistoryScreen}
						options={{
							title: "",
							headerStyle: {
								backgroundColor: "blue",
							},
							headerTintColor: "#fff",
						}}
					/>
				</Stack.Navigator>
			</Provider>
		</NavigationContainer>
	);
}
