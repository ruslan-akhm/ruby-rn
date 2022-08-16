import {
	SET_USER,
	SET_USERNAME,
	SET_MENSTRUATION_LENGTH,
	SET_CYCLE_LENGTH,
} from "../actions/user";
/* get values from state */
export const initialUserState = {
	username: "Tester",
	menstruationLength: 7,
	cycleLength: 28,
	activated: true, //CHANGE TO FALSE IN THE END
	//timeOffset: -(new Date().getTimezoneOffset() / 60), //UTC+ xx
};

const userReducer = (state = initialUserState, action) => {
	const { payload, type } = action;
	switch (type) {
		case SET_USER:
			return {
				...state,
				username: payload.username,
				menstruationLength: payload.menstruationLength,
				cycleLength: payload.cycleLength,
				activated: true,
			};
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
