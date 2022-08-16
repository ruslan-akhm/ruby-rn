export const cycles = [
	{
		id: 1,
		start: "11/3/2021",
		end: "12/5/2021",
		isCurrent: false,
		isMenstruation: false,
		isOvulation: false,
		startDay: 18934,
		endDay: 18966,
	},
	{
		id: 2,
		start: "12/6/2021",
		end: "1/9/2021",
		isCurrent: false,
		isMenstruation: false,
		isOvulation: false,
		startDay: 18967,
		endDay: 19001,
	},
	{
		end: "02/13/2022",
		endDay: 19036,
		id: 3,
		isCurrent: false,
		isMenstruation: false,
		isOvulation: false,
		start: "1/10/2022",
		startDay: 19002,
	},
	{
		end: "",
		endDay: "",
		id: 4,
		isCurrent: true,
		isMenstruation: true,
		isOvulation: false,
		start: "2/14/2022",
		startDay: 19037,
	},
];

export const symptoms = {
	1: "tiredness",
	2: "dizziness",
	3: "stomachache",
	4: "nausea",
	5: "weakness",
	6: "backpain",
	7: "headache",
	8: "vomitting",
};

// export const symptoms = [
// 	{
// 		id: 1,
// 		title: "tiredness",
// 	},
// 	{
// 		id: 2,
// 		title: "dizziness",
// 	},
// 	{
// 		id: 3,
// 		title: "stomachache",
// 	},
// 	{
// 		id: 4,
// 		title: "nausea",
// 	},
// 	{
// 		id: 5,
// 		title: "weakness",
// 	},
// 	{
// 		id: 6,
// 		title: "backpain",
// 	},
// 	{
// 		id: 7,
// 		title: "headache",
// 	},
// 	{
// 		id: 8,
// 		title: "vomitting",
// 	},
// ];

//pains, dizziness, vomitting, nausea, tiredness,
//weakness, fever, chills,
//shakes, stomachache, headache, stools,

export const notes = {
	18948: {
		id: 18948,
		cycleId: 1,
		tags: [7, 2],
		date: {
			calendarFormat: "2021-11-17",
			start_day: 18948,
		},
	},
	18978: {
		id: 18978,
		cycleId: 2,
		tags: [1, 3],
		date: {
			calendarFormat: "2021-12-17",
			start_day: 18978,
		},
	},
	19016: {
		id: 19016,
		cycleId: 3,
		tags: [4, 7],
		date: {
			calendarFormat: "2022-01-24",
			start_day: 19016,
		},
	},
	19017: {
		id: 19017,
		cycleId: 3,
		tags: [4, 6],
		date: {
			calendarFormat: "2022-01-25",
			start_day: 19017,
		},
	},
	19018: {
		id: 19018,
		cycleId: 3,
		tags: [1, 5],
		date: {
			calendarFormat: "2022-01-26",
			start_day: 19018,
		},
	},
};

/////////////
export const ovulations = [
	{
		id: 1,
		cycleId: 1,
		day: {
			date: "2021-11-30",
			day: 18961,
		},
	},
	{
		id: 2,
		cycleId: 2,
		day: {
			date: "2022-01-03",
			day: 18996,
		},
	},
	{
		id: 3,
		cycleId: 3,
		day: {
			date: "2022-02-07",
			day: 19030,
		},
	},
	{
		cycleId: 4,
		day: {
			date: "2022-03-01",
			day: 19052,
		},
		id: 4,
	},
];

export const menstruations = [
	{
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
	{
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
	{
		id: 3,
		cycleId: 3,
		days: [
			{
				date: "2022-01-20",
				day: 19012,
			},
			{
				date: "2022-01-21",
				day: 19013,
			},
			{
				date: "2022-01-22",
				day: 19014,
			},
			{
				date: "2022-01-23",
				day: 19015,
			},
			{
				date: "2022-01-24",
				day: 19016,
			},
		],
		ended: true,
		endedByUser: false,
	},
	{
		cycleId: 4,
		days: [
			{
				date: "2022-02-14",
				day: 19037,
			},
			{
				date: "2022-02-15",
				day: 19038,
			},
			{
				date: "2022-02-16",
				day: 19039,
			},
			{
				date: "2022-02-17",
				day: 19040,
			},
			{
				date: "2022-02-18",
				day: 19041,
			},
		],
		ended: true,
		endedByUser: true,
		id: 4,
	},
];
