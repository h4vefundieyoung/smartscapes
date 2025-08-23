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
	type PointsOfInterestResponseDto,
} from "~/modules/points-of-interest/points-of-interest.js";
import { NotFound } from "~/pages/not-found/not-found.js";

import { POINT_OF_INTEREST_FORM_DEFAULT_VALUES } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const PointsOfInterestDetails = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const { poiState, user } = useAppSelector(
		({ auth, pointOfInterestDetails }) => ({
			poiState: pointOfInterestDetails,
			user: auth.authenticatedUser,
		}),
	);
	const { dataStatus, pointsOfInterestDetails } = poiState;

	const { control, errors, getValues, handleValueSet } =
		useAppForm<PointOfInterestPatchRequestDto>({
			defaultValues: POINT_OF_INTEREST_FORM_DEFAULT_VALUES,
		});

	const { id: poiId } = useParams<{ id: string }>();
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	const hasEditPermissions = Boolean(
		user &&
			checkHasPermission([PermissionKey.MANAGE_ROUTES], user.group.permissions),
	);

	const handleToggleEditMode = useCallback(() => {
		setIsEditMode((previous) => !previous);
	}, []);

	const handlePatchRequest = useCallback(() => {
		if (pointsOfInterestDetails) {
			const { description, name } = getValues();
			void dispatch(
				pointOfInterestActions.patchPointOfInterest({
					id: pointsOfInterestDetails.id,
					payload: { description, name },
				}),
			);
			setIsEditMode(false);
		}
	}, [dispatch, getValues, pointsOfInterestDetails]);

	useEffect(() => {
		void dispatch(pointOfInterestActions.getById(Number(poiId)));
	}, [dispatch, poiId]);

	useEffect(() => {
		if (pointsOfInterestDetails) {
			handleValueSet("name", pointsOfInterestDetails.name);
			handleValueSet(
				"description",
				pointsOfInterestDetails.description as string,
			);
		}
	}, [pointsOfInterestDetails, handleValueSet]);

	if (dataStatus === DataStatus.REJECTED) {
		return <NotFound />;
	}

	if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
		return <Loader />;
	}

	const { description, name } =
		pointsOfInterestDetails as PointsOfInterestResponseDto;
	const hasDescription = Boolean(description);

	if (!pointsOfInterestDetails) {
		return <></>;
	}

	const [latitude, longitude] = pointsOfInterestDetails.location.coordinates;

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
						<div className={styles["edit-mode-controls"]}>
							<Button label="Save" onClick={handlePatchRequest} />
							<Button label="Cancel" onClick={handleToggleEditMode} />
						</div>
					</>
				) : (
					<>
						<h1 className={styles["label"]}>{name}</h1>
						{hasEditPermissions && (
							<div className={styles["edit-button-container"]}>
								<Button label="Edit" onClick={handleToggleEditMode} />
							</div>
						)}
					</>
				)}
			</div>

			<FeatureGallery
				slides={[
					{
						content: (
							<MapProvider
								center={[longitude, latitude]}
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

			{isEditMode ? (
				<TextArea
					control={control}
					errors={errors}
					label="Description"
					name="description"
				/>
			) : (
				hasDescription && <p className={styles["description"]}>{description}</p>
			)}
		</main>
	);
};

export { PointsOfInterestDetails };
