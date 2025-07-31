type Position = {
	latitude: number;
	longitude: number;
};

type NavigationModule = {
	getCurrentPosition: (options?: PositionOptions) => Promise<Position>;
	isSupported: () => boolean;
};

export {
	type Position,
	type NavigationModule,
};
