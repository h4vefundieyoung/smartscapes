import { Header } from "~/libs/components/components.js";

import { HeroSection } from "./libs/components/hero-section/hero-section.jsx";
import { PopularSection } from "./libs/components/popular-section/popular-section.js";
import styles from "./styles.module.css";

const Landing = (): React.JSX.Element => {
	return (
		<main className={styles["landing"]}>
			<Header user={null} />
			<HeroSection />
			<PopularSection />
		</main>
	);
};

export { Landing };
