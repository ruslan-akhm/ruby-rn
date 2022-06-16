export const changeDateFormat = (days) => {
	const changedDates = days.map((d) => {
		let dateFormat = d.split("/");
		if (dateFormat[0] < 10) dateFormat[0] = "0" + dateFormat[0];
		if (dateFormat[1] < 10) dateFormat[1] = "0" + dateFormat[1];
		const year = dateFormat.pop();
		dateFormat.unshift(year);
		dateFormat = dateFormat.join("-");
		return dateFormat;
	});
	return changedDates;
};
