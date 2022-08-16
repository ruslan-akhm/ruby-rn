import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";
import { convertDateFormat } from "../../helpers/convertDateFormat";

function MonthCalendar(props) {
	const [pickedDays, setPickedDays] = useState({});
	const [unavailableDays, setUnavailableDays] = useState({});
	const todayObject = convertDateFormat([props.today], "/", "-");
	const today = todayObject[0].date;

	useEffect(() => {
		const menstruationDates = Object.keys(props.menstruations).reduce(
			(acc, val) => {
				acc = [...acc, ...props.menstruations[val].days];
				return acc;
			},
			[]
		);
		const formattedDates = convertDateFormat(menstruationDates, "/", "-");
		const calendarFormatted = formattedDates.reduce((acc, val) => {
			acc = {
				...acc,
				[val.date]: {
					customStyles: {
						container: {
							backgroundColor: "pink",
						},
						text: {
							color: "black",
							fontWeight: "bold",
						},
					},
					disabled: true,
					disableTouchEvent: true,
				},
			};
			return acc;
		}, {});
		//update setUnavailableDays state
		setUnavailableDays(calendarFormatted);
		// setUnavailableDays((prevState)=>{
		// 	return {
		// 		...prevState,
		// 		[]
		// 	}
		// })

		// [day.dateString]: {
		// 	customStyles: {
		// 		container: {
		// 			backgroundColor: "green",
		// 		},
		// 		text: {
		// 			color: "black",
		// 			fontWeight: "bold",
		// 		},
		// 	},
		// },
	}, [props.menstruations]);

	const handlePickDay = (day) => {
		/* If day already in the list - remove it */
		if (pickedDays.hasOwnProperty(day.dateString)) {
			/* Remove from chosenDays */
			let filteredChosenDays = props.chosenDays;
			filteredChosenDays = filteredChosenDays.filter((item) => {
				return item.timestamp !== day.timestamp;
			});
			props.setChosenDays([...filteredChosenDays]);

			let prevState = { ...pickedDays };
			delete prevState[day.dateString];
			setPickedDays({ ...prevState });
		} else {
			let updatedChosenDays = props.chosenDays;
			updatedChosenDays.push(day);
			props.setChosenDays([...updatedChosenDays]);
			setPickedDays((prevState) => {
				return {
					...prevState,
					[day.dateString]: {
						customStyles: {
							container: {
								backgroundColor: "green",
							},
							text: {
								color: "black",
								fontWeight: "bold",
							},
							disabled: true,
						},
					},
				};
			});
		}
	};

	return (
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
				// height: 375,
				height: "100%",
				borderRadius: 12,
			}}
			maxDate={today}
			onDayPress={(day) => {
				handlePickDay(day);
				//props.setTodayChosen(day.dateString === today);
				// props.setChosenDay(day);
			}}
			markingType={"custom"}
			markedDates={{
				[today]: {
					customStyles: {
						container: {},
						text: {
							color: "orange",
							fontWeight: "bold",
						},
					},
				},
				...pickedDays,
				...unavailableDays,
			}}
		/>
	);
}

const styles = StyleSheet.create({});

export default MonthCalendar;
