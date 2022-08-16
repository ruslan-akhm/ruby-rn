import moment from "moment";
//import { test } from "../store/actions/cycle";

export const determineCurrentMessage = (cyclesState, userState) => {
	const { today, cycles, menstruations, ovulations } = cyclesState;
	const { cycleLength, menstruationLength } = userState;

	/* Check if menstruation is about to start (ORDER MATTERS) */
	const latestCycleId = Math.max(...Object.keys(cycles));
	const expectedNextCycleStart = moment(
		menstruations[latestCycleId].days[0].dateString
	)
		.add(cycleLength, "days")
		.format("L");
	const daysToExpectedNextCycle = moment(expectedNextCycleStart).diff(
		today.calendarFormat,
		"days"
	);

	if (daysToExpectedNextCycle < 0) {
		return {
			type: {
				category: "MESSAGE",
				value: "MENSTRUATIONS_LATE",
			},
			payload: daysToExpectedNextCycle * -1,
		};
	} else if (daysToExpectedNextCycle === 0) {
		return {
			type: {
				category: "MESSAGE",
				value: "MENSTRUATIONS_TODAY",
			},
			payload: null,
		};
	} else {
		if (daysToExpectedNextCycle <= menstruationLength) {
			return {
				type: {
					category: "MESSAGE",
					value: "MENSTRUATIONS_SOON",
				},
				payload: daysToExpectedNextCycle,
			};
		}
	}

	/* Check if today is an ovulation */
	if (moment(ovulations[latestCycleId].day.date).isSame(today.calendarFormat)) {
		//set cycle.oculation.isCurrently = true????? do we need that property at all?
		return {
			type: {
				category: "MESSAGE",
				value: "OVULATIONS_TODAY",
			},
			payload: null,
		};
	}

	return {
		type: {
			category: "DEFAULT",
			value: null,
		},
		payload: null,
	};
};
