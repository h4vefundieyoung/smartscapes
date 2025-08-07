type MapboxGLType = {
	accessToken?: string;
	GeolocateControl: unknown;
	Map: unknown;
	Marker: unknown;
	NavigationControl: unknown;
	ScaleControl: unknown;
};

const isMapClientReady = (
	accessToken: null | string | undefined,
	mapClient: MapboxGLType | null,
): mapClient is MapboxGLType => {
	return Boolean(accessToken && mapClient);
};

export { isMapClientReady };
