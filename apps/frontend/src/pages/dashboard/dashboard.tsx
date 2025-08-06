import {
	Button,
	Header,
	Loader,
	Map,
	Select,
	Sidebar,
} from "~/libs/components/components.js";
import { type SelectOption } from "~/libs/components/select/libs/types/types.js";
import { NAVIGATION_ITEMS } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useAppSelector } from "~/libs/hooks/hooks.js";

import { mockImages } from "../../libs/components/carousel/assets/mock-images/mock-images.js";
import { Carousel } from "../../libs/components/carousel/carousel.js";
import {
	COORDINATES,
	MOCK_MARKERS,
} from "../../libs/components/map/mock-data.js";
import styles from "./styles.module.css";

const DEFAULT_KYIV_COORDINATES: [number, number] = [
	COORDINATES.GLASS_BRIDGE.LONGITUDE,
	COORDINATES.GLASS_BRIDGE.LATITUDE,
];

type FormValues = {
	multiColors: string[];
	singleColor: null | string;
};

const Dashboard = (): React.JSX.Element => {
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	const colorOptions: SelectOption<string>[] = [
		{ label: "Red", value: "red" },
		{ label: "Green", value: "green" },
		{ label: "Blue", value: "blue" },
	];

	const { control } = useAppForm<FormValues>({
		defaultValues: {
			multiColors: [],
			singleColor: null,
		},
	});

	return (
		<div className={styles["container"]}>
			<div className={styles["components-container"]}>
				<Header
					actions={[{ label: "Sign in", to: AppRoute.SIGN_IN }]}
					user={authenticatedUser}
				/>
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
				<div className={styles["maps-container"]}>
					<div>
						<h3 className={styles["map-title"]}>
							Map Centered on Mock Data (Kyiv, Ukraine)
						</h3>
						<div className={styles["map-container"]}>
							<Map
								center={MOCK_MARKERS[0] ?? DEFAULT_KYIV_COORDINATES}
								markers={MOCK_MARKERS}
							/>
						</div>
					</div>
					<div>
						<h3 className={styles["map-title"]}>Map Not Centered</h3>
						<div className={styles["map-container"]}>
							<Map markers={MOCK_MARKERS} />
						</div>
					</div>
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
		</div>
	);
};

export { Dashboard };
