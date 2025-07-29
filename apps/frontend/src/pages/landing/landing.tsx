import { Header } from "~/libs/components/components.js";

import { HeroSection } from "./libs/components/hero-section/hero-section.jsx";
import styles from "./styles.module.css";

const Landing = (): React.JSX.Element => {
	return (
		<main className={styles["landing"]}>
			<Header user={null} />
			<HeroSection />
		</main>
	);
};

export { Landing };
