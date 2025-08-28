import mapboxgl from "mapbox-gl";

import { config } from "~/libs/modules/config/config.js";
import { type Coordinates, type RouteLine } from "~/libs/types/types.js";

import {
	GEOLOCATE_CONTROL_OPTIONS,
	MAP_CONTROLS_POSITION,
	MAP_LAYER_STYLES,
	MAP_MARKER_Z_INDEX_VALUE,
	MAP_OPTIONS,
	MAP_POPUP_OPTIONS,
	MARKER_OPTIONS,
	NAVIGATION_CONTROL_OPTIONS,
	SCALE_CONTROL_OPTIONS,
	ZOOM_LEVEL,
} from "./libs/constants/constants.js";
import { MapControlId, MapEventType } from "./libs/enums/enums.js";
import "mapbox-gl/dist/mapbox-gl.css";

import {
	type ControlPosition,
	type MapControl,
	type MapMarker,
	type MapMarkerOptions,
	type MapOptions,
	type ReactElement,
} from "./libs/types/types.js";

class MapClient {
	private accessToken: MapOptions["accessToken"];

	private controls = new Map<string, MapControl>();

	private map: mapboxgl.Map | null = null;

	private popupRenderCallback:
		| ((content: ReactElement, container: HTMLElement) => void)
		| null = null;

	private resizeObserver: null | ResizeObserver = null;

	public constructor() {
		this.accessToken = config.ENV.MAPBOX.ACCESS_TOKEN;
	}

	public addGeolocateControl(): void {
		if (!this.map) {
			return;
		}

		const control = new mapboxgl.GeolocateControl(GEOLOCATE_CONTROL_OPTIONS);
		this.addControl(
			MapControlId.GEOLOCATE,
			control,
			MAP_CONTROLS_POSITION["GEOLOCATE"] as ControlPosition,
		);

		const isMapLoaded = this.map.loaded();

		if (isMapLoaded) {
			control.trigger();
		} else {
			const handleMapLoad = (): void => {
				this.map?.off(MapEventType.LOAD, handleMapLoad);
				control.trigger();
			};

			this.map.on(MapEventType.LOAD, handleMapLoad);
		}
	}

	public addMapClickListener(
		handler: (coords: [number, number]) => void,
	): () => void {
		if (!this.map) {
			return () => {};
		}

		const onMapClick = (event: mapboxgl.MapMouseEvent): void => {
			handler([event.lngLat.lng, event.lngLat.lat]);
		};

		this.map.on(MapEventType.CLICK, onMapClick);

		return () => {
			this.map?.off(MapEventType.CLICK, onMapClick);
		};
	}

	public addMarker(options: MapMarkerOptions): MapMarker | null {
		if (!this.map) {
			return null;
		}

		const { coordinates, isDraggable = false, onDragEnd } = options;

		const marker = new mapboxgl.Marker({
			...MARKER_OPTIONS,
			draggable: isDraggable,
		})
			.setLngLat(coordinates)
			.addTo(this.map);
		marker.getElement().style.zIndex = MAP_MARKER_Z_INDEX_VALUE;

		if (isDraggable && onDragEnd) {
			marker.on(MapEventType.DRAG_END, () => {
				const { lat, lng } = marker.getLngLat();
				onDragEnd([lng, lat]);
			});
		}

		return this.mapMarker(marker);
	}

	public addMarkers(markers: MapMarkerOptions[]): MapMarker[] {
		const result: MapMarker[] = [];

		for (const marker of markers) {
			const currentMarker = this.addMarker(marker);

			if (currentMarker) {
				result.push(currentMarker);
			}
		}

		return result;
	}

	public addNavigationControl(): void {
		if (!this.map) {
			return;
		}

		const control = new mapboxgl.NavigationControl(NAVIGATION_CONTROL_OPTIONS);

		this.addControl(
			MapControlId.NAVIGATION,
			control,
			MAP_CONTROLS_POSITION["NAVIGATION"] as ControlPosition,
		);
	}

