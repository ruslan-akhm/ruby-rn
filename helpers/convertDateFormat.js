export const convertDateFormat = (dates, from, to) => {
	/* moment.js uses format:           mm/dd/yyyy    .calendarFormat
	   native-calendar user formaet:    yyyy-mm-dd    .dateString     */
	let convertedDates = [];
	if (from === "/") {
		if (dates[0].hasOwnProperty("dateString")) {
			// for (let date of dates) {
			// 	let convertedDate = date.dateString;
			// 	convertedDates.push({ date: convertedDate });
			// }
			for (let date of dates) {
				let convertedDate = date.dateString.split("/");
				convertedDate =
					convertedDate[2] + to + convertedDate[0] + to + convertedDate[1];
				convertedDates.push({ date: convertedDate });
			}
		} else {
			for (let date of dates) {
				let convertedDate = date.calendarFormat.split("/");
				convertedDate =
					convertedDate[2] + to + convertedDate[0] + to + convertedDate[1];
				convertedDates.push({ date: convertedDate });
			}
		}
	} else {
		if (dates[0].hasOwnProperty("calendarFormat")) {
			for (let date of dates) {
				let convertedDate = date.calendarFormat;
				convertedDates.push({ date: convertedDate });
			}
		} else {
			for (let date of dates) {
				let convertedDate = date.dateString.split("-");
				convertedDate =
					convertedDate[1] + to + convertedDate[2] + to + convertedDate[0];
				convertedDates.push({ date: convertedDate });
			}
		}
	}
	return convertedDates;
};
