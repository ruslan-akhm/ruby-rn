export const calculateTodayHelper = () => {
	const currentTimezoneOffset = -(new Date().getTimezoneOffset() / 60);
	const day = ("0" + new Date().getDate()).slice(-2);
	const month = ("0" + (new Date().getMonth() + 1)).slice(-2);
	const year = new Date().getFullYear() + "";
	const weekDay = new Date().getDay() + "";
	const calendarFormat = year + "-" + month + "-" + day;
	const start = parseInt(month) + "/" + parseInt(day) + "/" + parseInt(year);
	const hoursCounter = Math.trunc(new Date(start).getTime() / (1000 * 60 * 60));
	const daysCounter = Math.trunc(
		//new Date(start).getTime() / (1000 * 60 * 60 * 24)
		(hoursCounter + currentTimezoneOffset) / 24
	);
	const updatedToday = {
		day: day,
		month: month,
		year: year,
		weekDay: weekDay,
		calendarFormat: calendarFormat,
		daysCounter: daysCounter,
	};
	return updatedToday;
};
