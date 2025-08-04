const MAP_DEFAULTS = {
	CENTER: [-73.9654, 40.7829] as [number, number],
	ZOOM: 12,
	STYLE: "mapbox://styles/mapbox/streets-v12",
	CURRENT_POSITION_COLOR: "hsl(162deg 91% 25% / 100%)",
	IS_MAP_CONTROL: true,
	IS_ZOOM_CONTROL: true,
	ZOOM_CONTROL_POSITION: "top-right" as const,
	IS_SHOW_COMPASS: true,
	IS_SCALE_CONTROL: true,
	SCALE_CONTROL_POSITION: "bottom-left" as const,
	SCALE_CONTROL_UNIT: "metric" as const,
	IS_LOCATION_CONTROL: true,
	LOCATION_CONTROL_POSITION: "bottom-right" as const,
	IS_TRACK_USER_LOCATION: false,
	LOCATION_ZOOM: 15,
	FLY_TO_DURATION: 2000,
	RESIZE_DELAY: 100,
	FALLBACK_CENTER: [0, 0] as [number, number],
	FALLBACK_ZOOM: 2,
} as const;

export { MAP_DEFAULTS };
