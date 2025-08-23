import { Button } from "~/libs/components/components.js";

import { useUserRouteHandlers } from "./libs/hooks/index.js";
import styles from "./styles.module.css";

const UserRoute = (): React.JSX.Element => {
	const { handleFinish, handleStart, isStarted } = useUserRouteHandlers();

	return (
		<div className={styles["container"]}>
			<div className={styles["button-container"]}>
				{isStarted ? (
					<Button label="Finish" onClick={handleFinish} />
				) : (
					<Button label="Start" onClick={handleStart} />
				)}
			</div>
		</div>
	);
};

export { UserRoute };
