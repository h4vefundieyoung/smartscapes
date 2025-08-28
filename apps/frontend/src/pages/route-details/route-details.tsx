import {
	Button,
	FeatureGallery,
	Input,
	Loader,
	MapProvider,
	Select,
	TextArea,
} from "~/libs/components/components.js";
import { AppRoute, DataStatus, PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission, configureString } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppNavigate,
	useAppSelector,
	useCallback,
	useEffect,
	useMemo,
	useParams,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";
import { type Coordinates, type RouteLine } from "~/libs/types/types.js";
import { actions as categoriesActions } from "~/modules/categories/categories.js";
import { type ReviewRequestDto } from "~/modules/reviews/reviews.js";
import {
	actions as routeActions,
	type RouteGetByIdResponseDto,
	type RoutePatchRequestDto,
} from "~/modules/routes/routes.js";
import { actions as userRouteActions } from "~/modules/user-routes/user-routes.js";
import { getGoogleMapsPointUrl } from "~/pages/route-details/libs/helpers/helpers.js";

import { NotFound } from "../not-found/not-found.js";
import {
	PointOfInterestSection,
	RouteReviewsSection,
} from "./libs/components/components.js";
import { TagsContainer } from "./libs/components/tags-container/tag-container.js";
import { ROUTE_FORM_DEFAULT_VALUES } from "./libs/constants/constants.js";
import { UserRouteStatus } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const RouteDetails = (): React.JSX.Element => {
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	const { user } = useAppSelector(({ auth }) => ({
		user: auth.authenticatedUser,
	}));
	const { route } = useAppSelector(({ routeDetails }) => ({
		route: routeDetails.route,
	}));
	const { categories } = useAppSelector(({ categories }) => ({
		categories: categories.categories,
	}));

	const dispatch = useAppDispatch();
	const { id: routeId } = useParams<{ id: string }>();
	const dataStatus = useAppSelector(
		({ routeDetails }) => routeDetails.dataStatus,
	);
	const isRouteCreated = useAppSelector(
		({ userRouteDetails }) =>
			userRouteDetails.createStatus === DataStatus.FULFILLED,
	);
	const reviews = useAppSelector(({ routeDetails }) => routeDetails.reviews);

	const { control, errors, getValues, handleReset, handleValueSet } =
		useAppForm<RoutePatchRequestDto>({
			defaultValues: ROUTE_FORM_DEFAULT_VALUES,
		});
	const categoriesOptions = useMemo(() => {
		const options = categories.map((category) => ({
			label: category.name,
			value: category.id,
		}));

		return options;
	}, [categories]);

	const saveStatus = useAppSelector(
		({ routeDetails }) => routeDetails.saveRouteStatus,
	);

	const navigate = useAppNavigate();

	const isAuthorized = Boolean(user);
	const isSaved = route?.savedUserRoute?.status === UserRouteStatus.NOT_STARTED;
	const isSaving = saveStatus === DataStatus.PENDING;

	const hasEditPermissions = Boolean(
		user &&
			checkHasPermission([PermissionKey.MANAGE_ROUTES], user.group.permissions),
	);

	const fileInputReference = useRef<HTMLInputElement | null>(null);

	const handleOpenGoogleMaps = useCallback(() => {
		if (route) {
			const [firstPoi] = route.pois;
			const [lng, lat] = (firstPoi as RouteGetByIdResponseDto["pois"][0])
				.location.coordinates;
			const url = getGoogleMapsPointUrl(lat, lng);
			window.open(url, "_blank");
		}
	}, [route]);

	const handleFileUpload = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];

			if (!file) {
				return;
			}

			void dispatch(
				routeActions.uploadImage({ file, id: route?.id as number }),
			);
			event.target.value = "";
		},
		[dispatch, route],
	);

	const handleTriggerFileUpload = useCallback(() => {
		fileInputReference.current?.click();
	}, []);

	const handleToggleEditMode = useCallback(() => {
		setIsEditMode((isEditMode) => !isEditMode);
	}, []);

	const handleStart = useCallback(() => {
		void dispatch(userRouteActions.create({ routeId: Number(routeId) }));
	}, [dispatch, routeId]);

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
			const { categories, description, name } = getValues();
			void dispatch(
				routeActions.patch({
					id: route.id,
					payload: { categories, description, name },
				}),
			);
			setIsEditMode(false);
		}
	}, [dispatch, setIsEditMode, route, getValues]);

	useEffect(() => {
		void dispatch(routeActions.getById(Number(routeId)));
	}, [dispatch, routeId]);

	useEffect(() => {
		if (isEditMode) {
			void dispatch(categoriesActions.getAll());
		}
	}, [isEditMode, dispatch]);

	useEffect(() => {
		if (route && isEditMode) {
			handleValueSet("name", route.name);
			handleValueSet("description", route.description ?? "");
			handleValueSet(
				"categories",
				route.categories.map((category) => category.id),
			);
		}
	}, [route, handleValueSet, isEditMode]);

	const handleSaveUserRoute = useCallback(() => {
		if (route?.id) {
			void dispatch(userRouteActions.saveUserRoute(route.id));
		}
	}, [route?.id, dispatch]);

	const handleDeleteUserRoute = useCallback(() => {
		if (route?.savedUserRoute?.id) {
			void dispatch(userRouteActions.deleteUserRoute(route.savedUserRoute.id));
		}
	}, [route?.savedUserRoute?.id, dispatch]);

	const handleDeleteImage = useCallback(
		(id: number) => {
			void dispatch(routeActions.deleteImage(id));
		},
		[dispatch],
	);

	useEffect(() => {
		handleResetFormValues();
	}, [handleResetFormValues]);

	useEffect(() => {
		void dispatch(routeActions.getReviews({ routeId: Number(routeId) }));
	}, [dispatch, routeId]);

	useEffect(() => {
		if (isRouteCreated) {
			navigate(
				configureString(AppRoute.USER_ROUTES_$ROUTE_ID_MAP, {
					routeId: String(routeId),
				}),
			);
		}
	}, [isRouteCreated, navigate, routeId, route]);

	const handleCreateReview = useCallback(
		(payload: ReviewRequestDto): void => {
			void dispatch(routeActions.createReview(payload));
		},
		[dispatch],
	);
	const routeGeometry = route?.geometry;

	const routeLine = useMemo<null | RouteLine>(() => {
		return routeGeometry && routeId
			? { geometry: routeGeometry, id: routeId }
			: null;
	}, [routeId, routeGeometry]);

	const markers = useMemo<{ coordinates: Coordinates }[]>(() => {
		if (!route) {
			return [];
		}

		return route.pois.map((poi) => ({
			coordinates: poi.location.coordinates,
		}));
	}, [route]);

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

	const { description, id, images, name, pois } = route;
	const [routeStartPoint] = pois;

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
							{isAuthorized && <Button label="Start" onClick={handleStart} />}
							{routeStartPoint && (
								<Button
									icon="location"
									label="Location"
									onClick={handleOpenGoogleMaps}
								/>
							)}
							{isAuthorized && (
								<Button
									icon={isSaved ? "bookmark" : "bookmarkOff"}
									isDisabled={isSaving}
									label="Save route"
									onClick={
										isSaved ? handleDeleteUserRoute : handleSaveUserRoute
									}
								/>
							)}
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
								<MapProvider markers={markers} routeLine={routeLine} />
							</div>
						),
					},
					...images.map((image) => ({
						content: (
							<img alt="Route" className={styles["image"]} src={image.url} />
						),
						...(isEditMode && {
							onDelete: (): void => {
								handleDeleteImage(image.id);
							},
						}),
					})),
				]}
			/>
			{isEditMode && (
				<>
					<input
						accept="image/*"
						className="visually-hidden"
						onChange={handleFileUpload}
						ref={fileInputReference}
						type="file"
					/>
					<div className={styles["upload-image-button-container"]}>
						<Button
							label="Upload image"
							onClick={handleTriggerFileUpload}
							variant="outlined"
						/>
					</div>
				</>
			)}
			{isEditMode ? (
				<Select
					control={control}
					isMulti
					label="Categories"
					name="categories"
					options={categoriesOptions}
					placeholder="Select categories"
				/>
			) : (
				route.categories.length > 0 && (
					<TagsContainer
						labels={route.categories.map((category) => category.name)}
					/>
				)
			)}
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
