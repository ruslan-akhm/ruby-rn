import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import {
	Calendar,
	CalendarList,
	Agenda,
	WeekCalendar,
	CalendarProvider,
} from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import { markCycleStart, calculateToday } from "../store/actions/cycle";
import { Feather } from "@expo/vector-icons";

import monthsList from "../data/months";

function CalendarScreen({ route, navigation }) {
	const today = useSelector((state) => state.cycles.today);
	const dispatch = useDispatch();
	const [expandedCalendar, setExpandedCalendar] = useState(false);
	const [chosenDay, setChosenDay] = useState("");
	const [todayChosen, setTodayChosen] = useState(false);
	const [headerMonths, setHeaderMonths] = useState("");

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

	function chooseToday() {
		setTodayChosen(true);
		const day = new Date().getDate();
		const month = new Date().getMonth() + 1;
		const year = new Date().getFullYear();
		const dateString = year + "-" + month + "-" + day;
		const timestamp = Date.now();
		setChosenDay({
			dateString,
			day,
			month,
			timestamp,
			year,
		});
	}

	const markDay = () => {
		let end;
		const { day, month, year } = chosenDay;
		const start = month + "/" + day + "/" + year;
		if (day == 1) {
			const evenMonths = [2, 4, 6, 8, 9, 11];
			const oddMonths = [5, 7, 10, 12];
			if (month == 1) {
				end = "12/31/" + (year - 1);
			} else if (evenMonths.includes(month)) {
				end = month - 1 + "/31/" + year;
			} else if (oddMonths.includes(month)) {
				end = month - 1 + "/30/" + year;
			} else {
				const leap_years = [2020, 2024, 2028, 2032, 2036, 2040];
				if (leap_years.includes(year)) {
					end = month - 1 + "/29/" + year;
				} else {
					end = month - 1 + "/28/" + year;
				}
			}
		} else {
			end = month + "/" + (day - 1) + "/" + year;
		}
		const start_day = Math.trunc(
			new Date(start).getTime() / (1000 * 60 * 60 * 24)
		);
		const end_day = Math.trunc(new Date(end).getTime() / (1000 * 60 * 60 * 24));
		dispatch(markCycleStart({ start, end, start_day, end_day }));
	};

	return (
		<View style={styles.container}>
			{!expandedCalendar ? (
				<View style={styles.calendarBox}>
					<CalendarProvider
						style={styles.provider}
						date={today.calendarFormat}
						showTodayButton={false}
						disabledOpacity={0.6}
					>
						<View style={styles.weekCalendarHeader}>
							<Text>{headerMonths}</Text>
						</View>
						<WeekCalendar
							firstDay={
								parseInt(today.weekDay) == 6 ? 0 : parseInt(today.weekDay) + 1
							}
							onDayPress={(day) => {
								setTodayChosen(() => {
									return day.dateString == today.calendarFormat ? true : false;
								});

								setChosenDay(day);
							}}
							markingType={"custom"}
							markedDates={{
								[today.calendarFormat]: {
									customStyles: {
										container: {},
										text: {
											color: "orange",
											fontWeight: "bold",
										},
									},
								},
								[chosenDay]: {
									customStyles: {
										container: {
											backgroundColor: "green",
										},
										text: {
											color: "black",
											fontWeight: "bold",
										},
									},
								},
							}}
						/>
					</CalendarProvider>
				</View>
			) : (
				<View style={styles.calendarBox}>
					<CalendarList
						pastScrollRange={1}
						futureScrollRange={0}
						theme={{
							backgroundColor: "#000",
							calendarBackground: "#000",
							textSectionTitleColor: "#b6c1cd",
							textSectionTitleDisabledColor: "#d9e1e8",
							//selectedDayBackgroundColor: "#00adf5",
						}}
						maxDate={today.calendarFormat}
						onDayPress={(day) => {
							setTodayChosen(() => {
								return day.dateString == today.calendarFormat ? true : false;
							});
							setChosenDay(day);
						}}
						markingType={"custom"}
						markedDates={{
							[today.calendarFormat]: {
								customStyles: {
									container: {},
									text: {
										color: "orange",
										fontWeight: "bold",
									},
								},
							},
							[chosenDay]: {
								customStyles: {
									container: {
										backgroundColor: "green",
									},
									text: {
										color: "black",
										fontWeight: "bold",
									},
								},
							},
						}}
					/>
					{/* <Calendar maxDate={today.calendarFormat} firstDay={1} /> */}
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
			<Pressable style={[styles.btn, styles.todayBtn]} onPress={markDay}>
				<Text>Mark</Text>
			</Pressable>
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
	calendarBox: {
		flex: 0.55,
		width: "100%",
		height: 100,
		backgroundColor: "blue",
		justifyContent: "flex-end",
	},
	container: {
		flex: 1,
		backgroundColor: "green",
		alignItems: "center",
		justifyContent: "center",
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
	provider: {
		backgroundColor: "red",
		flex: 0.36,
	},
	weekCalendarHeader: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
	},
});

export default CalendarScreen;
