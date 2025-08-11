import mapboxGLLibrary from "mapbox-gl";
import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker.js?worker";
import "mapbox-gl/dist/mapbox-gl.css";

type MapboxGL = typeof mapboxGLLibrary & {
	workerClass: typeof MapboxWorker;
};

const mapboxgl = mapboxGLLibrary as MapboxGL;

mapboxgl.workerClass = MapboxWorker;

export { mapboxgl };
