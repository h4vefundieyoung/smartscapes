import { type JSX, type ReactNode } from "react";

type PopupProperties = {
	anchor?:
		| "center"
		| "top"
		| "bottom"
		| "left"
		| "right"
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right";
	children: ReactNode;
	closeButton?: boolean;
	closeOnClick?: boolean;
	coordinates: [number, number];
	offset?: number | [number, number] | Record<string, [number, number]>;
};

type PopupReturn = JSX.Element | null;

export { type PopupProperties, type PopupReturn };
