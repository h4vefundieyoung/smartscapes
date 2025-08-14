import { type GroupKey } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type NavigationItem } from "./navigation-item.type.js";

type NavigationItemsGroup = {
	groupKey?: ValueOf<typeof GroupKey>;
	hasLabel: boolean;
	items: NavigationItem[];
	name: string;
};

export { type NavigationItemsGroup };
