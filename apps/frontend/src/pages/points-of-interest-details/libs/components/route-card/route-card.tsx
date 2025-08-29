import imagePlaceholer from "~/assets/images/placeholder-card.jpg";
import { MapProvider, TextLink } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { combineClassNames, configureString } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	id: number;
	imageUrl: null | string;
	mapProps: React.ComponentProps<typeof MapProvider>;
	name: string;
};

const RouteCard = ({
	id,
	imageUrl,
	mapProps,
	name,
}: Properties): React.JSX.Element => {
	const hasImage = Boolean(imageUrl);
	const routeDetailsUrl = configureString(AppRoute.ROUTES_$ID, {
		id: id.toString(),
	});

	return (
		<li className={styles["card"]}>
			<TextLink to={routeDetailsUrl}>
				{hasImage ? (
					<span className={styles["card-content"]}>
						<img
							alt={name}
							className={styles["image"]}
							src={imageUrl ?? imagePlaceholer}
						/>
					</span>
				) : (
					<span
						className={combineClassNames(
							styles["event-disable"],
							styles["card-content"],
						)}
					>
						<MapProvider {...mapProps} />
					</span>
				)}
			</TextLink>
			<span className={styles["title"]}>{name}</span>
		</li>
	);
};

export { RouteCard };
