import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { WeekCalendar, CalendarProvider } from "react-native-calendars";

function OneWeekCalendar(props) {
	return (
		<CalendarProvider
			style={styles.provider}
			date={props.today.calendarFormat}
			showTodayButton={false}
			disabledOpacity={0.6}
			style={{
				height: 125,
				borderRadius: 12,
				borderWidth: 2,
				width: "100%",
			}}
		>
			<View style={styles.weekCalendarHeader}>
				<Text>{props.headerMonths}</Text>
			</View>
			<WeekCalendar
				firstDay={
					parseInt(props.today.weekDay) == 6
						? 0
						: parseInt(props.today.weekDay) + 1
				}
				onDayPress={(day) => {
					props.setTodayChosen(() => {
						return day.dateString == props.today.calendarFormat ? true : false;
					});

					props.setChosenDay(day);
				}}
				style={{
					//borderWidth: 1,
					borderColor: "red",
					maxWidth: "95%",
					paddingRight: "5%",
					paddingLeft: "4%",
				}}
				markingType={"custom"}
				markedDates={{
					// "2022-01-09": {
					// 	customStyles: {
					// 		container: {
					// 			width: 28,
					// 			marginLeft: 0,
					// 			padding: 0,
					// 			backgroundColor: "red",
					// 		},
					// 		text: {
					// 			color: "orange",
					// 			fontWeight: "bold",
					// 		},
					// 	},
					// },
					[props.today.calendarFormat]: {
						customStyles: {
							container: {
								//backgroundColor: "red",
							},
							text: {
								color: "orange",
								//fontWeight: "bold",
							},
						},
					},
					[props.chosenDay.dateString]: {
						customStyles: {
							container: {
								backgroundColor: "red",
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
	);
}

const styles = StyleSheet.create({
	provider: {
		//backgroundColor: "red",
		//flex: 0.36,
	},
	weekCalendarHeader: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
	},
});

export default OneWeekCalendar;
