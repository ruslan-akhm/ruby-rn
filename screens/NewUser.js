import React, { useEffect, useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	TextInput,
	SafeAreaView,
	StatusBar,
	Button,
	Modal,
	TouchableWithoutFeedback,
	Platform,
} from "react-native";
import { initialSetup } from "../store-1/actions/user";
import { useSelector, useDispatch } from "react-redux";

function NewUser({ route, navigation }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [inputData, setInputData] = useState({
		username: "",
		menstruationLength: "",
		cycleLength: "",
	});
	const [formFilled, setFormFilled] = useState(false);

	useEffect(() => {
		if (
			inputData.username.length > 0 &&
			inputData.menstruationLength.length > 0 &&
			inputData.cycleLength.length > 0
		) {
			!formFilled && setFormFilled(true);
		} else {
			formFilled && setFormFilled(false);
		}
	}, [inputData]);

	const handleSubmit = () => {
		dispatch(initialSetup(inputData));
		navigation.navigate("Home");
		//USer can also change these values in settings, but should set initailly
		//2. redirect user to homepage
		//3. set app storage to never show this window on start up after it was filled initially
	};

	return (
		<View
			style={{
				backgroundColor: "lightgray",
				height: "100%",
			}}
		>
			<Text>Welcome too ruby</Text>
			<Text>
				Please provide your basic information to personalize your experience
			</Text>

			<View style={{ marginVertical: 10 }}>
				<Text>You name:</Text>
				<TextInput
					value={inputData.username}
					onChangeText={(text) =>
						setInputData({ ...inputData, username: text })
					}
					style={{ borderWidth: 1 }}
				/>
			</View>

			<View style={{ marginVertical: 10 }}>
				<Text>Your average cycle length (typically around 28 days)</Text>
				<TextInput
					keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
					value={inputData.cycleLength}
					onChangeText={(text) => {
						text.replace(/[^0-9]/g, "");
						setInputData({ ...inputData, cycleLength: text });
					}}
					style={{ borderWidth: 1 }}
				/>
			</View>
			<View style={{ marginVertical: 10 }}>
				<Text>Your menstruation cycle length (typically around 7 days)</Text>
				<TextInput
					keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
					value={inputData.menstruationLength}
					onChangeText={(text) => {
						text.replace(/[^0-9]/g, "");
						setInputData({ ...inputData, menstruationLength: text });
					}}
					style={{ borderWidth: 1 }}
				/>
			</View>

			<Pressable
				style={
					formFilled
						? {
								//marginTop: "auto",
								//marginBottom: 80,
								borderWidth: 2,
								padding: 10,
						  }
						: { borderWidth: 2, padding: 10, borderColor: "red" }
				}
				onPress={handleSubmit}
				disabled={!formFilled}
			>
				<Text>Continue</Text>
			</Pressable>
		</View>
	);
}

export default NewUser;
