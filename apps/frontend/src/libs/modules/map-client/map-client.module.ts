import mapboxgl from "mapbox-gl";

import { config } from "~/libs/modules/config/config.js";
import {
	type Constructor,
	type MapOptions,
	type MarkerOptions,
	type ControlPosition,
	type NavigationControlOptions,
	type ScaleControlOptions,
	type GeolocateControlOptions,
	type PointGeometry,
} from "./libs/types/types.js";
import {
	CONTROL_IDS,
	DEFAULT_MAP_OPTIONS,
	DEFAULT_MARKER_OPTIONS,
	DEFAULT_NAVIGATION_CONTROL_OPTIONS,
	DEFAULT_SCALE_CONTROL_OPTIONS,
	DEFAULT_GEOLOCATE_CONTROL_OPTIONS,
} from "./libs/constants/constants.js";

import "mapbox-gl/dist/mapbox-gl.css";

class MapClient {
	private map: mapboxgl.Map | null = null;
	private markers = new Map<string, mapboxgl.Marker>();
	private controls = new Map<string, mapboxgl.IControl>();
	private resizeObserver: ResizeObserver | null = null;
	private shouldCenterOnUser: boolean = false;
	private defaultMapOptions: Omit<mapboxgl.MapOptions, "container">;
	private defaultMarkerOptions: mapboxgl.MarkerOptions;
	private defaultNavigationControlOptions: mapboxgl.NavigationControlOptions & {
		position?: ControlPosition;
	};
	private defaultScaleControlOptions: mapboxgl.ScaleControlOptions & {
		position?: ControlPosition;
	};
	private defaultGeolocateControlOptions: mapboxgl.GeolocateControlOptions & {
		position?: ControlPosition;
		autoTrigger?: boolean;
	};

	constructor({ token }: Constructor = {}) {
		(mapboxgl as any).accessToken = token || config.ENV.MAPBOX.ACCESS_TOKEN;

		this.defaultMapOptions = DEFAULT_MAP_OPTIONS;
		this.defaultMarkerOptions = DEFAULT_MARKER_OPTIONS;
		this.defaultNavigationControlOptions = DEFAULT_NAVIGATION_CONTROL_OPTIONS;
		this.defaultScaleControlOptions = DEFAULT_SCALE_CONTROL_OPTIONS;
		this.defaultGeolocateControlOptions = DEFAULT_GEOLOCATE_CONTROL_OPTIONS;
	}

	public init(container: HTMLElement, options: MapOptions = {}): void {
		const mapOptions = {
			container,
			...this.defaultMapOptions,
			...options,
		};

		this.map = new mapboxgl.Map(mapOptions);

		this.resizeObserver = new ResizeObserver(() => {
			if (this.map) {
				this.map.resize();
			}
		});

		this.resizeObserver.observe(container);

		this.shouldCenterOnUser = !options.center;
	}

	public addMarker(id: string, options: MarkerOptions): void {
		if (!this.map) return;

		this.removeMarker(id);

		const { coordinates, ...markerOptions } = options;

		const marker = new mapboxgl.Marker({
			...this.defaultMarkerOptions,
			...markerOptions,
		})
			.setLngLat(coordinates)
			.addTo(this.map);

		this.markers.set(id, marker);
	}

	public addMarkers(markers: Array<{ id: string } & MarkerOptions>): void {
		markers.forEach(({ id, ...options }) => {
			this.addMarker(id, options);
		});
	}

	public removeMarker(id: string): void {
		const marker = this.markers.get(id);
		if (marker) {
			marker.remove();
			this.markers.delete(id);
		}
	}

	public clearAllMarkers(): void {
		this.markers.forEach((marker) => marker.remove());
		this.markers.clear();
	}

	public setMarkerClickHandler(
		handler: (id: string, coordinates: PointGeometry["coordinates"]) => void,
	): void {
		this.markers.forEach((marker, id) => {
			const element = marker.getElement();
			element.style.cursor = "pointer";
			element.onclick = () => {
				const lngLat = marker.getLngLat();
				handler(id, [lngLat.lng, lngLat.lat]);
			};
		});
	}

	public addNavigationControl(
		position?: ControlPosition,
		options?: NavigationControlOptions,
	): void {
		if (!this.map) return;

		const mergedOptions = {
			...this.defaultNavigationControlOptions,
			...options,
		};

		const { position: finalPosition, ...controlOptions } = mergedOptions;

		const control = new mapboxgl.NavigationControl(controlOptions);

		this.addControl(
			CONTROL_IDS.NAVIGATION,
			control,
			position || finalPosition!,
		);
	}

	public addScaleControl(
		position?: ControlPosition,
		options?: ScaleControlOptions,
	): void {
		if (!this.map) return;

		const mergedOptions = {
			...this.defaultScaleControlOptions,
			...options,
		};

		const { position: finalPosition, ...controlOptions } = mergedOptions;

		const control = new mapboxgl.ScaleControl(controlOptions);

		this.addControl(CONTROL_IDS.SCALE, control, position || finalPosition!);
	}

	public addGeolocateControl(
		position?: ControlPosition,
		options?: GeolocateControlOptions,
	): void {
		if (!this.map) return;

		const mergedOptions = {
			...this.defaultGeolocateControlOptions,
			autoTrigger: this.shouldCenterOnUser,
			...options,
		};

		const {
			position: finalPosition,
			autoTrigger,
			...controlOptions
		} = mergedOptions;

		const control = new mapboxgl.GeolocateControl(controlOptions);

		this.addControl(CONTROL_IDS.GEOLOCATE, control, position || finalPosition!);

		if (autoTrigger) {
			this.map.on("load", () => {
				setTimeout(() => {
					if (typeof control.trigger === "function") {
						control.trigger();
					}
				}, 100);
			});
		}
	}

	public addAllMapControls(): void {
		this.addNavigationControl();
		this.addScaleControl();
		this.addGeolocateControl();
	}

	private addControl(
		id: string,
		control: mapboxgl.IControl,
		position: ControlPosition,
	): void {
		if (!this.map) return;

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

	public destroy(): void {
		this.markers.forEach((marker) => marker.remove());
		this.markers.clear();

		this.controls.forEach((control) => {
			if (this.map) this.map.removeControl(control);
		});
		this.controls.clear();

		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
			this.resizeObserver = null;
		}

		this.map?.remove();
		this.map = null;
	}

	public getMap(): mapboxgl.Map | null {
		return this.map;
	}

	public resize(): void {
		if (this.map) {
			this.map.resize();
		}
	}

	public setCenter(center: [number, number]): void {
		if (this.map) {
			this.map.setCenter(center);
		}
	}

	public flyTo(center: [number, number], zoom?: number): void {
		if (this.map) {
			this.map.flyTo({
				center,
				zoom: zoom ?? this.map.getZoom(),
				essential: true,
			});
		}
	}
}

export { MapClient};
