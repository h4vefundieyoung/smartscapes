import { PointOfInterestCard } from "~/libs/components/components.js";

import { type PointOfInterestDetails } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	pointOfInterests: PointOfInterestDetails[];
};

const PointOfInterestSection = ({
	pointOfInterests,
}: Properties): React.JSX.Element => {
	return (
		<section className={styles["section"]}>
			<div className={styles["container"]}>
				<h2 className={styles["title"]}>Points of interest</h2>
				<ul className={styles["cards"]}>
					{pointOfInterests.map((pointOfInterest) => (
						<PointOfInterestCard
							id={pointOfInterest.id}
							imageUrl={null}
							key={pointOfInterest.id}
							name={pointOfInterest.name}
						/>
					))}
				</ul>
			</div>
		</section>
	);
};

export { PointOfInterestSection };
