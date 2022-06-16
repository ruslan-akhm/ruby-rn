import React from "react";
import { StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";

function MonthCalendar(props) {
	//console.log(props);
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
				height: 375,
				borderRadius: 12,
			}}
			maxDate={props.today.calendarFormat}
			onDayPress={(day) => {
				props.setTodayChosen(() => {
					return day.dateString == props.today.calendarFormat ? true : false;
				});
				props.setChosenDay(day);
			}}
			markingType={"custom"}
			markedDates={{
				[props.today.calendarFormat]: {
					customStyles: {
						container: {},
						text: {
							color: "orange",
							fontWeight: "bold",
						},
					},
				},
				[props.chosenDay.dateString]: {
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
	);
}

const styles = StyleSheet.create({});

export default MonthCalendar;
