import Dashboard from "~/assets/images/icons/dashboard.svg?react";
import ListOfPlaces from "~/assets/images/icons/list-of-places.svg?react";
import { type IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
	dashboard: Dashboard,
	listOfPlaces: ListOfPlaces,
};

export { iconNameToSvg };
