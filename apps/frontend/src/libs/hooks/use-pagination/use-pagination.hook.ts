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
	handleGoToEnd: () => void;
	handleGoToNext: () => void;
	handleGoToPrevious: () => void;
	handleGoToStart: () => void;
	handlePageSizeChange: (newPageSize: number) => void;
	onPageChange: (newPage: number) => void;
	page: number;
	pageSize: number;
};

const usePagination = ({
	meta,
	queryParameterPrefix,
}: UsePaginationArguments): UsePaginationResult => {
	const [searchParameters, setSearchParameters] = useSearchParams();

	const pageParameterName = `${queryParameterPrefix}-page`;
	const pageSizeParameterName = `${queryParameterPrefix}-page-size`;

	const {
		currentPage = FIRST_PAGE,
		itemsPerPage = DEFAULT_PAGE_SIZE,
		totalPages = FIRST_PAGE,
	} = meta ?? {};

	const [pageSize, setPageSize] = useState<number>(
		() => Number(searchParameters.get(pageSizeParameterName)) || itemsPerPage,
	);

	const [page, setPage] = useState<number>(
		() => Number(searchParameters.get(pageParameterName)) || currentPage,
	);

	useEffect(() => {
		const updatedSearchParameters = new URLSearchParams(searchParameters);
		updatedSearchParameters.set(pageParameterName, String(page));
		updatedSearchParameters.set(pageSizeParameterName, String(pageSize));
		setSearchParameters(updatedSearchParameters);
	}, [
		page,
		pageSize,
		setSearchParameters,
		pageParameterName,
		pageSizeParameterName,
		searchParameters,
	]);

	const onPageChange = useCallback(
		(newPage: number) => {
			const validPage = Math.max(FIRST_PAGE, Math.min(newPage, totalPages));
			setPage(validPage);
		},
		[totalPages],
	);

	const handlePageSizeChange = useCallback((newPageSize: number) => {
		setPageSize(newPageSize);
		setPage(FIRST_PAGE);
	}, []);

	const handleGoToStart = useCallback(() => {
		setPage(FIRST_PAGE);
	}, []);

	const handleGoToEnd = useCallback(() => {
		setPage(totalPages);
	}, [totalPages]);

	const handleGoToNext = useCallback(() => {
		setPage((previous) => Math.min(previous + OFFSET, totalPages));
	}, [totalPages]);

	const handleGoToPrevious = useCallback(() => {
		setPage((previous) => Math.max(previous - OFFSET, FIRST_PAGE));
	}, []);

	return {
		handleGoToEnd,
		handleGoToNext,
		handleGoToPrevious,
		handleGoToStart,
		handlePageSizeChange,
		onPageChange,
		page,
		pageSize,
	};
};

export { usePagination };
