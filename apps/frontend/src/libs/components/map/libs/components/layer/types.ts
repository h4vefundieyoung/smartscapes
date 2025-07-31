import { type JSX, type ReactNode } from "react";

type LayerProperties = {
	children?: ReactNode;
	id?: string;
	visible?: boolean;
};

type LayerReturn = JSX.Element;

export { type LayerProperties, type LayerReturn };
