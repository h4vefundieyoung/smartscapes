import { RouterOutlet } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppDispatch, useEffect, useLocation } from "~/libs/hooks/hooks.js";
import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as userActions } from "~/modules/users/users.js";

import styles from "./styles.module.css";

const App = (): React.JSX.Element => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();

	const isRoot = pathname === AppRoute.APP;

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
	}, [isRoot, dispatch]);

	useEffect(() => {
		const fetchToken = async (): Promise<void> => {
			const hasToken = await storage.get(StorageKey.TOKEN);

			if (hasToken) {
				void dispatch(authActions.getAuthenticatedUser());
			}
		};

		void fetchToken();
	}, [dispatch]);

	return (
		<div className={styles["container"]}>
			<div className={styles["outlet-container"]}>
				<RouterOutlet />
			</div>
		</div>
	);
};

export { App };
