import { useState } from "react";

import {
	Button,
	Header,
	Loader,
	Map,
	RouterOutlet,
	Sidebar,
} from "~/libs/components/components.js";
import {
	DEFAULT_POSITION,
	NAVIGATION_ITEMS,
} from "~/libs/constants/constants.js";
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
import { MOCK_POI_DATA } from "../map/mock-data.js";
import styles from "./styles.module.css";

const DEFAULT_POSITION_COORDINATES: [number, number] = [
	DEFAULT_POSITION.LONGITUDE,
	DEFAULT_POSITION.LATITUDE,
];
const LOCATION_PRECISION_DIGITS = 6;

const mockUserWithoutAvatar = {
	avatarUrl: null,
	firstName: "John",
	lastName: "Smith",
};

const App = (): React.JSX.Element => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const [position, setPosition] = useState<[number, number]>(
		DEFAULT_POSITION_COORDINATES,
	);

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
				`Position: Lat ${currentPosition.latitude.toFixed(LOCATION_PRECISION_DIGITS)}, Lng ${currentPosition.longitude.toFixed(LOCATION_PRECISION_DIGITS)}`,
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

	const handlePoiClick = useCallback(
		(poi: {
			id: number;
			location: { coordinates: [number, number] };
			name: string;
		}): void => {
			alert(`POI clicked: ${poi.name} (ID: ${String(poi.id)})`);
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
					<div className={styles["maps-grid"]}>
						<div className={styles["map-container"]}>
							<span className={styles["map-label"]}>
								Standard street map with controls
							</span>
							<Map
								center={DEFAULT_POSITION_COORDINATES}
								style="mapbox://styles/mapbox/streets-v12"
								zoom={13}
							/>
						</div>
						<div className={styles["map-container"]}>
							<span className={styles["map-label"]}>Satellite view map</span>
							<Map style="mapbox://styles/mapbox/satellite-v9" />
						</div>
						<div className={styles["map-container"]}>
							<span className={styles["map-label"]}>
								Light theme map with current position
							</span>
							<Map
								center={position}
								currentPosition={position}
								isLocationControl={false}
								isMapControl={false}
								isScaleControl={false}
								isZoomControl={false}
								style="mapbox://styles/mapbox/light-v11"
								zoom={15}
							/>
						</div>
						<div className={styles["map-container"]}>
							<span className={styles["map-label"]}>
								Map with Points of Interest (POI) - Centered on Kyiv
							</span>
							<Map
								center={DEFAULT_POSITION_COORDINATES}
								onPoiClick={handlePoiClick}
								poisData={MOCK_POI_DATA}
								style="mapbox://styles/mapbox/outdoors-v12"
								zoom={11}
							/>
						</div>
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
