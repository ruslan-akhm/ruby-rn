import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { notes, symptoms } from "../../temp/dummy-data";

// const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
//ADD ARRAY OF INTERVALS BETWEEN CYCLES TO COUNT AVERAGE based on previous reported intervals?

function TodayInformation(props) {
	const [currentId, setCurrentId] = useState();
	const [todayNotes, setTodayNotes] = useState();
	const dispatch = useDispatch();
	const userNotes = useSelector((state) => state.notes.notes);
	const today = useSelector((state) => state.cycles.today);

	useEffect(() => {
		const lastCycle = props.lastCycle;
		!currentId && setCurrentId(lastCycle.notesId);
	}, []);

	useEffect(() => {
		if (currentId) {
			const tags = [...userNotes[currentId][today.daysCounter].tags];
			const symps =
				currentId &&
				symptoms.filter((s) => {
					return tags.includes(s.id);
				});
			setTodayNotes(() => {
				return symps.map((s) => s.title);
			});
		}
	}, [currentId]);

	const todayTags =
		todayNotes &&
		todayNotes.map((t, i) => {
			return (
				<View key={t + i} style={styles.item}>
					<Text>{t}</Text>
				</View>
			);
		});

	return <View style={styles.info}>{todayTags}</View>;
}

const styles = StyleSheet.create({
	info: {
		flex: 1,
		backgroundColor: "red",
		width: "100%",
		marginTop: 10,
	},
});

export default TodayInformation;
