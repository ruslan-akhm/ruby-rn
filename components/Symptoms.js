import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { symptoms } from "../temp/dummy-data";
import Colors from "../constants/Colors";

function Symptoms(props) {
	const [chosenSymptoms, setChosenSymptoms] = useState([]);
	const [alreadyChosen, setAlreadyChosen] = useState([]);
	const notes = useSelector((state) => state.notes.notes);

	useEffect(() => {
		props.currentDay && setAlreadyChosen(notes[props.currentDay].tags);
	}, [notes, props]);

	const handleChoose = (id) => {
		setChosenSymptoms(() => {
			if (chosenSymptoms.includes(id)) {
				return chosenSymptoms.filter((s) => s !== id);
			}
			return [...chosenSymptoms, id];
		});
	};

	const symptomsList = symptoms.map((s) => {
		return (
			<Pressable
				id={s.id}
				key={s.title}
				style={[
					styles.symptom,
					alreadyChosen.includes(s.id) && styles.previosulyChosen,
					chosenSymptoms.includes(s.id) ? styles.chosen : styles.unchosen,
				]}
				onPress={() => handleChoose(s.id)}
				disabled={alreadyChosen.includes(s.id)}
			>
				<Text
					style={[
						styles.itemText,
						chosenSymptoms.includes(s.id)
							? styles.itemTextChosen
							: styles.itemTextUnchosen,
					]}
				>
					{s.title}
				</Text>
			</Pressable>
		);
	});

	return (
		<>
			<View style={styles.list}>{symptomsList}</View>
			<View style={styles.actionWrapper}>
				{chosenSymptoms.length > 0 ? (
					<Pressable
						style={[styles.actionButton, styles.actionAdd]}
						onPress={() => props.addSymptom(chosenSymptoms)}
					>
						<Text style={styles.actionButtonText}>
							{chosenSymptoms.length > 1 ? "Add symptoms" : "Add symptom"}
						</Text>
					</Pressable>
				) : (
					<Pressable
						style={[styles.actionButton, styles.actionCancel]}
						onPress={props.closeModal}
					>
						<Text style={styles.actionButtonText}>Cancel</Text>
					</Pressable>
				)}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	actionAdd: {
		borderColor: "green",
	},
	actionButton: {
		borderRadius: 4,
		borderWidth: 2,
		padding: 10,
		width: "90%",
		alignItems: "center",
	},
	actionButtonText: {
		fontSize: 20,
	},
	actionCancel: {
		borderColor: "red",
	},
	actionWrapper: {
		width: "100%",
		flex: 0.3,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	chosen: {
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
	},
	itemText: {
		fontSize: 20,
		fontWeight: "400",
	},
	itemTextChosen: {
		color: "white",
	},
	itemTextUnchosen: {
		color: Colors.primary,
	},
	list: {
		flex: 0.7,
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
		justifyContent: "center",
		paddingTop: 10,
	},
	previosulyChosen: {
		backgroundColor: "orange",
	},
	symptom: {
		marginHorizontal: 10,
		marginVertical: 8,
		borderRadius: 4,
		borderWidth: 1,
		padding: 10,
		alignSelf: "center",
	},
	unchosen: {
		borderColor: Colors.primary,
	},
});

export default Symptoms;
