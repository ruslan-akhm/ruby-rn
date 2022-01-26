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
import { addNote } from "../store/actions/notes";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Symptoms from "./Symptoms";

// const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
//ADD ARRAY OF INTERVALS BETWEEN CYCLES TO COUNT AVERAGE based on previous reported intervals?

function Notes(props) {
	const [currentId, setCurrentId] = useState();
	const [modalVisible, setModalVisible] = useState(false);
	const dispatch = useDispatch();
	const notes = useSelector((state) => state.notes.notes);
	const cycles = useSelector((state) => state.cycles.cycles);

	//Should pass in props? If we only request cycles for Id. + We already are calling
	//the cycles from
	//store in parent (Home) component
	useEffect(() => {
		const lastCycle = cycles[cycles.length - 1];
		!currentId && setCurrentId(lastCycle.notesId);
	}, []);

	const showAllNotes = () => {
		console.log(notes);

		//console.log(cycles);
	};

	const openNoteModal = () => {
		setModalVisible(true);
	};

	const addSymptom = (symptoms) => {
		dispatch(addNote({ symptoms, notesId: currentId }));
		setModalVisible(false);
	};

	return (
		<>
			<Pressable style={styles.btn} onPress={openNoteModal}>
				<Text style={styles.btnText}>+ Add note</Text>
			</Pressable>
			<Pressable style={styles.btn} onPress={showAllNotes}>
				<Text style={styles.btnText}>Show all note</Text>
			</Pressable>
			<View style={styles.modalWrapper}>
				<Modal
					animationType="fade"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						console.log("Modal has been closed.");
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.tintedBackground}>
						<TouchableOpacity
							style={styles.closeArea}
							onPress={() => setModalVisible(!modalVisible)}
						></TouchableOpacity>
						<View style={styles.modalActiveArea}>
							<Pressable
								onPress={() => setModalVisible(!modalVisible)}
								style={styles.buttonClose}
							>
								<MaterialCommunityIcons
									name="window-close"
									size={30}
									color="black"
								/>
							</Pressable>
							<Symptoms
								closeModal={() => setModalVisible(!modalVisible)}
								addSymptom={addSymptom}
							/>
						</View>
					</View>
				</Modal>
			</View>
		</>
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
		height: windowHeight * 0.5,
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
		height: windowHeight * 0.5,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	tintedBackground: {
		position: "absolute",
		top: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.8)",
	},
});

export default Notes;
