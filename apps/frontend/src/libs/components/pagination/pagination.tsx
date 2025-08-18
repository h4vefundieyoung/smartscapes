import { type JSX } from "react";

import { Button, NumberInput } from "~/libs/components/components.js";
import { useCallback, type usePagination } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	paginationSettings: ReturnType<typeof usePagination>;
	totalItems: number;
	totalPages: number;
};

const Pagination = ({
	paginationSettings,
	totalItems,
	totalPages,
}: Properties): JSX.Element => {
	const handleNextClick = useCallback(() => {
		paginationSettings.goToNext();
	}, [paginationSettings]);

	const handleEndClick = useCallback(() => {
		paginationSettings.goToEnd();
	}, [paginationSettings]);

	const handlePageSizeChange = useCallback(
		(value: number) => {
			paginationSettings.onPageSizeChange(value);
		},
		[paginationSettings],
	);

	return (
		<div className={styles["pagination"]}>
			<span>{totalItems} items total</span>
			<div className={styles["controls"]}>
				<div className={styles["page-size"]}>
					<span>Rows per page:</span>
					<NumberInput
						max={totalItems}
						min={1}
						onChange={handlePageSizeChange}
						value={paginationSettings.pageSize}
					/>
				</div>
				<span className={styles["page-status"]}>
					Page {paginationSettings.page} of {totalPages}
				</span>
				<div className={styles["buttons"]}>
					<Button
						label="«"
						onClick={paginationSettings.goToStart}
						type="button"
					/>
					<Button
						label="‹"
						onClick={paginationSettings.goToPrevious}
						type="button"
					/>
					<Button label="›" onClick={handleNextClick} type="button" />
					<Button label="»" onClick={handleEndClick} type="button" />
				</div>
			</div>
		</div>
	);
};

export { Pagination };
