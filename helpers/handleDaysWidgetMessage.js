const MENSTRUATIONS_LATE = "MENSTRUATIONS_LATE";
const MENSTRUATIONS_TODAY = "MENSTRUATIONS_TODAY";
const MENSTRUATIONS_SOON = "MENSTRUATIONS_SOON";
const OVULATIONS_TODAY = "OVULATIONS_TODAY";

const handleDaysWidgetMessage = (msgType, payload) => {
	switch (msgType) {
		case MENSTRUATIONS_LATE: {
			return { message: `Menstruations are ${payload} days late` };
		}
		case MENSTRUATIONS_TODAY: {
			return { message: `Menstruations expected today` };
		}
		case MENSTRUATIONS_SOON: {
			/* Showing days - 1, since we already counted the first day in */
			if (payload == 1) {
				return { message: `Menstruations expected tomorrow` };
			} else if (payload == 2) {
				return { message: `Menstruations expected in ${payload - 1} day` };
			}
			return { message: `Menstruations expected in ${payload - 1} days` };
		}
		case OVULATIONS_TODAY: {
			return { message: `Ovulation day` };
		}
		default:
			return { message: "" };
	}
};

export default handleDaysWidgetMessage;
