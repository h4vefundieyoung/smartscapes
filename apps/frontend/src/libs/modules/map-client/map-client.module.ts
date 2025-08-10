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
	type IControl,
	type MapBoxGLWithToken,
	type MapOptions,
	type Marker,
	type MarkerOptions,
	type PointGeometry,
} from "./libs/types/types.js";

import "mapbox-gl/dist/mapbox-gl.css";

class MapClient {
	private controls = new Map<string, IControl>();
	private map: mapboxgl.Map | null = null;
	private markerClickHandler:
		| ((id: string, coordinates: PointGeometry["coordinates"]) => void)
		| undefined;
	private markers = new Map<string, Marker>();
	private resizeObserver: null | ResizeObserver = null;

	public constructor() {
		(mapboxgl as MapBoxGLWithToken).accessToken =
			config.ENV.MAPBOX.ACCESS_TOKEN;
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

	public addMarkers(markers: MarkerOptions[]): void {
		for (const marker of markers) {
			this.addMarker(marker.id, marker);
		}
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

	public clearAllMarkers(): void {
		for (const marker of this.markers.values()) {
			marker.remove();
		}

		this.markers.clear();
	}

	public destroy(): void {
		this.clearAllMarkers();

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

		this.map.flyTo({
			center,
			essential: true,
			zoom: ZOOM_LEVEL,
		});
	}

	public init(container: HTMLElement, options: MapOptions = {}): void {
		this.map = new mapboxgl.Map({
			container,
			...MAP_OPTIONS,
			...options,
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
		control: mapboxgl.IControl,
		position: ControlPosition,
	): void {
		if (!this.map) {
			return;
		}

		this.removeControl(id);
		this.map.addControl(control, position);
		this.controls.set(id, control);
	}

	private addMarker(id: string, options: MarkerOptions): void {
		if (!this.map) {
			return;
		}

		this.removeMarker(id);

		const { coordinates, ...markerOptions } = options;

		const marker = new mapboxgl.Marker({
			...MARKER_OPTIONS,
			...markerOptions,
		})
			.setLngLat(coordinates)
			.addTo(this.map);

		(marker as Marker).id = id;

		if (this.markerClickHandler) {
			const element = marker.getElement();
			element.style.cursor = "pointer";
			element.addEventListener("click", () => {
				const lngLat = marker.getLngLat();
				this.markerClickHandler?.(id, [lngLat.lng, lngLat.lat]);
			});
		}

		this.markers.set(id, marker as Marker);
	}

	private removeControl(id: string): void {
		const control = this.controls.get(id);

		if (control && this.map) {
			this.map.removeControl(control);
			this.controls.delete(id);
		}
	}

	private removeMarker(id: string): void {
		const marker = this.markers.get(id);

		if (marker) {
			marker.remove();
			this.markers.delete(id);
		}
	}
}

export { MapClient };
