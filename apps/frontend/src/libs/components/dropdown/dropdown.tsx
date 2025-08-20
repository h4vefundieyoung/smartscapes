import { type JSX } from "react";

import { Icon, NavLink } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type DropdownItem } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	items: DropdownItem[];
};

const Dropdown = ({ items }: Properties): JSX.Element => {
	const linkClassName = useCallback(() => styles["link"], []);

	return (
		<div className={styles["dropdown"]}>
			<ul className={styles["list"]}>
				{items.map((item, index) => (
					<li className={styles["item"]} key={index}>
						{item.to ? (
							<NavLink className={linkClassName} to={item.to}>
								<span className={styles["icon"]}>
									<Icon height={24} name={item.icon} width={24} />
								</span>
								<span className={styles["label"]}>{item.label}</span>
							</NavLink>
						) : (
							<button
								className={styles["button"]}
								onClick={item.onClick}
								type="button"
							>
								<span className={styles["icon"]}>
									<Icon height={24} name={item.icon} width={24} />
								</span>
								<span className={styles["label"]}>{item.label}</span>
							</button>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export { Dropdown };
