//no sql
export const cycles = {
	1: {
		id: 1,
		isCurrently: false,
		period: {
			start: "11/3/2021",
			end: "12/5/2021",
			startDay: 18934,
			endDay: 18966,
		},
		menstruation: {
			id: 1,
			isCurrently: false,
		},
		ovulation: {
			id: 1,
			isCurrently: false,
		},
	},
	2: {
		id: 2,
		isCurrently: false,
		period: {
			start: "12/6/2021",
			end: "1/9/2021",
			startDay: 18967,
			endDay: 19001,
		},
		menstruation: {
			id: 2,
			isCurrently: false,
		},
		ovulation: {
			id: 2,
			isCurrently: false,
		},
	},
};

//no sql, based on cycle id
export const notes = {
	1: {
		id: 1,
		cycleId: 1,
		dates: {
			18948: {
				calendarFormat: "2021-11-17",
				tags: [7, 2],
			},
		},
	},
};

//no sql
export const ovulations = {
	1: {
		id: 1,
		cycleId: 1,
		day: {
			date: "2021-11-30",
			day: 18961,
		},
	},
};

//no sql
export const menstruations = {
	1: {
		id: 1,
		cycleId: 1,
		days: [
			{
				date: "2021-11-18",
				day: 18949,
			},
			{
				date: "2021-11-19",
				day: 18950,
			},
			{
				date: "2021-11-20",
				day: 18951,
			},
		],
		ended: true,
		endedByUser: false,
	},
	2: {
		id: 2,
		cycleId: 2,
		days: [
			{
				date: "2021-12-22",
				day: 18983,
			},
			{
				date: "2021-12-23",
				day: 18984,
			},
			{
				date: "2021-12-24",
				day: 18985,
			},
			{
				date: "2021-12-25",
				day: 18986,
			},
		],
		ended: true,
		endedByUser: false,
	},
};
