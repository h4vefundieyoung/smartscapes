import {
	Button,
	Header,
	Loader,
	Sidebar,
} from "~/libs/components/components.js";
import { NAVIGATION_ITEMS } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { mockImages } from "../../libs/components/carousel/assets/mock-images/mock-images.js";
import { Carousel } from "../../libs/components/carousel/carousel.js";
import styles from "./styles.module.css";

const Dashboard = (): React.JSX.Element => {
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	return (
		<div className={styles["container"]}>
			<div className={styles["components-container"]}>
				<Header
					actions={[{ label: "Sign in", to: AppRoute.SIGN_IN }]}
					user={authenticatedUser}
				/>
				<div className={styles["sidebar-container"]}>
					<Sidebar navigationItems={NAVIGATION_ITEMS} />
				</div>
				<Loader />
				<div className={styles["button-container"]}>
					<Button label="Button for test" type="button" />
				</div>
				<div className={styles["carousel-container"]}>
					<Carousel images={mockImages} />
				</div>
			</div>
		</div>
	);
};

export { Dashboard };
