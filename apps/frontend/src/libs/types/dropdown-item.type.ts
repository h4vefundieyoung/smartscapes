import { type AppRoute } from "~/libs/enums/enums.js";
import { type IconName, type ValueOf } from "~/libs/types/types.js";

type DropdownItem = {
	icon: IconName;
	label: string;
	onClick?: () => void;
	to?: ValueOf<typeof AppRoute>;
};

export { type DropdownItem };
