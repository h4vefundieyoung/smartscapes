import {
	useCallback,
	useEffect,
	useSearchParams,
	useState,
} from "~/libs/hooks/hooks.js";
import { type PaginationMeta } from "~/libs/types/types.js";

const FIRST_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const OFFSET = 1;

type UsePaginationArguments = {
	meta: null | PaginationMeta;
	queryParameterPrefix: string;
};

type UsePaginationResult = {
	goToEnd: () => void;
	goToNext: () => void;
	goToPrevious: () => void;
	goToStart: () => void;
	onPageChange: (newPage: number) => void;
	onPageSizeChange: (newPageSize: number) => void;
	page: number;
	pageSize: number;
};

const usePagination = ({
	meta,
	queryParameterPrefix,
}: UsePaginationArguments): UsePaginationResult => {
	const [searchParameters, setSearchParameters] = useSearchParams();

	const pageParameterName = `${queryParameterPrefix}Page`;
	const pageSizeParameterName = `${queryParameterPrefix}PageSize`;

	const [pageSize, setPageSize] = useState<number>(
		() =>
			Number(searchParameters.get(pageSizeParameterName)) ||
			meta?.itemsPerPage ||
			DEFAULT_PAGE_SIZE,
	);

	const [page, setPage] = useState<number>(
		() =>
			Number(searchParameters.get(pageParameterName)) ||
			meta?.currentPage ||
			FIRST_PAGE,
	);

	useEffect(() => {
		const updatedSearchParameters = new URLSearchParams(searchParameters);
		updatedSearchParameters.set(pageParameterName, String(page));
		updatedSearchParameters.set(pageSizeParameterName, String(pageSize));
		setSearchParameters(updatedSearchParameters);
	}, [page, pageSize, setSearchParameters]);

	const totalPages = meta?.totalPages ?? FIRST_PAGE;

	const onPageChange = useCallback(
		(newPage: number) => {
			const validPage = Math.max(FIRST_PAGE, Math.min(newPage, totalPages));
			setPage(validPage);
		},
		[totalPages],
	);

	const onPageSizeChange = useCallback((newPageSize: number) => {
		setPageSize(newPageSize);
		setPage(FIRST_PAGE);
	}, []);

	const goToStart = useCallback(() => {
		setPage(FIRST_PAGE);
	}, []);
	const goToEnd = useCallback(() => {
		setPage(totalPages);
	}, [totalPages]);
	const goToNext = useCallback(() => {
		setPage((previous) => Math.min(previous + OFFSET, totalPages));
	}, [totalPages]);
	const goToPrevious = useCallback(() => {
		setPage((previous) => Math.max(previous - OFFSET, FIRST_PAGE));
	}, []);

	useEffect(() => {
		if (meta) {
			setPage(meta.currentPage);
			setPageSize(meta.itemsPerPage);
		}
	}, [meta]);

	return {
		goToEnd,
		goToNext,
		goToPrevious,
		goToStart,
		onPageChange,
		onPageSizeChange,
		page,
		pageSize,
	};
};

export { usePagination };
