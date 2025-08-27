import { Tag } from "../../../../../libs/components/tag/tag.js";
import styles from "./styles.module.css";

type Properties = {
	labels: string[];
};

const TagsContainer = ({ labels }: Properties): React.JSX.Element => (
	<div className={styles["tags-container"]}>
		{labels.map((label, index) => (
			<Tag key={index} label={label} />
		))}
	</div>
);

export { TagsContainer };
