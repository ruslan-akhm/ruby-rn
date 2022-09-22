import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { calculateDays } from "../../helpers/calculateDays";
import { determineCurrentMessage } from "../../helpers/determineCurrentMessage";
import handleDaysWidgetMessage from "../../helpers/handleDaysWidgetMessage";

import CircularProgress from "react-native-circular-progress-indicator";

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

	// console.log(cyclesState);

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
		<View
			style={{
				flex: 1,
				width: "100%",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<View style={styles.rightEdgeShadow}>
				<Text>123</Text>
			</View>
			<View
				style={{
					flex: 4,
					borderWidth: 2,
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<View style={[styles.daysCard, styles.boxShadow]}>
					<View
						style={{
							position: "absolute",
							top: "-10%",
							right: "-10%",
							width: "120%",
							height: "120%",
							borderWidth: 2,
							borderRadius: 260,
						}}
					>
						<CircularProgress
							value={60}
							radius={120}
							duration={2000}
							progressValueColor={"#ecf0f1"}
							maxValue={200}
							title={"KM/H"}
							titleColor={"white"}
							titleStyle={{ fontWeight: "bold" }}
						/>
					</View>
					<View
						style={{
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "flex-start",
							// borderWidth: 3,
							height: "100%",
							width: "100%",
							padding: 25,
							// paddingTop: 30,
						}}
					>
						<Text style={styles.stateMessage}>{currentState}</Text>
						<Text style={styles.daysCardCount}>{day}</Text>
						<Text style={styles.daysCardText}>{day == 1 ? "day" : "days"}</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					flex: 1,
					// borderWidth: 2,
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Pressable
					style={[styles.btn, styles.startBtn]}
					onPress={() => {
						navigation.navigate("Calendar");
					}}
				>
					<Text style={styles.btnText}>Mark menstruation</Text>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	rightEdgeShadow: {
		shadowColor: Colors.primary,
		shadowOffset: { width: -50, height: 0 },
		shadowOpacity: 0.99,
		shadowRadius: 83,
		borderWidth: 1,
		borderColor: Colors.background,
		position: "absolute",
		bottom: -140,
		right: -85,
		width: 80,
		height: 180,
		backgroundColor: Colors.primary,
	},

	boxShadow: {
		shadowColor: Colors.primary,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 22,
		borderWidth: 0.5,
		borderColor: Colors.background,
	},
	btn: {
		// backgroundColor: "orange",
		padding: 15,
		// marginTop: 10,
		borderRadius: 10,
	},
	btnText: {
		fontSize: 20,
		color: Colors.white,
		fontWeight: "600",
		letterSpacing: 0.5,
	},
	daysCard: {
		// flex: 1,
		width: 280, //"90%",
		height: 275,
		backgroundColor: "white",
		marginTop: "5%",
		borderRadius: 260,
		// padding: 10,
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		borderColor: "#000",
	},
	daysCardText: {
		fontSize: 20,
		// fontWeight: "bold",
		// color: Colors.primary,
		// opacity: 0.3,
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
		marginBottom: 10,
		fontWeight: "bold",
	},
	startBtn: {
		// backgroundColor: "#004550",
		backgroundColor: Colors.primary,
		width: "90%",
		height: 60,
		alignItems: "center",
		justifyContent: "center",
		// marginTop: "auto",
	},
	stateMessage: {
		marginBottom: 20,
		fontWeight: "600",
		fontSize: 18,
		height: "auto",
		fontFamily: "Avenir-Light",
		// borderWidth: 2,
		width: "60%",
		// paddingHorizontal: 20,
		textAlign: "center",
	},
});

export default DaysWidget;
