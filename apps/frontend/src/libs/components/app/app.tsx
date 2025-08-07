import { Loader, RouterOutlet } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useEffect,
	useLocation,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as userActions } from "~/modules/users/users.js";

import styles from "./styles.module.css";

const App = (): React.JSX.Element => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const [isAuthInitialized, setIsAuthInitialized] = useState<boolean>(false);

	const isRoot = pathname === AppRoute.APP;

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
	}, [isRoot, dispatch]);

	useEffect(() => {
		const initAuth = async (): Promise<void> => {
			await dispatch(authActions.getAuthenticatedUser());
			setIsAuthInitialized(true);
		};

		void initAuth();
	}, [dispatch]);

	if (!isAuthInitialized) {
		return (
			<div className={styles["loader-container"]}>
				<Loader />
			</div>
		);
	}

	return (
		<div className={styles["container"]}>
			<div className={styles["outlet-container"]}>
				<RouterOutlet />
			</div>
		</div>
	);
};

export { App };
