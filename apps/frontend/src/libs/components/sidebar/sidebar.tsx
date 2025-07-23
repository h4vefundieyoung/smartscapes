import Logo from "~/assets/images/icons/logo.svg?react";
import { NavItem, NavLink } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { type NavigationItem } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	navigationItems: NavigationItem[];
};

const Sidebar = ({ navigationItems }: Properties): React.JSX.Element => {
	return (
		<div className={styles["sidebar"]}>
			<NavLink
				className={styles["sidebar-logo-link"] as string}
				to={AppRoute.ROOT}
			>
				<Logo className={styles["sidebar-logo-icon"]} />
			</NavLink>
			<ul className={styles["sidebar-navigation-list"]}>
				{navigationItems.map((item) => (
					<NavItem
						href={item.href}
						icon={item.icon}
						key={item.icon}
						label={item.label}
					/>
				))}
			</ul>
		</div>
	);
};

export { Sidebar };
