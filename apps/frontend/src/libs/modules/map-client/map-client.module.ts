import mapboxgl from "mapbox-gl";

import { config } from "~/libs/modules/config/config.js";

import {
	CONTROL_IDS,
	DEFAULT_GEOLOCATE_CONTROL_OPTIONS,
	DEFAULT_MAP_CONTROLS_POSITION,
	DEFAULT_MAP_OPTIONS,
	DEFAULT_MARKER_OPTIONS,
	DEFAULT_NAVIGATION_CONTROL_OPTIONS,
	DEFAULT_SCALE_CONTROL_OPTIONS,
	DEFAULT_ZOOM_LEVEL,
	GEOLOCATE_AUTO_TRIGGER_DELAY,
} from "./libs/constants/constants.js";
import {
	type ControlPosition,
	type GeolocateControlOptions,
	type IControl,
	type MapBoxGLWithToken,
	type MapOptions,
	type Marker,
	type MarkerOptions,
	type NavigationControlOptions,
	type PointGeometry,
	type ScaleControlOptions,
} from "./libs/types/types.js";

import "mapbox-gl/dist/mapbox-gl.css";

class MapClient {
	private controls = new Map<string, IControl>();
	private map: mapboxgl.Map | null = null;
	private markerClickHandler?: (
		id: string,
		coordinates: PointGeometry["coordinates"],
	) => void;
	private markers = new Map<string, Marker>();
	private resizeObserver: null | ResizeObserver = null;
	private shouldCenterOnUser = false;

	public constructor() {
		(mapboxgl as MapBoxGLWithToken).accessToken =
			config.ENV.MAPBOX.ACCESS_TOKEN;
	}

	public addAllMapControls(): void {
		this.addNavigationControl();
		this.addScaleControl();
		this.addGeolocateControl();
	}

	public addGeolocateControl(
		position?: ControlPosition,
		options?: GeolocateControlOptions,
	): void {
		if (!this.map) {
			return;
		}

		const autoTrigger = this.shouldCenterOnUser;

		const control = new mapboxgl.GeolocateControl({
			...DEFAULT_GEOLOCATE_CONTROL_OPTIONS,
			...options,
		});

		this.addControl(
			CONTROL_IDS.GEOLOCATE,
			control,
			(position ??
				DEFAULT_MAP_CONTROLS_POSITION["GEOLOCATE"]) as ControlPosition,
		);

		if (autoTrigger) {
			this.map.on("load", () => {
				setTimeout(() => {
					control.trigger();
				}, GEOLOCATE_AUTO_TRIGGER_DELAY);
			});
		}
	}

	public addMarker(id: string, options: MarkerOptions): void {
		if (!this.map) {
			return;
		}

		this.removeMarker(id);

		const { coordinates, ...markerOptions } = options;

		const marker = new mapboxgl.Marker({
			...DEFAULT_MARKER_OPTIONS,
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

	public addMarkers(markers: Array<MarkerOptions & { id: string }>): void {
		for (const { id, ...options } of markers) {
			this.addMarker(id, options);
		}
	}

	public addNavigationControl(
		position?: ControlPosition,
		options?: NavigationControlOptions,
	): void {
		if (!this.map) {
			return;
		}

		const control = new mapboxgl.NavigationControl({
			...DEFAULT_NAVIGATION_CONTROL_OPTIONS,
			...options,
		});

		this.addControl(
			CONTROL_IDS.NAVIGATION,
			control,
			(position ??
				DEFAULT_MAP_CONTROLS_POSITION["NAVIGATION"]) as ControlPosition,
		);
	}

	public addScaleControl(
		position?: ControlPosition,
		options?: ScaleControlOptions,
	): void {
		if (!this.map) {
			return;
		}

		const control = new mapboxgl.ScaleControl({
			...DEFAULT_SCALE_CONTROL_OPTIONS,
			...options,
		});

		this.addControl(
			CONTROL_IDS.SCALE,
			control,
			(position ?? DEFAULT_MAP_CONTROLS_POSITION["SCALE"]) as ControlPosition,
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

	public flyTo(center: [number, number], zoom?: number): void {
		if (!this.map) {
			return;
		}

		this.map.stop();

		try {
			this.map.stop();
			this.map.flyTo({
				center,
				essential: true,
				zoom: zoom ?? DEFAULT_ZOOM_LEVEL,
			});
		} catch {
			this.map.jumpTo({
				center,
				zoom: zoom ?? DEFAULT_ZOOM_LEVEL,
			});
		}
	}

	public getMap(): mapboxgl.Map | null {
		return this.map;
	}

	public init(container: HTMLElement, options: MapOptions = {}): void {
		this.map = new mapboxgl.Map({
			container,
			...DEFAULT_MAP_OPTIONS,
			...options,
		});

		this.resizeObserver = new ResizeObserver(() => {
			this.map?.resize();
		});
		this.resizeObserver.observe(container);

		this.shouldCenterOnUser = !options.center;
	}

	public removeMarker(id: string): void {
		const marker = this.markers.get(id);

		if (marker) {
			marker.remove();
			this.markers.delete(id);
		}
	}

	public resize(): void {
		this.map?.resize();
	}

	public setCenter(center: [number, number]): void {
		this.map?.setCenter(center);
	}

	public setMarkerClickHandler(
		handler: (id: string, coordinates: PointGeometry["coordinates"]) => void,
	): void {
		this.markerClickHandler = handler;

		for (const [id, marker] of this.markers) {
			const element = marker.getElement();

			element.style.cursor = "pointer";
			element.addEventListener("click", () => {
				const { lat, lng } = marker.getLngLat();

				handler(id, [lng, lat]);
			});
		}
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

	private removeControl(id: string): void {
		const control = this.controls.get(id);

		if (control && this.map) {
			this.map.removeControl(control);
			this.controls.delete(id);
		}
	}
}

export { MapClient };
