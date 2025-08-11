import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker.js?worker";
import mapboxGLLibrary from "mapbox-gl/dist/mapbox-gl-csp.js";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxgl = mapboxGLLibrary;

mapboxgl.workerClass = MapboxWorker as typeof mapboxGLLibrary.workerClass;

export { mapboxgl };
