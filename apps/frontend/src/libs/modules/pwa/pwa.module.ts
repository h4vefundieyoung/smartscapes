import { registerSW } from "virtual:pwa-register";

import { UPDATE_INTERVAL } from "./libs/constants/constants.js";
import { AppEnvironment } from "./libs/enum/enums.js";
import {
	type Config,
	type PWARegistrationConfig,
	type RegisterSWOptions,
} from "./libs/types/types.js";

class PWA {
	private config: Config;
	private updateInterval: number;

	public constructor(config: Config) {
		this.config = config;
		this.updateInterval = UPDATE_INTERVAL;
	}

	public register(config: PWARegistrationConfig = {}): void {
		const {
			isImmediate = true,
			onNeedRefresh,
			onRegistered,
			updateIntervalMs = this.updateInterval,
		} = config;

		registerSW({
			immediate: isImmediate,
			onNeedRefresh: (): void => {
				const isDevelopmentEnvironment =
					this.config.ENV.APP.ENVIRONMENT === AppEnvironment.DEVELOPMENT ||
					this.config.ENV.APP.ENVIRONMENT === AppEnvironment.TEST;

				if (isDevelopmentEnvironment) {
					globalThis.location.reload();
				}

				onNeedRefresh?.();
			},
			onRegistered: (registration): void => {
				if (registration) {
					setInterval(() => {
						void registration.update();
					}, updateIntervalMs);
				}

				if (registration) {
					onRegistered?.(registration);
				}
			},
		} satisfies RegisterSWOptions);
	}

	public setUpdateInterval(intervalMs: number): void {
		this.updateInterval = intervalMs;
	}
}

export { PWA };
