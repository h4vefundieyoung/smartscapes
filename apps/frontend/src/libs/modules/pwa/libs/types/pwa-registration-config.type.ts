type PWARegistrationConfig = {
	isImmediate?: boolean;
	onNeedRefresh?: () => void;
	onRegistered?: (registration: ServiceWorkerRegistration) => void;
	updateIntervalMs?: number;
};

export { type PWARegistrationConfig };
