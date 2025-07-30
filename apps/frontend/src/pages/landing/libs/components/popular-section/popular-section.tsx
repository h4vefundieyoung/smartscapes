import { RouteCard } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const PopularSection = (): React.JSX.Element => {
	return (
		<section className={styles["popular-section"]}>
			<p className={styles["title"]}>Popular Routes</p>
			<ul className={styles["cards"]}>
				<RouteCard imageUrl={null} name="Kralovska obora" />
				<RouteCard imageUrl={null} name="Kralovska obora" />
				<RouteCard imageUrl={null} name="Kralovska obora" />
			</ul>
		</section>
	);
};

export { PopularSection };
