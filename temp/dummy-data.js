export const timePeriod = 30;

export const cycles = [
	{
		id: 1,
		start: "11/3/2021",
		end: "12/5/2021",
		isCurrent: false,
		notesId: 1,
		menstruationId: 1,
		ovulationId: 1,
		startDay: 18934,
		endDay: 18966,
	},
	{
		id: 2,
		start: "12/6/2021",
		end: "1/9/2021",
		isCurrent: false,
		notesId: 2,
		menstruationId: 2,
		ovulationId: 2,
		startDay: 18967,
		endDay: 19001,
	},
	{
		id: 3,
		start: "1/10/2022",
		end: "",
		isCurrent: true,
		notesId: 3,
		menstruationId: 3,
		ovulationId: 3,
		startDay: 19002,
		endDay: "",
	},
];

export const symptoms = [
	{
		id: 1,
		title: "tiredness",
	},
	{
		id: 2,
		title: "dizziness",
	},
	{
		id: 3,
		title: "stomachache",
	},
	{
		id: 4,
		title: "nausea",
	},
	{
		id: 5,
		title: "weakness",
	},
	{
		id: 6,
		title: "backpain",
	},
	{
		id: 7,
		title: "headache",
	},
	{
		id: 8,
		title: "vomitting",
	},
];
//pains, dizziness, vomitting, nausea, tiredness,
//weakness, fever, chills,
//shakes, stomachache, headache, stools,

//Should add date when symptom was added ?
export const notes = {
	1: {
		18948: {
			tags: [7, 2],
			date: {},
		},
	},
	2: {
		18978: {
			tags: [1, 3],
			date: {},
		},
	},
	3: {
		19017: {
			tags: [4, 6],
			date: {
				calendarFormat: "2022-01-25",
				day: "25",
				month: "01",
				start_day: 19017,
				weekDay: "2",
				year: "2022",
			},
		},
		19018: {
			tags: [4, 6],
			date: {},
		},
	},
};

export const periods = [
	{
		id: 1,
		start: "11/3/2021",
		end: "11/10/2021",
		totalDays: 7,
	},
	{
		id: 2,
		start: "12/6/2021",
		end: "12/14/2021",
		totalDays: 8,
	},
	{
		id: 3,
		start: "1/10/2022",
		end: "",
		totalDays: "",
	},
];

export const ovulations = [
	{
		id: 1,
		start: "11/18/2021",
		end: "11/21/2021",
		totalDays: 3,
	},
	{
		id: 2,
		start: "12/22/2021",
		end: "12/25/2021",
		totalDays: 3,
	},
	{
		id: 3,
		start: "",
		end: "",
		totalDays: "",
	},
];
