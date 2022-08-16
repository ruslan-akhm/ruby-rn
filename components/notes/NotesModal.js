import React, { useEffect, useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Modal,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { addNote, updateNotes } from "../../store-1/actions/notes";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Symptoms from "./Symptoms";

// const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
//ADD ARRAY OF INTERVALS BETWEEN CYCLES TO COUNT AVERAGE based on previous reported intervals?

function NotesModal({ modalVisible, setModalVisible, today, currentId }) {
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
			<View style={styles.tintedBackground}>
				<TouchableOpacity
					style={styles.closeArea}
					onPress={() => setModalVisible(!modalVisible)}
				></TouchableOpacity>
				<View style={styles.modalActiveArea}>
					{/* <Pressable
								onPress={() => setModalVisible(!modalVisible)}
								style={styles.buttonClose}
							>
								<MaterialCommunityIcons
									name="window-close"
									size={30}
									color="black"
								/>
							</Pressable> */}
					<Symptoms
						//closeModal={() => setModalVisible(!modalVisible)}
						addSymptom={addSymptom}
						currentDay={today.daysCounter}
					/>
				</View>
			</View>
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
		height: windowHeight * 0.25,
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
		height: windowHeight * 0.75,
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
