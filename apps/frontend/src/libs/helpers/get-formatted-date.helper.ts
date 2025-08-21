import { formatInTimeZone } from "date-fns-tz";

type FormatDate = "dd MMM yyyy" | "yyyy MM dd";

const getFormattedDate = (date: Date, formatDate: FormatDate): string => {
	return formatInTimeZone(date, "UTC", formatDate);
};

export { getFormattedDate };
