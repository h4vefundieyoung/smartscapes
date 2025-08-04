import { useState } from "react";

import {
	Button,
	Header,
	Loader,
	Map,
	RouterOutlet,
	Sidebar,
} from "~/libs/components/components.js";
import { NAVIGATION_ITEMS } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { navigation } from "~/libs/modules/navigation/navigation.js";
import { actions as userActions } from "~/modules/users/users.js";

import { mockImages } from "../carousel/assets/mock-images/mock-images.js";
import { Carousel } from "../carousel/carousel.js";
import styles from "./styles.module.css";

const DEFAULT_POSITION: [number, number] = [24.0322, 49.8421];

const mockUserWithoutAvatar = {
	avatarUrl: null,
	firstName: "John",
	lastName: "Smith",
};

const App = (): React.JSX.Element => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const [position, setPosition] = useState<[number, number]>(DEFAULT_POSITION);

	const isRoot = pathname === AppRoute.APP;

	useEffect((): void => {
		const getCurrentPosition = async (): Promise<void> => {
			try {
				const currentPosition = await navigation.getCurrentPosition();
				const coordinates: [number, number] = [
					currentPosition.longitude,
					currentPosition.latitude,
				];
				setPosition(coordinates);
			} catch {
				// handle error
			}
		};

		if (isRoot) {
			void getCurrentPosition();
		}
	}, [isRoot]);

	const handleGetLocation = useCallback(async (): Promise<void> => {
		try {
			const currentPosition = await navigation.getCurrentPosition();
			alert(
				`Position: Lat ${currentPosition.latitude.toFixed(6)}, Lng ${currentPosition.longitude.toFixed(6)}`,
			);
		} catch {
			// handle error
		}
	}, []);

	useEffect((): void => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
	}, [isRoot, dispatch]);

	const handleMapLocationFound = useCallback(
		(location: { latitude: number; longitude: number }): void => {
			// handle location found, e.g. show alert or update state
		},
		[],
	);

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
					<div className={styles["button-container"]}>
						<Button
							label="Get Location"
							onClick={handleGetLocation}
							type="button"
						/>
					</div>
					<div className={styles["map-container"]}>
						<Map
							center={DEFAULT_POSITION}
							style="mapbox://styles/mapbox/streets-v12"
							zoom={13}
							onLocationFound={handleMapLocationFound}
						/>
					</div>
					<div className={styles["map-container"]}>
						<Map style="mapbox://styles/mapbox/satellite-v9" />
					</div>
					<div className={styles["map-container"]}>
						<Map
							center={position}
							currentPosition={position}
							style="mapbox://styles/mapbox/light-v11"
							zoom={15}
							isMapControl={false}
							isZoomControl={false}
							isScaleControl={false}
							isLocationControl={false}
						/>
					</div>
					<div className={styles["carousel-container"]}>
						<Carousel images={mockImages} />
					</div>
				</div>
			)}
		</div>
	);
};

export { App };
