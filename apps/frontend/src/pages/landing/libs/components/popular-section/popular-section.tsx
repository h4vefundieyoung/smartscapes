import { RouteCard } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const PopularSection = (): React.JSX.Element => {
	return (
		<section className={styles["section"]}>
			<div className={styles["container"]}>
				<h2 className={styles["title"]}>Popular routes</h2>
				<ul className={styles["cards"]}>
					<RouteCard imageUrl={null} name="Kralovska obora" />
					<RouteCard imageUrl={null} name="Kralovska obora" />
					<RouteCard imageUrl={null} name="Kralovska obora" />
					<RouteCard imageUrl={null} name="Kralovska obora" />
					<RouteCard imageUrl={null} name="Kralovska obora" />
					<RouteCard imageUrl={null} name="Kralovska obora" />
				</ul>
			</div>
		</section>
	);
};

export { PopularSection };
