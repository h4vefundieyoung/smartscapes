import { type JSX, type ReactNode, type ComponentType } from "react";
import type mapboxgl from "mapbox-gl";

import { type PointOfInterest } from "./point-of-interest.type.js";

type LayerVisibility = {
	[layerId: string]: boolean;
};

// Custom marker component props
type CustomMarkerProps = {
	coordinates: [number, number];
	data?: PointOfInterest;
	[key: string]: unknown;
};

// Custom popup component props
type CustomPopupProps = {
	coordinates: [number, number];
	data?: PointOfInterest;
	[key: string]: unknown;
};

type MapComponentProperties = {
	children?: ReactNode;
	className?: string;
	center?: [number, number];
	zoom?: number;
	style?: string;
	layersVisible?: LayerVisibility;
	onLayerVisibilityChange?: (layerId: string, visible: boolean) => void;

	// POIs layer
	pois?: PointOfInterest[];
	poisMarker?: ComponentType<CustomMarkerProps> | "default";
	isPoisRoute?: boolean;

	// Current position layer
	currentPosition?: [number, number];
	currentPositionMarker?: ComponentType<CustomMarkerProps> | "default";

	// Popup layer
	isPopup?: boolean;
	popup?: ComponentType<CustomPopupProps> | "default";

	// Zoom control
	isZoomControl?: boolean;
	zoomControlPosition?:
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right";
	showCompass?: boolean;

	// Scale control
	isScaleControl?: boolean;
	scaleControlPosition?:
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right";
	scaleControlMaxWidth?: number;
	scaleControlUnit?: "imperial" | "metric" | "nautical";

	// Rotation control
	isRotationControl?: boolean;
	rotationControlPosition?:
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right";

	// Location control
	isLocationControl?: boolean;
	locationControlPosition?:
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right";
	onLocationFound?: (position: { latitude: number; longitude: number }) => void;
	onLocationError?: (error: string) => void;
};

type MapComponentReturn = JSX.Element;

// Component types
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

type LayerProperties = {
	children?: ReactNode;
	id?: string;
	visible?: boolean;
};

type LayerReturn = JSX.Element;

type MarkerProperties = {
	coordinates: [number, number];
	color?: string;
	draggable?: boolean;
	onClick?: () => void;
	children?: ReactNode;
};

type MarkerReturn = JSX.Element | null;

type PopupProperties = {
	coordinates: [number, number];
	children: ReactNode;
	closeButton?: boolean;
	closeOnClick?: boolean;
	offset?: number;
	anchor?: mapboxgl.Anchor;
};

type PopupReturn = JSX.Element | null;

type ZoomControlProperties = {
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	showCompass?: boolean;
};

type ZoomControlReturn = JSX.Element | null;

type ScaleControlProperties = {
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	maxWidth?: number;
	unit?: "imperial" | "metric" | "nautical";
};

type ScaleControlReturn = JSX.Element | null;

type RotationControlProperties = {
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

type RotationControlReturn = JSX.Element | null;

type LayerControlProperties = {
	layerId: string;
	label?: string;
	defaultVisible?: boolean;
};

type LayerControlReturn = JSX.Element;

export {
	type MapComponentProperties,
	type MapComponentReturn,
	type LayerVisibility,
	type CustomMarkerProps,
	type CustomPopupProps,
	type FeatureProperties,
	type FeatureReturn,
	type LineProperties,
	type LineReturn,
	type LayerProperties,
	type LayerReturn,
	type MarkerProperties,
	type MarkerReturn,
	type PopupProperties,
	type PopupReturn,
	type ZoomControlProperties,
	type ZoomControlReturn,
	type ScaleControlProperties,
	type ScaleControlReturn,
	type RotationControlProperties,
	type RotationControlReturn,
	type LayerControlProperties,
	type LayerControlReturn,
};
export { type PointOfInterest } from "./point-of-interest.type.js";
