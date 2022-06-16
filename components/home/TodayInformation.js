import React, { useEffect, useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Dimensions,
	FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { symptoms } from "../../temp/dummy-data";

// const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
//ADD ARRAY OF INTERVALS BETWEEN CYCLES TO COUNT AVERAGE based on previous reported intervals?

function TodayInformation(props) {
	const [todayNotes, setTodayNotes] = useState();
	const notes = useSelector((state) => state.notes.notes);
	const today = useSelector((state) => state.cycles.today);

	useEffect(() => {
		//if (currentId) {
		if (notes && today.daysCounter in notes) {
			const tags = notes && [...notes[today.daysCounter].tags];
			const symps = symptoms.filter((s) => {
				return tags.includes(s.id);
			});
			setTodayNotes(() => {
				return symps.map((s) => s.title);
			});
		}
	}, [notes]);

	const note = ({ item }) => (
		<View style={styles.item}>
			<Text style={styles.itemText}>{item}</Text>
		</View>
	);

	return (
		<View style={styles.info}>
			<Text style={styles.subtitle}>Added today:</Text>
			{todayNotes && (
				<FlatList
					data={todayNotes.reverse()}
					renderItem={note}
					keyExtractor={(item) => item}
					horizontal
					style={styles.flatList}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	flatList: {
		// backgroundColor: "gray",
		width: "100%",
		paddingHorizontal: 8,
	},
	info: {
		width: "90%",
		flex: 0.3,
		backgroundColor: "white",
		marginTop: "5%",
		borderRadius: 12,
		//padding: 10,
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	item: {
		margin: 5,
		borderRadius: 4,
		borderWidth: 2,
		padding: 8,
		height: 44,
	},
	itemText: {
		fontSize: 18,
	},
	subtitle: {
		fontSize: 18,
		margin: 10,
	},
	list: {
		paddingTop: 8,
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
		justifyContent: "flex-start",
	},
});

export default TodayInformation;
