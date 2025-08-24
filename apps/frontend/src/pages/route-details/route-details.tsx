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
import { AppRoute, DataStatus, PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppNavigate,
	useAppSelector,
	useCallback,
	useEffect,
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	actions as routeActions,
	type RoutePatchRequestDto,
} from "~/modules/routes/routes.js";
import { actions as userRouteActions } from "~/modules/user-routes/user-routes.js";

import { NotFound } from "../not-found/not-found.js";
import { PointOfInterestSection } from "./libs/components/components.js";
import { ROUTE_FORM_DEFAULT_VALUES } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const RouteDetails = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useAppNavigate();
	const { id: routeId } = useParams<{ id: string }>();
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const route = useAppSelector(({ routeDetails }) => routeDetails.route);
	const user = useAppSelector(({ auth }) => auth.authenticatedUser);
	const dataStatus = useAppSelector(
		({ routeDetails }) => routeDetails.dataStatus,
	);

	const { control, errors, getValues, handleValueSet } =
		useAppForm<RoutePatchRequestDto>({
			defaultValues: ROUTE_FORM_DEFAULT_VALUES,
		});

	const routeDataStatus = useAppSelector(
		({ routeDetails }) => routeDetails.dataStatus,
	);

	const isUserRouteCreated = useAppSelector(
		({ userRouteDetails }) =>
			userRouteDetails.createStatus === DataStatus.FULFILLED,
	);

	const hasEditPermissions = Boolean(
		user &&
			checkHasPermission([PermissionKey.MANAGE_ROUTES], user.group.permissions),
	);
	const hasAuthUserPermissions = Boolean(
		user &&
			!checkHasPermission(
				[PermissionKey.MANAGE_ROUTES],
				user.group.permissions,
			),
	);

	const handleToggleEditMode = useCallback(() => {
		setIsEditMode((isEditMode) => !isEditMode);
	}, []);

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

	const handleCreateUserRoute = useCallback(() => {
		if (!route || !user) {
			return;
		}

		void dispatch(
			userRouteActions.create({
				payload: {
					routeId: Number(routeId),
				},
				userId: user.id,
			}),
		);
	}, [dispatch, routeId, user, route]);

	useEffect(() => {
		if (routeDataStatus === DataStatus.IDLE) {
			void dispatch(routeActions.getById(Number(routeId)));
		}
	}, [dispatch, routeId, routeDataStatus]);

	useEffect(() => {
		if (isUserRouteCreated) {
			const path = AppRoute.USER_ROUTES_$ID_MAP.replace(":id", String(routeId));
			navigate(path);
		}
	}, [isUserRouteCreated, navigate, routeId]);

	useEffect(() => {
		if (route && !isEditMode) {
			handleValueSet("name", route.name);
			handleValueSet("description", route.description);
		}
	}, [route, handleValueSet, isEditMode]);

	if (routeDataStatus === DataStatus.REJECTED) {
		return <NotFound />;
	}

	if (
		routeDataStatus === DataStatus.PENDING ||
		routeDataStatus === DataStatus.IDLE
	) {
		return <Loader />;
	}

	if (dataStatus === DataStatus.REJECTED) {
		return <NotFound />;
	}

	if (!route) {
		return <></>;
	}

	const { description, name, pois } = route;
	const hasDescription = Boolean(description);

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
							{hasEditPermissions && (
								<div>
									<Button label="Edit" onClick={handleToggleEditMode} />
								</div>
							)}
							{hasAuthUserPermissions && (
								<div className={styles["edit-button-container"]}>
									<Button label="Start" onClick={handleCreateUserRoute} />
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
					hasDescription && (
						<p className={styles["description"]}>{description}</p>
					)
				)}
				<PointOfInterestSection pointOfInterests={pois} />
			</main>
		</>
	);
};

export { RouteDetails };
