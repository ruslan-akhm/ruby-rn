import {
	MARK_CYCLE_START,
	MARK_CYCLE_END,
	CALCULATE_TODAY,
	SHOW,
	GET_LAST_CYCLE,
	MARK_EXPECTED_OVULATION,
	MARK_MENSTRUATION_DAYS,
	MARK_MENSTRUATION_END,
} from "../actions/cycle";
import { cycles, menstruations, ovulations } from "../../temp/dummy-data";
import { calculateTodayHelper } from "../../helpers/calculateToday";
import { changeDateFormat } from "../../helpers/changeDateFormat";

const timeOffset = -(new Date().getTimezoneOffset() / 60);

const initialState = {
	cycles: [...cycles],
	menstruations: [...menstruations],
	ovulations: [...ovulations],
	today: calculateTodayHelper(),
};
//ADD EDIT 1)DATE OF START, 2)DATE OF END, 3)RESUME
const cycleReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		/* Create (start) new cycle and end previous one if it exists  */
		case MARK_CYCLE_START: {
			let newCycle;
			let updatedCycles = [...state.cycles];
			if (state.cycles.length === 0) {
				newCycle = {
					id: 1,
					start: payload.start,
					end: "",
					isCurrent: true,
					isMenstruation: payload.isMenstruation,
					isOvulation:
						payload.expected && payload.expected == state.today.daysCounter
							? true
							: false,
					startDay: payload.start_day,
					endDay: "",
				};
				updatedCycles.push(newCycle);
			} else {
				let previousCycle = { ...state.cycles[state.cycles.length - 1] };
				previousCycle.isCurrent = false;
				previousCycle.end = payload.end;
				previousCycle.endDay = payload.end_day;
				previousCycle.isMenstruation = false;
				previousCycle.isOvulation = false;

				newCycle = {
					id: previousCycle.id + 1,
					start: payload.start,
					end: "",
					isCurrent: true,
					isMenstruation: payload.isMenstruation,
					isOvulation:
						payload.expected && payload.expected == state.today.daysCounter
							? true
							: false,
					startDay: payload.start_day,
					endDay: "",
				};

				updatedCycles.splice(
					updatedCycles.length - 1,
					1,
					previousCycle,
					newCycle
				);
			}
			return {
				...state,
				cycles: updatedCycles,
			};
		}

		/* Start new OR add days to existing menstruation period */
		case MARK_MENSTRUATION_DAYS: {
			//CHECK IF WE ARE PAST OVULATION - should probably be done in component
			//OR add pastOvulation: true/false to cycles

			//payload should always be array!!
			//1. this cycle has no menstr yet - just adding initially
			//2. add extra days for mensr
			//3. automatically fill days until reaching menstruationLength
			const { menstruations, cycles } = state;
			const currentCycle = [...cycles][cycles.length - 1];
			const currentMenstruation = [...menstruations].filter(
				(m) => m.cycleId === currentCycle.id
			);
			let updatedMenstruations;
			/* new menstruations */
			//SHOULD AT LEAST AHVE 1 DAY. PAYLOAD CANN NOT BE EMPTY []
			if (!currentMenstruation || currentMenstruation.length === 0) {
				let formattedDates = payload.days.map((d) => {
					return {
						date: changeDateFormat([d.date])[0],
						day: d.day,
					};
				});
				formattedDates = formattedDates.sort((a, b) => a.day - b.day);
				updatedMenstruations = [
					{
						id:
							menstruations.length > 0
								? [...menstruations][menstruations.length - 1].id + 1
								: 1,
						cycleId: currentCycle.id,
						days: formattedDates,
						ended: payload.ended, // coming from payload. If today is in the array then FALSE; If not in the array: True
						endedByUser: payload.endedByUser,
					},
				];
				return {
					...state,
					menstruations: [...menstruations, ...updatedMenstruations],
				};
			} else if (currentMenstruation.length > 0) {
				currentMenstruation.days = [...currentMenstruation.days].concat([
					...payload.days,
				]);
				currentMenstruation.days = [...currentMenstruation.days].sort(
					(a, b) => a.day - b.day
				);
				payload.ended ? (currentMenstruation.ended = payload.ended) : null;
				payload.endedByUser
					? (currentMenstruation.endedByUser = payload.endedByUser)
					: null;
				let updatedMenstruations = [...menstruations].splice(
					menstruations.length - 1,
					1,
					currentMenstruation
				);

				return { ...state, menstruations: updatedMenstruations };
			}
		}

		/* Count expected ovulation day based on cycle start day and average length */
		case MARK_EXPECTED_OVULATION: {
			const day_hours = payload * 24;
			const date = new Date((day_hours + 24) * 60 * 60 * 1000); //ADDING +24 (hours) to day_hours since JS returns date 1 day behind
			const updatedOvulation = [...state.ovulations];
			updatedOvulation.push({
				id: state.ovulations[state.ovulations.length - 1].id + 1,
				cycleId: state.cycles[state.cycles.length - 1].id,
				day: {
					date: changeDateFormat([date.toLocaleDateString()])[0],
					day: payload,
				},
			});
			return { ...state, ovulations: updatedOvulation };
		}
		//isOvul = true;
		//set day

		//SET_OVUL_END

		case MARK_MENSTRUATION_END:
		//payload - day of end
		//isMenstruation = false ,
		//state.menstruations last object ended: true

		case GET_LAST_CYCLE:
			return { ...state.cycles[state.cycles.length - 1] };

		case CALCULATE_TODAY:
			const todayObj = calculateTodayHelper();
			return { ...state, today: { ...todayObj } };

		case SHOW:
		//console.log(state.today);

		default:
			return state;
	}
};

export default cycleReducer;
