import styles from "./styles.module.css";

type Properties = {
	subtitle: string;
	title: string;
};

const PageHeading = ({ subtitle, title }: Properties): React.JSX.Element => {
	return (
		<div className={styles["heading"]}>
			<h1 className={styles["title"]}>{title}</h1>
			<p className={styles["subtitle"]}>{subtitle}</p>
		</div>
	);
};

export { PageHeading };
