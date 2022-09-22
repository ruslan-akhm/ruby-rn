import {
	CREATE_NOTES_INSTANCE,
	ADD_NOTE,
	UPDATE_NOTES,
	MODIFY_NOTES,
} from "../actions/notes";
import { convertDateFormat } from "../../helpers/convertDateFormat";
import { notes } from "../../temp/dummy-data-empty";

const initialState = {
	notes: { ...notes },
};

const notesReducer = (state = initialState, action) => {
	const { payload, type } = action;
	switch (type) {
		case CREATE_NOTES_INSTANCE: {
			if (!state.notes.hasOwnProperty(payload.latestId)) {
				let updatedState = { ...state.notes };
				updatedState[payload.latestId] = {
					id: payload.latestId,
					cycleId: payload.latestId,
					dates: {},
				};
				return { ...state, notes: { ...updatedState } };
			}
			return { ...state };
		}
		case ADD_NOTE: {
			const { cycleId, date, symptoms } = payload;
			let notes = { ...state.notes };
			let actedCycleNotes;
			const convertedDate = convertDateFormat(
				[{ calendarFormat: date.calendarFormat }],
				"/",
				"-"
			);
			actedCycleNotes = { ...notes[cycleId] };
			if (notes.hasOwnProperty(cycleId)) {
				let actedNotesDates = { ...actedCycleNotes.dates };
				if (actedNotesDates.hasOwnProperty(date.calendarFormat)) {
					let actedDayNotes = { ...actedNotesDates[date.calendarFormat] };
					//DO NOT DUPLICATE SYMPTOMS: gotta check in the component?? (can also show "Already added today??" Or level of severance)
					// actedDayNotes.symptoms = [...actedDayNotes.symptoms, ...symptoms];
					actedDayNotes.symptoms = [...symptoms];
					actedNotesDates[date.calendarFormat] = {
						...actedNotesDates[date.calendarFormat],
						symptoms: [...actedDayNotes.symptoms],
					};
				} else {
					actedNotesDates[date.calendarFormat] = {
						calendarFormat: convertedDate[0].date,
						symptoms: [...symptoms],
					};
				}
				actedCycleNotes.dates = { ...actedNotesDates };
			} else {
				actedCycleNotes = {
					id: cycleId,
					cycleId: cycleId,
					dates: {
						[date.calendarFormat]: {
							calendarFormat: convertedDate[0].date,
							symptoms: [...symptoms],
						},
					},
				};
			}
			notes = { ...notes, [cycleId]: actedCycleNotes };

			return { ...state, notes: notes };
		}

		case UPDATE_NOTES: {
			return state;
			// const { today, lastCycle } = payload;
			// let updNotes = { ...state.notes };
			// updNotes[today.daysCounter] = {
			// 	id: today.daysCounter,
			// 	cycleId: lastCycle.id,
			// 	tags: [],
			// 	date: {
			// 		calendarFormat: today.calendarFormat,
			// 		start_day: today.daysCounter,
			// 	},
			// };
			// return { ...state, notes: updNotes };
		}

		case MODIFY_NOTES: {
			//when adding notes to day, which never had notes before -> need to write logic
			const { cycleId, userNotes, date } = payload;
			const formattedDate = convertDateFormat([{ dateString: date }], "-", "/");
			const dateString = formattedDate[0].date;
			let notes = { ...state.notes };
			let actedCycle = { ...notes[cycleId] };
			let actedDates = { ...actedCycle.dates };
			if (userNotes.length == 0) {
				/* User removed all the previously existing notes for this day */
				delete actedDates[dateString];
				actedCycle.dates = { ...actedDates };
			} else {
				if (actedDates.hasOwnProperty(dateString)) {
					/* Updating existing notes list for this day */
					let actedDate = { ...actedDates[dateString] };
					actedDate.symptoms = [...userNotes];
					actedDates[dateString] = { ...actedDate };
					actedCycle.dates = {
						...actedCycle.dates,
						[dateString]: { ...actedDates[dateString] },
					};
				} else {
					/* Creating new note instance for this day */
					actedDates[dateString] = {
						calendarFormat: date,
						symptoms: [...userNotes],
					};
					actedCycle.dates = {
						...actedCycle.dates,
						[dateString]: { ...actedDates[dateString] },
					};
				}
			}
			notes = { ...notes, [cycleId]: { ...actedCycle } };
			return { ...state, notes: { ...notes } };
		}

		default:
			return state;
	}
};

export default notesReducer;
