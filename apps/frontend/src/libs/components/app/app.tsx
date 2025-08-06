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
import { actions as userActions } from "~/modules/users/users.js";

import { mockImages } from "../carousel/assets/mock-images/mock-images.js";
import { Carousel } from "../carousel/carousel.js";
import { MOCK_MARKERS } from "../map/mock-data.js";

import { type LngLatLike } from "mapbox-gl";

import styles from "./styles.module.css";

const mockUserWithoutAvatar = {
	avatarUrl: null,
	firstName: "John",
	lastName: "Smith",
};

const App = (): React.JSX.Element => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();

	const isRoot = pathname === AppRoute.APP;

	useEffect((): void => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
	}, [isRoot, dispatch]);

	const handleMarkerClick = useCallback((): void => {
		alert("Marker clicked");
	}, []);

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
					<div className={styles["maps-grid"]}>
						<div className={styles["map-container"]}>
							<span className={styles["map-label"]}>
								Map with Markers - Auto-locate user
							</span>
							<Map markers={MOCK_MARKERS} />
						</div>
						<div className={styles["map-container"]}>
							<span className={styles["map-label"]}>
								Map centered on Kyiv with markers
							</span>
							<Map
								center={MOCK_MARKERS[0] as LngLatLike}
								markers={MOCK_MARKERS}
								onMarkerClick={handleMarkerClick}
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
