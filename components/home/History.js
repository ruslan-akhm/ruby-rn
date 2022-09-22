import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";

const History = ({ navigation }) => {
	return (
		<View style={[styles.daysCard, styles.boxShadow]}>
			<Pressable
				style={[styles.btn, styles.startBtn]}
				onPress={() => {
					navigation.navigate("History");
				}}
			>
				<Text style={styles.btnText}>Calendar</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	boxShadow: {
		shadowColor: "#171717",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	btn: {
		// backgroundColor: "orange",
		padding: 15,
		marginTop: 10,
		borderRadius: 10,
		backgroundColor: "#c25391",
	},
	btnText: {
		fontSize: 20,
		color: Colors.white,
		fontWeight: "600",
		letterSpacing: 0.5,
	},
	daysCard: {
		width: "90%",
		height: 60,
		// backgroundColor: "yellow",
		marginTop: "10%",
		//borderRadius: 12,

		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	daysCardText: {
		fontSize: 20,
	},
	daysCardCount: {
		fontSize: 78,
		color: "#004550",
	},
	startBtn: {
		// backgroundColor: "red",
		width: "100%",
		height: 60,
		alignItems: "center",
		justifyContent: "center",
		marginTop: "auto",
	},
});

export default History;
