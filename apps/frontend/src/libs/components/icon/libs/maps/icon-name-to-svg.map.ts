import Analytics from "~/assets/images/icons/analytics.svg?react";
import Dashboard from "~/assets/images/icons/dashboard.svg?react";
import Settings from "~/assets/images/icons/settings.svg?react";
import { type IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
	analytics: Analytics,
	dashboard: Dashboard,
	settings: Settings,
};

export { iconNameToSvg };
