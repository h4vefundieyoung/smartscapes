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

	const { control, errors, getValues, handleValueSet } =
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
		if (pointOfInterest) {
			handleValueSet("name", pointOfInterest.name);
			handleValueSet("description", pointOfInterest.description as string);
		}
	}, [pointOfInterest, handleValueSet]);

	if (dataStatus === DataStatus.REJECTED) {
		return <NotFound />;
	}

	if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
		return <Loader />;
	}

	if (!pointOfInterest) {
		return <></>;
	}

	const { description, name } = pointOfInterest;
	const hasDescription = Boolean(description);

	const [latitude, longitude] = pointOfInterest.location.coordinates;

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
							<Button label="Edit" onClick={handleToggleEditMode} />
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
