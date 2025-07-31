import { type JSX } from "react";

type LayerControlProperties = {
	layerId: string;
	label?: string;
	defaultVisible?: boolean;
};

type LayerControlReturn = JSX.Element;

export { type LayerControlProperties, type LayerControlReturn };
