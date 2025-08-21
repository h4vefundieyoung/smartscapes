import mapboxgl from "mapbox-gl";

import { config } from "~/libs/modules/config/config.js";

import {
	GEOLOCATE_AUTO_TRIGGER_DELAY,
	GEOLOCATE_CONTROL_OPTIONS,
	MAP_CONTROLS_POSITION,
	MAP_MARKER_Z_INDEX_VALUE,
	MAP_OPTIONS,
	MARKER_OPTIONS,
	NAVIGATION_CONTROL_OPTIONS,
	SCALE_CONTROL_OPTIONS,
	ZOOM_LEVEL,
} from "./libs/constants/constants.js";
import { MapControlId, MapEventType } from "./libs/enums/enums.js";
import {
	type ControlPosition,
	type Coordinates,
	type LineStringGeometry,
	type MapControl,
	type MapMarker,
	type MapMarkerOptions,
	type MapOptions,
} from "./libs/types/types.js";
import "mapbox-gl/dist/mapbox-gl.css";

class MapClient {
	private accessToken: MapOptions["accessToken"];

	private controls = new Map<string, MapControl>();

	private map: mapboxgl.Map | null = null;

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
		const navigateToCurrentLocation = (): ReturnType<typeof setTimeout> =>
			setTimeout(() => control.trigger(), GEOLOCATE_AUTO_TRIGGER_DELAY);

		if (isMapLoaded) {
			navigateToCurrentLocation();
		} else {
			const handleMapLoad = (): void => {
				this.map?.off(MapEventType.LOAD, handleMapLoad);
				navigateToCurrentLocation();
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

	public init(container: HTMLElement, options?: { onLoad?: () => void }): void {
		if (!this.accessToken) {
			return;
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

	public renderRoute(geometry: LineStringGeometry): void {
		if (!this.map) {
			return;
		}

		if (this.map.getLayer("route")) {
			this.map.removeLayer("route");
		}

		if (this.map.getLayer("route-outline")) {
			this.map.removeLayer("route-outline");
		}

		if (this.map.getSource("route")) {
			this.map.removeSource("route");
		}

		this.map.addSource("route", {
			data: { geometry, properties: {}, type: "Feature" },
			type: "geojson",
		});

		this.map.addLayer({
			id: "route-outline",
			layout: {
				"line-cap": "round",
				"line-join": "round",
			},
			paint: {
				"line-color": "#327d1c",
				"line-width": 12,
			},
			source: "route",
			type: "line",
		});

		this.map.addLayer({
			id: "route",
			layout: {
				"line-cap": "round",
				"line-join": "round",
			},
			paint: {
				"line-color": "#5de372",
				"line-width": 6,
			},
			source: "route",
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
