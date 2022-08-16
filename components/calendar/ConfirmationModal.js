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
import {
	markMenstruation,
	calculateToday,
	setOvulationDay,
	updateMenstruationDays,
} from "../../store-1/actions/cycle";
import { useSelector, useDispatch } from "react-redux";

const windowHeight = Dimensions.get("window").height;

function ConfirmationModal(props) {
	const dispatch = useDispatch();
	const {
		modalVisible,
		setModalVisible,
		//modalDate: { chosenDay, daysFromToday },
		//autoFill,
		//manualFill,
		//today,
		chosenDays,
		setChosenDays,
		daysFlow,
		todayChosen,
		navigation,
	} = props;
	//const [modalExpanded, setModalExpanded] = useState(false);

	//console.log(chosenDays);
	// const [markedDates, setMarkedDates] = useState({
	// 	[chosenDay.dateString]: {
	// 		customStyles: {
	// 			container: {
	// 				backgroundColor: "green",
	// 			},
	// 			text: {
	// 				color: "black",
	// 				fontWeight: "bold",
	// 			},
	// 		},
	// 	},
	// });

	// const expandModal = () => {
	// 	setModalExpanded(true);
	// };
	//MAKE SURE THE DAYS ARE REFLECTED BASED ON NUMBER OF DAYS (NOT FROM 1ST DAY IN MENSTR AND EVERYTHING UP UNTIL LAST DAY OF MENSTR)
	// const handleDayPress = (chosenDay) => {
	// 	let updatedDates = { ...markedDates };
	// 	if (chosenDay.dateString in updatedDates) {
	// 		delete updatedDates[chosenDay.dateString];
	// 	} else {
	// 		updatedDates[chosenDay.dateString] = {
	// 			customStyles: {
	// 				container: {
	// 					backgroundColor: "green",
	// 				},
	// 				text: {
	// 					color: "black",
	// 					fontWeight: "bold",
	// 				},
	// 			},
	// 		};
	// 	}
	// 	setMarkedDates({ ...updatedDates });
	// };

	// const handleSubmit = () => {
	// 	let datesToSubmit = Object.keys(markedDates).map((d) => {
	// 		return {
	// 			day: Math.trunc(new Date(d).getTime() / (24 * 60 * 60 * 1000)),
	// 			date: d,
	// 		};
	// 	});
	// 	manualFill(datesToSubmit);
	// };

	const submit = () => {
		dispatch(
			markMenstruation({
				days: chosenDays, //[today.calendarFormat],
				end: "",
				//isMenstruation: true,
			})
		);
		navigation.popToTop();
	};

	const closeModal = () => {
		if (todayChosen) {
			setChosenDays([]);
		}
		setModalVisible(!modalVisible);
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={closeModal}
		>
			<View style={styles.tintedBackground}>
				<TouchableOpacity
					style={styles.closeArea}
					onPress={closeModal} //() => setModalVisible(!modalVisible)}
				></TouchableOpacity>

				<View style={styles.modalActiveArea}>
					{todayChosen ? (
						<Text>Please confirm choosing today</Text>
					) : (
						<Text>Please confirm choosing {chosenDays.length} days</Text>
					)}
					<Pressable
						style={[styles.options, styles.optionOne]}
						onPress={submit}
					>
						{/* <Text>Fill until today ({daysFromToday} days)</Text> */}
						<Text>Confirm</Text>
					</Pressable>
					<Pressable
						style={[styles.options, styles.optionTwo]}
						onPress={closeModal} //{expandModal}
					>
						<Text style={{ color: "white" }}>Not yet</Text>
					</Pressable>
				</View>
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
