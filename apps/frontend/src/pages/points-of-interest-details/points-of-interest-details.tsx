import { useEffect } from "react";
import { Navigate, useParams } from "react-router";

import image1 from "~/assets/images/route-details/placeholder-image-1.png";
import image2 from "~/assets/images/route-details/placeholder-image-2.png";
import image3 from "~/assets/images/route-details/placeholder-image-3.png";
import { ImageGallery } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/points-of-interest/points-of-interest.js";

import styles from "./styles.module.css";

const PointsOfInterestDetails = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { dataStatus, pointsOfInterestDetails } = useAppSelector(
		({ pointsOfInterestDetails }) => pointsOfInterestDetails,
	);
	const { id } = useParams();
	const isRejected = dataStatus === DataStatus.REJECTED;

	useEffect(() => {
		void dispatch(actions.getById(Number(id)));
	}, [dispatch, id]);

	return (
		<>
			{isRejected && <Navigate replace to={AppRoute.NOT_FOUND} />}
			<main className={styles["container"]}>
				{pointsOfInterestDetails && (
					<>
						<h2 className={styles["header"]}>{pointsOfInterestDetails.name}</h2>
						<ImageGallery mainImage={image1} subImages={[image2, image3]} />
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
