import { ADD_NOTE } from "../actions/notes";
import { notes } from "../../temp/dummy-data";

const initialState = {
	notes: { ...notes },
};

const notesReducer = (state = initialState, action) => {
	const { payload, type } = action;
	switch (type) {
		case ADD_NOTE:
			const { notesId, date, symptoms } = payload;
			let updatedNotes = { ...state.notes };
			if (date.start_day in updatedNotes[notesId]) {
				const updatedTags = new Set([
					...updatedNotes[notesId][date.start_day].tags,
					...symptoms,
				]);
				updatedNotes[notesId][date.start_day].tags = [...updatedTags];
			} else {
				updatedNotes[notesId][date.start_day].date = date;
				updatedNotes[notesId][date.start_day].tags = [...symptoms];
			}
			console.log(updatedNotes);
			return { ...state, notes: { ...updatedNotes } };

		default:
			return state;
	}
};

export default notesReducer;
