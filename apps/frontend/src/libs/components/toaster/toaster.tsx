import { ToastContainer as ReactToastifyContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.module.css";
import { TOAST_CONTAINER_CONFIG } from "./toaster.config.js";

const ToastContainer: React.FC = () => {
	return <ReactToastifyContainer {...TOAST_CONTAINER_CONFIG} />;
};

export { ToastContainer };
