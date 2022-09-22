import React, { useEffect, useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	StatusBar,
	Button,
	Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";
import ModifyModal from "../components/modify/ModifyModal";

function ModifyScreen({ route, navigation }) {
	const cycles = useSelector((state) => state.cycles);
	const ids = [...Object.keys(cycles.cycles)];
	const notes = useSelector((state) => state.notes.notes);
	//THERE MIGHT BE no notes on the expanded Item (no such id) : line 135
	//SHOULD CREATE NEW ID NOTES??
	//can add notesUpdate - to check if id in notes: if no - create empty prop ; if yes - do nothing?????

	//WHEN deleting the whole cycle - remove notes too
	const [expandedItem, setExpandedItem] = useState();
	const [currentId, setCurrentId] = useState();
	const [canBeRemoved, setCanBeRemoved] = useState(false);
	const [minDate, setMinDate] = useState(undefined);
	const [maxDate, setMaxDate] = useState(
		moment(cycles.today.calendarFormat).subtract(1, "days").format("L")
	);

	useEffect(() => {
		let latestCycleId = Math.max(...ids);
		if (cycles.cycles[latestCycleId].menstruation.isCurrently) {
			setCurrentId(latestCycleId);
		} else {
			setCurrentId(null);
		}
	}, [cycles]);

	const handlePress = (id) => {
		if (ids.includes((+id - 1).toString())) {
			/* There is an exisitng previous cycle */
			const prevCycleMenstruations = cycles.menstruations[+id - 1].days;
			setMinDate(
				prevCycleMenstruations[prevCycleMenstruations.length - 1].dateString
			);
		}
		if (ids.includes((+id + 1).toString())) {
			/* There is an exisitng next cycle */
			const nextCycleMenstruations = cycles.menstruations[+id + 1].days;
			// console.log(
			// 	moment(nextCycleMenstruations[0].dateString)
			// 		.subtract(1, "days")
			// 		.format("L")
			// );
			setMaxDate(
				moment(nextCycleMenstruations[0].dateString)
					.subtract(1, "days")
					.format("L")
			);
		}

		setExpandedItem(id);
		let latestCycleId = Math.max(...ids);
		setCanBeRemoved(id == latestCycleId);
	};

	const closeModal = () => {
		setExpandedItem(null);
		setMinDate(undefined);
		setMaxDate(
			moment(cycles.today.calendarFormat).subtract(1, "days").format("L")
		);
	};

	const menstruationsList = ids.reduce((acc, id) => {
		if (id == 0) return acc;
		let item = (
			<Pressable
				onPress={() => handlePress(id)}
				key={"view" + id}
				style={{
					height: "100%",
				}}
			>
				<Text>
					{moment(cycles.menstruations[id].days[0].dateString)
						.format("ll")
						.split(",")[0] +
						" - " +
						moment(
							cycles.menstruations[id].days[
								cycles.menstruations[id].days.length - 1
							].dateString
						)
							.format("ll")
							.split(",")[0]}
				</Text>
				{cycles.cycles[id].menstruation.isCurrently && <Text>Current</Text>}
			</Pressable>
		);
		acc = [...acc, item];
		return acc;
	}, []);

	//How can be modified??
	//1. Update (change/modify) days
	//2. Remove completely (will need to update length of a cycle/menstr before deeleted one) - can only delete latest cycle
	//3. End current menstruation

	//CAN HAVE TABS FOR MODIFYING DAYS OF MENSTR
	//AND MODIFYING NOTES FOR CYCLES
	//LIMIT MODIFICATION AREA WITHIN CYCLE BOUNDARIES ??

	//BUG: MODIFY MODAL SHOWS LAST MONTH TWICE

	const menstruationsitems = menstruationsList.map((item, index) => {
		return (
			<View
				style={{
					marginVertical: 10,
					backgroundColor: "salmon",
					height: 70,
				}}
				key={"wrapperView" + index}
			>
				{item}
			</View>
		);
	});

	return (
		<View
			style={{
				backgroundColor: "gray",
				height: "100%",
			}}
		>
			<Text>Press on an item to modify</Text>
			{Boolean(menstruationsitems) ? (
				menstruationsitems
			) : (
				<Text>You have no menstruations reported</Text>
			)}
			<Text style={{ fontStyle: "italic" }}>
				Note: only the last menstruation cycle in the list can be removed
			</Text>
			{expandedItem && (
				<ModifyModal
					id={expandedItem}
					menstruationDates={cycles.menstruations[expandedItem].days}
					expandedItem={expandedItem}
					//setExpandedItem={setExpandedItem}
					closeModal={closeModal}
					today={cycles.today}
					currentId={currentId}
					canBeRemoved={canBeRemoved}
					notesDates={notes[expandedItem].dates}
					minDate={minDate}
					maxDate={maxDate}
				/>
			)}
		</View>
	);
}

export default ModifyScreen;
