import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useMapContext } from "../../context/context.js";
import { POPUP_OFFSET } from "../../constants/constants.js";
import { type PopupProperties, type PopupReturn } from "../../types/types.js";

const Popup = ({
	coordinates,
	children,
	closeButton = true,
	closeOnClick = true,
	offset = POPUP_OFFSET,
	anchor,
}: PopupProperties): PopupReturn => {
	const { map } = useMapContext();
	const popupRef = useRef<mapboxgl.Popup | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect((): (() => void) | undefined => {
		if (!map || !coordinates) {
			return;
		}

		// Wait for map to be fully loaded
		const initializePopup = () => {
			// Create container for React content
			containerRef.current = document.createElement("div");

			// Create popup
			const popupOptions: mapboxgl.PopupOptions = {
				closeButton,
				closeOnClick,
				offset,
			};

			if (anchor) {
				popupOptions.anchor = anchor;
			}

			popupRef.current = new mapboxgl.Popup(popupOptions)
				.setLngLat(coordinates)
				.setDOMContent(containerRef.current)
				.addTo(map);
		};

		// Check if map is loaded, if not wait for load event
		if (map.loaded()) {
			initializePopup();
		} else {
			map.on("load", initializePopup);
		}

		return (): void => {
			if (popupRef.current) {
				popupRef.current.remove();
				popupRef.current = null;
			}
			containerRef.current = null;
		};
	}, [map, coordinates, closeButton, closeOnClick, offset, anchor]);

	// Update popup position when coordinates change
	useEffect((): void => {
		if (popupRef.current && coordinates && map && map.loaded()) {
			popupRef.current.setLngLat(coordinates);
		}
	}, [coordinates, map]);

	// Render children into the popup container
	if (!containerRef.current) {
		return null;
	}

	return createPortal(children, containerRef.current);
};

export { Popup };
export { type PopupProperties, type PopupReturn } from "../../types/types.js";
