import { Icon, NavLink } from "~/libs/components/components.js";
import { combineClassNames } from "~/libs/helpers/combine-class-names.helper.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type NavigationItem } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const NavItem = ({ href, icon, label }: NavigationItem): React.JSX.Element => {
	const getNavLinkClassName = useCallback(
		({ isActive }: { isActive: boolean }): string =>
			combineClassNames(
				styles["sidebar-navigation-link"],
				isActive && styles["sidebar-navigation-link-active"],
			),
		[],
	);

	return (
		<li>
			<NavLink className={getNavLinkClassName} to={href}>
				<span className={styles["sidebar-navigation-icon"]}>
					<Icon height={24} name={icon} width={24} />
				</span>
				<span className={styles["sidebar-navigation-text"]}>{label}</span>
			</NavLink>
		</li>
	);
};

export { NavItem };
