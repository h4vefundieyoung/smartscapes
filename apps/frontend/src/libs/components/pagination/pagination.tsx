import { type JSX } from "react";

import { Button, NumberInput } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	page: number;
	totalItems: number;
	totalPages: number;
};

const buttonActions = ["«", "‹", "›", "»"];

const Pagination = ({
	page,
	totalItems,
	totalPages,
}: Properties): JSX.Element => {
	return (
		<div className={styles["pagination"]}>
			<span>{totalItems} items total</span>
			<div className={styles["controls"]}>
				<div className={styles["page-size"]}>
					<span>Rows per page:</span>
					<NumberInput initialValue={10} max={20} min={1} />
				</div>
				<span className={styles["page-status"]}>
					Page {page} of {totalPages}
				</span>
				<div className={styles["buttons"]}>
					{buttonActions.map((action) => (
						<Button key={action} label={action} type="button" />
					))}
				</div>
			</div>
		</div>
	);
};

export { Pagination };
