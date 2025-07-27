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
	return (
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
						label={item.label}
					/>
				))}
			</ul>
		</div>
	);
};

export { Sidebar };
