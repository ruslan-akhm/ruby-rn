export const SET_USER = "SET_USER";
export const SET_USERNAME = "SET_USERNAME";
export const SET_MENSTRUATION_LENGTH = "SET_MENSTRUATION_LENGTH";
export const SET_CYCLE_LENGTH = "SET_CYCLE_LENGTH";

export const initialSetup = (payload) => {
	return { type: SET_USER, payload };
};

export const setUsername = (payload) => {
	return { type: SET_USERNAME, payload };
};

export const setMenstruationLength = (payload) => {
	return { type: SET_MENSTRUATION_LENGTH, payload };
};

export const setCycleLength = (payload) => {
	return { type: SET_CYCLE_LENGTH, payload };
};
