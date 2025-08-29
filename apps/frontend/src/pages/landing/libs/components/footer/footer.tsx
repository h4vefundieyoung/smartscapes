import appLogo from "~/assets/images/logo-inverted.svg";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";

import styles from "./styles.module.css";

const Footer = (): React.JSX.Element => {
	return (
		<footer className={styles["footer"]}>
			<div className={styles["footer-info"]}>
				<Link to={AppRoute.ROOT}>
					<span className="visually-hidden">Go to landing</span>
					<img
						alt="SmartScapes Logo"
						className={styles["logo"]}
						height={24}
						src={appLogo}
						width={136}
					/>
				</Link>
				<span className={styles["footer-info-rights"]}>
					All rights reserved
				</span>
			</div>
		</footer>
	);
};

export { Footer };
