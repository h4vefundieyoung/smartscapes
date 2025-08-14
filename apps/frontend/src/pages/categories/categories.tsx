import { Button } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";

import styles from "./styles.module.css";

const Categories = (): React.JSX.Element => {
	return (
		<main className={styles["main"]}>
			<div>Categories Page</div>
			<Button label="Back to app" to={AppRoute.APP} />
		</main>
	);
};

export { Categories };
