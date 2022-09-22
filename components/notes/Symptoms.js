import React, { useEffect, useRef, useState } from "react";
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
// import { MaterialIcons } from "@expo/vector-icons";

import TrashLogo from "../../common/static/TrashLogo";

import * as Animatable from "react-native-animatable";
import CustomKeyboard from "../shared/CustomKeyboard";

////
//////
/////ovulation.isCurrently needed for widget message
////
////
function Symptoms({
	currentId,
	currentDay,
	addSymptom,
	closeModal,
	todaySymptoms,
}) {
	const [chosenSymptoms, setChosenSymptoms] = useState([]);
	const [inputText, setInputText] = useState("");
	const notes = useSelector((state) => state.notes.notes);

	const [symptomsObj, setSymptomsObj] = useState({ ...symptoms });

	const scrollRef = useRef(null);
	// useEffect(() => {
	// 	props.currentDay && setAlreadyChosen(notes[props.currentDay].tags);
	// }, [notes, props]);

	useEffect(() => {
		if (todaySymptoms) {
			setChosenSymptoms([...todaySymptoms]);
		}
	}, [todaySymptoms]);

	const handleChoose = (symptom) => {
		// if (chosenSymptoms.includes(symptom)) {
		// 	return; //chosenSymptoms.filter((s) => s !== symptom);
		// }
		setChosenSymptoms(() => {
			return [...chosenSymptoms, symptom];
		});
		// scrollRef.current.scrollToEnd({ animated: true });
	};

	const addCustomNote = () => {
		if (inputText.length < 1) return;
		setChosenSymptoms([...chosenSymptoms, inputText]);
		setInputText("");
		Keyboard.dismiss();
	};

	const removeSymptom = (index) => {
		let updatedChosenSymptoms = [...chosenSymptoms];
		updatedChosenSymptoms.splice(index, 1);
		setChosenSymptoms([...updatedChosenSymptoms]);
	};

	const symptomsList = Object.keys(symptomsObj).map((s) => {
		if (notes[currentId].dates.hasOwnProperty(currentDay)) {
			if (notes[currentId].dates[currentDay].symptoms.includes(symptoms[s])) {
				return;
			}
		}
		if (chosenSymptoms.includes(symptoms[s])) {
			return;
		}
		return (
			<Pressable
				id={s}
				key={symptoms[s]}
				style={[
					styles.symptom,
					chosenSymptoms.includes(symptoms[s])
						? styles.chosen
						: styles.unchosen,
				]}
				onPress={() => handleChoose(symptoms[s])}
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
		<View
			style={{
				alignItems: "center",
				width: "100%",
				borderWidth: 3,
				borderColor: "purple",
				// height: "100%",
				flex: 1,
			}}
		>
			<View style={{ height: "15%", flex: 1 }}>
				<Text>Suggested:</Text>
				<ScrollView horizontal={true} style={styles.list}>
					{symptomsList}
				</ScrollView>
			</View>
			<CustomKeyboard
				textValue={inputText}
				onChangeText={setInputText}
				onPress={addCustomNote}
			/>
			{/* <TouchableWithoutFeedback accessible={false}>
				<View
					style={{
						width: "100%",
						flexDirection: "row",
						alignItems: "center",
						paddingVertical: 15,
						paddingRight: 10,
						paddingLeft: 15,
					}}
				>
				 
					<View
						style={{
							// borderWidth: 2,
							width: "85%",
						}}
					>
						<TextInput
							//multiline={true}
							//numberOfLines={4}
							onChangeText={(text) => {
								setInputText(text);
							}}
							value={inputText}
							style={{
								borderWidth: 1,
								borderRadius: 20,
								height: 40,
								width: "100%",
								fontSize: 18,
								paddingHorizontal: 10,
							}}
						/>
					</View>
					<View
						style={{
							width: "15%",
							// borderWidth: 2,
							alignItems: "center",
							height: "100%",
						}}
					>
						<Pressable
							onPress={addCustomNote}
							style={{
								backgroundColor: Colors.lightblue,
								borderRadius: "50%",
								width: 40,
								height: 40,
							}}
						>
							<MaterialIcons
								name="add"
								size={39}
								color="white"
								style={{
									// borderWidth: 1,
									textAlign: "center",
									width: 40,
									height: 40,
									// backgroundColor: "orange",
								}}
							/>
						</Pressable>
					</View>
				</View>
			</TouchableWithoutFeedback> */}

			{/* CLICKING ON KEYBOARD LETTER - CLOSES THE KEYBOARD */}
			<View
				style={{
					flex: 3,
					paddingHorizontal: 15,
					paddingTop: 10,
					paddingBottom: 35,
				}}
			>
				{/* SCROLLVIEW does not scroll */}
				<ScrollView
					style={{ width: "100%", minHeight: "100%" }}
					horizontal={false}
					// contentContainerStyle={{ flexGrow: 1 }}
					ref={scrollRef}
					onContentSizeChange={() => scrollRef.current.scrollToEnd()}
				>
					{chosenSymptoms.map((s, index) => {
						return (
							<Animatable.View
								key={"chosen" + index}
								style={{
									flex: 1,
									paddingHorizontal: 15,
									paddingVertical: 5,
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 5,
									borderBottomColor: Colors.lightGray,
									borderBottomWidth: 1,
								}}
								animation="slideInRight"
								duration={200}
							>
								<Text
									style={{
										width: "85%",
										fontSize: 20,
										color: Colors.blackText,
									}}
								>
									{s[0].toUpperCase() + s.substring(1)}
								</Text>
								<Pressable
									onPress={() => removeSymptom(index)}
									style={{
										padding: 2,
										width: "15%",
										height: 36,
									}}
								>
									{/* <MaterialIcons
										name="delete"
										size={34}
										color={Colors.white}
										style={{ textAlign: "center" }}
									/> */}
									<TrashLogo />
								</Pressable>
							</Animatable.View>
						);
					})}
				</ScrollView>
			</View>
			<View style={styles.actionWrapper}>
				<Pressable
					style={[styles.actionButton, styles.actionAdd]}
					onPress={() => {
						setInputText("");
						addSymptom(chosenSymptoms);
					}}
				>
					<Text style={styles.actionButtonText}>
						{/* {chosenSymptoms.length > 1 ? "Add symptoms" : "Add symptom"} */}
						Save
					</Text>
				</Pressable>
				{/* //{chosenSymptoms.length > 0 ? (
					
				//</View>) : (
					// <Pressable
					// 	style={[styles.actionButton, styles.actionCancel]}
					// 	onPress={closeModal}
					// >
					// 	<Text style={styles.actionButtonText}>Cancel</Text>
					// </Pressable>
				//)} */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	actionAdd: {
		backgroundColor: Colors.primary,
	},
	actionButton: {
		paddingVertical: 15,
		borderRadius: 12,
		width: "90%",
		alignItems: "center",
	},
	actionButtonText: {
		fontSize: 20,
		color: Colors.white,
	},
	actionCancel: {
		backgroundColor: Colors.red,
	},
	actionWrapper: {
		width: "100%",
		flex: 1,
		// height: "20%",
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
		// flex: 0.2,
		// height: "15%",
		borderWidth: 3,
		// flexDirection: "row",
		// flexWrap: "wrap",
		// width: "100%",
		// justifyContent: "center",
		// paddingTop: 10,
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
