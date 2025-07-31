import { type JSX } from "react";

type ZoomControlProperties = {
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	showCompass?: boolean;
};

type ZoomControlReturn = JSX.Element | null;

export { type ZoomControlProperties, type ZoomControlReturn };
