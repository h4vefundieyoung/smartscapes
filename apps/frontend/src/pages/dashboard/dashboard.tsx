import { isFulfilled } from "@reduxjs/toolkit";
import React, { useCallback } from "react";

import {
	Button,
	CreatePOIModal,
	Header,
	Loader,
	Select,
	Sidebar,
} from "~/libs/components/components.js";
import { type SelectOption } from "~/libs/components/select/libs/types/types.js";
import { NAVIGATION_ITEMS_GROUPS } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useState,
} from "~/libs/hooks/hooks.js";
import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type PointsOfInterestRequestDto } from "~/modules/points-of-interest/libs/types/types.js";
import { actions as poiActions } from "~/modules/points-of-interest/points-of-interest.js";

import { mockImages } from "../../libs/components/carousel/assets/mock-images/mock-images.js";
import { Carousel } from "../../libs/components/carousel/carousel.js";
import styles from "./styles.module.css";

type FormValues = {
	multiColors: string[];
	singleColor: null | string;
};

const DEFAULT_LONGITUDE = 30.5234;
const DEFAULT_LATITUDE = 50.4501;

const Dashboard = (): React.JSX.Element => {
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);
	const dispatch = useAppDispatch();

	const colorOptions: SelectOption<string>[] = [
		{ label: "Red", value: "red" },
		{ label: "Green", value: "green" },
		{ label: "Blue", value: "blue" },
	];

	const { control } = useAppForm<FormValues>({
		defaultValues: { multiColors: [], singleColor: null },
	});

	const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

	const handleOpen = useCallback(() => {
		setIsCreateOpen(true);
	}, []);
	const handleClose = useCallback(() => {
		setIsCreateOpen(false);
	}, []);
	const handleSubmit = useCallback(
		async (payload: PointsOfInterestRequestDto) => {
			const result = await dispatch(poiActions.create(payload));

			if (isFulfilled(result)) {
				toastNotifier.showSuccess("POI created");
				setIsCreateOpen(false);
			}
		},
		[dispatch],
	);

	return (
		<div className={styles["container"]}>
			<div className={styles["components-container"]}>
				<Header
					actions={[{ label: "Sign in", to: AppRoute.SIGN_IN }]}
					user={authenticatedUser}
				/>
				<div className={styles["sidebar-container"]}>
					<Sidebar navigationItemsGroups={NAVIGATION_ITEMS_GROUPS} />
				</div>
				<Loader />
				<div className={styles["button-container"]}>
					<Button label="Button for test" type="button" />
				</div>
				<div className={styles["carousel-container"]}>
					<Carousel images={mockImages} />
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
					<Button label="Create new POI" onClick={handleOpen} type="button" />
				</div>
				<CreatePOIModal
					defaultLatitude={DEFAULT_LATITUDE}
					defaultLongitude={DEFAULT_LONGITUDE}
					isOpen={isCreateOpen}
					onClose={handleClose}
					onSubmit={handleSubmit}
				/>
			</div>
		</div>
	);
};

export { Dashboard };
