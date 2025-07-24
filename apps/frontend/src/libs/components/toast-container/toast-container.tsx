import { ToastContainer as LibraryToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.module.css";

const ToastContainer = (): React.JSX.Element => {
	return (
		<LibraryToastContainer
			autoClose={5000}
			closeOnClick
			draggable
			hideProgressBar={false}
			limit={3}
			newestOnTop={false}
			pauseOnFocusLoss
			pauseOnHover
			position="top-right"
			rtl={false}
			theme="light"
		/>
	);
};

export { ToastContainer };
