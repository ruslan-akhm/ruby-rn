import { test } from "../store/actions/cycle";

export const determineCurrentState = (cyclesState, userState) => {
	const { today, cycles, menstruations } = cyclesState;
	const { cycleLength, menstruationLength } = userState;

	//THIS HAS TO BE REWRITTENT IF USER JUST STARTED USING OUR APP

	//
	// THIS TO BE USED WHEN PUSHING NEW OVULATION INTO CYCLES

	const lastMenstruation = menstruations[menstruations.length - 1];
	//console.log(lastMenstruation);
	const firstDayOfMenstruation = lastMenstruation.days[0];
	const lastDayOfMenstruation =
		lastMenstruation.days[lastMenstruation.days.length - 1];
	//console.log(lastDayOfMenstruation);
	/* If menstruation is NOT ended yet (current cycle)  */
	if (!lastMenstruation.ended) {
		/* check if last added day in menstuation[] is less then first day+menstrLength - meaning user is still in menstruation */
		if (
			firstDayOfMenstruation.day + menstruationLength >
			lastDayOfMenstruation.day
		) {
			/* user didnt check app for some time, menstr should have ended already */
			if (today.daysCounter > firstDayOfMenstruation.day + menstruationLength) {
				//fill up all days up until firstDayOfMenstruation.day + menstruationLength
				return {
					type: "state",
					data: "UPDATE_MENSTRUATIONS_AND_END_THEM",
					payload: {
						lastMenstruation: lastMenstruation,
						lastDay: firstDayOfMenstruation.day + menstruationLength,
					},
				};
			} else {
				//today <= firstDayOfMenstruation.day + menstruationLength  -  user is still in menstr process
				//fill up all days up until (and including) today
				return {
					type: "state",
					data: "UPDATE_MENSTRUATIONS",
					payload: {
						lastMenstruation: lastMenstruation,
						lastDay: today.daysCounter,
					},
				};
			}

			//return { type: "state", data: "UPDATE_MENSTRUATION" };
			//push today (day & date) into menstruation day
			//UPDATE_MENSTRUATION
		} else {
			return {
				type: "state",
				data: "MARK_MENSTRUATION_END",
				payload: {
					lastMenstruation: lastMenstruation,
					lastDay: firstDayOfMenstruation.day + (menstruationLength - 1), //subtract 1 here, since firstDayOfMenstruation already marked (otherwise will add 8 days instead of 7)
				},
			};
			//last day should be firstDayOfMenstruation.day + menstruationLength
			//need to set ended: true if its been menstruationLength
			//MARK_MENSTRUATION_END
		}
	} else {
		const lastCycle = cycles[cycles.length - 1];
		//const lastOvulation = ovulations[ovulations.length - 1];
		const expectedOvulationDay =
			lastCycle.startDay + Math.trunc(cycleLength / 2);
		/* check if today is close close by ovulation day OR by the end of cycle */
		if (expectedOvulationDay - today.daysCounter < 4) {
			if (expectedOvulationDay - today.daysCounter === 0) {
				return { type: "message", data: "Ovulation today" };
				//show ovul is today
			} else if (expectedOvulationDay - today.daysCounter > 0) {
				return {
					type: "message",
					data: `Ovulation is expected in ${
						expectedOvulationDay - today.daysCounter
					} days`,
				};
				//show ovulation is in expectedOvulationDay - today.daysCounter days
				//
			}
		}

		if (lastCycle.startDay + cycleLength - today.daysCounter < 4) {
			if (lastCycle.startDay + cycleLength - today.daysCounter > 0) {
				//show your menstr shoudl start in lastCycle.startDay - today.daysCounter days
				return {
					type: "message",
					data: `Menstruation is expected in ${
						lastCycle.startDay - today.daysCounter
					} days`,
				};
			} else if (lastCycle.startDay + cycleLength - today.daysCounter === 0) {
				//show your menstr shoudl start today
				return {
					type: "message",
					data: `Menstruation is expected in today`,
				};
			} else {
				//console.log(today.daysCounter - (lastCycle.startDay + cycleLength));
				return {
					type: "message",
					data: `Menstruation should have started ${
						today.daysCounter - (lastCycle.startDay + cycleLength)
					} ${
						today.daysCounter - (lastCycle.startDay + cycleLength) === 1
							? "day"
							: "days"
					} ago`,
				};
			}
		}

		return {
			type: "state",
			data: "UPDATE_MENSTRUATIONS_AND_END_THEM",
			payload: {
				lastMenstruation: lastMenstruation,
				lastDay: firstDayOfMenstruation.day + (menstruationLength - 1),
			},
		};

		return { type: "message", data: null };
	}
};
