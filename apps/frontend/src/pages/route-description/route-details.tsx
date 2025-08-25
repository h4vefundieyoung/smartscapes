import image1 from "~/assets/images/route-details/placeholder-image-1.png";
import image2 from "~/assets/images/route-details/placeholder-image-2.png";
import image3 from "~/assets/images/route-details/placeholder-image-3.png";
import {
	Button,
	ImageGallery,
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
import {
	actions as routeActions,
	type RouteGetByIdResponseDto,
	type RoutePatchRequestDto,
} from "~/modules/routes/routes.js";
import { actions as userRoutesActions } from "~/modules/user-routes/user-routes.js";

import { NotFound } from "../not-found/not-found.js";
import { PointOfInterestSection } from "./libs/components/components.js";
import { ROUTE_FORM_DEFAULT_VALUES } from "./libs/constants/constants.js";
import { UserRouteStatus } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const RouteDetails = (): React.JSX.Element => {
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const { route, user } = useAppSelector(({ auth, route }) => ({
		route: route.route,
		user: auth.authenticatedUser,
	}));
	const { control, errors, getValues, handleValueSet } =
		useAppForm<RoutePatchRequestDto>({
			defaultValues: ROUTE_FORM_DEFAULT_VALUES,
		});
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const dataStatus = useAppSelector(({ route }) => route.dataStatus);
	const isAuthorized = Boolean(user);
	const isSaved = route?.userRoute?.status === UserRouteStatus.NOT_STARTED;
	const hasEditPermissions = Boolean(
		user &&
			checkHasPermission([PermissionKey.MANAGE_ROUTES], user.group.permissions),
	);

	const handleToggleEditMode = useCallback(() => {
		setIsEditMode((isEditMode) => !isEditMode);
	}, []);

	const handlePatchRequest = useCallback(() => {
		if (route) {
			const { description, name } = getValues();
			void dispatch(
				routeActions.patchRoute({
					id: route.id,
					payload: { description, name },
				}),
			);
			setIsEditMode(false);
		}
	}, [dispatch, setIsEditMode, route, getValues]);

	const handleSaveUserRoute = useCallback(() => {
		if (route?.id && user?.id) {
			void dispatch(
				userRoutesActions.saveUserRoute({ routeId: route.id, userId: user.id }),
			);
		}
	}, [route?.id, dispatch, user?.id]);

	const handleDeleteUserRoute = useCallback(() => {
		if (route?.id) {
			void dispatch(userRoutesActions.deleteUserRoute(route.id));
		}
	}, [route?.id, dispatch]);

	useEffect(() => {
		void dispatch(routeActions.getRouteById(Number(id)));
	}, [dispatch, id]);

	useEffect(() => {
		if (route) {
			handleValueSet("name", route.name);
			handleValueSet("description", route.description ?? "");
		}
	}, [route, handleValueSet]);

	if (dataStatus === DataStatus.REJECTED) {
		return <NotFound />;
	}

	if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
		return <Loader />;
	}

	const { description, name, pois } = route as RouteGetByIdResponseDto;

	return (
		<>
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
				<ImageGallery images={[image1, image2, image3]} />
				{isEditMode ? (
					<TextArea
						control={control}
						errors={errors}
						label="Description"
						name="description"
					/>
				) : (
					<p className={styles["description"]}>{description}</p>
				)}
				<PointOfInterestSection pointOfInterests={pois} />
			</main>
		</>
	);
};

export { RouteDetails };
