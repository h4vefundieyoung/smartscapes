import { Icon, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type PointsOfInterestResponseDto } from "~/modules/points-of-interest/points-of-interest.js";

import styles from "./styles.module.css";

type Properties = {
	onClick: (id: number) => void;
	pointOfInterest: PointsOfInterestResponseDto;
};

const PointOfInterestCard = ({
	onClick,
	pointOfInterest,
}: Properties): React.JSX.Element => {
	const { id, name } = pointOfInterest;

	const handleClick = useCallback(() => {
		onClick(id);
	}, [id, onClick]);

	const poiDetailsPath = configureString(AppRoute.POINTS_OF_INTEREST_$ID, {
		id: String(id),
	});

	return (
		<li className={styles["container"]}>
			<span className={styles["name"]}>{name}</span>

			<div className={styles["right"]}>
				<Link to={poiDetailsPath}>
					<div className={styles["icon"]}>
						<Icon height={24} name="link" width={24} />
					</div>
				</Link>

				<button
					className={styles["button"]}
					onClick={handleClick}
					type="button"
				>
					<Icon height={24} name="trash" width={24} />
				</button>
			</div>
		</li>
	);
};

export { PointOfInterestCard };
