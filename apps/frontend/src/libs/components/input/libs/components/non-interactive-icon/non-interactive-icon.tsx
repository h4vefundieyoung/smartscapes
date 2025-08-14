import { Icon } from "~/libs/components/components.js";
import { type IconName } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	name: IconName;
};

const NonInteractiveIcon = ({ name }: Properties): React.JSX.Element => {
	return (
		<span className={styles["non-interactive-icon"]}>
			<Icon height={24} name={name} width={24} />
		</span>
	);
};

export { NonInteractiveIcon };
