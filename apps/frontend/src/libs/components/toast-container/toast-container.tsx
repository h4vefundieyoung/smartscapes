import { ToastContainer as LibraryToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.module.css";

const TOAST_AUTO_CLOSE_MS = 3000;
const TOAST_LIMIT = 3;

const ToastContainer = (): React.JSX.Element => {
	return (
		<LibraryToastContainer
			autoClose={TOAST_AUTO_CLOSE_MS}
			closeOnClick
			draggable
			hideProgressBar={false}
			limit={TOAST_LIMIT}
			newestOnTop={false}
			pauseOnFocusLoss
			pauseOnHover
			position="top-right"
			rtl={false}
			theme="light"
			transition={Slide}
		/>
	);
};

export { ToastContainer };
