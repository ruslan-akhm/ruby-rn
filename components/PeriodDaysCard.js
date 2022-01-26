// import React, { useEffect, useState } from "react";
// import { Pressable, StyleSheet, Text, View } from "react-native";
// import { markCycleStart, markCycleEnd, showAll } from "../store/actions/cycle";
// import { useSelector, useDispatch } from "react-redux";

// //ADD ARRAY OF INTERVALS BETWEEN PERIODS TO COUNT AVERAGE based on previous reported intervals?

// function PeriodDaysCard(props) {
// 	// const [day, setDay] = useState(0);
// 	// const [state, setState] = useState("");
// 	// const periods = useSelector((state) => state.periods.periods);
// 	const dispatch = useDispatch();

// 	// useEffect(() => {
// 	// 	const lastPeriod = periods[periods.length - 1];
// 	// 	const today_day = Math.trunc(Date.now() / (1000 * 60 * 60 * 24));
// 	// 	//it is period right now
// 	// 	if (lastPeriod.isCurrent) {
// 	// 		let total_days = today_day - lastPeriod.startDay;
// 	// 		setDay(() => {
// 	// 			return total_days > 0 ? total_days + 1 : 1;
// 	// 		});
// 	// 		setState("period");
// 	// 	} else {
// 	// 		//it is NOT period now
// 	// 		let total_days = today_day - lastPeriod.endDay;
// 	// 		setDay(() => {
// 	// 			return total_days > 0 ? total_days + 1 : 1;
// 	// 		});
// 	// 		setState("regular");
// 	// 	}
// 	// });

// 	// const start = () => {
// 	// 	const date =
// 	// 		new Date().getFullYear() +
// 	// 		"-" +
// 	// 		(new Date().getMonth() + 1) +
// 	// 		"-" +
// 	// 		new Date().getDate();
// 	// 	const start_day = Math.trunc(Date.now() / (1000 * 60 * 60 * 24));
// 	// 	dispatch(markPeriodStart({ date, start_day }));
// 	// 	setState("period");
// 	// };

// 	const end = () => {
// 		// const date =
// 		// 	new Date().getFullYear() +
// 		// 	"-" +
// 		// 	("0" + (new Date().getMonth() + 1)).slice(-2) +
// 		// 	"-" +
// 		// 	("0" + new Date().getDate()).slice(-2);
// 		const date =
// 			new Date().getFullYear() +
// 			"-" +
// 			(new Date().getMonth() + 1) +
// 			"-" +
// 			new Date().getDate();
// 		const end_day = Math.trunc(Date.now() / (1000 * 60 * 60 * 24));
// 		dispatch(markCycleEnd({ date, end_day }));
// 		props.setState("regular");
// 	};

// 	// const show = () => {
// 	// 	dispatch(showAll());
// 	// };

// 	return (
// 		<View style={styles.daysCard}>
// 			<Text style={styles.daysCardText}>It is day</Text>
// 			<Text style={styles.daysCardCount}>{props.day}</Text>
// 			<Text style={styles.daysCardText}> of your period</Text>
// 			<Pressable style={[styles.btn, styles.endBtn]} onPress={end}>
// 				<Text style={styles.btnText}>mark period end</Text>
// 			</Pressable>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	box: {
// 		flex: 1,
// 		alignItems: "center",
// 		justifyContent: "flex-start",
// 		backgroundColor: "darkgrey",
// 	},
// 	btn: {
// 		backgroundColor: "orange",
// 		padding: 15,
// 		marginTop: 10,
// 		borderRadius: 5,
// 	},
// 	btnText: {
// 		fontSize: 20,
// 	},
// 	daysCard: {
// 		width: "80%",
// 		height: 240,
// 		backgroundColor: "white",
// 		marginTop: 40,
// 		borderRadius: 5,
// 		padding: 10,
// 		alignItems: "center",
// 		justifyContent: "flex-start",
// 	},
// 	daysCardText: {
// 		fontSize: 20,
// 	},
// 	daysCardCount: {
// 		fontSize: 78,
// 		color: "#004550",
// 	},
// 	endBtn: {
// 		backgroundColor: "#ffc8bf",
// 		width: "100%",
// 		height: 60,
// 		alignItems: "center",
// 		justifyContent: "center",
// 		marginTop: "auto",
// 	},
// 	safeArea: {
// 		flex: 1,
// 		backgroundColor: "gray",
// 	},
// 	startBtn: {
// 		backgroundColor: "#004550",
// 		width: "100%",
// 		height: 60,
// 		alignItems: "center",
// 		justifyContent: "center",
// 		marginTop: "auto",
// 	},
// });

// export default PeriodDaysCard;
