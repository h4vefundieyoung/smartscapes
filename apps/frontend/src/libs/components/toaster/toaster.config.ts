import { type ToastContainerProps } from "react-toastify";

const TOAST_CONTAINER_CONFIG: ToastContainerProps = {
	autoClose: 5000,
	closeOnClick: true,
	draggable: true,
	hideProgressBar: false,
	limit: 3,
	newestOnTop: false,
	pauseOnFocusLoss: true,
	pauseOnHover: true,
	position: "top-right",
	rtl: false,
	theme: "dark",
} as const;

export { TOAST_CONTAINER_CONFIG };
