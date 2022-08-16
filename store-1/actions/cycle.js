export const MARK_MENSTRUATION = "MARK_MENSTRUATION";
export const AUTO_FILL_MENSTRUATION = "AUTO_FILL_MENSTRUATION";
export const MODIFY_MENSTRUATION = "MODIFY_MENSTRUATION";
export const DELETE_CYCLE = "DELETE_CYCLE";
// export const MARK_CYCLE_END = "MARK_CYCLE_END";
// export const CALCULATE_TODAY = "CALCULATE_TODAY";
// export const GET_LAST_CYCLE = "GET_LAST_CYCLE";
// export const MARK_EXPECTED_OVULATION = "MARK_EXPECTED_OVULATION";
// export const MARK_MENSTRUATION_DAYS = "MARK_MENSTRUATION_DAYS";
// export const MARK_MENSTRUATION_END = "MARK_MENSTRUATION_END";
// export const SHOW = "SHOW";

export const markMenstruation = (date) => {
	return { type: MARK_MENSTRUATION, payload: date };
};

/* add days based on determineCurrentState.js return object */
export const autoFIllMenstruation = (data) => {
	return { type: AUTO_FILL_MENSTRUATION, payload: data };
};

export const modifyMenstruation = (data) => {
	return { type: MODIFY_MENSTRUATION, payload: data };
};

export const deleteCycle = (data) => {
	return { type: DELETE_CYCLE, payload: data };
};
// export const getLastCycle = () => {
// 	return { type: GET_LAST_CYCLE };
// };

// // export const markCycleEnd = (date) => {
// // 	return { type: MARK_CYCLE_END, data: date };
// // };

// export const calculateToday = () => {
// 	return { type: CALCULATE_TODAY };
// };

// export const updateMenstruationDays = (days) => {
// 	return { type: MARK_MENSTRUATION_DAYS, payload: days };
// };

// export const setOvulationDay = (day) => {
// 	return { type: MARK_EXPECTED_OVULATION, payload: day.expected };
// };

// export const markMenstruationsEnd = (menstruationDays) => {
// 	return { type: MARK_MENSTRUATION_END, payload: menstruationDays };
// };

// export const showAll = () => {
// 	return { type: SHOW };
// };
