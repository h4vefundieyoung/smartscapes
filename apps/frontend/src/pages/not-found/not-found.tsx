import { useCallback } from "react";
import { useNavigate } from "react-router";

import { Button } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";

import styles from "./styles.module.css";

const NotFound = (): React.JSX.Element => {
	const navigate = useNavigate();

	const onBackHomeClick = useCallback((): void => {
		const promise = navigate(AppRoute.ROOT);

		if (promise instanceof Promise) {
			promise.catch(() => {});
		}
	}, [navigate]);

	return (
		<main className={styles["container"]}>
			<div className={styles["error-container"]}>
				<div className={styles["error-message"]}>
					<h1 className={styles["error-number-label"]}>404</h1>
					<h2 className={styles["error-message__tittle"]}>
						Something went wrong
					</h2>

					<span className={styles["error-description"]}>
						Sorry, we can’t find the page you’re looking for.
					</span>
				</div>

				<Button label="Back to home" onClick={onBackHomeClick} type="button" />
			</div>
		</main>
	);
};

export { NotFound };
