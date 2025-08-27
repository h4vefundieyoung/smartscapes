import {
	Button,
	FeatureGallery,
	Input,
	Loader,
	MapProvider,
	Select,
	TextArea,
} from "~/libs/components/components.js";
import { TagsContainer } from "~/libs/components/tags-container/tag-container.js";
import { DataStatus, PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useMemo,
	useParams,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as categoriesActions } from "~/modules/categories/categories.js";
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

	const isAuthorized = Boolean(user);
	const isSaved = route?.savedUserRoute?.status === UserRouteStatus.NOT_STARTED;
	const isSaving = saveStatus === DataStatus.PENDING;

	const hasEditPermissions = Boolean(
		user &&
			checkHasPermission([PermissionKey.MANAGE_ROUTES], user.group.permissions),
	);

	const fileInputReference = useRef<HTMLInputElement | null>(null);

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
			void dispatch(userRoutesActions.saveUserRoute(route.id));
		}
	}, [route?.id, dispatch]);

	const handleDeleteUserRoute = useCallback(() => {
		if (route?.savedUserRoute?.id) {
			void dispatch(userRoutesActions.deleteUserRoute(route.savedUserRoute.id));
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

	const { description, id, images, name, pois } = route;

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
							{isAuthorized && (
								<div className={styles["save-button-container"]}>
									<Button
										icon="bookmark"
										isDisabled={isSaving}
										label="save route"
										onClick={
											isSaved ? handleDeleteUserRoute : handleSaveUserRoute
										}
										variant={isSaved ? "ghost" : "primary"}
									/>
								</div>
							)}
						</div>
					</>
				)}
			</div>
			<FeatureGallery
				slides={[
					{
						content: <MapProvider />,
					},
					...images.map((image) => ({
						content: (
							<img
								alt="point of interest"
								className={styles["image"]}
								src={image.url}
							/>
						),
						...(isEditMode && {
							onDelete: (): void => {
								handleDeleteImage(image.id);
							},
						}),
					})),
				]}
			/>
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
				<>
					<input
						accept="image/*"
						onChange={handleFileUpload}
						ref={fileInputReference}
						style={{ display: "none" }}
						type="file"
					/>
					<div className={styles["upload-button"]}>
						<Button
							label="Upload image"
							onClick={handleTriggerFileUpload}
							variant="outlined"
						/>
					</div>
					<TextArea
						control={control}
						errors={errors}
						label="Description"
						name="description"
					/>
				</>
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
