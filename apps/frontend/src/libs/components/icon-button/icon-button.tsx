import { type ButtonHTMLAttributes } from "react";

import { Icon } from "~/libs/components/components.js";
import { type IconName } from "~/libs/types/types.js";

type Properties = ButtonHTMLAttributes<HTMLButtonElement> & {
	hiddenLabel: string;
	icon: IconName;
	size?: number;
};

const DEFAULT_ICON_SIZE = 16;

const IconButton = ({
	className,
	hiddenLabel,
	icon,
	size = DEFAULT_ICON_SIZE,
	...properties
}: Properties): React.JSX.Element => {
	return (
		<button className={className} type="button" {...properties}>
			<Icon height={size} name={icon} width={size} />
			<span className="visually-hidden">{hiddenLabel}</span>
		</button>
	);
};

export { IconButton };
