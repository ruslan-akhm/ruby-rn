import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	Pressable,
	Modal,
	Dimensions,
} from "react-native";
import { CalendarList } from "react-native-calendars";

const windowHeight = Dimensions.get("window").height;

function ConfirmationModal(props) {
	const {
		modalVisible,
		setModalVisible,
		modalDate: { chosenDay, daysFromToday },
		autoFill,
		manualFill,
		today,
	} = props;
	const [modalExpanded, setModalExpanded] = useState(false);
	const [markedDates, setMarkedDates] = useState({
		[chosenDay.dateString]: {
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
	});

	const expandModal = () => {
		setModalExpanded(true);
	};
	//MAKE SURE THE DAYS ARE REFLECTED BASED ON NUMBER OF DAYS (NOT FROM 1ST DAY IN MENSTR AND EVERYTHING UP UNTIL LAST DAY OF MENSTR)
	const handleDayPress = (chosenDay) => {
		let updatedDates = { ...markedDates };
		if (chosenDay.dateString in updatedDates) {
			delete updatedDates[chosenDay.dateString];
		} else {
			updatedDates[chosenDay.dateString] = {
				customStyles: {
					container: {
						backgroundColor: "green",
					},
					text: {
						color: "black",
						fontWeight: "bold",
					},
				},
			};
		}
		setMarkedDates({ ...updatedDates });
	};

	const handleSubmit = () => {
		let datesToSubmit = Object.keys(markedDates).map((d) => {
			return {
				day: Math.trunc(new Date(d).getTime() / (24 * 60 * 60 * 1000)),
				date: d,
			};
		});
		manualFill(datesToSubmit);
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(!modalVisible)}
		>
			<View style={styles.tintedBackground}>
				<TouchableOpacity
					style={styles.closeArea}
					onPress={() => setModalVisible(!modalVisible)}
				></TouchableOpacity>
				{modalExpanded ? (
					<View style={styles.modalActiveExpanded}>
						<Text>Please choose days</Text>
						<View style={styles.calendarBox}>
							<CalendarList
								pastScrollRange={5}
								futureScrollRange={0}
								// theme={{
								// 	backgroundColor: "#000",
								// 	calendarBackground: "#000",
								// 	textSectionTitleColor: "#b6c1cd",
								// 	textSectionTitleDisabledColor: "#d9e1e8",
								// 	width: "100%",
								// }}
								// style={{
								// 	height: 375,
								// 	borderRadius: 12,
								// }}
								maxDate={today.calendarFormat}
								onDayPress={(chosenDay) => {
									handleDayPress(chosenDay);
								}}
								markingType={"custom"}
								markedDates={markedDates}
							/>
						</View>
						<Pressable
							style={[styles.options, styles.optionOne]}
							onPress={handleSubmit}
						>
							<Text>Mark **##days**</Text>
						</Pressable>
					</View>
				) : (
					<View style={styles.modalActiveArea}>
						<Text>
							Would you like to mark up all days starting on{" "}
							{new Date(chosenDay.timestamp).toLocaleString("default", {
								month: "long",
							}) +
								" " +
								chosenDay.day}{" "}
							up until today as menstruations?
						</Text>
						<Pressable
							style={[styles.options, styles.optionOne]}
							onPress={autoFill}
						>
							<Text>Fill until today ({daysFromToday} days)</Text>
						</Pressable>
						<Pressable
							style={[styles.options, styles.optionTwo]}
							onPress={expandModal}
						>
							<Text>Pick days myself</Text>
						</Pressable>
					</View>
				)}
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	calendarBox: {
		height: windowHeight * 0.5,
		width: "100%",
		borderWidth: 2,
		marginVertical: 20,
	},
	closeArea: {
		width: "100%",
		height: windowHeight * 0.5,
	},
	modalActiveArea: {
		alignItems: "center",
		marginTop: "auto",
		backgroundColor: "white",
		justifyContent: "flex-start",
		height: windowHeight * 0.5,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	modalActiveExpanded: {
		alignItems: "center",
		marginTop: "auto",
		backgroundColor: "white",
		justifyContent: "flex-start",
		height: windowHeight * 0.7,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	options: {
		padding: 15,
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		marginTop: 20,
		borderRadius: 10,
	},
	optionOne: { borderColor: "purple" },
	optionTwo: {
		borderColor: "purple",
		backgroundColor: "purple",
	},
	tintedBackground: {
		position: "absolute",
		top: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.8)",
	},
});

export default ConfirmationModal;
