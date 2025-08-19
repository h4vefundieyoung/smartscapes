import { Carousel } from "~/libs/components/carousel/carousel.js";
import {
	Button,
	CreatePOIModal,
	Loader,
	Select,
} from "~/libs/components/components.js";
import { type SelectOption } from "~/libs/components/select/libs/types/types.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type PointsOfInterestRequestDto } from "~/modules/points-of-interest/libs/types/types.js";
import { actions as poiActions } from "~/modules/points-of-interest/points-of-interest.js";

import styles from "./styles.module.css";

type FormValues = {
	multiColors: string[];
	singleColor: null | string;
};

const DEFAULT_LONGITUDE = 30.5234;
const DEFAULT_LATITUDE = 50.4501;

const Dashboard = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const colorOptions: SelectOption<string>[] = [
		{ label: "Red", value: "red" },
		{ label: "Green", value: "green" },
		{ label: "Blue", value: "blue" },
	];

	const { control } = useAppForm<FormValues>({
		defaultValues: { multiColors: [], singleColor: null },
	});

	const [isCreatePOIOpen, setIsCreatePOIOpen] = useState<boolean>(false);
	const createStatus = useAppSelector(
		(state) => state.pointsOfInterest.createStatus,
	);
	const handleModalToggle = useCallback(() => {
		setIsCreatePOIOpen((previous) => !previous);
	}, []);

	const handleSubmit = useCallback(
		(payload: PointsOfInterestRequestDto): void => {
			void dispatch(poiActions.create(payload));
		},
		[dispatch],
	);
	useEffect(() => {
		if (createStatus === DataStatus.FULFILLED) {
			setIsCreatePOIOpen(false);
		}
	}, [createStatus]);

	return (
		<main className={styles["container"]}>
			<div className={styles["components-container"]}>
				<Loader />
				<div className={styles["carousel-container"]}>
					<Carousel images={[""]} />
				</div>
				<div className={styles["select-container"]}>
					<Select
						control={control}
						label="Single select"
						name="singleColor"
						options={colorOptions}
					/>
					<Select
						control={control}
						isMulti
						label="Multi select"
						name="multiColors"
						options={colorOptions}
					/>
				</div>
				<div className={styles["button-container"]}>
					<Button
						label="Create new POI"
						onClick={handleModalToggle}
						type="button"
					/>
				</div>
				<CreatePOIModal
					defaultLatitude={DEFAULT_LATITUDE}
					defaultLongitude={DEFAULT_LONGITUDE}
					isOpen={isCreatePOIOpen}
					onClose={handleModalToggle}
					onSubmit={handleSubmit}
				/>
			</div>
		</main>
	);
};

export { Dashboard };
