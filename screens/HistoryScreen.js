import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Calendar from "../components/history/Calendar";

function HistoryScreen({ route }) {
	return (
		<View>
			<Text>Calendar goes here</Text>
			<Text>
				It should be calendar for 12 previous months Inlcuding(!) current month
				{"\n"}
				Calendar will hightlight periods and have dots for days where there are
				symptoms reported {"\n"}
				It should also show ovul day (1 day) if its both ovul and period day -
				{">"} 2 colors (diagonally)
			</Text>
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
