import {
	components,
	type DropdownIndicatorProps,
	type GroupBase,
} from "react-select";

import { Icon } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const SearchIcon = <
	Option = unknown,
	IsMulti extends boolean = boolean,
	Group extends GroupBase<Option> = GroupBase<Option>,
>(
	properties: DropdownIndicatorProps<Option, IsMulti, Group>,
): React.JSX.Element => {
	return (
		<components.DropdownIndicator {...properties}>
			<div className={styles["icon"]}>
				<Icon height={24} name="search" width={24} />
			</div>
		</components.DropdownIndicator>
	);
};

export { SearchIcon };
