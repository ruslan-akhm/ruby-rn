import {
	MARK_MENSTRUATION,
	AUTO_FILL_MENSTRUATION,
	MODIFY_MENSTRUATION,
	DELETE_CYCLE,
	// MARK_CYCLE_END,
	// CALCULATE_TODAY,
	// SHOW,
	// GET_LAST_CYCLE,
	// MARK_EXPECTED_OVULATION,
	// MARK_MENSTRUATION_DAYS,
	// MARK_MENSTRUATION_END,
} from "../actions/cycle";
import { cycles, menstruations, ovulations } from "../../temp/dummy-data-empty";
//import { calculateTodayHelper } from "../../helpers/calculateToday";
//import { changeDateFormat } from "../../helpers/changeDateFormat";

import { convertDateFormat } from "../../helpers/convertDateFormat";

import { initialUserState } from "./user";

import moment from "moment";

//const timeOffset = -(new Date().getTimezoneOffset() / 60);

const initialCyclesState = {
	cycles: { ...cycles },
	menstruations: { ...menstruations },
	ovulations: { ...ovulations },
	today: {
		calendarFormat: moment().format("L"),
		weekDay: "" + moment().day(),
		day: "" + (moment().date() < 10 ? "0" + moment().date() : moment().date()),
		month:
			"" +
			(moment().month() < 10
				? "0" + (moment().month() + 1)
				: moment().month() + 1),
		year: "" + moment().year(),
	},
};

//ADD EDIT 1)DATE OF START, 2)DATE OF END, 3)RESUME

