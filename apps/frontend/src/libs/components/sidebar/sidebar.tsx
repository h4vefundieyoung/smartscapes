import { Link } from "react-router";

import dashboardIcon from "~/assets/images/dashboard.svg";
import smartScapesLeafIcon from "~/assets/images/smart-scapes-leaf.svg";
import { AppRoute } from "~/libs/enums/enums.js";

import styles from "./styles.module.css";

const Sidebar = (): React.JSX.Element => {
	return (
		<div className={styles["sidebar"]}>
			<div className={styles["sidebar-logo"]}>
				<img
					alt="Smart Scapes Leaf"
					className={styles["sidebar-logo-icon"]}
					src={smartScapesLeafIcon}
				/>
				<span className={styles["sidebar-logo-text"]}>SmartScapes</span>
			</div>
			<ul className={styles["sidebar-navigation-list"]}>
				<li>
					<Link
						className={styles["sidebar-navigation-link"]}
						to={AppRoute.ROOT}
					>
						<img
							alt="Dashboard"
							className={styles["sidebar-navigation-icon"]}
							src={dashboardIcon}
						/>
						<span className={styles["sidebar-navigation-text"]}>Dashboard</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export { Sidebar };
