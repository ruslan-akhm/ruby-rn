import React, { useEffect, useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import { symptoms } from "../../temp/dummy-data";
import Colors from "../../constants/Colors";

function Symptoms(props) {
	const [chosenSymptoms, setChosenSymptoms] = useState([]);
	const [inputText, setInputText] = useState("");
	const notes = useSelector((state) => state.notes.notes);

	const [symptomsObj, setSymptomsObj] = useState({ ...symptoms });

	// useEffect(() => {
	// 	props.currentDay && setAlreadyChosen(notes[props.currentDay].tags);
	// }, [notes, props]);

	const handleChoose = (symptom) => {
		if (chosenSymptoms.includes(symptom)) {
			return; //chosenSymptoms.filter((s) => s !== symptom);
		}
		setChosenSymptoms(() => {
			return [...chosenSymptoms, symptom];
		});
	};

	const addCustomNote = () => {
		if (inputText.length < 1) return;
		setChosenSymptoms([...chosenSymptoms, inputText]);
		setInputText("");
		Keyboard.dismiss();
	};

	const symptomsList = Object.keys(symptomsObj).map((s) => {
		return (
			<Pressable
				id={s}
				key={symptoms[s]}
				style={[
					styles.symptom,
					//alreadyChosen.includes(s) && styles.previosulyChosen,
					chosenSymptoms.includes(symptoms[s])
						? styles.chosen
						: styles.unchosen,
				]}
				onPress={() => handleChoose(symptoms[s])}
				//disabled={alreadyChosen.includes(s)}
			>
				<Text
					style={[
						styles.itemText,
						chosenSymptoms.includes(symptoms[s])
							? styles.itemTextChosen
							: styles.itemTextUnchosen,
					]}
				>
					{symptoms[s]}
				</Text>
			</Pressable>
		);
	});

	return (
		<>
			<Text>Suggested:</Text>
			<View style={{ height: 130 }}>
				<ScrollView horizontal={true} style={styles.list}>
					{symptomsList}
				</ScrollView>
			</View>
			<TouchableWithoutFeedback accessible={false}>
				<View
					style={{
						width: "100%",

						alignItems: "center",
						paddingBottom: 10,
					}}
				>
					<Text>Add your own:</Text>
					<TextInput
						//multiline={true}
						//numberOfLines={4}
						onChangeText={(text) => {
							setInputText(text);
						}}
						value={inputText}
						style={{
							borderWidth: 1,
							height: 40,
							width: "90%",
						}}
					/>
					<Pressable
						onPress={addCustomNote}
						style={{
							paddingHorizontal: 20,
							paddingVertical: 5,
							borderWidth: 1,
							borderColor: "green",
							backgroundColor: "green",
						}}
					>
						<Text>Add custom note</Text>
					</Pressable>
				</View>
			</TouchableWithoutFeedback>
			{/* CLICKING ON KEYBOARD LETTER - CLOSES THE KEYBOARD */}
			<View>
				{chosenSymptoms.map((s, index) => {
					return (
						<View
							key={"chosen" + index}
							style={{
								width: "100%",
								paddingHorizontal: 20,
								paddingVertical: 5,
								borderWidth: 1,
								flexDirection: "row",
							}}
						>
							<Text>{s}</Text>
							<Text>**DELETE ICON**</Text>
						</View>
					);
				})}
			</View>
			<View style={styles.actionWrapper}>
				{chosenSymptoms.length > 0 ? (
					<Pressable
						style={[styles.actionButton, styles.actionAdd]}
						onPress={() => {
							setInputText("");
							props.addSymptom(chosenSymptoms);
						}}
					>
						<Text style={styles.actionButtonText}>
							{chosenSymptoms.length > 1 ? "Add symptoms" : "Add symptom"}
						</Text>
					</Pressable>
				) : (
					<Pressable
						style={[styles.actionButton, styles.actionCancel]}
						//onPress={props.closeModal}
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
		backgroundColor: Colors.background,
		borderColor: Colors.background,
	},
	itemText: {
		fontSize: 20,
		fontWeight: "400",
	},
	itemTextChosen: {
		color: "white",
	},
	itemTextUnchosen: {
		color: Colors.background,
	},
	list: {
		flex: 0.2,
		// flexDirection: "row",
		// flexWrap: "wrap",
		// width: "100%",
		// justifyContent: "center",
		// paddingTop: 10,
		// borderWidth: 3,
		// overflow: "scroll",
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
		borderColor: Colors.background,
	},
});

export default Symptoms;
