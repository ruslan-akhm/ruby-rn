import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
	markMenstruation,
	calculateToday,
	setOvulationDay,
	updateMenstruationDays,
} from "../store-1/actions/cycle";

import monthsList from "../data/months";
import MonthCalendar from "../components/calendar/MonthCalendar";
import ConfirmationModal from "../components/calendar/ConfirmationModal";
import { calculateCycleDates } from "../helpers/calculateCycleDates";

function CalendarScreen({ route, navigation }) {
	const today = useSelector((state) => state.cycles.today);
	const menstruations = useSelector((state) => state.cycles.menstruations);

	const [chosenDays, setChosenDays] = useState([]);
	const [todayChosen, setTodayChosen] = useState(false);
	const [daysFlow, setDaysFlow] = useState("today"); //"calendar"
	/* Modal state */
	const [modalVisible, setModalVisible] = useState(false);
	const [modalDate, setModalDate] = useState({
		day: "",
		month: "",
		daysFromToday: "",
	});
	/* Store cycle data */
	// const [cycleData, setCycleData] = useState({
	// 	start: "",
	// 	end: "",
	// 	start_day: "",
	// 	end_day: "",
	// });
	const dispatch = useDispatch();

	useEffect(() => {
		if (chosenDays.length > 0) {
			setDaysFlow("calendar");
		} else {
			setDaysFlow("today");
		}
	}, [chosenDays]);

	// useEffect(() => {
	// 	dispatch(calculateToday());
	// }, []);
	//ONCE SUBMITTED DAYS OF MENSTR - NEW CYCLE IS CREATED
	//IF IT'S ENDED: TRUE (IN MANUAL FILL & AUTO FILL) - NEED TO SET NEW CYCLE WITH IS MENSTR = FALSE
	//AND CHECK HOW MANY DAYS PAST SINCE START DAY TO SET/NOT SET IS OVULATION

	// const autoFill = async () => {
	// 	let dates = [];
	// 	let chosen = Math.trunc(chosenDay.timestamp / (24 * 60 * 60 * 1000));
	// 	for (let i = chosen; i <= today.daysCounter; i++) {
	// 		let date = new Date((i + 1) * 24 * 60 * 60 * 1000);
	// 		dates.push({
	// 			date: date.toLocaleDateString(),
	// 			day: i,
	// 		});
	// 	}
	// 	dates = dates.sort((a, b) => a.day - b.day);
	// 	//see if expected == today or 3 days before today. set isOvulation correcponsdingly
	// 	await dispatch(markCycleStart({ ...cycleData, isMenstruation: true }));
	// 	await dispatch(
	// 		updateMenstruationDays({
	// 			days: [...dates],
	// 			ended: false,
	// 			endedByUser: false,
	// 		})
	// 	);
	// 	await dispatch(setOvulationDay({ expected: cycleData.expected }));
	// 	setModalVisible(false);
	// 	navigation.popToTop();
	// };

	// const manualFill = (datesToSubmit) => {
	// 	/* Sort in ascending order */
	// 	datesToSubmit = datesToSubmit.sort((a, b) => a.day - b.day);

	// 	const dateArr = datesToSubmit[0].date.split("-");
	// 	const dates = calculateCycleDates(
	// 		{
	// 			timestamp: datesToSubmit[0].day * 24 * 60 * 60 * 1000,
	// 			day: parseInt(dateArr[2]),
	// 			month: parseInt(dateArr[1]),
	// 			year: parseInt(dateArr[0]),
	// 		},
	// 		timeOffset,
	// 		cycleLength
	// 	);
	// 	//see if expected == today or 3 days before today.
	// 	//
	// 	const todayIsMenstruation = datesToSubmit
	// 		.map((d) => d.day)
	// 		.includes(today.daysCounter);
	// 	console.log(todayIsMenstruation);
	// 	dispatch(
	// 		markCycleStart({
	// 			...dates,
	// 			isMenstruation: todayIsMenstruation,
	// 		})
	// 	);
	// 	dispatch(
	// 		updateMenstruationDays({
	// 			days: [...datesToSubmit],
	// 			ended: !todayIsMenstruation,
	// 			endedByUser: !todayIsMenstruation,
	// 		})
	// 	);
	// 	dispatch(setOvulationDay({ expected: dates.expected }));
	// 	setModalVisible(false);
	// 	navigation.popToTop();
	// };

	/* Basically show today only if no other day was chosen, once chose any day -> change today button to be "Mark" or "Log". Pop up modal should ask for confirmation */
	const handlePressToday = () => {
		setTodayChosen(true);
		setChosenDays([today]);
		setModalVisible(true);
		//when closing modal, if todayChosen == true, then set it to false and clear chosenDays

		/*
		setTodayChosen(true);
		const day = new Date().getDate();
		const month = new Date().getMonth() + 1;
		const year = new Date().getFullYear();
		const dateString =
			year +
			"-" +
			(month < 10 ? "0" + month : month) +
			"-" +
			(day < 10 ? "0" + day : day);
		const timestampHours = Math.trunc(Date.now() / (1000 * 60 * 60));
		const timestamp = (timestampHours + timeOffset) * 60 * 60 * 1000;
		*/
		// console.log(chosenDays);
		// let updatedChosenDays = chosenDays;
		// updatedChosenDays.push({
		// 	dateString,
		// 	day,
		// 	month,
		// 	timestamp,
		// 	year,
		// });

		// setChosenDays([...updatedChosenDays]);
	};

	const handlePressMark = () => {
		// const { start, end, start_day, end_day, expected } = calculateCycleDates(
		// 	chosenDay,
		// 	timeOffset,
		// 	cycleLength
		// );
		//console.log(today.calendarFormat);

		//SHOULD NOT EVEN BE THE CASE !!HERE!!  CLICKING TODAY WILL OPEN A POP UP WITH CONFIRMATION. MARK BUTTON WILL SHOW ONLY ONCE A CALENDAR ITEM WAS PICKED (ANY DATE, EVEN TODAYS DAY)
		//if (todayChosen) {
		//console.log(chosenDays);
		setModalVisible(true);
		// dispatch(
		// 	markMenstruation({
		// 		days: chosenDays, //[today.calendarFormat],
		// 		end: "",
		// 		//isMenstruation: true,
		// 	})
		// );

		//console.log(st);
		// dispatch(
		// 	updateMenstruationDays({
		// 		days: [{ date: start, day: start_day }],
		// 		ended: false,
		// 		endedByUser: false,
		// 	})
		// );
		// dispatch(setOvulationDay({ expected }));
		// navigation.popToTop();
		//} else {
		// setModalDate({
		// 	daysFromToday:
		// 		today.daysCounter -
		// 		Math.trunc(chosenDay.timestamp / (24 * 60 * 60 * 1000)) +
		// 		1,
		// 	chosenDay: chosenDay,
		// });
		// setCycleData({
		// 	start: start,
		// 	end: end,
		// 	start_day: start_day,
		// 	end_day: end_day,
		// 	expected: expected,
		// });
		// setModalVisible(true);
		//}
	};

	return (
		<View style={styles.container}>
			<View style={styles.calendarBox}>
				<MonthCalendar
					chosenDays={chosenDays}
					setChosenDays={(day) => setChosenDays(day)}
					menstruations={menstruations}
					// setTodayChosen={(bool) => setTodayChosen(bool)}
					today={today}
				/>
			</View>
			<Text>Pick a start day</Text>
			{daysFlow == "calendar" && (
				<Pressable
					//disabled={!chosenDay}
					style={[styles.btn, styles.todayBtn]}
					onPress={handlePressMark}
				>
					<Text>Mark</Text>
				</Pressable>
			)}
			{daysFlow == "today" && (
				<Pressable
					style={[styles.btn, styles.todayBtn]}
					onPress={handlePressToday}
				>
					<Text>Today</Text>
				</Pressable>
			)}
			{modalVisible && (
				<ConfirmationModal
					//modalDate={modalDate}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					daysFlow={daysFlow}
					todayChosen={todayChosen}
					chosenDays={chosenDays}
					setChosenDays={(day) => setChosenDays(day)}
					navigation={navigation}
					//setOption={setOption}
					//autoFill={autoFill}
					//manualFill={manualFill}
					//today={today}
				/>
			)}
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
		height: "70%",
		width: "100%",
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
		paddingTop: 20,
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

export default CalendarScreen;
