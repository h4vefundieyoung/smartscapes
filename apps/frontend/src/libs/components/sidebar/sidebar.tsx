import { Link } from "react-router";

import dashboardIcon from "~/assets/images/icons/dashboard.svg";
import smartScapesLogo from "~/assets/images/icons/logo.svg";
import { AppRoute } from "~/libs/enums/enums.js";

import styles from "./styles.module.css";

const Sidebar = (): React.JSX.Element => {
	return (
		<div className={styles["sidebar"]}>
			<Link className={styles["sidebar-logo-link"]} to={AppRoute.ROOT}>
				<img
					alt="smart-scapes-logo"
					className={styles["sidebar-logo-icon"]}
					src={smartScapesLogo}
				/>
			</Link>
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
