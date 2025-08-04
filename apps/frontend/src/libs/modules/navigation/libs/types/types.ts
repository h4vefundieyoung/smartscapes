type NavigationModule = {
	getCurrentPosition: (options?: PositionOptions) => Promise<Position>;
	isSupported: () => boolean;
};

type Position = {
	latitude: number;
	longitude: number;
};

export { type NavigationModule, type Position };
