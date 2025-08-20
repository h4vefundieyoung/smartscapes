type MapMarkerOptions = {
	coordinates: [number, number];
	isDraggable?: boolean;
	onDragEnd?: (coords: [number, number]) => void;
};

export { type MapMarkerOptions };
