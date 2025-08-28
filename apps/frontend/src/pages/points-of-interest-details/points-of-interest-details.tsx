import image2 from "~/assets/images/route-details/placeholder-image-2.png";
import image3 from "~/assets/images/route-details/placeholder-image-3.png";
import {
	Button,
	FeatureGallery,
	Input,
	Loader,
	MapProvider,
	TextArea,
} from "~/libs/components/components.js";
import { DataStatus, PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	actions as pointOfInterestActions,
	type PointOfInterestPatchRequestDto,
} from "~/modules/points-of-interest/points-of-interest.js";
import { NotFound } from "~/pages/not-found/not-found.js";

import { POINT_OF_INTEREST_FORM_DEFAULT_VALUES } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const PointsOfInterestDetails = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const authenticatedUser = useAppSelector(
		(state) => state.auth.authenticatedUser,
	);
	const dataStatus = useAppSelector(
		(state) => state.pointOfInterestDetails.dataStatus,
	);
	const pointOfInterest = useAppSelector(
		(state) => state.pointOfInterestDetails.pointOfInterest,
	);

	const { control, errors, getValues, handleReset } =
		useAppForm<PointOfInterestPatchRequestDto>({
			defaultValues: POINT_OF_INTEREST_FORM_DEFAULT_VALUES,
		});

	const { id: poiId } = useParams<{ id: string }>();
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	const hasEditPermissions = Boolean(
		authenticatedUser &&
			checkHasPermission(
				[PermissionKey.MANAGE_ROUTES],
				authenticatedUser.group.permissions,
			),
	);

	const handleToggleEditMode = useCallback(() => {
		setIsEditMode((previous) => !previous);
	}, []);

	const handleResetFormValues = useCallback(() => {
		if (!pointOfInterest) {
			return;
		}

		handleReset({
			description: pointOfInterest.description ?? "",
			name: pointOfInterest.name,
		});
	}, [handleReset, pointOfInterest]);
	const handleCancel = useCallback(() => {
		handleResetFormValues();
		setIsEditMode(false);
	}, [handleResetFormValues]);

	const handlePatchRequest = useCallback(() => {
		if (pointOfInterest) {
			const { description, name } = getValues();
			void dispatch(
				pointOfInterestActions.patch({
					id: pointOfInterest.id,
					payload: { description, name },
				}),
			);
			setIsEditMode(false);
		}
	}, [dispatch, getValues, pointOfInterest]);

	useEffect(() => {
		void dispatch(pointOfInterestActions.getById(Number(poiId)));
	}, [dispatch, poiId]);

	useEffect(() => {
		handleResetFormValues();
	}, [handleResetFormValues]);

	if (dataStatus === DataStatus.REJECTED) {
		return <NotFound />;
	}

	if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
		return (
			<div className={styles["loader-container"]}>
				<Loader />
			</div>
		);
	}

	if (!pointOfInterest) {
		return <></>;
	}

	const { description, name } = pointOfInterest;
	const hasDescription = Boolean(description);

	const [longitude, latitude] = pointOfInterest.location.coordinates;

	return (
		<main className={styles["container"]}>
			<div className={styles["header-container"]}>
				{isEditMode ? (
					<>
						<Input
							control={control}
							errors={errors}
							label="Title"
							name="name"
						/>
						<div className={styles["controls-container"]}>
							<Button label="Save" onClick={handlePatchRequest} />
							<Button
								label="Cancel"
								onClick={handleCancel}
								variant="outlined-danger"
							/>
						</div>
					</>
				) : (
					<>
						<h1 className={styles["label"]}>{name}</h1>
						<div className={styles["controls-container"]}>
							{hasEditPermissions && (
								<Button
									icon="edit"
									label="Edit"
									onClick={handleToggleEditMode}
									variant="outlined"
								/>
							)}
						</div>
					</>
				)}
			</div>
			<FeatureGallery
				slides={[
					{
						content: (
							<div className={styles["map-container"]}>
								<MapProvider
									center={[longitude, latitude]}
									markers={[
										{
											coordinates: [longitude, latitude],
										},
									]}
								/>
							</div>
						),
					},
					{
						content: (
							<img
								alt="Point of interest"
								className={styles["image"]}
								src={image2}
							/>
						),
					},
					{
						content: (
							<img
								alt="Point of interest"
								className={styles["image"]}
								src={image3}
							/>
						),
					},
				]}
			/>

			{isEditMode ? (
				<TextArea
					control={control}
					errors={errors}
					label="Description"
					name="description"
				/>
			) : (
				<p className={styles["description"]}>
					{hasDescription ? description : "No description available."}
				</p>
			)}
		</main>
	);
};

export { PointsOfInterestDetails };
