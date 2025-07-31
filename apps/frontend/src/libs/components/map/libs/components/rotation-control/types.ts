import { type JSX } from "react";

type RotationControlProperties = {
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

type RotationControlReturn = JSX.Element | null;

export { type RotationControlProperties, type RotationControlReturn };
