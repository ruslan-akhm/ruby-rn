import {
	MARK_CYCLE_START,
	MARK_CYCLE_END,
	CALCULATE_TODAY,
	SHOW,
} from "../actions/cycle";
import { cycles, periods } from "../../temp/dummy-data";

const calculateToday = () => {
	const day = ("0" + new Date().getDate()).slice(-2);
	const month = ("0" + (new Date().getMonth() + 1)).slice(-2);
	const year = new Date().getFullYear() + "";
	const weekDay = new Date().getDay() + "";
	const calendarFormat = year + "-" + month + "-" + day;
	const start = parseInt(month) + "/" + parseInt(day) + "/" + parseInt(year);
	const daysCounter = Math.trunc(
		new Date(start).getTime() / (1000 * 60 * 60 * 24)
	);

	const updatedToday = {
		day: day,
		month: month,
		year: year,
		weekDay: weekDay,
		calendarFormat: calendarFormat,
		daysCounter: daysCounter,
	};
	return updatedToday;
};

const initialState = {
	cycles: [...cycles],
	//periods: [...periods],
	//ovuls: [],
	today: calculateToday(),
};
//ADD EDIT 1)DATE OF START, 2)DATE OF END, 3)RESUME
const cycleReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		//also create new instance of ovul, notes, periods
		//OR separate reducer?
		case MARK_CYCLE_START:
			const previousCycle = { ...state.cycles[state.cycles.length - 1] };
			previousCycle.isCurrent = false;
			previousCycle.end = payload.end;
			previousCycle.endDay = payload.end_day;

			let newCycle = {
				id: previousCycle.id + 1,
				start: payload.start,
				end: "",
				isCurrent: true,
				notesId: previousCycle.notesId + 1,
				menstruationId: previousCycle.menstruationId + 1,
				ovulationId: previousCycle.ovulationId + 1,
				startDay: payload.start_day,
				endDay: "",
			};

			let updatedCycles = [...state.cycles];
			updatedCycles.splice(
				updatedCycles.length - 1,
				1,
				previousCycle,
				newCycle
			);
			return { ...state, cycles: updatedCycles };

		// case MARK_CYCLE_END:
		// 	let endedPeriod = { ...state.periods[state.periods.length - 1] };
		// 	endedPeriod.end = payload.date;
		// 	endedPeriod.endDay = payload.end_day;
		// 	endedPeriod.isCurrent = false;

		// 	let addedPeriods = [...state.periods];
		// 	addedPeriods.splice(addedPeriods.length - 1, 1, endedPeriod);
		// 	return { ...state, periods: addedPeriods };

		case CALCULATE_TODAY:
			const todayObj = calculateToday();
			return { ...state, today: { ...todayObj } };

		case SHOW:
			console.log(state.today);

		default:
			return state;
	}
};

export default cycleReducer;
