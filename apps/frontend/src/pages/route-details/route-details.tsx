import image1 from "~/assets/images/route-details/placeholder-image-1.png";
import image2 from "~/assets/images/route-details/placeholder-image-2.png";
import image3 from "~/assets/images/route-details/placeholder-image-3.png";
import {
	Button,
	ImageGallery,
	Input,
	Loader,
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
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as categoriesActions } from "~/modules/categories/categories.js";
import {
	actions as routeActions,
	type RouteGetByIdResponseDto,
	type RoutePatchRequestDto,
} from "~/modules/routes/routes.js";

import { NotFound } from "../not-found/not-found.js";
import { PointOfInterestSection } from "./libs/components/components.js";
import { ROUTE_FORM_DEFAULT_VALUES } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const RouteDetails = (): React.JSX.Element => {
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const { categories, route, user } = useAppSelector(
		({ auth, categories, route }) => ({
			categories: categories.categories,
			route: route.route,
			user: auth.authenticatedUser,
		}),
	);
	const { control, errors, getValues, handleValueSet } =
		useAppForm<RoutePatchRequestDto>({
			defaultValues: ROUTE_FORM_DEFAULT_VALUES,
		});
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const dataStatus = useAppSelector(({ route }) => route.dataStatus);
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
					payload: { categories: getValues("categories"), description, name },
				}),
			);
			setIsEditMode(false);
		}
	}, [dispatch, setIsEditMode, route, getValues]);

	useEffect(() => {
		void dispatch(routeActions.getRouteById(Number(id)));
	}, [dispatch, id]);

	useEffect(() => {
		if (route) {
			handleValueSet("name", route.name);
			handleValueSet("description", route.description);
			handleValueSet(
				"categories",
				route.categories.map((category) => category.id),
			);
		}
	}, [route, handleValueSet]);

	useEffect(() => {
		if (isEditMode) {
			void dispatch(categoriesActions.getAll());
		}
	}, [isEditMode, dispatch]);

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
							{hasEditPermissions && (
								<div className={styles["edit-button-container"]}>
									<Button label="Edit" onClick={handleToggleEditMode} />
								</div>
							)}
						</>
					)}
				</div>
				<ImageGallery images={[image1, image2, image3]} />
				{isEditMode ? (
					<Select
						control={control}
						isMulti
						label="Categories"
						name="categories"
						options={categories.map((category) => ({
							label: category.name,
							original: category.id,
							value: category.id,
						}))}
						placeholder="Select categories"
					/>
				) : (
					route &&
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
					<p className={styles["description"]}>{description}</p>
				)}
				<PointOfInterestSection pointOfInterests={pois} />
			</main>
		</>
	);
};

export { RouteDetails };
