import Logger from "../util/Logger.js";

import ActionTest from "./Action.test.js";
import InitialStateTest from "./InitialState.test.js";
import ReducerTest from "./Reducer.test.js";

window.LOGGER = new Logger();
// LOGGER.setTraceEnabled(false);
// LOGGER.setDebugEnabled(false);
// LOGGER.setInfoEnabled(false);

QUnit.start();