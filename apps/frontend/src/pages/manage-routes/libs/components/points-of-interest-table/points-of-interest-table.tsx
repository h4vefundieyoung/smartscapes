import { Table } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { getFormattedDate } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	usePagination,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/points-of-interest/points-of-interest.js";

import { useTableColumns } from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const DEFAULT_TOTAL_PAGES = 1;

const PointsOfInterestTable = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const { dataStatus, meta, summary } = useAppSelector(
		({ pointsOfInterest }) => pointsOfInterest,
	);

	const formattedSummary = summary.map((item) => ({
		...item,
		createdAt: getFormattedDate(new Date(item.createdAt), "dd MMM yyyy"),
	}));

	const columns = useTableColumns();

	const paginationPOIS = usePagination({
		meta,
		queryParameterPrefix: "poi",
	});

	const { page, pageSize } = paginationPOIS;

	const { total = 0, totalPages = DEFAULT_TOTAL_PAGES } = meta ?? {};

	useEffect(() => {
		void dispatch(
			actions.findPaginated({
				page,
				perPage: pageSize,
			}),
		);
	}, [dispatch, page, pageSize]);

	return (
		<section className={styles["container"]}>
			<h2 className={styles["title"]}>Points of interest</h2>
			<Table
				columns={columns}
				data={formattedSummary}
				isLoading={dataStatus === DataStatus.PENDING}
				paginationSettings={paginationPOIS}
				totalItems={total}
				totalPages={totalPages}
			/>
		</section>
	);
};

export { PointsOfInterestTable };
