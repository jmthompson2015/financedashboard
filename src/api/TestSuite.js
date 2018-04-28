import Logger from "../util/Logger.js";

import KeyStatisticsTest from "./KeyStatistics.test.js";
import PerformanceTest from "./Performance.test.js";

window.LOGGER = new Logger();
// LOGGER.setTraceEnabled(false);
// LOGGER.setDebugEnabled(false);
// LOGGER.setInfoEnabled(false);

QUnit.start();