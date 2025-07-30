import { Icon, Link } from "~/libs/components/components.js";
import { type NavigationItem } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const SidebarItem = ({
	href,
	icon,
	label,
}: NavigationItem): React.JSX.Element => {
	return (
		<li className={styles["item"]}>
			<Link to={href}>
				<span className={styles["icon"]}>
					<Icon height={24} name={icon} width={24} />
				</span>
				{label && <span className={styles["label"]}>{label}</span>}
			</Link>
		</li>
	);
};

export { SidebarItem };
