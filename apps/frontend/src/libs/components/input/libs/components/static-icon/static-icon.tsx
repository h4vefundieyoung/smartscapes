import { Icon } from "~/libs/components/components.js";
import { type IconName } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	name: IconName;
};

const StaticIcon = ({ name }: Properties): React.JSX.Element => {
	return (
		<span className={styles["static-icon"]}>
			<Icon height={24} name={name} width={24} />
		</span>
	);
};

export { StaticIcon };
