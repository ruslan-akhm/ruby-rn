import React, { useEffect, useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Modal,
	TouchableOpacity,
	Dimensions,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { addNote, updateNotes } from "../../store-1/actions/notes";
import { useSelector, useDispatch } from "react-redux";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import Symptoms from "./Symptoms";

import * as Animatable from "react-native-animatable";

// const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
//ADD ARRAY OF INTERVALS BETWEEN CYCLES TO COUNT AVERAGE based on previous reported intervals?

function NotesModal({
	modalVisible,
	setModalVisible,
	today,
	currentId,
	todaySymptoms,
}) {
	const dispatch = useDispatch();
	//IN MODIFY SCREEN - ADD ABILITY TO ADD NOTES TO EXISTING MENSTR DAYS
	const addSymptom = (symptoms) => {
		dispatch(
			addNote({
				symptoms,
				cycleId: currentId,
				date: { ...today },
			})
		);
		setModalVisible(false);
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				//console.log("Modal has been closed.");
				setModalVisible(!modalVisible);
			}}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={styles.tintedBackground}>
					<TouchableOpacity
						style={styles.closeArea}
						onPress={() => setModalVisible(!modalVisible)}
					></TouchableOpacity>
					<Animatable.View
						style={styles.modalActiveArea}
						animation="slideInUp"
						duration={300}
					>
						<Symptoms
							closeModal={() => setModalVisible(!modalVisible)}
							addSymptom={addSymptom}
							currentDay={today.calendarFormat}
							currentId={currentId}
							todaySymptoms={todaySymptoms}
						/>
					</Animatable.View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
}

const styles = StyleSheet.create({
	btn: {
		backgroundColor: "orange",
		padding: 15,
		marginTop: 10,
		borderRadius: 5,
	},
	btnText: {
		fontSize: 20,
	},
	buttonClose: {
		marginLeft: "auto",
		marginRight: 10,
		marginTop: 10,
		padding: 5,
	},
	closeArea: {
		width: "100%",
		height: windowHeight * 0.35,
	},
	modalWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	},
	modalActiveArea: {
		alignItems: "center",
		marginTop: "auto",
		backgroundColor: "white",
		justifyContent: "flex-start",
		height: windowHeight * 0.65,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	notes: {
		backgroundColor: "white",
		width: "100%",
		flex: 0.2,
		marginTop: 20,
		paddingHorizontal: 20,
	},
	tintedBackground: {
		position: "absolute",
		top: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.8)",
	},
});

export default NotesModal;
