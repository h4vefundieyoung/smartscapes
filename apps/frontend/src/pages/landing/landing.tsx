import {
	Header,
	Map,
	type PointOfInterest,
} from "~/libs/components/components.js";

import { HeroSection } from "./libs/components/hero-section/hero-section.jsx";
import { PopularSection } from "./libs/components/popular-section/popular-section.js";
import styles from "./styles.module.css";

// Mock POI data for the landing page
const mockPointsOfInterest: PointOfInterest[] = [
	{
		id: 1,
		latitude: 40.7829,
		longitude: -73.9654,
		name: "Central Park",
	},
	{
		id: 2,
		latitude: 40.7794,
		longitude: -73.9632,
		name: "Metropolitan Museum of Art",
	},
	{
		id: 3,
		latitude: 40.758,
		longitude: -73.9855,
		name: "Times Square",
	},
	{
		id: 4,
		latitude: 40.7484,
		longitude: -73.9857,
		name: "Empire State Building",
	},
	{
		id: 5,
		latitude: 40.748,
		longitude: -74.0048,
		name: "High Line Park",
	},
	{
		id: 6,
		latitude: 40.7115,
		longitude: -74.0134,
		name: "9/11 Memorial",
	},
	{
		id: 7,
		latitude: 40.7061,
		longitude: -73.9969,
		name: "Brooklyn Bridge",
	},
	{
		id: 8,
		latitude: 40.7033,
		longitude: -73.9888,
		name: "DUMBO Brooklyn",
	},
];

const Landing = (): React.JSX.Element => {
	return (
		<main className={styles["landing"]}>
			<Header user={null} />
			<HeroSection />
			<PopularSection />
			<Map pois={mockPointsOfInterest} />
		</main>
	);
};

export { Landing };
