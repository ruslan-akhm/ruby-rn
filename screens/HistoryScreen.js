import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Calendar from "../components/history/Calendar";

function HistoryScreen({ route, navigation }) {
	return (
		<View>
			<Pressable
				style={{
					borderWidth: 2,
					borderColor: "green",
					paddingVertical: 10,
					paddingHorizontal: 15,
				}}
				onPress={() => navigation.navigate("Modify")}
			>
				<Text
					style={{
						fontSize: 20,
					}}
				>
					Edit cycles history
				</Text>
			</Pressable>
			<Calendar />
		</View>
	);
}

const styles = StyleSheet.create({
	btn: {
		backgroundColor: "orange",
		padding: 15,
		marginTop: 20,
		borderRadius: 5,
	},
	// calendar: {
	// 	width: "100%",
	// 	backgroundColor: "red",
	// },
	calendarBox: {
		height: 300,
		width: "90%",
		backgroundColor: "white",
		borderRadius: 12,
		//alignItems: "flex-start",
		justifyContent: "flex-end",
	},
	container: {
		flex: 1,
		backgroundColor: "green",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: 100,
	},
	expander: {
		width: 100,
		alignItems: "center",
		justifyContent: "center",
	},
	todayBtn: {
		width: "90%",
	},
	todayChosen: {
		width: "90%",
		backgroundColor: "salmon",
	},
	test: {
		backgroundColor: "red",
	},

	weekCalendarBox: {
		height: 140,
		width: "90%",
		backgroundColor: "white",
		borderRadius: 12,
	},
});

export default HistoryScreen;
