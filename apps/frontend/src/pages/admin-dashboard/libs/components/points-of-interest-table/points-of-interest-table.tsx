import { Table } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	usePagination,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/points-of-interest/points-of-interest.js";

import { useColumn } from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const DEFAULT_TOTAL_PAGES = 1;

const PointsOfInterestTable = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const { dataStatus, meta, summary } = useAppSelector(
		({ pointsOfInterest }) => pointsOfInterest,
	);
	const columns = useColumn();

	const paginationPOIS = usePagination({
		meta,
		queryParameterPrefix: "poi",
	});

	const { total = 0, totalPages = DEFAULT_TOTAL_PAGES } = meta ?? {};

	useEffect(() => {
		void dispatch(
			actions.findPaginated({
				page: String(paginationPOIS.page),
				perPage: String(paginationPOIS.pageSize),
			}),
		);
	}, [dispatch, paginationPOIS.page, paginationPOIS.pageSize]);

	return (
		<section>
			<h2 className={styles["title"]}>Points of interest</h2>
			<Table
				columns={columns}
				data={summary}
				loading={dataStatus === DataStatus.PENDING}
				paginationSettings={paginationPOIS}
				totalItems={total}
				totalPages={totalPages}
			/>
		</section>
	);
};

export { PointsOfInterestTable };
