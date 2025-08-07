import Analytics from "~/assets/images/icons/analytics.svg?react";
import Dashboard from "~/assets/images/icons/dashboard.svg?react";
import Error from "~/assets/images/icons/error.svg?react";
import EyeOff from "~/assets/images/icons/eye-off.svg?react";
import Eye from "~/assets/images/icons/eye.svg?react";
import { type IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
	analytics: Analytics,
	dashboard: Dashboard,
	error: Error,
	eye: Eye,
	eyeOff: EyeOff,
};

export { iconNameToSvg };
