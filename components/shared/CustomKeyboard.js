import React from "react";

import {
	View,
	Pressable,
	TextInput,
	TouchableWithoutFeedback,
	Text,
} from "react-native";
import Colors from "../../constants/Colors";

import AddIcon from "../../common/static/AddIcon";

// import { MaterialIcons } from "@expo/vector-icons";

function CustomKeyboard({ textValue, onChangeText, onPress }) {
	return (
		<TouchableWithoutFeedback accessible={false}>
			<View
				style={{
					width: "100%",
					paddingVertical: 15,
					paddingRight: 10,
					paddingLeft: 15,
					position: "relative",
				}}
			>
				{/* <Text>Add your own:</Text> */}
				<View
					style={{
						// borderWidth: 2,
						width: "100%",
						borderWidth: 1,
						borderRadius: 45,
						height: 45,
						borderColor: Colors.secondary,
						fontSize: 18,
						paddingHorizontal: 10,
						paddingRight: "15%",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<TextInput
						//multiline={true}
						//numberOfLines={4}
						onChangeText={(text) => onChangeText(text)}
						value={textValue}
						style={{
							// borderWidth: 1,
							// borderRadius: 20,
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
						// height: 98,
						// borderWidth: 1,
						alignItems: "center",
						// height: "100%",
						position: "absolute",
						top: 18,
						right: 4,
					}}
				>
					<Pressable
						onPress={onPress}
						style={{
							backgroundColor: Colors.secondary,
							borderRadius: "50%",
							width: 39,
							height: 39,
							paddingLeft: 9,
							paddingTop: 8,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{/* <MaterialIcons
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
						/> */}
						<AddIcon />
					</Pressable>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default CustomKeyboard;
