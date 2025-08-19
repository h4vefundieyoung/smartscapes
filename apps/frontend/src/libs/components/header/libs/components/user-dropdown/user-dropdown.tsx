import { type JSX } from "react";

import { Icon, NavLink } from "~/libs/components/components.js";
import { combineClassNames } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type DropdownMenuItem } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	items: DropdownMenuItem[];
	onLogout: () => void;
};

const UserDropdown = ({ items, onLogout }: Properties): JSX.Element => {
	const linkClassName = useCallback(
		({ isActive }: { isActive: boolean }): string => {
			return combineClassNames(
				styles["link"],
				isActive && styles["link-active"],
			);
		},
		[],
	);

	return (
		<div className={styles["user-dropdown"]}>
			<ul className={styles["dropdown-list"]}>
				{items.map((item, index) => (
					<li className={styles["list-item"]} key={index}>
						<NavLink className={linkClassName} to={item.href}>
							<span className={styles["icon"]}>
								<Icon height={24} name={item.icon} width={24} />
							</span>
							<span className={styles["label"]}>{item.label}</span>
						</NavLink>
					</li>
				))}
				<li className={styles["list-item"]}>
					<button className={styles["button"]} onClick={onLogout} type="button">
						<span className={styles["icon"]}>
							<Icon height={24} name="logout" width={24} />
						</span>
						Log out
					</button>
				</li>
			</ul>
		</div>
	);
};

export { UserDropdown };
