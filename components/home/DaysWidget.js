import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { calculateDays } from "../../helpers/calculateDays";
import { determineCurrentState } from "../../helpers/determineCurrentState";
import { markMenstruationsEnd, test } from "../../store/actions/cycle";

const DaysWidget = (props) => {
	const { navigation, cyclesState, userState } = props;
	const dispatch = useDispatch();
	const [day, setDay] = useState(0);
	const [currentState, setCurrentState] = useState("");
	const lastCycle = cyclesState.cycles[cyclesState.cycles.length - 1];

	useEffect(() => {
		const today_day = cyclesState.today.daysCounter; //Math.trunc(Date.now() / (1000 * 60 * 60 * 24));
		let total_days = today_day - lastCycle.startDay + 1;
		setDay(() => {
			return total_days;
		});
	}, [cyclesState]);

	useEffect(() => {
		const current = determineCurrentState(cyclesState, userState);
		//FIX LOGIC HERE TO USE determineCurrentState
		console.log("Determine state!!!");
		console.log(current);
		//RETURNS UNDEFINED IN SOME CASES NOW
		//========================================================
		if (current.type === "state") {
			console.log(current.data);
			//dispatch
			if (current.data == "MARK_MENSTRUATION_END") {
				//+fill up all days up to current.payload
				//set ended: true
				//endedByUser: false
				//isMenstruation: false
				//SHOULD expect ARRAY OF DAYS
				//return dispatch(markMenstruationsEnd(current.payload))

				let updatedMenstruationDays = calculateDays(current.payload);
				console.log(updatedMenstruationDays);
				//PASS ARRAY OF DAYS AND UPDATE LAST CYCLE AND LAST MENSTRUATION
				//dispatch(markMenstruationsEnd());
			}
			if (current.data == "UPDATE_MENSTRUATIONS") {
				//fill up all days up to today
				//EXPECTS ARRAY OF DAYS
				//return dispatch(updateMenstruationDays()) ??
				let updatedMenstruationDays = calculateDays(current.payload);
				console.log(updatedMenstruationDays);
			}
			if (current.data == "UPDATE_MENSTRUATIONS_AND_END_THEM") {
				//fill up all days up until current.payload
				let updatedMenstruationDays = calculateDays(current.payload);
				console.log(updatedMenstruationDays);
			}
		} else if (current.type === "message") {
			setCurrentState(current.data);
		}
		//!lastCycle.isMenstruation -> btn = mark menstruation
		// if last ovulation day.day < today.daysCounter  -> new period
		// else -> same period
		//lastCycle.isMenstruation -> btn = end menstruation

		// setCurrentState(() => {
		// 	if (lastCycle.isMenstruation) {
		// 		return "Menstruation";
		// 	}
		// 	if (lastCycle.isOvulation) {
		// 		return "Ovulation";
		// 	}
		// 	return "";
		// 	//if 3 days before ovul - notify
		// 	//if 3 days before end of cycle - notify
		// });
	}, [lastCycle]);

	return (
		<View style={[styles.daysCard, styles.boxShadow]}>
			<Text style={styles.daysCardText}>It is day</Text>
			<Text style={styles.daysCardCount}>{day}</Text>
			<Text style={styles.daysCardText}>of your cycle</Text>
			<Text>{currentState}</Text>
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
