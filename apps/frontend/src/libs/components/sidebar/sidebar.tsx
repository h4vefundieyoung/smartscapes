import { useCallback, useState } from "react";

import smartScapesLogo from "~/assets/images/logo.svg";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { type NavigationItem } from "~/libs/types/types.js";

import { SidebarItem } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	navigationItems: NavigationItem[];
};

const Sidebar = ({ navigationItems }: Properties): React.JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleClick = useCallback((): void => {
		setIsOpen((previous) => !previous);
	}, []);

	return (
		<div className={styles["collapsable-wrapper"]} data-open={isOpen}>
			<button
				className={styles["close-button"]}
				onClick={handleClick}
				type="button"
			>
				<span className={styles["burger-icon"]} />
			</button>
			<div className={styles["sidebar"]}>
				<Link to={AppRoute.ROOT}>
					<img
						alt="SmartScapes"
						className={styles["logo"]}
						height="24"
						src={smartScapesLogo}
						width="136"
					/>
				</Link>
				<ul className={styles["navigation-list"]}>
					{navigationItems.map((item) => (
						<SidebarItem
							href={item.href}
							icon={item.icon}
							key={item.icon}
							label={isOpen ? item.label : ""}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export { Sidebar };
