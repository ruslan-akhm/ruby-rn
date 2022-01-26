import { ADD_NOTE } from "../actions/notes";
import { notes } from "../../temp/dummy-data";

const initialState = {
	notes: { ...notes },
};

const notesReducer = (state = initialState, action) => {
	const { payload, type } = action;
	switch (type) {
		case ADD_NOTE:
			const id = payload.notesId;
			let updatedNotes = { ...notes };
			updatedNotes[id].tags = [...updatedNotes[id].tags, ...payload.symptoms];
			return { ...state, notes: { ...updatedNotes } };

		default:
			return state;
	}
};

export default notesReducer;
