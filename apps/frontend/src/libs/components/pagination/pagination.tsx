import { NumberInput } from "~/libs/components/components.js";
import { useCallback, type usePagination } from "~/libs/hooks/hooks.js";

import { NavigationButton } from "./libs/components/components.js";
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
}: Properties): React.JSX.Element => {
	const {
		goToEnd,
		goToNext,
		goToPrevious,
		goToStart,
		onPageSizeChange,
		pageSize,
	} = paginationSettings;

	const handlePageSizeChange = useCallback(
		(value: number) => {
			onPageSizeChange(value);
		},
		[onPageSizeChange],
	);

	const range = {
		max: totalItems,
		min: 1,
	};

	return (
		<div className={styles["pagination"]}>
			<span>{totalItems} items total</span>
			<div className={styles["controls"]}>
				<div className={styles["page-size"]}>
					<span>Rows per page:</span>
					<NumberInput
						onChange={handlePageSizeChange}
						range={range}
						value={pageSize}
					/>
				</div>
				<span className={styles["page-status"]}>
					Page {paginationSettings.page} of {totalPages}
				</span>
				<div className={styles["navigation-buttons-container"]}>
					<NavigationButton label="«" onClick={goToStart} />
					<NavigationButton label="‹" onClick={goToPrevious} />
					<NavigationButton label="›" onClick={goToNext} />
					<NavigationButton label="»" onClick={goToEnd} />
				</div>
			</div>
		</div>
	);
};

export { Pagination };
