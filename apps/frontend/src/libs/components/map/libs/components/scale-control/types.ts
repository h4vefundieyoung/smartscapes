import { type JSX } from "react";

type ScaleControlProperties = {
	maxWidth?: number;
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	unit?: "imperial" | "metric" | "nautical";
};

type ScaleControlReturn = JSX.Element | null;

export { type ScaleControlProperties, type ScaleControlReturn };
