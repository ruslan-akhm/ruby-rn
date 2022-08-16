import moment from "moment";
//import { test } from "../store/actions/cycle";

export const determineCurrentState = (cyclesState, userState) => {
	const { today, cycles, menstruations, ovulations } = cyclesState;
	const { cycleLength, menstruationLength } = userState;

	//THIS HAS TO BE REWRITTENT IF USER JUST STARTED USING OUR APP
	if (Object.keys(cycles).length === 0) {
		return {
			type: {
				category: "DEFAULT",
				value: null,
			},
			payload: null,
		};
	}

	const latestCycleId = Math.max(...Object.keys(cycles));
	/* Check if currently a menstruation */
	if (
		cycles[latestCycleId].menstruation.isCurrently &&
		menstruations[latestCycleId].days.length < menstruationLength
	) {
		/* menstruationLengthAgo = Date of today's day - menstruationLength days */
		/* subtracting menstruationLength - 1 days, because we already are counting the very first day, so only need to add menstruationLength - 1 more  */
		let menstruationLengthAgo = moment(today.calendarFormat)
			.subtract(menstruationLength - 1, "days")
			.format("L");

		/* Difference between first reported day of current menstruation and menstruationLengthAgo */
		const firstReportedDay = menstruations[latestCycleId].days[0].dateString;
		const difference = moment(firstReportedDay).diff(
			menstruationLengthAgo,
			"days"
		);

		/* if Difference is >= 0 - we add days from LAST ADDED up until TODAY to menstruations, 
		   else set is Currently to false 
		*/
		const lastReportedDay =
			menstruations[latestCycleId].days[
				menstruations[latestCycleId].days.length - 1
			].dateString;
		if (difference >= 0) {
			let daysToAdd = [];
			let dayToadd = lastReportedDay;
			while (!moment(dayToadd).isSame(today.calendarFormat)) {
				dayToadd = moment(dayToadd).add(1, "days").format("L");
				daysToAdd.push({ dateString: dayToadd });
			}
			return {
				type: { category: "STATE_UPDATE", value: "ADD_MENSTRUATIONS_DAYS" },
				payload: [...daysToAdd],
			};
		} else {
			let daysToAdd = [];
			let dayToadd = lastReportedDay;
			const lastExpectedDay = moment(firstReportedDay)
				.add(menstruationLength - 1, "days")
				.format("L");
			while (!moment(dayToadd).isSame(lastExpectedDay)) {
				dayToadd = moment(dayToadd).add(1, "days").format("L");
				daysToAdd.push({ dateString: dayToadd });
			}
			return {
				type: {
					category: "STATE_UPDATE",
					value: "ADD_MENSTRUATIONS_DAYS_AND_END", //ended: true, ended by user : false
				},
				payload: [...daysToAdd],
			};

			//fill up menstr so it be length equal to menstruationLength  +
			//set cycles[id].menstr.isCurrent = false    (( ended: true, ended by user : false  ))
		}
	}

	return {
		type: {
			category: "DEFAULT",
			value: null,
		},
		payload: null,
	};
};
