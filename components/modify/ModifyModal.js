import React, { useEffect, useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	StatusBar,
	Button,
	Modal,
	Switch,
} from "react-native";
import { Calendar, CalendarList } from "react-native-calendars";
import { convertDateFormat } from "../../helpers/convertDateFormat";
import { modifyMenstruation, deleteCycle } from "../../store-1/actions/cycle";

import { useDispatch } from "react-redux";

// const MenstruationCalendar = (props) => {
// 	const { defaultMonthView, todayDay, pickedDays } = props;
// 	return (
// 		<CalendarList
// 			initialDate={defaultMonthView}
// 			pastScrollRange={12}
// 			futureScrollRange={1}
// 			// // theme={{
// 			// // 	backgroundColor: "#000",
// 			// // 	calendarBackground: "#000",
// 			// // 	textSectionTitleColor: "#b6c1cd",
// 			// // 	textSectionTitleDisabledColor: "#d9e1e8",
// 			// // 	width: "100%",
// 			// // }}
// 			// style={{
// 			// 	height: "100%",
// 			// 	borderRadius: 12,
// 			// }}
// 			maxDate={todayDay}
// 			onDayPress={(day) => {
// 				handlePickDay(day);
// 			}}
// 			markingType={"custom"}
// 			markedDates={{
// 				// [today]: {
// 				// 	customStyles: {
// 				// 		container: {},
// 				// 		text: {
// 				// 			color: "orange",
// 				// 			fontWeight: "bold",
// 				// 		},
// 				// 	},
// 				// },
// 				...pickedDays,
// 			}}
// 		/>
// 	);
// };

// const NotesCalendar = (props) => {
// 	const { defaultMonthView, todayDay, notedDays } = props;
// 	return (
// 		<CalendarList
// 			initialDate={defaultMonthView}
// 			pastScrollRange={12}
// 			futureScrollRange={1}
// 			// // theme={{
// 			// // 	backgroundColor: "#000",
// 			// // 	calendarBackground: "#000",
// 			// // 	textSectionTitleColor: "#b6c1cd",
// 			// // 	textSectionTitleDisabledColor: "#d9e1e8",
// 			// // 	width: "100%",
// 			// // }}
// 			// style={{
// 			// 	height: "100%",
// 			// 	borderRadius: 12,
// 			// }}
// 			maxDate={todayDay}
// 			onDayPress={(day) => {
// 				handlePickDay(day);
// 			}}
// 			markingType={"custom"}
// 			markedDates={{
// 				// [today]: {
// 				// 	customStyles: {
// 				// 		container: {},
// 				// 		text: {
// 				// 			color: "orange",
// 				// 			fontWeight: "bold",
// 				// 		},
// 				// 	},
// 				// },
// 				...notedDays,
// 			}}
// 		/>
// 	);
// };

