import { Button, Input, TextArea } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppForm,
	useAppSelector,
	useEffect,
	useRef,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	pointOfInterestCreateValidationSchema,
	type PointsOfInterestRequestDto,
} from "~/modules/points-of-interest/points-of-interest.js";

import styles from "./styles.module.css";

type Properties = {
	closeModal?: () => void;
	defaultLatitude: number;
	defaultLongitude: number;
	onSubmit: (values: PointsOfInterestRequestDto) => void;
};

const CreatePOIModal = ({
	closeModal,
	defaultLatitude,
	defaultLongitude,
	onSubmit,
}: Properties): React.JSX.Element => {
	const createStatus = useAppSelector(
		(state) => state.pointsOfInterest.createStatus,
	);
	const previousCreateStatusReference = useRef<ValueOf<typeof DataStatus>>(
		DataStatus.IDLE,
	);

	const { control, errors, handleReset, handleSubmit } =
		useAppForm<PointsOfInterestRequestDto>({
			defaultValues: {
				description: null,
				location: {
					coordinates: [defaultLongitude, defaultLatitude],
					type: "Point",
				},
				name: "",
			},
			validationSchema: pointOfInterestCreateValidationSchema,
		});

	useEffect(() => {
		if (
			previousCreateStatusReference.current === DataStatus.PENDING &&
			createStatus === DataStatus.FULFILLED
		) {
			closeModal?.();
		}

		previousCreateStatusReference.current = createStatus;
	}, [createStatus, closeModal]);

	const handleFormSubmit = (values: PointsOfInterestRequestDto): void => {
		onSubmit({
			...values,
			description: values.description || null,
			location: {
				...values.location,
				coordinates: values.location.coordinates,
			},
		});
		handleReset();
	};

	return (
		<div>
			<h3 className={styles["title"]}>Create new POI</h3>
			<form
				className={styles["form"]}
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<Input
					autocomplete="name"
					control={control}
					errors={errors}
					label="Name"
					name="name"
					type="text"
				/>
				<TextArea
					control={control}
					errors={errors}
					label="Description (optional)"
					name="description"
				/>
				<div className={styles["footer"]}>
					<div>
						<Button label="Create" type="submit" />
					</div>
				</div>
			</form>
		</div>
	);
};

export { CreatePOIModal };
