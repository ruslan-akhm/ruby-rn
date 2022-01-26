export const MARK_CYCLE_START = "MARK_CYCLE_START";
export const MARK_CYCLE_END = "MARK_CYCLE_END";
export const CALCULATE_TODAY = "CALCULATE_TODAY";
export const SHOW = "SHOW";

//rename
export const markCycleStart = (date) => {
	return { type: MARK_CYCLE_START, payload: date };
};

// export const markCycleEnd = (date) => {
// 	return { type: MARK_CYCLE_END, data: date };
// };

export const calculateToday = () => {
	return { type: CALCULATE_TODAY };
};

export const showAll = () => {
	return { type: SHOW };
};
