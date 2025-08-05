import {
	Button,
	Header,
	Loader,
	RouterOutlet,
	Sidebar,
} from "~/libs/components/components.js";
import { NAVIGATION_ITEMS } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppDispatch, useEffect, useLocation } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as userActions } from "~/modules/users/users.js";

import { mockImages } from "../carousel/assets/mock-images/mock-images.js";
import { Carousel } from "../carousel/carousel.js";
import styles from "./styles.module.css";

const App = (): React.JSX.Element => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();

	const isRoot = pathname === AppRoute.APP;

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
			void dispatch(authActions.getAuthenticatedUser());
		}
	}, [isRoot, dispatch]);

	return (
		<div className={styles["container"]}>
			<div className={styles["outlet-container"]}>
				<RouterOutlet />
			</div>
			{isRoot && (
				<div className={styles["components-container"]}>
					<Header />
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
			)}
		</div>
	);
};

export { App };
