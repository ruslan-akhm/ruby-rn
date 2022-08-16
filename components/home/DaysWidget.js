import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { calculateDays } from "../../helpers/calculateDays";
import { determineCurrentMessage } from "../../helpers/determineCurrentMessage";
import handleDaysWidgetMessage from "../../helpers/handleDaysWidgetMessage";
// import {
// 	autoFIllMenstruation,
// 	markMenstruationsEnd,
// 	test,
// } from "../../store-1/actions/cycle";

import moment from "moment";
import Colors from "../../constants/Colors";

const DaysWidget = (props) => {
	const { navigation, cyclesState, userState } = props;
	const dispatch = useDispatch();
	const [day, setDay] = useState(0);
	const [currentState, setCurrentState] = useState("");
	const lastCycle =
		cyclesState.cycles[Math.max(...Object.keys(cyclesState.cycles))];

	useEffect(() => {
		if (cyclesState.cycles[lastCycle.id].isCurrently) {
			let daysCount = moment(cyclesState.today.calendarFormat).diff(
				cyclesState.cycles[lastCycle.id].period.start,
				"days"
			);
			/* Adding +1 to include today's day */
			setDay(daysCount + 1);
		}

		let stateObj = determineCurrentMessage(cyclesState, userState);

		if (stateObj.type.category === "MESSAGE") {
			const message = handleDaysWidgetMessage(
				stateObj.type.value,
				stateObj.payload
			);
			setCurrentState(message.message);
		} else {
			setCurrentState("");
		}

		//ELSE???? - check cycles, if no objects -> show welcome info
	}, [cyclesState]);

	return (
		<View style={[styles.daysCard, styles.boxShadow]}>
			<View style={{ flexDirection: "column", alignItems: "center" }}>
				<Text style={styles.stateMessage}>{currentState}</Text>
				<Text style={styles.daysCardCount}>{day}</Text>
				<Text style={styles.daysCardText}>{day == 1 ? "DAY" : "DAYS"}</Text>
			</View>

			<Pressable
				style={[styles.btn, styles.startBtn]}
				onPress={() => {
					navigation.navigate("Calendar");
				}}
			>
				<Text style={styles.btnText}>Mark menstruation</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	boxShadow: {
		shadowColor: Colors.primary,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		borderWidth: 0.5,
		borderColor: Colors.background,
	},
	btn: {
		// backgroundColor: "orange",
		padding: 15,
		marginTop: 10,
		borderRadius: 10,
	},
	btnText: {
		fontSize: 20,
		color: Colors.white,
		fontWeight: "600",
		letterSpacing: 0.5,
	},
	daysCard: {
		width: "90%",
		height: 240,
		backgroundColor: "white",
		marginTop: "5%",
		borderRadius: 14,
		padding: 10,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	daysCardText: {
		fontSize: 30,
		fontWeight: "bold",
		color: Colors.primary,
		opacity: 0.3,
		textAlign: "center",
		// borderWidth: 2,
	},
	daysCardCount: {
		fontSize: 100,
		// color: "#004550",
		color: Colors.primary,
		lineHeight: 98,
		// borderWidth: 2,
		height: 88,
	},
	startBtn: {
		// backgroundColor: "#004550",
		backgroundColor: Colors.secondary,
		width: "100%",
		height: 60,
		alignItems: "center",
		justifyContent: "center",
		marginTop: "auto",
	},
	stateMessage: {
		marginBottom: 5,
		fontWeight: "600",
		fontSize: 16,
		height: 20,
	},
});

export default DaysWidget;
