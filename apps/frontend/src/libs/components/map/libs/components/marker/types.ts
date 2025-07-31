import { type JSX, type ReactNode } from "react";

type MarkerProperties = {
	children?: ReactNode;
	color?: string;
	coordinates: [number, number];
	draggable?: boolean;
	onClick?: (event: MouseEvent) => void;
};

type MarkerReturn = JSX.Element | null;

export { type MarkerProperties, type MarkerReturn };
