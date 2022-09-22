import React, { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";
import {
	View,
	Text,
	Modal,
	Pressable,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";

import { convertDateFormat } from "../../helpers/convertDateFormat";
import { modifyNotes } from "../../store-1/actions/notes";
import moment from "moment";

import * as Animatable from "react-native-animatable";
import CustomKeyboard from "../shared/CustomKeyboard";

const windowHeight = Dimensions.get("window").height;

const DayModal = ({
	modalShown,
	setModalShown,
	expandedDay,
	handleDay,
	today,
	dayInfo,
}) => {
	const dispatch = useDispatch();
	const [userNotes, setUserNotes] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [textInput, setTextInput] = useState("");
	const date = Object.keys(expandedDay)[0];
	const scrollViewRef = useRef();
	const initRender = useRef(true);
	const viewRef = useRef();

	useEffect(() => {
		const notesObject = expandedDay[date].notes.map((note, index) => {
			return { text: note, id: index };
		});
		setUserNotes(notesObject);
	}, [expandedDay]);

	useEffect(() => {
		if (userNotes.length > 0) {
			if (!initRender.current) {
				if (scrollViewRef.current) {
					scrollViewRef.current.scrollToEnd({ animated: true });
				}
			} else {
				initRender.current = false;
			}
		}
	}, [userNotes]);

	const editNotes = () => {
		if (viewRef) {
			viewRef.current?.slideInUp(200);
		}
		setEditMode(true);
	};

	const saveNotes = () => {
		const formattedNotes = userNotes.reduce((acc, val) => {
			acc = [...acc, val.text];
			return acc;
		}, []);
		dispatch(
			modifyNotes({ date, userNotes: formattedNotes, cycleId: dayInfo.id })
		);
		setEditMode(false);
		setTextInput("");
	};

	const removeNote = (id) => {
		const updatedUserNotes = [...userNotes].filter((n) => n.id != id);
		setUserNotes([...updatedUserNotes]);
	};

	const addNote = () => {
		if (!textInput || textInput.trim().length < 1) return;
		//setTextInput("");
		const ids = userNotes.reduce((acc, val) => {
			acc = [...acc, val.id];
			return acc;
		}, []);

		const newNote = {
			text: textInput.trim(),
			id: Math.max(...ids) + 1,
		};
		setTextInput("");
		const updatedUserNotes = [...userNotes, newNote];
		setUserNotes([...updatedUserNotes]);
	};

	const dayTypes =
		expandedDay[date]?.types.length > 0 &&
		expandedDay[date].types.map((type) => {
			return (
				<View
					key={"dayType-" + type}
					style={{
						borderWidth: 1,
						borderColor: "#eb346b",
						borderRadius: 5,
						marginHorizontal: 10,
						padding: 5,
					}}
				>
					<Text style={{ fontSize: 20, fontWeight: "600", color: "#eb346b" }}>
						{type} day
					</Text>
				</View>
			);
		});
	//console.log(userNotes);
	const dayNotes =
		userNotes.length > 0 &&
		userNotes.map((note) => (
			<View
				key={"dayNote-" + note.id}
				style={{
					borderWidth: 1,
					padding: 10,
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Text>{note.text}</Text>
				{editMode && (
					<Pressable
						onPress={() => removeNote(note.id)}
						style={{ borderWidth: 2, padding: 10 }}
					>
						<Text>--</Text>
					</Pressable>
				)}
			</View>
		));

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalShown}
			onRequestClose={() => {
				setEditMode(false);
				setTextInput("");
				setModalShown(false);
			}}
		>
			{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
			<View
				style={{
					position: "absolute",
					top: 0,
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(0,0,0,0.8)",
				}}
			>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					enabled={true}
				>
					<TouchableOpacity
						style={{ width: "100%", height: windowHeight * 0.5 }}
						onPress={() => {
							setEditMode(false);
							setTextInput("");
							setModalShown(false);
						}}
					></TouchableOpacity>
					<Animatable.View
						style={{
							alignItems: "center",
							marginTop: "auto",
							backgroundColor: "white",
							justifyContent: "flex-start",
							height: editMode ? windowHeight * 0.75 : windowHeight * 0.5,
							//borderRadius: 10,
						}}
						animation="slideInUp"
						duration={300}
						ref={viewRef}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								width: "100%",
								paddingHorizontal: 15,
								paddingTop: 20,
								paddingBottom: 10,
								height: "20%",
							}}
						>
							<Pressable
								onPress={() =>
									handleDay({
										dateString: moment(date)
											.subtract(1, "days")
											.format("YYYY-MM-DD"),
									})
								}
								disabled={editMode}
							>
								<AntDesign
									name="left"
									size={30}
									color={editMode ? "lightgray" : "black"}
									style={{ padding: 10 }}
								/>
							</Pressable>
							<Text style={{ fontSize: 28 }}>
								{moment(date).format("LLL").split(",")[0]}
							</Text>
							<Pressable
								disabled={editMode || moment(date).isSame(today)}
								onPress={() =>
									handleDay({
										dateString: moment(date)
											.add(1, "days")
											.format("YYYY-MM-DD"),
									})
								}
							>
								<AntDesign
									name="right"
									size={30}
									color={
										editMode || moment(date).isSame(today)
											? "lightgray"
											: "black"
									}
									style={{ padding: 10 }}
								/>
							</Pressable>
						</View>
						{dayTypes ? (
							<View
								style={{
									width: "100%",
									flexDirection: "row",
									justifyContent: "center",
									flexWrap: "wrap",
									marginBottom: 20,
									height: "10%",
								}}
							>
								{dayTypes}
							</View>
						) : (
							<Text>No reported activity</Text>
						)}

						<View
							style={{
								width: "100%",
								padding: 10,
								height: "40%",
							}}
						>
							{dayNotes && <Text>Notes:</Text>}
							<ScrollView
								ref={scrollViewRef}
								//SCROLLS TO THE BOTTOM ON THE INITIAL RENDER
								// onContentSizeChange={() =>
								// 	scrollViewRef.current.scrollToEnd({ animated: true })
								// }
							>
								{dayNotes}
							</ScrollView>
						</View>
						<View
							style={{
								width: "100%",
								height: "25%",
								alignItems: "center",
								paddingTop: 10,
								flexDirection: "row",
								justifyContent: "space-around",
							}}
						>
							<View style={{ borderWidth: 5, width: "100%" }}>
								{editMode ? (
									<View>
										<CustomKeyboard
											textValue={textInput}
											onChangeText={setTextInput}
											onPress={addNote}
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
														onChangeText={(text) => setTextInput(text)}
														value={textInput}
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
														onPress={addNote}
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
										<Pressable
											style={{
												borderWidth: 2,
												borderColor: "green",
												paddingVertical: 10,
												paddingHorizontal: 15,
												width: "100%",
											}}
											onPress={saveNotes}
										>
											<Text
												style={{
													fontSize: 20,
												}}
											>
												Save
											</Text>
										</Pressable>
									</View>
								) : (
									// <View>
									// 	<View style={{ flexDirection: "row" }}>
									// 		<TextInput
									// 			style={{
									// 				borderWidth: 1,
									// 				borderColor: "blue",
									// 				width: "85%",
									// 			}}
									// 			value={textInput}
									// 			onChangeText={(text) => setTextInput(text)}
									// 		/>

									// 		<Pressable
									// 			style={{ width: "10%", borderWidth: 2, padding: 7 }}
									// 			onPress={addNote}
									// 		>
									// 			<Text>+</Text>
									// 		</Pressable>
									// 	</View>
									// 	<Pressable
									// 		style={{
									// 			borderWidth: 2,
									// 			borderColor: "green",
									// 			paddingVertical: 10,
									// 			paddingHorizontal: 15,
									// 			width: "100%",
									// 		}}
									// 		onPress={saveNotes}
									// 	>
									// 		<Text
									// 			style={{
									// 				fontSize: 20,
									// 			}}
									// 		>
									// 			Save
									// 		</Text>
									// 	</Pressable>
									// </View>
									<Pressable
										style={{
											borderWidth: 2,
											borderColor: "green",
											paddingVertical: 10,
											paddingHorizontal: 15,
										}}
										onPress={editNotes}
									>
										<Text
											style={{
												fontSize: 20,
											}}
										>
											Edit notes
										</Text>
									</Pressable>
								)}
							</View>
						</View>
					</Animatable.View>
				</KeyboardAvoidingView>
			</View>
			{/* </TouchableWithoutFeedback> */}
		</Modal>
	);
};

export default DayModal;