	public addScaleControl(): void {
		if (!this.map) {
			return;
		}

		const control = new mapboxgl.ScaleControl(SCALE_CONTROL_OPTIONS);

		this.addControl(
			MapControlId.SCALE,
			control,
			MAP_CONTROLS_POSITION["SCALE"] as ControlPosition,
		);
	}

	public destroy(): void {
		for (const control of this.controls.values()) {
			this.map?.removeControl(control);
		}

		this.controls.clear();

		this.resizeObserver?.disconnect();
		this.resizeObserver = null;

		this.map?.remove();
		this.map = null;
	}

	public flyTo(center: [number, number]): void {
		if (!this.map) {
			return;
		}

		this.map.stop();
		this.map.flyTo({ center, essential: true, zoom: ZOOM_LEVEL });
	}

	public init(
		container: HTMLElement,
		options?: {
			onLoad?: () => void;
			onPopupRender?: (content: ReactElement, container: HTMLElement) => void;
		},
	): void {
		if (!this.accessToken) {
			return;
		}

		if (options?.onPopupRender) {
			this.popupRenderCallback = options.onPopupRender;
		}

		this.map = new mapboxgl.Map({
			accessToken: this.accessToken,
			container,
			...MAP_OPTIONS,
		});

		if (options?.onLoad) {
			this.map.on(MapEventType.LOAD, options.onLoad);
		}

		this.resizeObserver = new ResizeObserver(() => {
			this.map?.resize();
		});
		this.resizeObserver.observe(container);
	}

	public renderRoute({ geometry, id }: RouteLine): void {
		if (!this.map) {
			return;
		}

		const routeId = `${id}-route`;

		const source = this.map.getSource(routeId);
		const data = { geometry, properties: {}, type: "Feature" as const };

		if (source) {
			(source as mapboxgl.GeoJSONSource).setData(data);

			return;
		}

		this.map.addSource(routeId, {
			data,
			type: "geojson",
		});

		this.map.addLayer({
			id: `${routeId}-outline`,
			layout: {
				"line-cap": "round",
				"line-join": "round",
			},
			paint: {
				"line-color": MAP_LAYER_STYLES.ROUTE_OUTLINE.LINE_COLOR,
				"line-width": MAP_LAYER_STYLES.ROUTE_OUTLINE.LINE_WIDTH,
			},
			source: routeId,
			type: "line",
		});

		this.map.addLayer({
			id: routeId,
			layout: {
				"line-cap": "round",
				"line-join": "round",
			},
			paint: {
				"line-color": MAP_LAYER_STYLES.ROUTE.LINE_COLOR,
				"line-width": MAP_LAYER_STYLES.ROUTE.LINE_WIDTH,
			},
			source: routeId,
			type: "line",
		});
	}

	public resize(): void {
		this.map?.resize();
	}

	public setCenter(center: [number, number]): void {
		this.map?.setCenter(center);
	}

	private addControl(
		id: string,
		control: MapControl,
		position: ControlPosition,
	): void {
		if (!this.map) {
			return;
		}

		this.removeControl(id);
		this.map.addControl(control, position);
		this.controls.set(id, control);
	}

	private mapMarker(marker: mapboxgl.Marker): MapMarker {
		return {
			addPopup: (content: ReactElement): void => {
				const popupDiv = document.createElement("div");

				if (this.popupRenderCallback) {
					this.popupRenderCallback(content, popupDiv);
				} else {
					popupDiv.innerHTML = "<div>Not available</div>";
				}

				const popup = new mapboxgl.Popup(MAP_POPUP_OPTIONS).setDOMContent(
					popupDiv,
				);

				marker.setPopup(popup);
				marker.getElement().style.cursor = "pointer";
			},
			remove: (): void => {
				marker.remove();
			},
			setCoordinates: (coords: Coordinates): void => {
				marker.setLngLat(coords);
			},
		};
	}

	private removeControl(id: string): void {
		const control = this.controls.get(id);

		if (control && this.map) {
			this.map.removeControl(control);
			this.controls.delete(id);
		}
	}
}

export { MapClient };
