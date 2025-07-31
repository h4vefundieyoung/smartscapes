type LocationControlProperties = {
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	onLocationFound?: (position: { latitude: number; longitude: number }) => void;
	onLocationError?: (error: string) => void;
};

type LocationControlReturn = null;

export { type LocationControlProperties, type LocationControlReturn };
