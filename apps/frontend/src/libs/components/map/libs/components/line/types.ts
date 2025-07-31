import { type JSX } from "react";
import type mapboxgl from "mapbox-gl";

type LineProperties = {
	beforeId?: string;
	coordinates: number[][];
	id: string;
	layout?: mapboxgl.LineLayout;
	paint?: mapboxgl.LinePaint;
	layerId?: string;
	visible?: boolean;
};

type LineReturn = JSX.Element | null;

export { type LineProperties, type LineReturn };
