import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { notes } from "../../temp/dummy-data";

function Calendar(props) {
	//const [chosenDay, setChosenDay] = useState();
	const [markedDates, setMarkedDates] = useState({});
	const today = useSelector((state) => state.cycles.today);
	const menstruations = useSelector((state) => state.cycles.menstruations);
	const ovulations = useSelector((state) => state.cycles.ovulations);
	const userNotes = useSelector((state) => state.notes.notes);

	useEffect(() => {
		// const markedDates = menstruations.days.reduce((acc, val) => {
		// 	let key = val.date;
		// 	acc[key] = {
		// 		color: "#70d7c7",
		// 		textColor: "white",
		// 	};
		// }, {});
		const notesDates = Object.values(userNotes).map((n) => n.date);

		let marked = menstruations.reduce((acc, val) => {
			/* highlighting menstruation days */
			val.days.map((d, index) => {
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
				if (key == today.calendarFormat) {
					acc[key].color = "#eb346b";
					acc[key].customContainerStyle = {
						borderWidth: 1,
						borderColor: "white",
						backgroundColor: "green",
					};
				}
				index == 0
					? (acc[key].startingDay = true)
					: index == val.days.length - 1
					? (acc[key].endingDay = true)
					: null;
			});
			/* adding dots under days with notes(symptoms) reported */
			notesDates.map((n) => {
				const key = n.calendarFormat;
				if (!acc[key]) {
					acc[key] = {
						dotColor: "purple",
						marked: true,
					};
				} else {
					acc[key].dotColor = "purple";
				}
				if (key == today.calendarFormat) {
					if (userNotes[today.daysCounter].tags.length == 0) {
						acc[key].marked = false;
					} else {
						acc[key].dotColor = "purple";
						acc[key].marked = true;
					}
				}
			});

			ovulations.map((o) => {
				const key = o.day.date;
				if (!acc[key]) {
					acc[key] = {
						// color: "#FFD700",
						// textColor: "#eb346b",
						borderWidth: 1,
						borderColor: "#FFD700",
					};
				} else {
					//acc[key].color = "#FFD700";
					//acc[key].textColor = "#eb346b"; //"rgba(244,109,87)";
					acc[key].customContainerStyle = {
						borderWidth: 1,
						borderColor: "#FFD700",
					};
					//acc[key].endingDay = true;
					//acc[key].startingDay = true;
					//acc[key].color = "black";
				}
				//IF TODAY IS OVUL - SHOW DIFFERENT STYLE
			});

			return acc;
		}, {});
		setMarkedDates(marked);
	}, []);

	const handleDay = (day) => {
		const key = Math.trunc(day.timestamp / (1000 * 60 * 60 * 24));
		//console.log(key);
		if (userNotes[key]) {
			//console.log(userNotes[key].tags);
		}
	};

	return (
		<View>
			<CalendarList
				pastScrollRange={12}
				futureScrollRange={0}
				// theme={{
				// 	backgroundColor: "#000",
				// 	calendarBackground: "#000",
				// 	textSectionTitleColor: "#b6c1cd",
				// 	textSectionTitleDisabledColor: "#d9e1e8",
				// 	width: "100%",
				// }}
				style={{
					height: 375,
					borderRadius: 12,
				}}
				maxDate={today.calendarFormat}
				// onDayPress={(day) => {
				// 	// setTodayChosen(() => {
				// 	// 	return day.dateString == props.today.calendarFormat ? true : false;
				// 	// });
				// 	setChosenDay(day);
				// }}
				onDayPress={(day) => handleDay(day)}
				markingType={"period"}
				markedDates={{
					...markedDates,
					// [today?.calendarFormat]: {
					// 	color: "transparent",
					// 	//textColor: "white",
					// 	customContainerStyle: {
					// 		borderWidth: 1,
					// 		borderColor: "blue",
					// 	},
					// },
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({});

export default Calendar;
