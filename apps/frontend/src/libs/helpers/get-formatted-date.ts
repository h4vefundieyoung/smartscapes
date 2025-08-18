import { formatInTimeZone } from "date-fns-tz";

type FormatDate = "dd MMM yyyy" | "yyyy MM dd";

const getFormattedDate = (
	date: Date | string,
	formatDate: FormatDate,
): string => {
	return formatInTimeZone(new Date(date), "UTC", formatDate);
};

export { getFormattedDate };
