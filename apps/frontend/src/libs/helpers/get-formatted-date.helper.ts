import { formatInTimeZone } from "date-fns-tz";

const getFormattedDate = (date: Date, formatDate: string): string => {
	return formatInTimeZone(date, "UTC", formatDate);
};

export { getFormattedDate };
