import { type JSX } from "react";

import { Button, Link } from "~/libs/components/components.js";
import { type DropdownMenuItem } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	items: DropdownMenuItem[];
	onLogout: () => void;
};

const UserDropdown = ({ items, onLogout }: Properties): JSX.Element => {
	return (
		<div className={styles["user-dropdown"]}>
			<ul className={styles["dropdown-list"]}>
				{items.map((item, index) => (
					<li className={styles["list-item"]} key={index}>
						<Link to={item.href}>{item.label}</Link>
					</li>
				))}
			</ul>
			<Button label="Log out" onClick={onLogout} />
		</div>
	);
};

export { UserDropdown };
