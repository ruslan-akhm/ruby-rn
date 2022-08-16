//no sql
export const cycles = {
	0: {
		id: 0,
		isCurrently: false,
		period: {
			start: "12/01/1999",
			end: "12/02/1999",
		},
		menstruation: {
			id: 0,
			isCurrently: false,
		},
		ovulation: {
			id: 0,
			isCurrently: false,
		},
	},
	1: {
		id: 1,
		isCurrently: false,
		period: {
			start: "11/03/2021",
			end: "12/05/2021",
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
		isCurrently: false, //false,
		period: {
			start: "06/06/2022",
			end: "07/19/2022",
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
	3: {
		id: 3,
		isCurrently: true,
		period: {
			start: "07/15/2022",
			end: "",
		},
		menstruation: {
			id: 3,
			isCurrently: false,
		},
		ovulation: {
			id: 3,
			isCurrently: false,
		},
	},
};

//no sql, based on cycle id
export const notes = {
	1: {
		id: 1,
		cycleId: 1,
		dates: {},
	},
	2: {
		id: 2,
		cycleId: 2,
		dates: {
			"06/20/2022": {
				calendarFormat: "2022-06-20",
				symptoms: ["tiredness", "dizziness"],
			},
		},
	},
	3: {
		cycleId: 3,
		dates: {
			"07/29/2022": {
				calendarFormat: "2022-07-29",
				symptoms: ["stomachache", "dizziness"],
			},
			"07/31/2022": {
				calendarFormat: "2022-07-31",
				symptoms: [
					"sickness",
					"stomachache",
					"dizziness",
					"tiredness",
					"nausea",
					"weakness",
					"backpain",
					"headache",
				],
			},
		},
		id: 3,
	},
};

//no sql
export const ovulations = {
	0: {
		id: 0,
		cycleId: 0,
		day: {
			dateString: "12/01/1999",
		},
	},
	1: {
		id: 1,
		cycleId: 1,
		day: {
			dateString: "11/30/2021",
		},
	},
	2: {
		id: 2,
		cycleId: 2,
		day: {
			dateString: "06/20/2022", // "07/15/2022",
		},
	},
	3: {
		id: 3,
		cycleId: 3,
		day: {
			dateString: "07/31/2022",
		},
	},
};

//no sql
export const menstruations = {
	0: {
		id: 0,
		cycleId: 0,
		days: [
			{
				dateString: "12/02/1999",
			},
		],
		ended: true,
		endedByUser: false,
	},
	1: {
		id: 1,
		cycleId: 1,
		days: [
			{
				dateString: "11/18/2021",
			},
			{
				dateString: "11/19/2021",
			},
			{
				dateString: "11/20/2021",
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
				dateString: "06/06/2022",
			},
			{
				dateString: "06/07/2022",
			},
			{
				dateString: "06/08/2022",
			},
			{
				dateString: "06/09/2022",
			},
			{
				dateString: "06/12/2022",
			},
		],
		ended: true,
		endedByUser: false,
	},
	3: {
		id: 3,
		cycleId: 3,
		days: [
			{
				dateString: "07/15/2022",
			},
			{
				dateString: "07/16/2022",
			},
			{
				dateString: "07/17/2022",
			},
			{
				dateString: "07/31/2022",
			},
		],
		ended: true,
		endedByUser: false,
	},
};