//ADDS EXTRA PERIOD AND MENSTR
//REPLICATE: 1) add 1 day (july 4) -> confirm. 2) add another day (july 5) -> confirm. 3) incorrect id creation
const cycleReducer = (state = initialCyclesState, action) => {
	const { type, payload } = action;
	switch (type) {
		/* User picking days of menstruation */
		case MARK_MENSTRUATION: {
			let payloadDays;
			if (payload.days.length > 1) {
				payloadDays = payload.days.sort((a, b) => a.timestamp - b.timestamp);
			} else {
				payloadDays = [...payload.days];
			}
			payloadDays = convertDateFormat(payloadDays, "-", "/");
			/* Determine if menstruation days marked are going to current cycle, or are a start of a new cycle */
			const latestCycleId = Math.max(...Object.keys(state.cycles));
			const currentCycle = { ...state.cycles[latestCycleId] };
			// Later on, we can change expectedOvulation with ovualtions[latestCycleId] date
			const expectedOvulation = moment(currentCycle.period.start)
				.add(Math.trunc(initialUserState.cycleLength / 2), "days")
				.format("L");
			const difference = moment(expectedOvulation).diff(
				payloadDays[0].date,
				"days"
			);
			if (difference < 0) {
				/* Adding to New cycle */
				let expectedMenstruationEndDay = moment(payloadDays[0].date)
					.add(initialUserState.menstruationLength, "days")
					.format("L");
				let actualMenstruationDifference = moment(
					expectedMenstruationEndDay
				).diff(state.today.calendarFormat, "days");

				let cycles = { ...state.cycles };
				let menstruations = { ...state.menstruations };
				let ovulations = { ...state.ovulations };

				/* Updating now previous cycle (latest cycle) */
				let latestCycle = { ...cycles[latestCycleId] };
				if (latestCycleId != 0) {
					latestCycle.isCurrently = false;
					let latestPeriod = { ...latestCycle.period };
					latestPeriod.end = moment(payloadDays[0].date)
						.subtract(1, "days")
						.format("L");
					latestCycle.period = { ...latestPeriod };
				}
				/* Creating new cycle to add to state */
				const newCycle = {
					id: latestCycleId + 1,
					isCurrently: true,
					period: {
						start: payloadDays[0].date,
						end: "",
					},
					menstruation: {
						id: latestCycleId + 1,
						isCurrently: actualMenstruationDifference >= 0 ? true : false,
					},
					ovulation: {
						id: latestCycleId + 1,
						isCurrently: expectedOvulation === state.today.calendarFormat,
					},
				};
				cycles = { ...cycles, [latestCycleId]: { ...latestCycle } };
				cycles[latestCycleId + 1] = { ...newCycle };

				/* Updating menstruations */
				let addedDays = [];
				for (let i = 0; i < payloadDays.length; i++) {
					(() => {
						const date = payloadDays[i].date;
						addedDays.push({ dateString: date });
					})();
				}
				menstruations[latestCycleId + 1] = {
					id: latestCycleId + 1,
					cycleId: latestCycleId + 1,
					days: [...addedDays],
					ended: actualMenstruationDifference >= 0 ? false : true,
					endedByUser: actualMenstruationDifference >= 0 ? false : true,
				};
				let prevMenstruation = { ...menstruations[latestCycleId] };
				prevMenstruation.ended = true;
				prevMenstruation.endedByUser = false;
				menstruations = {
					...menstruations,
					[latestCycleId]: { ...prevMenstruation },
				};

				/* Creating new ovulations object */
				ovulations[latestCycleId + 1] = {
					id: latestCycleId + 1,
					cycleId: latestCycleId + 1,
					day: {
						dateString: moment(payloadDays[0].date)
							.add(initialUserState.cycleLength / 2, "days")
							.format("L"),
					},
				};
				return {
					...state,
					cycles: { ...cycles },
					menstruations: { ...menstruations },
					ovulations: { ...ovulations },
				};
				//update menstruation (probably will need a separate case for that like "Modify", so to use it as a modify as well)
			} else {
				/* Adding to current exisiting cycle */
				// add "Modify button" and rename history to calendar
				let addedDays = [];
				for (let i = 0; i < payloadDays.length; i++) {
					(() => {
						const date = payloadDays[i].date;
						addedDays.push({ dateString: date });
					})();
				}
				let cycles = { ...state.cycles };
				let menstruations = { ...state.menstruations };
				let ovulations = { ...state.ovulations };
				if (
					moment(addedDays[0].dateString).diff(
						cycles[latestCycleId].period.start,
						"days"
					) < 0
				) {
					let latestCycle = { ...cycles[latestCycleId] };
					let latestPeriod = { ...latestCycle.period };
					latestPeriod.start = addedDays[0].dateString;
					latestCycle.period = { ...latestPeriod };
					cycles = { ...cycles, [latestCycleId]: { ...latestCycle } };
					/* Updating ovulations */
					let latestOvulation = { ...ovulations[latestCycleId] };
					let latestOvulationDay = { ...latestOvulation.day };
					latestOvulationDay.dateString = moment(addedDays[0].dateString)
						.add(initialUserState.cycleLength / 2, "days")
						.format("L");
					latestOvulation.day = { ...latestOvulationDay };
					ovulations = {
						...ovulations,
						[latestCycleId]: { ...latestOvulation },
					};

					if (cycles.hasOwnProperty(latestCycleId - 1)) {
						let prevCycle = { ...cycles[latestCycleId - 1] };
						let prevPeriod = { ...prevCycle.period };
						prevPeriod.end = moment(addedDays[0].dateString)
							.subtract(1, "days")
							.format("L");
						prevCycle.period = { ...prevPeriod };
						cycles = { ...cycles, [latestCycleId - 1]: { ...prevCycle } };
					}
				}

				/* Copy current menstruations data from state */
				let latestMenstruation = { ...menstruations[latestCycleId] };
				let latestMenstruationDays = [...latestMenstruation.days];
				latestMenstruationDays = [...latestMenstruationDays, ...addedDays];
				latestMenstruationDays.sort(function (left, right) {
					return moment.utc(left.dateString).diff(moment.utc(right.dateString));
				});
				latestMenstruation.days = [...latestMenstruationDays];
				menstruations = {
					...menstruations,
					[latestCycleId]: { ...latestMenstruation },
				};

				return {
					...state,
					cycles: { ...cycles },
					menstruations: { ...menstruations },
					ovulations: { ...ovulations },
				};
			}
		}
		case AUTO_FILL_MENSTRUATION: {
			/* Update cycle */
			let cycles = { ...state.cycles };
			if (!cycles.hasOwnProperty(1)) return state;
			const latestCycleId = Math.max(...Object.keys(cycles));
			let currentCycle = { ...cycles[latestCycleId] };
			let cycleMenstruation = { ...currentCycle.menstruation };
			cycleMenstruation.isCurrently =
				payload.type !== "ADD_MENSTRUATIONS_DAYS_AND_END";
			currentCycle.menstruation = { ...cycleMenstruation };
			cycles[latestCycleId] = { ...currentCycle };

			/* Update menstruations */
			let menstruations = { ...state.menstruations };
			let currentMenstruation = { ...menstruations[latestCycleId] };
			currentMenstruation.days = [...currentMenstruation.days, ...payload.days];
			currentMenstruation.ended =
				payload.type === "ADD_MENSTRUATIONS_DAYS_AND_END";
			currentMenstruation.endedByUser = false;
			menstruations[latestCycleId] = { ...currentMenstruation };

			return {
				...state,
				cycles: { ...cycles },
				menstruations: { ...menstruations },
			};
		}
		case MODIFY_MENSTRUATION: {
			//console.log(payload);
			//1. Payload should have: +a) dates array; +b) id of cycle/menst; +c) POSSIBLY a current menstruation end flag
			//2. +Update [payload.id] menstruations days
			//3. +Update current cycle "start" date
			//4. +Update prev cycle "end" date if needed (check if it ever exists also)
			//5. ???? Should disable dates before prevCycle.start + menstrLength(or actual menstr-s array length) ???
			//6. Possibly set isCurrent = false (if such option was chosen on modal)
			//7. +recalculate ovulations

			const { id, newDates, endMarking } = payload;
			let cycles = { ...state.cycles };
			let menstruations = { ...state.menstruations };
			let ovulations = { ...state.ovulations };

			const convertedDates = convertDateFormat(newDates, "-", "/");
			let payloadDays = convertedDates.sort((a, b) => {
				if (moment(a.date).isBefore(b.date)) {
					return -1;
				} else {
					return 1;
				}
			});
			/* Update corresponsidng menstruation */
			let actedMenstruation = { ...menstruations[id] };
			actedMenstruation.days = payloadDays.reduce((acc, val) => {
				acc = [...acc, { dateString: val.date }];
				return acc;
			}, []);
			if (endMarking) {
				actedMenstruation.ended = true;
				actedMenstruation.endedByUser = true;
			}
			menstruations = { ...menstruations, [id]: { ...actedMenstruation } };

			/* Check if cycles should be updated as well */
			if (
				!moment(cycles[id].period.start).isSame(
					actedMenstruation.days[0].dateString
				)
			) {
				let actedCycle = { ...cycles[id] };
				let actedCyclePeriod = { ...actedCycle.period };
				actedCyclePeriod.start = actedMenstruation.days[0].dateString;
				actedCycle.period = { ...actedCyclePeriod };
				cycles = { ...cycles, [id]: { ...actedCycle } };
				/* If previous cycle exists - update it accordingly */
				if (cycles.hasOwnProperty(id - 1) && id - 1 != 0) {
					let prevCycle = { ...cycles[id - 1] };
					let prevCyclePeriod = { ...prevCycle.period };
					prevCyclePeriod.end = moment(actedMenstruation.days[0].dateString)
						.subtract(1, "days")
						.format("L");
					prevCycle.period = { ...prevCyclePeriod };
					cycles = { ...cycles, [id - 1]: { ...prevCycle } };
				}
				/* Recalculate ovulations day */
				let actedOvulation = { ...ovulations[id] };
				let actedOvulationDay = { ...actedOvulation.day };
				actedOvulationDay.dateString = moment(
					actedMenstruation.days[0].dateString
				)
					.add(initialUserState.cycleLength / 2, "days")
					.format("L");
				actedOvulation.day = { ...actedOvulationDay };
				ovulations = { ...ovulations, [id]: { ...actedOvulation } };
			}
			if (endMarking) {
				let actedCycle = { ...cycles[id] };
				let actedCycleMenstruation = { ...actedCycle.menstruation };
				actedCycleMenstruation.isCurrently = false;
				actedCycle.menstruation = { ...actedCycleMenstruation };
				cycles = { ...cycles, [id]: { ...actedCycle } };
			}

			/* Updated state returned */
			return {
				...state,
				cycles: { ...cycles },
				menstruations: { ...menstruations },
				ovulations: { ...ovulations },
			};
		}

		case DELETE_CYCLE: {
			const { id } = payload;
			// console.log("DELETE " + id);
			let cycles = { ...state.cycles };
			let menstruations = { ...state.menstruations };
			let ovulations = { ...state.ovulations };

			/* Modify cycles */
			if (cycles.hasOwnProperty(id - 1) && id - 1 != 0) {
				let prevCycle = { ...cycles[id - 1] };
				prevCycle.isCurrently = true;
				let prevCyclePeriod = { ...prevCycle.period };
				prevCyclePeriod.end = "";
				prevCycle.period = { ...prevCyclePeriod };
				cycles = { ...cycles, [id - 1]: { ...prevCycle } };
			}
			delete cycles[id];
			/* Modify menstruations and ovulations */
			delete menstruations[id];
			delete ovulations[id];
			//1. +Should delete cycle, menstruation and ovulation of chosen id
			//2. +Only allow to delete last/latest cycle ???

			return {
				...state,
				cycles: { ...cycles },
				menstruations: { ...menstruations },
				ovulations: { ...ovulations },
			};
		}

		default:
			return state;
	}
};

export default cycleReducer;
