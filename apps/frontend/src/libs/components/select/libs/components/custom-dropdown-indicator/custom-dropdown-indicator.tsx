import {
	components,
	type DropdownIndicatorProps,
	type GroupBase,
} from "react-select";

import { Icon } from "~/libs/components/components.js";
import { type IconName, type SelectOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<TOptionValue> = DropdownIndicatorProps<
	SelectOption<TOptionValue>,
	boolean,
	GroupBase<SelectOption<TOptionValue>>
> & {
	iconName: IconName;
};

const CustomDropdownIndicator = <TOptionValue,>({
	iconName,
	...properties
}: Properties<TOptionValue>): React.JSX.Element => (
	<components.DropdownIndicator {...properties}>
		<div className={styles["icon"]}>
			<Icon height={24} name={iconName} width={24} />
		</div>
	</components.DropdownIndicator>
);

export { CustomDropdownIndicator };
