import { AppRoute } from "~/libs/enums/enums.js";
import { type DropdownItem } from "~/libs/types/types.js";

const HEADER_DROPDOWN_ITEMS: DropdownItem[] = [
	{ icon: "user", label: "Profile", to: AppRoute.PROFILE },
	{ icon: "logout", label: "Log out" },
];

export { HEADER_DROPDOWN_ITEMS };
