import { Icon, Link } from "~/libs/components/components.js";
import { combineClassNames } from "~/libs/helpers/helpers.js";
import { type NavigationItem } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const SidebarItem = ({
	href,
	icon,
	isLabelHidden,
	label,
}: NavigationItem): React.JSX.Element => {
	return (
		<li className={styles["item"]}>
			<Link to={href}>
				<span className={styles["icon"]}>
					<Icon height={24} name={icon} width={24} />
				</span>
				<span
					className={combineClassNames(
						styles["label"],
						isLabelHidden ? "visually-hidden" : "",
					)}
				>
					{label}
				</span>
			</Link>
		</li>
	);
};

export { SidebarItem };
