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
import Notes from "../components/notes/Notes";
import Colors from "../constants/Colors";
import TodayInformation from "../components/home/TodayInformation";
import DaysWidget from "../components/home/DaysWidget";
import History from "../components/home/History";
import { username } from "../constants/AverageDays";
import { updateNotes, modifyNotes } from "../store/actions/notes";

import { determineCurrentState } from "../helpers/determineCurrentState";

import { autoFIllMenstruation } from "../store-1/actions/cycle";

import moment from "moment";

function HomeScreen({ navigation }) {
	const userState = useSelector((state) => state.user);
	//const notes = useSelector((state) => state.notes.notes);
	const cyclesState = useSelector((state) => state.cycles);
	const { cycles, today } = cyclesState; //today
	const dispatch = useDispatch();
	const lastCycle = cycles[Math.max(...Object.keys(cycles))];
	const [newUser, setNewUser] = useState(false);

	useEffect(() => {
		if (!cyclesState.cycles.hasOwnProperty(1)) setNewUser(true);
		else setNewUser(false);
		console.log(cyclesState);
	}, [cyclesState]);

	useEffect(() => {
		let stateObj = determineCurrentState(cyclesState, userState);
		if (stateObj.type.category === "STATE_UPDATE") {
			dispatch(
				autoFIllMenstruation({
					type: stateObj.type.value,
					days: stateObj.payload,
				})
			);
		}
	}, []);

	// GOTTA CHECK THE CURRENT STATE (which days is now, like 28th day, are we in menstr or not) EVRY TIME WHEN NAVIGATE TO HOME SCREEN
	// and update the state (menstruations, cycle) if we are past menstruationLength

	//console.log(cyclesState);
	//=============== REMOVE? ++++++++++++++
	//console.log(cyclesState);
	// const memoizedDaysWidget = useMemo(
	// 	() => <DaysWidget cycles={cycles} navigation={navigation} />,
	// 	[cycles, navigation]
	// );
	//========================

	// useEffect(() => {
	// 	if (!(today.daysCounter in notes)) {
	// 		//updating notes for current cycle id
	// 		//if new cycle marked -> need to updated notes with new id;
	// 		dispatch(updateNotes({ today, lastCycle }));
	// 	} else {
	// 		if (notes[today.daysCounter].cycleId != lastCycle.id) {
	// 			dispatch(modifyNotes({ today, lastCycle }));
	// 		}
	// 	}
	// }, [cycles]);

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle="light-content" />
			<View style={styles.headerBox}></View>
			{newUser ? (
				<View>
					<Text>Hey there, click start to</Text>
					<Pressable
						style={{
							marginTop: 30,
							backgroundColor: "salmon",
							paddingHorizontal: 80,
							paddingVertical: 20,
						}}
						onPress={() => {
							navigation.navigate("Calendar");
						}}
					>
						<Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
							Start!
						</Text>
					</Pressable>
				</View>
			) : (
				<View style={styles.box}>
					<View style={[styles.headerBox, styles.headerShape]}></View>
					{/* <Text>Hey {userState.username}!</Text> */}
					{/*IF cycles.length==0 -> new user, show different widget
					Show button to Go to calendar and choose menst days. Earliest day chosen - start_day
				*/}
					<DaysWidget
						cyclesState={cyclesState}
						userState={userState}
						navigation={navigation}
					/>
					{/* <Button onPress={() => console.log(cycles)} title="Show state" /> */}
					{/* <Pressable
						onPress={() => {
							navigation.navigate("Modify");
						}}
						style={{
							marginTop: 30,
							backgroundColor: "salmon",
							paddingHorizontal: 80,
							paddingVertical: 20,
						}}
					>
						<Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
							Modify
						</Text>
					</Pressable> */}
					<Notes currentId={lastCycle.id} />
					{/*	<TodayInformation />*/}
					<History navigation={navigation} />
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	box: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: Colors.background,
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
		backgroundColor: Colors.background,
		width: "100%",
		height: 100,
		position: "absolute",
		top: 0,
		left: 0,
	},
	headerShape: {
		backgroundColor: Colors.background,
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
		backgroundColor: "red",
	},

	state: {
		backgroundColor: "gray",
		marginTop: 100,
	},
});

export default HomeScreen;
