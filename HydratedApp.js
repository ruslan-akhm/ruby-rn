import React, { useRef, useEffect } from "react";
import HomeScreen from "./screens/HomeScreen";
import ModifyScreen from "./screens/ModifyScreen";

import CalendarScreen from "./screens/CalendarScreen";
import HistoryScreen from "./screens/HistoryScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import NewUser from "./screens/NewUser";

const Stack = createNativeStackNavigator();

export default function HydratedApp() {
	const user = useSelector((state) => state.user);
	return (
		<Stack.Navigator>
			{!user.activated && (
				<Stack.Screen
					name="NewUser"
					component={NewUser}
					options={{
						title: "",
						headerStyle: {
							backgroundColor: "purple",
						},
					}}
				/>
			)}
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
				name="Modify"
				component={ModifyScreen}
				options={{
					title: "",
					headerStyle: {
						backgroundColor: "purple",
					},
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
	);
}
