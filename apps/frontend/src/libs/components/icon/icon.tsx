import { type IconName } from "~/libs/types/types.js";

import { iconNameToSvg } from "./libs/maps/maps.js";

type Properties = {
	className?: string;
	height: number;
	name: IconName;
	width: number;
};

const Icon = ({
	className = "",
	height,
	name,
	width,
}: Properties): React.JSX.Element => {
	const IconComponent = iconNameToSvg[name];

	return <IconComponent className={className} height={height} width={width} />;
};

export { Icon };
