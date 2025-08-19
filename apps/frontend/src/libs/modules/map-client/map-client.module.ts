import mapboxgl from "mapbox-gl";

import { config } from "~/libs/modules/config/config.js";

import {
	GEOLOCATE_AUTO_TRIGGER_DELAY,
	GEOLOCATE_CONTROL_OPTIONS,
	MAP_CONTROLS_POSITION,
	MAP_OPTIONS,
	MARKER_OPTIONS,
	NAVIGATION_CONTROL_OPTIONS,
	SCALE_CONTROL_OPTIONS,
	ZOOM_LEVEL,
} from "./libs/constants/constants.js";
import { MapControlId } from "./libs/enums/enums.js";
import {
	type ControlPosition,
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

		this.map.on("load", () => {
			setTimeout(() => {
				control.trigger();
			}, GEOLOCATE_AUTO_TRIGGER_DELAY);
		});
	}

	public addMapClickListener(
		handler: (coords: [number, number]) => void,
	): () => void {
		if (!this.map) {
			let cancelled = false;
			let innerCleanup: (() => void) | null = null;

			const tryAttach = (): void => {
				if (cancelled) {
					return;
				}

				if (this.map) {
					innerCleanup = this.addMapClickListener(handler);

					return;
				}

				requestAnimationFrame(tryAttach);
			};

			requestAnimationFrame(tryAttach);

			return () => {
				cancelled = true;
				innerCleanup?.();
			};
		}

		const onMapClick = (event: mapboxgl.MapMouseEvent): void => {
			handler([event.lngLat.lng, event.lngLat.lat]);
		};

		this.map.on("click", onMapClick);

		return () => {
			this.map?.off("click", onMapClick);
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

		if (isDraggable && onDragEnd) {
			marker.on("dragend", () => {
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

	public init(container: HTMLElement): void {
		if (!this.accessToken) {
			return;
		}

		this.map = new mapboxgl.Map({
			accessToken: this.accessToken,
			container,
			...MAP_OPTIONS,
		});

		this.resizeObserver = new ResizeObserver(() => {
			this.map?.resize();
		});
		this.resizeObserver.observe(container);
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
			setCoordinates: (coords: [number, number]): void => {
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
