import { RouterOutlet } from "~/libs/components/components.js";
import { useAppDispatch, useEffect } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import styles from "./styles.module.css";

const App = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
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
