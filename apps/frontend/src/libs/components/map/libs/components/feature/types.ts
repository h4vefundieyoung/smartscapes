import { type JSX } from "react";
import type mapboxgl from "mapbox-gl";

type FeatureProperties = {
	coordinates: [number, number];
	id: string;
	onClick?: (event: mapboxgl.MapboxEvent) => void;
	properties?: Record<string, unknown>;
	symbol?: {
		iconImage?: string;
		iconSize?: number;
		iconColor?: string;
		textField?: string;
		textColor?: string;
		textSize?: number;
	};
	paint?: mapboxgl.SymbolPaint;
	layout?: mapboxgl.SymbolLayout;
	layerId?: string;
	visible?: boolean;
};

type FeatureReturn = JSX.Element | null;

export { type FeatureProperties, type FeatureReturn };
