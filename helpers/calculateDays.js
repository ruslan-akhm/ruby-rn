export const calculateDays = ({ lastMenstruation, lastDay }) => {
	/*  Calculate days from lastMenstruation last marked day up until (and including) lastDay */
	/* 
        return: object[] in format:
        {
            date: "2021-11-19",
			day: 18950,
        }
    */
	console.log(lastDay);
	let sortedDays = lastMenstruation.days.sort((a, b) => a.day - b.day);

	while (sortedDays[sortedDays.length - 1].day < lastDay) {
		const nextDay = sortedDays[sortedDays.length - 1].day + 1;
		//console.log(nextDay);
		const formattedDate = new Date(
			(nextDay + 1) * 24 * 60 * 60 * 1000
		).toLocaleDateString();
		sortedDays.push({
			date: formattedDate,
			day: nextDay,
		});
	}

	return sortedDays;
};
