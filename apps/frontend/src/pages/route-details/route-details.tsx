import image1 from "~/assets/images/route-details/placeholder-image-1.png";
import image2 from "~/assets/images/route-details/placeholder-image-2.png";
import image3 from "~/assets/images/route-details/placeholder-image-3.png";
import {
	Button,
	FeatureGallery,
	Input,
	Loader,
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
import { type ReviewRequestDto } from "~/modules/reviews/reviews.js";
import {
	actions as routeActions,
	type RoutePatchRequestDto,
} from "~/modules/routes/routes.js";
import { actions as userRoutesActions } from "~/modules/user-routes/user-routes.js";

import { NotFound } from "../not-found/not-found.js";
import {
	PointOfInterestSection,
	RouteReviewsSection,
} from "./libs/components/components.js";
import { ROUTE_FORM_DEFAULT_VALUES } from "./libs/constants/constants.js";
import { UserRouteStatus } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const RouteDetails = (): React.JSX.Element => {
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const { id: routeId } = useParams<{ id: string }>();
	const user = useAppSelector(({ auth }) => auth.authenticatedUser);
	const dataStatus = useAppSelector(
		({ routeDetails }) => routeDetails.dataStatus,
	);
	const reviews = useAppSelector(({ routeDetails }) => routeDetails.reviews);
	const route = useAppSelector(({ routeDetails }) => routeDetails.route);
	const saveStatus = useAppSelector(
		({ routeDetails }) => routeDetails.saveRouteStatus,
	);

	const { control, errors, getValues, handleReset } =
		useAppForm<RoutePatchRequestDto>({
			defaultValues: ROUTE_FORM_DEFAULT_VALUES,
		});

	const isAuthorized = Boolean(user);
	const isSaved = route?.userRoute?.status === UserRouteStatus.NOT_STARTED;
	const isSaving = saveStatus === DataStatus.PENDING;
	const hasEditPermissions = Boolean(
		user &&
			checkHasPermission([PermissionKey.MANAGE_ROUTES], user.group.permissions),
	);

	const handleToggleEditMode = useCallback(() => {
		setIsEditMode((isEditMode) => !isEditMode);
	}, []);

	const handleResetFormValues = useCallback(() => {
		if (!route) {
			return;
		}

		handleReset({
			description: route.description ?? "",
			name: route.name,
		});
	}, [handleReset, route]);

	const handleCancel = useCallback(() => {
		handleResetFormValues();
		setIsEditMode(false);
	}, [handleResetFormValues]);

	const handlePatchRequest = useCallback(() => {
		if (route) {
			const { description, name } = getValues();
			void dispatch(
				routeActions.patch({
					id: route.id,
					payload: { description, name },
				}),
			);
			setIsEditMode(false);
		}
	}, [dispatch, setIsEditMode, route, getValues]);

	const handleSaveUserRoute = useCallback(() => {
		if (route?.id) {
			void dispatch(userRoutesActions.saveUserRoute(route.id));
		}
	}, [route?.id, dispatch]);

	const handleDeleteUserRoute = useCallback(() => {
		if (route?.userRoute?.id) {
			void dispatch(userRoutesActions.deleteUserRoute(route.userRoute.id));
		}
	}, [route?.userRoute?.id, dispatch]);

	useEffect(() => {
		void dispatch(routeActions.getById(Number(routeId)));
	}, [dispatch, routeId]);

	useEffect(() => {
		void dispatch(routeActions.getReviews({ routeId: Number(routeId) }));
	}, [dispatch, routeId]);

	const handleCreateReview = useCallback(
		(payload: ReviewRequestDto): void => {
			void dispatch(routeActions.createReview(payload));
		},
		[dispatch],
	);

	if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
		return (
			<div className={styles["loader-container"]}>
				<Loader />
			</div>
		);
	}

	if (dataStatus === DataStatus.REJECTED) {
		return <NotFound />;
	}

	if (!route) {
		return <></>;
	}

	const { description, id, name, pois } = route;

	const hasDescription = Boolean(description);

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
							<Button label="Cancel" onClick={handleCancel} />
						</div>
					</>
				) : (
					<>
						<h1 className={styles["label"]}>{name}</h1>
						{isAuthorized && (
							<div className={styles["controls-container"]}>
								{hasEditPermissions && (
									<div className={styles["edit-button-container"]}>
										<Button
											label="Edit"
											onClick={handleToggleEditMode}
											variant="outlined"
										/>
									</div>
								)}
								<div className={styles["save-button-container"]}>
									<Button
										disabled={isSaving}
										icon="bookmarks"
										label="save route"
										onClick={
											isSaved ? handleDeleteUserRoute : handleSaveUserRoute
										}
										pressed={isSaved}
									/>
								</div>
							</div>
						)}
					</>
				)}
			</div>
			<FeatureGallery
				slides={[
					{ content: image1, type: "image" },
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
			<PointOfInterestSection pointOfInterests={pois} />
			<RouteReviewsSection
				isAuthenticatedUser={isAuthorized}
				items={reviews}
				onCreate={handleCreateReview}
				routeId={Number(id)}
			/>
		</main>
	);
};

export { RouteDetails };
