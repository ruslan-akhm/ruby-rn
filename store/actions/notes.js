export const ADD_NOTE = "ADD_NOTE";
export const REMOVE_NOTE = "REMOVE_NOTE";
export const ADD_TAG = "ADD_TAG";
export const REMOVE_TAG = "REMOVE_TAG";
export const UPDATE_NOTES = "UPDATE_NOTES";
export const MODIFY_NOTES = "MODIFY_NOTES";

//rename
export const addNote = (payload) => {
	return { type: ADD_NOTE, payload }; // text
};

export const updateNotes = (payload) => {
	return { type: UPDATE_NOTES, payload };
};

export const modifyNotes = (payload) => {
	return { type: MODIFY_NOTES, payload };
};

export const removeNote = (date) => {
	return { type: REMOVE_NOTE, payload: date }; // id?
};

export const addTag = (date) => {
	return { type: ADD_TAG, payload: date }; //color
};

export const removeTag = (date) => {
	return { type: REMOVE_TAG, payload: date }; //id ?
};

export const showAll = () => {
	return { type: SHOW };
};
