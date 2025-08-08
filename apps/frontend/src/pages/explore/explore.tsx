import { Header, Sidebar } from "~/libs/components/components.js";
import { NAVIGATION_ITEMS } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const Explore = (): React.JSX.Element => {
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	return (
		<div className={styles["container"]}>
			<Header
				actions={[{ label: "Sign in", to: AppRoute.SIGN_IN }]}
				user={authenticatedUser}
			/>
			<div className={styles["content"]}>
				<div className={styles["sidebar"]}>
					<Sidebar navigationItems={NAVIGATION_ITEMS} />
				</div>
				<main className={styles["main"]}>
					<h1 className={styles["title"]}>Explore Places</h1>
					<p className={styles["description"]}>
						Discover amazing places and plan your next adventure.
					</p>
					{/* TODO: Add places list, filters, and map integration */}
				</main>
			</div>
		</div>
	);
};

export { Explore };
