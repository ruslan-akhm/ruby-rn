import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Pressable,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from "react-native";
import { WeekCalendar, CalendarProvider } from "react-native-calendars";
import Colors from "../../constants/Colors";
import { convertDateFormat } from "../../helpers/convertDateFormat";

function OneWeekCalendar(props) {
	const today = convertDateFormat(
		[{ calendarFormat: props.today.calendarFormat }],
		"/",
		"-"
	);
	return (
		<CalendarProvider
			style={styles.provider}
			date={props.today.calendarFormat}
			showTodayButton={false}
			disabledOpacity={0.6}
		>
			<View style={styles.weekCalendarHeader}>
				<Text style={{ fontSize: 18, fontFamily: "Avenir-Light" }}>
					{props.headerMonth}
				</Text>
			</View>

			<WeekCalendar
				firstDay={0}
				scrollEnabled={false}
				pagingEnabled={false}
				theme={{
					backgroundColor: "transparent",
					calendarBackground: "transparent",
					textDayFontWeight: "400",
				}}
				// showsHorizontalScrollIndicator={false}
				// horizontal={false}
				// firstDay={
				// 	parseInt(props.today.weekDay) == 6
				// 		? 0
				// 		: parseInt(props.today.weekDay) + 1
				// }
				// onDayPress={(day) => {
				// 	props.setTodayChosen(() => {
				// 		return day.dateString == props.today.calendarFormat ? true : false;
				// 	});

				// 	props.setChosenDay(day);
				// }}
				style={{
					//borderWidth: 1,
					// borderColor: "blue",
					// borderWidth: 1,
					// overflowX: "hidden",
					// maxWidth: "100%",
					// paddingRight: "4%",
					// paddingLeft: "4%",
					backgroundColor: "transparent",
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
					[today[0].date]: {
						customStyles: {
							container: {
								backgroundColor: Colors.primary,
							},
							text: {
								color: Colors.background,
								// fontWeight: "r00",
								//fontWeight: "bold",
							},
						},
					},
					// [props.chosenDay.dateString]: {
					// 	customStyles: {
					// 		container: {
					// 			backgroundColor: "red",
					// 		},
					// 		text: {
					// 			color: "black",
					// 			fontWeight: "bold",
					// 		},
					// 	},
					// },
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
		flexDirection: "row",
	},
});

export default OneWeekCalendar;
