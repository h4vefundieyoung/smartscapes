import clsx from "clsx";

import styles from "./styles.module.css";

type Properties = {
	color: "green" | "red";
	label: string;
	onClick?: () => void;
};

const UploadButton = ({
	color,
	label,
	onClick,
}: Properties): React.JSX.Element => {
	const buttonClassName = clsx(styles["button"], styles[color]);

	return (
		<button className={buttonClassName} onClick={onClick}>
			{label}
		</button>
	);
};

export { UploadButton };
