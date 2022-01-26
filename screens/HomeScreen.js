import React, { useEffect, useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	StatusBar,
	Button,
} from "react-native";
import { markCycleStart, showAll } from "../store/actions/cycle";
import { useSelector, useDispatch } from "react-redux";
import Notes from "../components/Notes";
import Colors from "../constants/Colors";

//ADD ARRAY OF INTERVALS BETWEEN PERIODS TO COUNT AVERAGE based on previous reported intervals?

function HomeScreen({ navigation }) {
	const [day, setDay] = useState(0);
	// const [today, setToday] = useState({
	// 	day: "",
	// 	month: "",
	// 	year: "",
	// 	weekDay: 0,
	// 	calendarFormat: "",
	// });
	const [today, setToday] = useState(null);
	const cycles = useSelector((state) => state.cycles.cycles);
	const dispatch = useDispatch();

	useEffect(() => {
		const lastCycle = cycles[cycles.length - 1];
		const today_day = Math.trunc(Date.now() / (1000 * 60 * 60 * 24));
		let total_days = today_day - lastCycle.startDay;
		setDay(() => {
			return total_days > 0 ? total_days + 1 : 1;
		});
	});

	// if (lastPeriod.isCurrent) {
	// 	let total_days = today_day - lastPeriod.startDay;
	// 	setDay(() => {
	// 		return total_days > 0 ? total_days + 1 : 1;
	// 	});
	// 	setState("period");
	// } else {
	// 	//it is NOT period now
	// 	let total_days = today_day - lastPeriod.endDay;
	// 	setDay(() => {
	// 		return total_days > 0 ? total_days + 1 : 1;
	// 	});
	// 	setState("regular");
	// }

	// const start = () => {
	// 	let day, month, year, end;

	// 	//if chosen other day in calendar - we need to upd:
	// 	//start_day, end_day, start, end

	// 	//if "TODAY" CLICKED;
	// 	day = new Date().getDate();
	// 	month = new Date().getMonth() + 1;
	// 	year = new Date().getFullYear();
	// 	const start = month + "/" + day + "/" + year;
	// 	const start_day = Math.trunc(Date.now() / (1000 * 60 * 60 * 24));

	// 	//else :
	// 	//have to take from calendar
	// 	//new Date("1/9/2022").getTime()/(1000*60*60*24)

	// 	if (day == 1) {
	// 		const evenMonths = [2, 4, 6, 8, 9, 11];
	// 		const oddMonths = [5, 7, 10, 12];
	// 		if (month == 1) {
	// 			end = "12/31/" + (year - 1);
	// 		} else if (evenMonths.includes(month)) {
	// 			end = month - 1 + "/31/" + year;
	// 		} else if (oddMonths.includes(month)) {
	// 			end = month - 1 + "/30/" + year;
	// 		} else {
	// 			const leap_years = [2020, 2024, 2028, 2032, 2036, 2040];
	// 			if (leap_years.includes(year)) {
	// 				end = month - 1 + "/29/" + year;
	// 			} else {
	// 				end = month - 1 + "/28/" + year;
	// 			}
	// 		}
	// 	} else {
	// 		end = month + "/" + (day - 1) + "/" + year;
	// 	}

	// 	const end_day = Math.trunc(new Date(end).getTime() / (1000 * 60 * 60 * 24));

	// 	dispatch(markCycleStart({ start, end, start_day, end_day }));
	// 	//setState("period");
	// };

	const show = () => {
		dispatch(showAll());
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle="light-content" />
			<View style={styles.headerBox}></View>
			<Button
				title="Press"
				onPress={() => {
					console.log("LOL");
				}}
			/>
			<View style={styles.box}>
				<View style={[styles.headerBox, styles.headerShape]}></View>
				<Text>Hello User</Text>
				<View style={[styles.daysCard, styles.boxShadow]}>
					<Text style={styles.daysCardText}>It is day</Text>
					<Text style={styles.daysCardCount}>{day}</Text>
					<Text style={styles.daysCardText}>of your cycle</Text>
					<Pressable
						style={[styles.btn, styles.startBtn]}
						onPress={() => {
							navigation.navigate("Calendar");
						}}
					>
						<Text style={styles.btnText}>mark NEW period start</Text>
					</Pressable>
				</View>
				{/* <Button
					title="Go to Calendar"
					onPress={() => {
						navigation.navigate("Calendar", {
							itemId: 86,
							otherParam: "anything you want here",
							//weekDay: 0,
						});
					}}
				/> */}
				<Pressable style={styles.btn} onPress={show}>
					<Text style={styles.btnText}>show state</Text>
				</Pressable>
				<Notes />
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
	},
	boxShadow: {
		shadowColor: "#171717",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
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
	daysCard: {
		width: "90%",
		height: 240,
		backgroundColor: "white",
		marginTop: "5%",
		borderRadius: 12,
		padding: 10,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	daysCardText: {
		fontSize: 20,
	},
	daysCardCount: {
		fontSize: 78,
		color: "#004550",
	},
	endBtn: {
		backgroundColor: "#ffc8bf",
		width: "100%",
		height: 60,
		alignItems: "center",
		justifyContent: "center",
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
	startBtn: {
		backgroundColor: "#004550",
		width: "100%",
		height: 60,
		alignItems: "center",
		justifyContent: "center",
		marginTop: "auto",
	},
});

export default HomeScreen;
