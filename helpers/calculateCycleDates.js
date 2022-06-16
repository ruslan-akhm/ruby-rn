export const calculateCycleDates = (chosenDay, timeOffset, cycleLength) => {
	const { day, month, year, timestamp } = chosenDay;
	const end_day_hours = Math.trunc(timestamp / (1000 * 60 * 60)); //prev day hrs;
	const end_day = Math.trunc((end_day_hours + timeOffset) / 24);
	const end_unformatted = new Date(
		(end_day + 1) * 24 * 60 * 60 * 1000
	).toLocaleDateString();
	//y-m-d -> m/d/y
	const end_arr = end_unformatted.split("-");
	const end = end_arr[1] + "/" + end_arr[2] + "/" + end_arr[0];

	const start = month + "/" + day + "/" + year;
	const start_day_hours = Math.trunc(
		new Date(start).getTime() / (1000 * 60 * 60)
	);
	const start_day = (start_day_hours + timeOffset) / 24;
	const expected = start_day + Math.trunc(cycleLength / 2);
	return {
		start,
		start_day,
		end,
		end_day,
		expected,
	};
};
