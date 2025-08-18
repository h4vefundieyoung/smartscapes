import { Table } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useMemo,
	usePagination,
} from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/points-of-interest/points-of-interest.js";
import { createColumns } from "~/pages/admin-dashboard/libs/helpers/helpers.js";

const DEFAULT_TOTAL_ITEMS = 0;
const DEFAULT_TOTAL_PAGES = 1;

const PointsOfInterestTable = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { dataStatus, meta, summary } = useAppSelector(
		({ pointsOfInterest }) => pointsOfInterest,
	);

	const handleEdit = useCallback((id: number) => {
		return id;
	}, []);

	const handleDelete = useCallback((id: number) => {
		return id;
	}, []);

	const columns = useMemo(() => {
		return createColumns(handleEdit, handleDelete);
	}, [handleEdit, handleDelete]);

	const paginationPOIS = usePagination({
		meta,
		queryParameterPrefix: "poi",
	});

	useEffect(() => {
		void dispatch(
			actions.findPaginated({
				page: String(paginationPOIS.page),
				perPage: String(paginationPOIS.pageSize),
			}),
		);
	}, [dispatch, paginationPOIS.page, paginationPOIS.pageSize]);

	return (
		<Table
			columns={columns}
			data={summary}
			loading={dataStatus === DataStatus.PENDING}
			paginationSettings={paginationPOIS}
			title="Points of interest"
			totalItems={meta?.total ?? DEFAULT_TOTAL_ITEMS}
			totalPages={meta?.totalPages ?? DEFAULT_TOTAL_PAGES}
		/>
	);
};

export { PointsOfInterestTable };
