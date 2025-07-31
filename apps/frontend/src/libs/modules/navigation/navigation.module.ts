import {
	DEFAULT_POSITION_OPTIONS,
	DEFAULT_POSITION,
} from "./libs/constants/constants.js";
import { type NavigationModule, type Position } from "./libs/types/types.js";

class Navigation implements NavigationModule {
	private defaultPositionOptions: PositionOptions;
	private defaultPosition: Position;

	constructor() {
		this.defaultPositionOptions = {
			enableHighAccuracy: DEFAULT_POSITION_OPTIONS.ENABLE_HIGH_ACCURACY,
			maximumAge: DEFAULT_POSITION_OPTIONS.MAXIMUM_AGE,
			timeout: DEFAULT_POSITION_OPTIONS.TIMEOUT,
		};
		this.defaultPosition = {
			latitude: DEFAULT_POSITION.LATITUDE,
			longitude: DEFAULT_POSITION.LONGITUDE,
		};
	}

	private handleGeolocationResult(
		geolocationPosition: GeolocationPosition | null,
		resolve: (value: Position) => void,
	): void {
		if (geolocationPosition) {
			const position: Position = {
				latitude: geolocationPosition.coords.latitude,
				longitude: geolocationPosition.coords.longitude,
			};
			resolve(position);
		} else {
			resolve(this.defaultPosition);
		}
	}

	public getCurrentPosition(
		options: PositionOptions = this.defaultPositionOptions,
	): Promise<Position> {
		return new Promise<Position>((resolve): void => {
			if (!this.isSupported()) {
				resolve(this.defaultPosition);
				return;
			}

			const handleResolve = (
				geolocationPosition: GeolocationPosition,
			): void => {
				this.handleGeolocationResult(geolocationPosition, resolve);
			};

			const handleError = (): void => {
				this.handleGeolocationResult(null, resolve);
			};

			navigator.geolocation.getCurrentPosition(
				handleResolve,
				handleError,
				options,
			);
		});
	}

	public watchPosition(
		onPositionUpdate: (position: Position) => void,
		options: PositionOptions = this.defaultPositionOptions,
	): number | null {
		if (!this.isSupported()) {
			onPositionUpdate(this.defaultPosition);
			return null;
		}

		const handleSuccess = (geolocationPosition: GeolocationPosition): void => {
			const position: Position = {
				latitude: geolocationPosition.coords.latitude,
				longitude: geolocationPosition.coords.longitude,
			};
			onPositionUpdate(position);
		};

		const handleError = (): void => {
			onPositionUpdate(this.defaultPosition);
		};

		return navigator.geolocation.watchPosition(
			handleSuccess,
			handleError,
			options,
		);
	}

	public clearWatch(watchId: number): void {
		if (this.isSupported() && watchId) {
			navigator.geolocation.clearWatch(watchId);
		}
	}

	public isSupported(): boolean {
		return "geolocation" in navigator;
	}
}

export { Navigation };
