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
	type PointsOfInterestCreateRequestDto,
} from "~/modules/points-of-interest/points-of-interest.js";

import { useTableColumns } from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const DEFAULT_TOTAL_PAGES = 1;

const PointsOfInterestTable = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const [isCreatePOIModalOpen, setIsCreatePOIModalOpen] =
		useState<boolean>(false);

	const pointsOfInterest = useAppSelector(
		({ pointsOfInterest }) => pointsOfInterest.data,
	);
	const pointsOfInterestMeta = useAppSelector(
		({ pointsOfInterest }) => pointsOfInterest.meta,
	);
	const pointsOfInterestStatus = useAppSelector(
		({ pointsOfInterest }) => pointsOfInterest.dataStatus,
	);
	const createPointsOfInterestStatus = useAppSelector(
		({ pointsOfInterest }) => pointsOfInterest.createStatus,
	);

	const handleModalToggle = useCallback(() => {
		setIsCreatePOIModalOpen((previous) => !previous);
	}, []);

	const handleSubmit = useCallback(
		(payload: PointsOfInterestCreateRequestDto): void => {
			void dispatch(actions.create(payload));
		},
		[dispatch],
	);

	const formattedPointsOfInterest = useMemo(() => {
		return pointsOfInterest.map((item) => ({
			...item,
			createdAt: getFormattedDate(new Date(item.createdAt), "dd MMM yyyy"),
		}));
	}, [pointsOfInterest]);

	const columns = useTableColumns();

	const paginationPOIS = usePagination({
		meta: pointsOfInterestMeta,
		queryParameterPrefix: "poi",
	});

	const { page, pageSize } = paginationPOIS;

	const { total = 0, totalPages = DEFAULT_TOTAL_PAGES } =
		pointsOfInterestMeta ?? {};

	useEffect(() => {
		void dispatch(
			actions.findAll({
				page,
				perPage: pageSize,
			}),
		);
	}, [dispatch, page, pageSize]);

	useEffect(() => {
		if (createPointsOfInterestStatus === DataStatus.FULFILLED) {
			setIsCreatePOIModalOpen(false);
		}
	}, [createPointsOfInterestStatus]);

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
				isOpen={isCreatePOIModalOpen}
				onClose={handleModalToggle}
				onSubmit={handleSubmit}
			/>
			<Table
				columns={columns}
				data={formattedPointsOfInterest}
				isLoading={pointsOfInterestStatus === DataStatus.PENDING}
				paginationSettings={paginationPOIS}
				totalItems={total}
				totalPages={totalPages}
			/>
		</section>
	);
};

export { PointsOfInterestTable };
