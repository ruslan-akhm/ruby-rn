import React, { useEffect, useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Modal,
	TouchableOpacity,
	Dimensions,
	ScrollView,
} from "react-native";
import { addNote, updateNotes } from "../../store-1/actions/notes";
import { useSelector, useDispatch } from "react-redux";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import NotesModal from "./NotesModal";
import Colors from "../../constants/Colors";

import { createNotes } from "../../store-1/actions/notes";

// const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
//ADD ARRAY OF INTERVALS BETWEEN CYCLES TO COUNT AVERAGE based on previous reported intervals?

function Notes({ currentId }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [todaySymptoms, setTodaySymptopms] = useState([]);
	const dispatch = useDispatch();
	const cycles = useSelector((state) => state.cycles.cycles);
	const today = useSelector((state) => state.cycles.today);
	const notes = useSelector((state) => state.notes.notes);

	const lastCycle = cycles[Math.max(...Object.keys(cycles))];
	//IN MODIFY SCREEN - ADD ABILITY TO ADD NOTES TO EXISTING MENSTR DAYS ???
	useEffect(() => {
		dispatch(createNotes({ latestId: lastCycle.id }));
	}, [cycles]);

	useEffect(() => {
		if (notes[currentId].dates.hasOwnProperty(today.calendarFormat)) {
			setTodaySymptopms([
				...notes[currentId].dates[today.calendarFormat].symptoms,
			]);
		} else {
			if (todaySymptoms.length > 0) {
				setTodaySymptopms([]);
			}
		}
	}, [notes]);

	return (
		<View style={styles.notes}>
			{todaySymptoms.length > 0 ? (
				<View style={{ flexDirection: "row" }}>
					<ScrollView horizontal>
						{todaySymptoms.map((s, index) => {
							return (
								<View
									key={"ts-" + index}
									style={{
										borderWidth: 1,
										borderColor: Colors.secondary,
										padding: 10,
										margin: 10,
									}}
								>
									<Text>{s}</Text>
								</View>
							);
						})}
					</ScrollView>
					<Pressable
						style={{ width: 40, backgroundColor: "orange" }}
						onPress={() => setModalVisible(true)}
					>
						<Text style={styles.btnText}>+</Text>
					</Pressable>
				</View>
			) : (
				<Pressable style={styles.btn} onPress={() => setModalVisible(true)}>
					<Text style={styles.btnText}>+ Add note</Text>
				</Pressable>
			)}

			<View style={styles.modalWrapper}>
				<NotesModal
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					today={today}
					currentId={currentId}
					todaySymptoms={todaySymptoms}
				/>
			</View>
		</View>
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
		// backgroundColor: "white",
		width: "100%",
		// flex: 0.2,
		height: "15%",
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

export default Notes;
