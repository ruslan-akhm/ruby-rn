import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
	markCycleStart,
	calculateToday,
	setOvulationDay,
	updateMenstruationDays,
} from "../store/actions/cycle";
import { Feather } from "@expo/vector-icons";

import monthsList from "../data/months";
import MonthCalendar from "../components/calendar/MonthCalendar";

import OneWeekCalendar from "../components/calendar/OneWeekCalendar";
import ConfirmationModal from "../components/calendar/ConfirmationModal";
import { calculateCycleDates } from "../helpers/calculateCycleDates";

function CalendarScreen({ route, navigation }) {
	const today = useSelector((state) => state.cycles.today);
	const userState = useSelector((state) => state.user);
	const { timeOffset, cycleLength } = userState;
	/* Calendar state */
	const [expandedCalendar, setExpandedCalendar] = useState(false);
	const [chosenDay, setChosenDay] = useState("");
	const [todayChosen, setTodayChosen] = useState(false);
	const [headerMonths, setHeaderMonths] = useState("");
	/* Modal state */
	const [modalVisible, setModalVisible] = useState(false);
	const [modalDate, setModalDate] = useState({
		day: "",
		month: "",
		daysFromToday: "",
	});
	/* Store cycle data */
	const [cycleData, setCycleData] = useState({
		start: "",
		end: "",
		start_day: "",
		end_day: "",
	});
	const dispatch = useDispatch();

	useEffect(() => {
		const firstDays = [1, 2, 3, 4, 5, 6];
		if (firstDays.includes(parseInt(today.day))) {
			if (today.month == "01") {
				setHeaderMonths(monthsList[12] + "/" + monthsList[1]);
			} else {
				setHeaderMonths(
					monthsList[parseInt(today.month) - 1] +
						"/" +
						monthsList[parseInt(today.month)]
				);
			}
			// setHeaderMonths(() => {
			// 	if (today.month == "01") {
			// 		return [12, 1];
			// 	} else {
			// 	}
			// 	return today.month == "01"
			// 		? [12, 1]
			// 		: [parseInt(today.month) - 1, parseInt(today.month)];
			// });
		} else {
			setHeaderMonths(monthsList[parseInt(today.month)]);
			//setHeaderMonths(parseInt(today.month));
		}
	}, []);

	useEffect(() => {
		dispatch(calculateToday());
	}, []);
	//ONCE SUBMITTED DAYS OF MENSTR - NEW CYCLE IS CREATED
	//IF IT'S ENDED: TRUE (IN MANUAL FILL & AUTO FILL) - NEED TO SET NEW CYCLE WITH IS MENSTR = FALSE
	//AND CHECK HOW MANY DAYS PAST SINCE START DAY TO SET/NOT SET IS OVULATION

	const autoFill = async () => {
		let dates = [];
		let chosen = Math.trunc(chosenDay.timestamp / (24 * 60 * 60 * 1000));
		for (let i = chosen; i <= today.daysCounter; i++) {
			let date = new Date((i + 1) * 24 * 60 * 60 * 1000);
			dates.push({
				date: date.toLocaleDateString(),
				day: i,
			});
		}
		dates = dates.sort((a, b) => a.day - b.day);
		//see if expected == today or 3 days before today. set isOvulation correcponsdingly
		await dispatch(markCycleStart({ ...cycleData, isMenstruation: true }));
		await dispatch(
			updateMenstruationDays({
				days: [...dates],
				ended: false,
				endedByUser: false,
			})
		);
		await dispatch(setOvulationDay({ expected: cycleData.expected }));
		setModalVisible(false);
		navigation.popToTop();
	};

	const manualFill = (datesToSubmit) => {
		/* Sort in ascending order */
		datesToSubmit = datesToSubmit.sort((a, b) => a.day - b.day);

		const dateArr = datesToSubmit[0].date.split("-");
		const dates = calculateCycleDates(
			{
				timestamp: datesToSubmit[0].day * 24 * 60 * 60 * 1000,
				day: parseInt(dateArr[2]),
				month: parseInt(dateArr[1]),
				year: parseInt(dateArr[0]),
			},
			timeOffset,
			cycleLength
		);
		//see if expected == today or 3 days before today.
		//
		const todayIsMenstruation = datesToSubmit
			.map((d) => d.day)
			.includes(today.daysCounter);
		console.log(todayIsMenstruation);
		dispatch(
			markCycleStart({
				...dates,
				isMenstruation: todayIsMenstruation,
			})
		);
		dispatch(
			updateMenstruationDays({
				days: [...datesToSubmit],
				ended: !todayIsMenstruation,
				endedByUser: !todayIsMenstruation,
			})
		);
		dispatch(setOvulationDay({ expected: dates.expected }));
		setModalVisible(false);
		navigation.popToTop();
	};

	function chooseToday() {
		setTodayChosen(true);
		const day = new Date().getDate();
		const month = new Date().getMonth() + 1;
		const year = new Date().getFullYear();
		const dateString = year + "-" + month + "-" + day;
		const timestampHours = Math.trunc(Date.now() / (1000 * 60 * 60));
		const timestamp = (timestampHours + timeOffset) * 60 * 60 * 1000;
		timestampHours +
			setChosenDay({
				dateString,
				day,
				month,
				timestamp,
				year,
			});
	}

	const markDay = async () => {
		const { start, end, start_day, end_day, expected } = calculateCycleDates(
			chosenDay,
			timeOffset,
			cycleLength
		);
		if (todayChosen) {
			await dispatch(
				markCycleStart({ start, end, start_day, end_day, isMenstruation: true })
			);
			await dispatch(
				updateMenstruationDays({
					days: [{ date: start, day: start_day }],
					ended: false,
					endedByUser: false,
				})
			);
			await dispatch(setOvulationDay({ expected }));
		} else {
			setModalDate({
				daysFromToday:
					today.daysCounter -
					Math.trunc(chosenDay.timestamp / (24 * 60 * 60 * 1000)) +
					1,
				chosenDay: chosenDay,
			});
			setCycleData({
				start: start,
				end: end,
				start_day: start_day,
				end_day: end_day,
				expected: expected,
			});
			setModalVisible(true);
			//
		}
	};

	return (
		<View style={styles.container}>
			{!expandedCalendar ? (
				<View style={styles.weekCalendarBox}>
					<OneWeekCalendar
						chosenDay={chosenDay}
						setChosenDay={(day) => setChosenDay(day)}
						setTodayChosen={(bool) => setTodayChosen(bool)}
						today={today}
						headerMonths={headerMonths}
					/>
				</View>
			) : (
				<View style={styles.calendarBox}>
					<MonthCalendar
						chosenDay={chosenDay}
						setChosenDay={(day) => setChosenDay(day)}
						setTodayChosen={(bool) => setTodayChosen(bool)}
						today={today}
					/>
				</View>
			)}
			<Pressable
				style={[styles.btn, styles.expander]}
				onPress={() => setExpandedCalendar(!expandedCalendar)}
			>
				{expandedCalendar ? (
					<>
						<Text>Week</Text>
						<Feather name="chevron-down" size={30} color="black" />
					</>
				) : (
					<>
						<Feather name="chevron-up" size={30} color="black" />
						<Text>Month</Text>
					</>
				)}
			</Pressable>
			<Pressable
				style={[styles.btn, todayChosen ? styles.todayChosen : styles.todayBtn]}
				onPress={chooseToday}
			>
				<Text>Today</Text>
			</Pressable>
			<Pressable
				disabled={!chosenDay}
				style={[styles.btn, styles.todayBtn]}
				onPress={markDay}
			>
				<Text>Mark</Text>
			</Pressable>
			{modalVisible && (
				<ConfirmationModal
					modalDate={modalDate}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					//setOption={setOption}
					autoFill={autoFill}
					manualFill={manualFill}
					today={today}
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

export default CalendarScreen;
