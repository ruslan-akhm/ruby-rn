import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

function DaysWidget({ navigation }) {
	const [day, setDay] = useState(0);
	const cycles = useSelector((state) => state.cycles.cycles);

	useEffect(() => {
		console.log("DAYS WIDGET render");
		const lastCycle = cycles[cycles.length - 1];
		const today_day = Math.trunc(Date.now() / (1000 * 60 * 60 * 24));
		let total_days = today_day - lastCycle.startDay;
		setDay(() => {
			return total_days > 0 ? total_days + 1 : 1;
		});
	});

	return (
		<View style={[styles.daysCard, styles.boxShadow]}>
			<Text style={styles.daysCardText}>It is day</Text>
			<Text style={styles.daysCardCount}>{day}</Text>
			<Text style={styles.daysCardText}>of your cycle</Text>
			<Pressable
				style={[styles.btn, styles.startBtn]}
				onPress={() => {
					navigation.navigate("Calendar");
				}}
			>
				<Text style={styles.btnText}>mark NEW period start</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	boxShadow: {
		shadowColor: "#171717",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	btn: {
		backgroundColor: "orange",
		padding: 15,
		marginTop: 10,
		borderRadius: 5,
	},
	btnText: {
		fontSize: 20,
	},
	daysCard: {
		width: "90%",
		height: 240,
		backgroundColor: "white",
		marginTop: "5%",
		borderRadius: 12,
		padding: 10,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	daysCardText: {
		fontSize: 20,
	},
	daysCardCount: {
		fontSize: 78,
		color: "#004550",
	},
	startBtn: {
		backgroundColor: "#004550",
		width: "100%",
		height: 60,
		alignItems: "center",
		justifyContent: "center",
		marginTop: "auto",
	},
});

export default DaysWidget;
