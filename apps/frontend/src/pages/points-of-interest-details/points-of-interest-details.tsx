import image2 from "~/assets/images/route-details/placeholder-image-2.png";
import image3 from "~/assets/images/route-details/placeholder-image-3.png";
import {
	FeatureGallery,
	Loader,
	MapProvider,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useParams,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/points-of-interest/points-of-interest.js";
import { NotFound } from "~/pages/not-found/not-found.js";

import styles from "./styles.module.css";

const PointsOfInterestDetails = (): null | React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { dataStatus, pointsOfInterestDetails } = useAppSelector(
		({ pointOfInterestDetails }) => pointOfInterestDetails,
	);
	const { id } = useParams();
	const isRejected = dataStatus === DataStatus.REJECTED;
	const isLoading = dataStatus === DataStatus.PENDING;

	useEffect(() => {
		void dispatch(actions.getById(Number(id)));
	}, [dispatch, id]);

	if (isRejected) {
		return <NotFound />;
	}

	if (isLoading) {
		return <Loader />;
	}

	if (!pointsOfInterestDetails) {
		return null;
	}

	const [latitude, longitude] = pointsOfInterestDetails.location.coordinates;

	return (
		<>
			<main className={styles["container"]}>
				<h2 className={styles["header"]}>{pointsOfInterestDetails.name}</h2>

				<FeatureGallery
					slides={[
						{
							content: (
								<MapProvider
									markers={[
										{
											coordinates: [longitude, latitude],
										},
									]}
								/>
							),
							type: "component",
						},
						{ content: image2, type: "image" },
						{ content: image3, type: "image" },
					]}
				/>

				{pointsOfInterestDetails.description && (
					<p className={styles["description"]}>
						{pointsOfInterestDetails.description}
					</p>
				)}
			</main>
		</>
	);
};

export { PointsOfInterestDetails };
