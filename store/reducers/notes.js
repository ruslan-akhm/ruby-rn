import { ADD_NOTE, UPDATE_NOTES, MODIFY_NOTES } from "../actions/notes";
import { notes } from "../../temp/dummy-data";

const initialState = {
	notes: { ...notes },
};

const notesReducer = (state = initialState, action) => {
	const { payload, type } = action;
	switch (type) {
		case ADD_NOTE: {
			const { cycleId, date, symptoms } = payload;
			let updatedNotes = { ...state.notes };
			if (date.start_day in updatedNotes) {
				const updatedTags = new Set([
					...updatedNotes[date.start_day].tags,
					...symptoms,
				]);
				updatedNotes[date.start_day].tags = [...updatedTags];
			} else {
				updatedNotes[date.start_day].id = date.start_day;
				updatedNotes[date.start_day].cycleId = cycleId;
				updatedNotes[date.start_day].date = date;
				updatedNotes[date.start_day].tags = [...symptoms];
			}
			return { ...state, notes: { ...updatedNotes } };
		}

		case UPDATE_NOTES: {
			const { today, lastCycle } = payload;
			let updNotes = { ...state.notes };
			updNotes[today.daysCounter] = {
				id: today.daysCounter,
				cycleId: lastCycle.id,
				tags: [],
				date: {
					calendarFormat: today.calendarFormat,
					start_day: today.daysCounter,
				},
			};
			return { ...state, notes: updNotes };
		}

		case MODIFY_NOTES: {
			const { today, lastCycle } = payload;
			let updatedNotes = { ...state.notes };
			updatedNotes[today.daysCounter].cycleId = lastCycle.id;
			return { ...state, notes: { ...updatedNotes } };
		}

		default:
			return state;
	}
};

export default notesReducer;
