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
	type MapOptions,
	type PointGeometry,
} from "./libs/types/types.js";
import "mapbox-gl/dist/mapbox-gl.css";

class MapClient {
	private accessToken: MapOptions["accessToken"];
	private controls = new Map<string, MapControl>();
	private map: mapboxgl.Map | null = null;
	private readyCallbacks: Array<() => void> = [];
	private resizeObserver: null | ResizeObserver = null;
	private selectionMarker: mapboxgl.Marker | null = null;

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

	public addMarker(options: {
		coordinates: [number, number];
		draggable?: boolean;
		onDragEnd?: (coords: [number, number]) => void;
	}): mapboxgl.Marker | null {
		if (!this.map) {
			return null;
		}

		const marker = new mapboxgl.Marker({
			...MARKER_OPTIONS,
			draggable: Boolean(options.draggable),
		})
			.setLngLat(options.coordinates)
			.addTo(this.map);

		if (options.draggable && options.onDragEnd) {
			marker.on("dragend", (): void => {
				const pos = marker.getLngLat();
				options.onDragEnd?.([pos.lng, pos.lat]);
			});
		}

		return marker;
	}

	public addMarkers(
		markers: { coordinates: PointGeometry["coordinates"] }[],
	): void {
		for (const { coordinates } of markers) {
			this.addMarker({ coordinates, draggable: false });
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

	public clearSelectionMarker(): void {
		if (this.selectionMarker) {
			this.selectionMarker.remove();
			this.selectionMarker = null;
		}
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
		this.clearSelectionMarker();
		this.readyCallbacks = [];
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

	public init(container: HTMLElement): void {
		if (!this.accessToken) {
			return;
		}

		this.map = new mapboxgl.Map({
			accessToken: this.accessToken,
			container,
			...MAP_OPTIONS,
		});

		this.resizeObserver = new ResizeObserver((): void => {
			this.map?.resize();
		});
		this.resizeObserver.observe(container);

		const callbacks = [...this.readyCallbacks];
		this.readyCallbacks = [];

		for (const callback of callbacks) {
			callback();
		}
	}

	public onClick(handler: (coords: [number, number]) => void): () => void {
		if (!this.map) {
			let innerCleanup: () => void = (): void => {};

			const unsubscribe = this.onReady((): void => {
				innerCleanup = this.attachClick(handler);
			});

			return (): void => {
				unsubscribe();
				innerCleanup();
			};
		}

		return this.attachClick(handler);
	}

	public onReady(callback: () => void): () => void {
		if (this.map) {
			callback();

			return (): void => {};
		}

		this.readyCallbacks.push(callback);

		return (): void => {
			this.readyCallbacks = this.readyCallbacks.filter((f) => f !== callback);
		};
	}

	public resize(): void {
		this.map?.resize();
	}

	public setCenter(center: [number, number]): void {
		this.map?.setCenter(center);
	}

	public setSelectionMarker(options: {
		coordinates: [number, number];
		draggable?: boolean;
		onDragEnd?: (coords: [number, number]) => void;
	}): void {
		if (!this.map) {
			return;
		}

		const { coordinates, draggable, onDragEnd } = options;

		if (this.selectionMarker) {
			this.selectionMarker.setLngLat(coordinates);
			const shouldDrag = Boolean(draggable);

			if (this.selectionMarker.isDraggable() !== shouldDrag) {
				this.selectionMarker.setDraggable(shouldDrag);
			}
		} else {
			this.selectionMarker = new mapboxgl.Marker({
				...MARKER_OPTIONS,
				draggable: Boolean(draggable),
			})
				.setLngLat(coordinates)
				.addTo(this.map);

			if (draggable && onDragEnd) {
				this.selectionMarker.on("dragend", () => {
					if (!this.selectionMarker) {
						return;
					}

					const position = this.selectionMarker.getLngLat();
					onDragEnd([position.lng, position.lat]);
				});
			}
		}
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

	private attachClick(handler: (coords: [number, number]) => void): () => void {
		if (!this.map) {
			return (): void => {};
		}

		const callback = (event: mapboxgl.MapMouseEvent): void => {
			handler([event.lngLat.lng, event.lngLat.lat]);
		};

		this.map.on("click", callback);

		return (): void => {
			if (this.map) {
				this.map.off("click", callback);
			}
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
