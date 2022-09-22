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
		setTodayChosen,
	} = props;

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
		setTodayChosen(false);
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
