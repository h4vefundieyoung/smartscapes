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
import { DataStatus } from "~/libs/enums/enums.js";
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
} from "~/modules/routes/routes.js";

import { NotFound } from "../not-found/not-found.js";
import styles from "./styles.module.css";

const RouteDetails = (): React.JSX.Element => {
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const route = useAppSelector(({ route }) => route.route);
	const { control, errors, handleValueSet } = useAppForm({
		defaultValues: { description: "", name: "" },
	});
	const dispatch = useAppDispatch();

	const { id } = useParams<{ id: string }>();

	const dataStatus = useAppSelector(({ route }) => route.dataStatus);

	const handleEditMode = useCallback(() => {
		setIsEditMode(!isEditMode);
	}, [isEditMode]);

	useEffect(() => {
		void dispatch(routeActions.getRouteById(Number(id)));
	}, [dispatch, id]);

	useEffect(() => {
		if (route) {
			handleValueSet("name", route.name);
			handleValueSet("description", route.description);
		}
	}, [route, handleValueSet]);

	if (dataStatus === DataStatus.REJECTED) {
		return <NotFound />;
	}

	if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
		return <Loader />;
	}

	const { description, name } = route as RouteGetByIdResponseDto;

	return (
		<>
			<main className={styles["container"]}>
				<div className={styles["header-container"]}>
					{isEditMode ? (
						<Input
							control={control}
							errors={errors}
							label="Title"
							name="name"
						/>
					) : (
						<h1 className={styles["label"]}>{name}</h1>
					)}
					{isEditMode ? (
						<div className={styles["edit-mode-controls"]}>
							<Button label="Save" onClick={handleEditMode} />
							<Button label="Cancel" onClick={handleEditMode} />
						</div>
					) : (
						<div className={styles["edit-button-container"]}>
							<Button label="Edit" onClick={handleEditMode} />
						</div>
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
			</main>
		</>
	);
};

export { RouteDetails };
