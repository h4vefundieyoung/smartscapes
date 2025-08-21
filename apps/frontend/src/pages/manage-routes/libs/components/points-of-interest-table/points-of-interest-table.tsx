import { Button, CreatePOIModal, Table } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { getFormattedDate } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useMemo,
	usePagination,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	actions,
	type PointsOfInterestRequestDto,
} from "~/modules/points-of-interest/points-of-interest.js";

import { useTableColumns } from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const DEFAULT_TOTAL_PAGES = 1;

const PointsOfInterestTable = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const [isCreatePOIOpen, setIsCreatePOIOpen] = useState<boolean>(false);

	const createStatus = useAppSelector(
		(state) => state.pointsOfInterest.createStatus,
	);
	const handleModalToggle = useCallback(() => {
		setIsCreatePOIOpen((previous) => !previous);
	}, []);

	const handleSubmit = useCallback(
		(payload: PointsOfInterestRequestDto): void => {
			void dispatch(actions.create(payload));
		},
		[dispatch],
	);
	useEffect(() => {
		if (createStatus === DataStatus.FULFILLED) {
			setIsCreatePOIOpen(false);
		}
	}, [createStatus]);
	const { dataStatus, meta, summary } = useAppSelector(
		({ pointsOfInterest }) => pointsOfInterest,
	);

	const formattedSummary = useMemo(() => {
		return summary
			.toSorted(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			)
			.map((item) => ({
				...item,
				createdAt: getFormattedDate(new Date(item.createdAt), "dd MMM yyyy"),
			}));
	}, [summary]);

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
			<div className={styles["header"]}>
				<h2 className={styles["title"]}>Points of interest</h2>
				<div>
					<Button
						label="Create POI"
						onClick={handleModalToggle}
						type="button"
					/>
				</div>
			</div>
			<CreatePOIModal
				isOpen={isCreatePOIOpen}
				onClose={handleModalToggle}
				onSubmit={handleSubmit}
			/>
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
