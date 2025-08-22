import { Carousel, Loader, Select } from "~/libs/components/components.js";
import { type SelectOption } from "~/libs/components/select/libs/types/types.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as notificationActions } from "~/modules/notification/notification.js";

import styles from "./styles.module.css";

type FormValues = {
	multiColors: string[];
	singleColor: null | string;
};

const Dashboard = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const notifications = useAppSelector(
		(state) => state.notification.notifications,
	);

	useEffect(() => {
		void dispatch(notificationActions.getNotifications());
	}, [dispatch]);

	const colorOptions: SelectOption<string>[] = [
		{ label: "Red", value: "red" },
		{ label: "Green", value: "green" },
		{ label: "Blue", value: "blue" },
	];

	const { control } = useAppForm<FormValues>({
		defaultValues: { multiColors: [], singleColor: null },
	});

	return (
		<main className={styles["container"]}>
			<div className={styles["components-container"]}>
				<Loader />
				<ul>
					{notifications.length > 0 ? (
						notifications.map((notification) => (
							<li key={notification.id}>{notification.content}</li>
						))
					) : (
						<li>No notifications</li>
					)}
				</ul>
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
			</div>
		</main>
	);
};

export { Dashboard };