function ModifyModal({
	id,
	menstruationDates,
	expandedItem,
	setExpandedItem,
	today,
	currentId,
	canBeRemoved,
	notesDates,
}) {
	const dispatch = useDispatch();
	const [error, setError] = useState({ state: false, text: "Error here" });
	const [view, setView] = useState("menstruations");
	const [pickedDays, setPickedDays] = useState({});
	const [notedDays, setNotedDays] = useState({});
	const [updateDisabled, setUpdateDisabled] = useState(true);
	const [defaultMonthView, setDefaultMonthView] = useState();
	const todayObject = convertDateFormat([today], "/", "-");
	const todayDay = todayObject[0].date;

	const [switchEnabled, setSwitchEnabled] = useState(false);
	//HAS TO AUTO SCROLL CALENDAR TO THE MONTH WHERE MENSTRS WERE
	console.log("notesDates");
	console.log(notesDates);
	useEffect(() => {
		const formattedDates = convertDateFormat(menstruationDates, "/", "-");
		setDefaultMonthView(formattedDates[0].date);
		const styledDays = formattedDates.reduce((acc, day) => {
			acc[day.date] = {
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
			};
			return acc;
		}, {});
		setPickedDays({ ...styledDays });

		const notes = Object.keys(notesDates).reduce((acc, day) => {
			acc[notesDates[day].calendarFormat] = {
				marked: true,
				dotColor: "red",
			};
			return acc;
		}, {});
	}, [id]);

	const handlePickDay = (day) => {
		if (error.state) {
			setError({ state: false, text: "" });
		}
		if (updateDisabled) setUpdateDisabled(false);
		let updatedPickedDays = { ...pickedDays };
		if (pickedDays.hasOwnProperty(day.dateString)) {
			delete updatedPickedDays[day.dateString];
		} else {
			updatedPickedDays[day.dateString] = {
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
			};
		}
		setPickedDays({ ...updatedPickedDays });
	};

	const toggleSwitch = () => {
		if (updateDisabled) setUpdateDisabled(false);
		setSwitchEnabled((previousState) => !previousState);
	};
	//!!!!!!!!!!SHOULD ADD the limit, ie can not pick days that are past next cycle start day????
	const submitUpdatedDates = () => {
		if (Object.keys(pickedDays).length < 1 || !pickedDays) {
			setError({ state: true, text: "Pick at least 1 day" });
			return;
		}
		const newDates = Object.keys(pickedDays).reduce((acc, val) => {
			acc = [...acc, { dateString: val }];
			return acc;
		}, []);
		dispatch(modifyMenstruation({ id, newDates, endMarking: switchEnabled }));
		setExpandedItem(null);
	};

	const removeLog = () => {
		//ADD: "ARE YOU SURE YOU WANNA DELETE ?""
		dispatch(deleteCycle({ id }));
		setExpandedItem(null);
	};

	// onDayLongPress={day => {
	// 	console.log('selected day', day);
	//   }}

	///
	///
	/// Either add Tab navigator Pressable and add logic to call functions/styling/render depending on which tab is chosen
	///
	///
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={Boolean(expandedItem)}
			onRequestClose={() => setExpandedItem(null)}
		>
			<View
				style={{
					alignItems: "center",
					marginTop: "auto",
					backgroundColor: "white",
					justifyContent: "flex-start",
					height: "100%",
					paddingTop: "20%",
				}}
			>
				{/* <View
					style={{
						flexDirection: "row",

						borderWidth: 2,
						width: "100%",
					}}
				>
					<Pressable
						style={{
							padding: 10,
							borderWidth: 2,
							borderColor: "green",
							width: "50%",
							alignItems: "center",
						}}
						onPress={() => setView("menstruations")}
					>
						<Text>Menstruations</Text>
					</Pressable>
					<Pressable
						style={{
							padding: 10,
							borderWidth: 2,
							borderColor: "green",
							width: "50%",
							alignItems: "center",
						}}
						onPress={() => setView("notes")}
					>
						<Text>Notes</Text>
					</Pressable>
				</View> */}
				<Text>{view} - Change days:</Text>
				<View
					style={{
						height: "50%",
						width: "100%",
						borderWidth: 4,
					}}
				>
					{defaultMonthView && (
						// &&
						// 	(view === "menstruations" ? (
						// 		<MenstruationCalendar
						// 			defaultMonthView={defaultMonthView}
						// 			todayDay={todayDay}
						// 			pickedDays={pickedDays}
						// 		/>
						// 	) : (
						// 		<NotesCalendar
						// 			defaultMonthView={defaultMonthView}
						// 			todayDay={todayDay}
						// 			notedDays={notedDays}
						// 		/>
						// 	))

						<CalendarList
							initialDate={defaultMonthView}
							pastScrollRange={12}
							futureScrollRange={1}
							// // theme={{
							// // 	backgroundColor: "#000",
							// // 	calendarBackground: "#000",
							// // 	textSectionTitleColor: "#b6c1cd",
							// // 	textSectionTitleDisabledColor: "#d9e1e8",
							// // 	width: "100%",
							// // }}
							// style={{
							// 	height: "100%",
							// 	borderRadius: 12,
							// }}
							maxDate={todayDay}
							onDayPress={(day) => {
								handlePickDay(day);
							}}
							markingType={"custom"}
							markedDates={{
								// [today]: {
								// 	customStyles: {
								// 		container: {},
								// 		text: {
								// 			color: "orange",
								// 			fontWeight: "bold",
								// 		},
								// 	},
								// },
								...pickedDays,
							}}
						/>
					)}
				</View>
				<View style={styles.errorBox}>
					{error.state && <Text>{error.text}</Text>}
				</View>
				{id == currentId && (
					<View style={styles.switchBox}>
						<Switch
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							thumbColor={switchEnabled ? "#f5dd4b" : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={switchEnabled}
						/>
						<Text style={styles.switchLabel}>
							My current menstruations have ended
						</Text>
					</View>
				)}
				<Pressable
					style={
						updateDisabled
							? {
									backgroundColor: "gray",
									paddingHorizontal: 40,
									paddingVertical: 10,
									marginVertical: 20,
							  }
							: {
									backgroundColor: "green",
									paddingHorizontal: 40,
									paddingVertical: 10,
									marginVertical: 20,
							  }
					}
					disabled={updateDisabled}
					onPress={submitUpdatedDates}
				>
					<Text>Save</Text>
				</Pressable>
				{id == currentId && (
					<Text>
						Modifying current menstruations will stop auto-filling them
					</Text>
				)}
				<Text>---------------Remove:----------------</Text>
				{canBeRemoved && (
					<Pressable
						style={{
							backgroundColor: "salmon",
							paddingHorizontal: 40,
							paddingVertical: 10,
							marginVertical: 20,
						}}
						onPress={removeLog}
					>
						<Text>Remove from the logs</Text>
					</Pressable>
				)}
				<Pressable
					onPress={() => setExpandedItem(null)}
					style={{
						backgroundColor: "red",
						padding: 40,
						marginTop: "auto",
						marginBottom: 40,
					}}
				>
					<Text>Close</Text>
				</Pressable>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	errorBox: {
		borderWidth: 2,
		borderColor: "red",
		width: "100%",
		height: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	switchBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	switchLabel: {
		marginLeft: 10,
		fontSize: 18,
	},
});

export default ModifyModal;
