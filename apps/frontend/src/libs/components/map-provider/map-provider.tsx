import { createPortal } from "react-dom";

import {
	createContext,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";
import { MapClient } from "~/libs/modules/map-client/map-client.js";
import { type Coordinates, type RouteLine } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const MapContext = createContext<MapClient | null>(null);

type Properties = {
	center?: Coordinates;
	children?: React.ReactNode;
	isInteractive?: boolean;
	markers?: { coordinates: Coordinates }[];
	routeLine?: null | RouteLine;
	shouldFitToBounds?: boolean;
	shouldZoomOnGeolocate?: boolean;
};

const MapProvider = ({
	center,
	children,
	isInteractive = true,
	markers = [],
	routeLine,
	shouldFitToBounds = false,
	shouldZoomOnGeolocate = false,
}: Properties): React.JSX.Element => {
	const mapClientReference = useRef(new MapClient());
	const containerReference = useRef<HTMLDivElement>(null);
	const popupPortalContainerReference = useRef<HTMLDivElement>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [currentPopup, setCurrentPopup] = useState<null | {
		container: HTMLElement;
		content: React.ReactNode;
	}>(null);

	const handleMapLoad = useCallback(() => {
		setIsLoaded(true);
	}, []);

	const handlePopupRender = useCallback(
		(content: React.ReactElement, container: HTMLElement) => {
			setCurrentPopup({ container, content });
		},
		[],
	);

	useEffect(() => {
		const client = mapClientReference.current;
		const container = containerReference.current;

		if (!container) {
			return;
		}

		client.init(container, {
			isInteractive,
			onLoad: handleMapLoad,
			onPopupRender: handlePopupRender,
		});

		return (): void => {
			setIsLoaded(false);
			client.destroy();
		};
	}, [handleMapLoad, handlePopupRender, isInteractive]);

	useEffect(() => {
		if (isInteractive && isLoaded) {
			const client = mapClientReference.current;

			client.addNavigationControl();
			client.addScaleControl();
			client.addGeolocateControl({
				shouldTrigger: !shouldFitToBounds,
				shouldZoomOnGeolocate,
			});
		}
	}, [isInteractive, isLoaded, shouldFitToBounds, shouldZoomOnGeolocate]);

	useEffect(() => {
		if (!isLoaded) {
			return;
		}

		const client = mapClientReference.current;

		client.addMarkers(markers);
	}, [markers, isLoaded]);

	useEffect(() => {
		if (!isLoaded || !routeLine) {
			return;
		}

		const client = mapClientReference.current;

		client.renderRoute(routeLine);
	}, [isLoaded, routeLine]);

	useEffect(() => {
		if (!isLoaded || !center) {
			return;
		}

		mapClientReference.current.flyTo(center);
	}, [isLoaded, center]);

	useEffect(() => {
		const hasFeatures = routeLine || markers.length > 0;

		if (!isLoaded || !hasFeatures || !shouldFitToBounds) {
			return;
		}

		const coordinates = [
			...(routeLine?.geometry.coordinates ?? []),
			...markers.map((marker) => marker.coordinates),
		];

		const client = mapClientReference.current;

		client.fitToCoordinates(coordinates);
	}, [isLoaded, routeLine, markers, shouldFitToBounds]);

	return (
		<MapContext.Provider value={mapClientReference.current}>
			<div className={styles["map-wrapper"]}>
				<div className={styles["map"]} ref={containerReference} />
				{isLoaded && <div className={styles["map-overlays"]}>{children}</div>}
				<div
					className={styles["popup-container"]}
					ref={popupPortalContainerReference}
				>
					{currentPopup &&
						createPortal(currentPopup.content, currentPopup.container)}
				</div>
			</div>
		</MapContext.Provider>
	);
};

export { MapContext, MapProvider };
