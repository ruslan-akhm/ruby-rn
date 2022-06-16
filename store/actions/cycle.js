export const MARK_CYCLE_START = "MARK_CYCLE_START";
export const MARK_CYCLE_END = "MARK_CYCLE_END";
export const CALCULATE_TODAY = "CALCULATE_TODAY";
export const GET_LAST_CYCLE = "GET_LAST_CYCLE";
export const MARK_EXPECTED_OVULATION = "MARK_EXPECTED_OVULATION";
export const MARK_MENSTRUATION_DAYS = "MARK_MENSTRUATION_DAYS";
export const MARK_MENSTRUATION_END = "MARK_MENSTRUATION_END";
export const SHOW = "SHOW";

//rename
export const markCycleStart = (date) => {
	return { type: MARK_CYCLE_START, payload: date };
};

export const getLastCycle = () => {
	return { type: GET_LAST_CYCLE };
};

// export const markCycleEnd = (date) => {
// 	return { type: MARK_CYCLE_END, data: date };
// };

export const calculateToday = () => {
	return { type: CALCULATE_TODAY };
};

export const updateMenstruationDays = (days) => {
	return { type: MARK_MENSTRUATION_DAYS, payload: days };
};

export const setOvulationDay = (day) => {
	return { type: MARK_EXPECTED_OVULATION, payload: day.expected };
};

export const markMenstruationsEnd = (menstruationDays) => {
	return { type: MARK_MENSTRUATION_END, payload: menstruationDays };
};

export const showAll = () => {
	return { type: SHOW };
};
