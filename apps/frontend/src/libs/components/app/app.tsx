import { useForm } from "react-hook-form";

import {
	Button,
	Header,
	Loader,
	RouterOutlet,
	Select,
	Sidebar,
} from "~/libs/components/components.js";
import { NAVIGATION_ITEMS } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppDispatch, useEffect, useLocation } from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import { mockImages } from "../carousel/assets/mock-images/mock-images.js";
import { Carousel } from "../carousel/carousel.js";
import { type SelectOption } from "../select/libs/types/types.js";
import styles from "./styles.module.css";

type FormValues = {
	multiColors: string[];
	singleColor: null | string;
};

const App = (): React.JSX.Element => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const mockUserWithoutAvatar = {
		avatarUrl: null,
		firstName: "John",
		lastName: "Smith",
	};
	const colorOptions: SelectOption<string>[] = [
		{ label: "Red", value: "red" },
		{ label: "Green", value: "green" },
		{ label: "Blue", value: "blue" },
	];
	const isRoot = pathname === AppRoute.APP;
	const { control } = useForm<FormValues>({
		defaultValues: {
			multiColors: [],
			singleColor: null,
		},
	});
	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
	}, [isRoot, dispatch]);

	return (
		<div className={styles["container"]}>
			<div className={styles["outlet-container"]}>
				<RouterOutlet />
			</div>
			{isRoot && (
				<div className={styles["components-container"]}>
					<Header user={mockUserWithoutAvatar} />
					<div className={styles["sidebar-container"]}>
						<Sidebar navigationItems={NAVIGATION_ITEMS} />
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
				</div>
			)}
		</div>
	);
};

export { App };
