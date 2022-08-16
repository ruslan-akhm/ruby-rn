import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";
import {
	View,
	Text,
	Modal,
	Pressable,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { notes } from "../../temp/dummy-data";

import { AntDesign } from "@expo/vector-icons";

import { convertDateFormat } from "../../helpers/convertDateFormat";
import moment from "moment";

const windowHeight = Dimensions.get("window").height;

import DayModal from "./DayModal";

function Calendar(props) {
	//const [chosenDay, setChosenDay] = useState();
	const [markedDates, setMarkedDates] = useState({});
	const [daysInfo, setDaysInfo] = useState({});
	const todayObj = useSelector((state) => state.cycles.today);
	const menstruations = useSelector((state) => state.cycles.menstruations);
	const ovulations = useSelector((state) => state.cycles.ovulations);
	const notes = useSelector((state) => state.notes.notes);
	const formattedToday = convertDateFormat(
		[{ dateString: todayObj.calendarFormat }],
		"/",
		"-"
	);
	const today = formattedToday[0].date;
	const [expandedDay, setExpandedDay] = useState({
		[today]: { types: [], notes: [], id: null },
	});
	const [modalShown, setModalShown] = useState(false);
	const ids = Object.keys(menstruations);

	//ADD NOTES HERE TOO
	useEffect(() => {
		let days = {};
		let marked = ids.reduce((acc, val) => {
			/* Highlight menstruation days */
			const formattedMenstruationDays = convertDateFormat(
				menstruations[val].days,
				"/",
				"-"
			);
			let prevDay;
			formattedMenstruationDays.map((d, index) => {
				const key = d.date;
				if (!acc[key]) {
					acc[key] = {
						color: "#eb346b", //"#70d7c7",
						textColor: "white",
					};
				} else {
					acc[key].color = "#eb346b"; //"#70d7c7";
					acc[key].textColor = "white";
				}
				if (key == today) {
					//acc[key].color = "#eb346b";
					acc[today].customContainerStyle = {
						borderWidth: 1,
						borderColor: "#FFF",
						width: 35,
					};
					// acc[key].customTextStyle = {
					// 	backgroundColor: "orange",
					// 	width: "100%",
					// 	height: "100%",
					// 	marginTop: 0,
					// 	textAlign: "center",
					// 	paddingTop: 6,
					// 	fontWeight: "bold",
					// };
				}
				/* Add roundings to menstruation days */
				if (index === 0) {
					acc[key].startingDay = true;
				} else {
					if (index === menstruations[val].days.length - 1) {
						if (val == Math.max(...ids)) {
							if (menstruations[val].ended) {
								acc[key].endingDay = true;
							} else {
								acc[key].endingDay = false;
							}
						} else {
							acc[key].endingDay = true;
						}
					}
					if (!moment(key).isSame(moment(prevDay).add(1, "days"))) {
						acc[prevDay].endingDay = true;
						acc[key].startingDay = true;
					}
				}

				prevDay = key;
				/* Update days info */
				days[key] = {
					types: ["menstruation"],
					notes: [],
					id: val,
				};
			});

			/* Highlight Ovulation days */
			const formattedOvulationDays = convertDateFormat(
				[ovulations[val].day],
				"/",
				"-"
			);
			const ovulationDay = formattedOvulationDays[0].date;

			if (!acc[ovulationDay]) {
				if (moment(ovulationDay).isBefore(today)) {
					acc[ovulationDay] = {
						customContainerStyle: {
							borderWidth: 0,
							borderColor: "white",
							width: 35,
							backgroundColor: "#FFD700",
						},
						customTextStyle: {
							// backgroundColor: "#FFD700",
							// width: "100%",
							// height: "100%",
							// marginTop: 0,
							// textAlign: "center",
							// paddingTop: 7,
							//fontWeight: "bold",
							color: "white",
						},
					};
				}
			} else {
				acc[ovulationDay].customContainerStyle = {
					borderWidth: 1,
					borderColor: "#eb346b",
					width: 35,
				};
				acc[ovulationDay].color = "#FFD700";
			}
			/* Update days info */
			if (days.hasOwnProperty(ovulationDay)) {
				days[ovulationDay].types = [...days[ovulationDay].types, "ovulation"];
				//days[ovulationDay].id = val;
			} else {
				days[ovulationDay] = {
					types: ["ovulation"],
					notes: [],
					id: val,
				};
			}

			/* Mark (dot) days with notes */
			if (notes.hasOwnProperty(val)) {
				let notesDates = Object.keys(notes[val].dates);
				notesDates.map((date) => {
					if (acc.hasOwnProperty(notes[val].dates[date].calendarFormat)) {
						acc[notes[val].dates[date].calendarFormat].marked = true;
						acc[notes[val].dates[date].calendarFormat].dotColor = "purple";
					} else {
						acc[notes[val].dates[date].calendarFormat] = {
							dotColor: "purple",
							marked: true,
						};
					}
					acc[notes[val].dates[date].calendarFormat].id = val;
					/* Update days info */
					if (days.hasOwnProperty(notes[val].dates[date].calendarFormat)) {
						days[notes[val].dates[date].calendarFormat].notes = [
							...notes[val].dates[date].symptoms,
						];
						//days[notes[val].dates[date].calendarFormat].notes.id = val;
					} else {
						days[notes[val].dates[date].calendarFormat] = {
							types: [],
							notes: [...notes[val].dates[date].symptoms],
							id: val,
						};
					}
				});
			}
			return acc;
		}, {});
		/* Adding style for Today's day */
		if (!marked.hasOwnProperty(today)) {
			marked[today] = {
				color: "transparent",
				//textColor: "white",
				customContainerStyle: {
					borderWidth: 1,
					borderColor: "blue",
					width: 35,
				},
			};
		}
		/* Adding Today to daysInfo */
		if (!days.hasOwnProperty(today)) {
			days[today] = {
				types: [],
				notes: [],
				id: Math.max(...ids),
			};
		}
		setDaysInfo({ ...days });
		setMarkedDates(marked);
	}, [notes]);

	const handleDay = (day) => {
		if (moment(day.dateString).isSame(moment(today).add(1, "days"))) {
			return;
		}
		//check if the date pressed is already in the daysInfo obj
		if (daysInfo.hasOwnProperty(day.dateString)) {
			setExpandedDay({ [day.dateString]: daysInfo[day.dateString] });
		} else {
			setExpandedDay({ [day.dateString]: { types: [], notes: [], id: null } });
		}
		setModalShown(true);
	};

	//add useEffect to open modal ?? need useRef as well to exclude 1st render modal opening

	return (
		<View>
			<CalendarList
				pastScrollRange={12}
				futureScrollRange={0}
				//theme={{
				// backgroundColor: "#000",
				// calendarBackground: "#000",
				// textSectionTitleColor: "#b6c1cd",
				// textSectionTitleDisabledColor: "#d9e1e8",
				// width: "100%",
				//}}
				style={{
					height: "90%",
					borderRadius: 12,
					borderWidth: 3,
				}}
				maxDate={today}
				onDayPress={(day) => handleDay(day)}
				markingType={"period"}
				markedDates={{
					...markedDates,
					// [today]: {
					// 	color: "transparent",
					// 	//textColor: "white",
					// 	customContainerStyle: {
					// 		borderWidth: 1,
					// 		borderColor: "blue",
					// 		width: 35,
					// 	},
					// },
				}}
			/>
			<DayModal
				modalShown={modalShown}
				setModalShown={setModalShown}
				expandedDay={expandedDay}
				handleDay={handleDay}
				today={today}
				dayInfo={daysInfo[today]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({});

export default Calendar;
