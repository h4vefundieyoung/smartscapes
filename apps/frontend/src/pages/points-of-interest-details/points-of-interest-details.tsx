import image1 from "~/assets/images/route-details/placeholder-image-1.png";
import image2 from "~/assets/images/route-details/placeholder-image-2.png";
import image3 from "~/assets/images/route-details/placeholder-image-3.png";
import { ImageGallery, Loader } from "~/libs/components/components.js";
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

const PointsOfInterestDetails = (): React.JSX.Element => {
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

	return (
		<>
			<main className={styles["container"]}>
				{pointsOfInterestDetails && (
					<>
						<h2 className={styles["header"]}>{pointsOfInterestDetails.name}</h2>
						<ImageGallery images={[image1, image2, image3]} />
						<p className={styles["description"]}>
							{pointsOfInterestDetails.description}
						</p>
					</>
				)}
			</main>
		</>
	);
};

export { PointsOfInterestDetails };
