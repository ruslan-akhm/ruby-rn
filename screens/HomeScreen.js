import React, { useState, useMemo, useEffect } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	StatusBar,
	Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Notes from "../components/Notes";
import Colors from "../constants/Colors";
import TodayInformation from "../components/home/TodayInformation";
import DaysWidget from "../components/home/DaysWidget";
import History from "../components/home/History";
import { username } from "../constants/AverageDays";
import { updateNotes, modifyNotes } from "../store/actions/notes";

function HomeScreen({ navigation }) {
	const userState = useSelector((state) => state.user);
	const notes = useSelector((state) => state.notes.notes);
	const cyclesState = useSelector((state) => state.cycles);
	const { cycles, today } = cyclesState;
	const dispatch = useDispatch();
	const lastCycle = cycles[cycles.length - 1];

	//console.log(cyclesState);
	// const memoizedDaysWidget = useMemo(
	// 	() => <DaysWidget cycles={cycles} navigation={navigation} />,
	// 	[cycles, navigation]
	// );
	useEffect(() => {
		if (!(today.daysCounter in notes)) {
			//updating notes for current cycle id
			//if new cycle marked -> need to updated notes with new id;
			dispatch(updateNotes({ today, lastCycle }));
		} else {
			if (notes[today.daysCounter].cycleId != lastCycle.id) {
				dispatch(modifyNotes({ today, lastCycle }));
			}
		}
	}, [cycles]);

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle="light-content" />
			<View style={styles.headerBox}></View>
			<View style={styles.box}>
				<View style={[styles.headerBox, styles.headerShape]}></View>
				<Text>Hey {userState.username}!</Text>
				{/*IF cycles.length==0 -> new user, show different widget
					Show button to Go to calendar and choose menst days. Earliest day chosen - start_day
				*/}
				<DaysWidget
					cyclesState={cyclesState}
					userState={userState}
					navigation={navigation}
				/>
				<Notes currentId={lastCycle.id} />
				<TodayInformation />
				<History navigation={navigation} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	box: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: "#fffafe",
		backgroundColor: "blue",
	},
	btn: {
		backgroundColor: "orange",
		padding: 15,
		marginTop: 10,
		borderRadius: 5,
	},
	btnText: {
		fontSize: 20,
	},
	headerBox: {
		backgroundColor: Colors.primary,
		width: "100%",
		height: 100,
		position: "absolute",
		top: 0,
		left: 0,
	},
	headerShape: {
		backgroundColor: Colors.primary,
		width: 120,
		height: 270,
		position: "absolute",
		top: -30,
		left: 155,
		borderRadius: 50,
		transform: [{ scaleX: 4 }],
		zIndex: -1,
	},
	safeArea: {
		flex: 1,
		backgroundColor: "gray",
	},
});

export default HomeScreen;
