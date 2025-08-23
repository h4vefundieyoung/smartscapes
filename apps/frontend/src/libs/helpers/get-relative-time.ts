import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

const getRelativeTime = (date: string): string => {
	return formatDistanceToNow(new Date(date), {
		addSuffix: true,
		locale: enUS,
	});
};

export { getRelativeTime };
