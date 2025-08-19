import { AppRoute } from "~/libs/enums/enums.js";

import { type DropdownMenuItem } from "../types/types.js";

const DROPDOWN_MENU_ITEMS: DropdownMenuItem[] = [
	{ href: AppRoute.PROFILE, icon: "user", label: "Profile" },
];

export { DROPDOWN_MENU_ITEMS };
