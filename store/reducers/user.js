import {
	SET_USERNAME,
	SET_MENSTRUATION_LENGTH,
	SET_CYCLE_LENGTH,
} from "../actions/user";

const initialState = {
	username: "username",
	menstruationLength: 7,
	cycleLength: 31,
	timeOffset: -(new Date().getTimezoneOffset() / 60), //UTC+ xx
};

const userReducer = (state = initialState, action) => {
	const { payload, type } = action;
	switch (type) {
		case SET_USERNAME:
			return { ...state, username: payload };
		case SET_MENSTRUATION_LENGTH:
			return { ...state, menstruationLength: payload };
		case SET_CYCLE_LENGTH:
			return { ...state, cycleLength: payload };

		default:
			return state;
	}
};

export default userReducer;
