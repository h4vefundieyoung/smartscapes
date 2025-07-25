import { Icon, NavLink } from "~/libs/components/components.js";
import { combineClassNames } from "~/libs/helpers/combine-class-names.helper.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type NavigationItem } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const SidebarItem = ({
	href,
	icon,
	label,
}: NavigationItem): React.JSX.Element => {
	const getSidebarClassName = useCallback(
		({ isActive }: { isActive: boolean }): string =>
			combineClassNames(styles["link"], isActive && styles["active"]),
		[],
	);

	return (
		<li>
			<NavLink className={getSidebarClassName} to={href}>
				<span className={styles["icon"]}>
					<Icon height={24} name={icon} width={24} />
				</span>
				<label className={styles["label"]}>{label}</label>
			</NavLink>
		</li>
	);
};

export { SidebarItem };
