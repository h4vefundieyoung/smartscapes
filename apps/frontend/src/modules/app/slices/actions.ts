import { createAction } from "@reduxjs/toolkit";

import { name as sliceName } from "./app.slice.js";

const initialize = createAction(`${sliceName}/initialize`);

export { initialize };
