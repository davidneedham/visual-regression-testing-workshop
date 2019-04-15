"use strict";

var _visualRegressionTests = _interopRequireDefault(require("./visualRegressionTests"));

var _testAllSites = _interopRequireDefault(require("./testAllSites"));

var _minimist = _interopRequireDefault(require("minimist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Local dependencies
// External dependencies
const args = (0, _minimist.default)(process.argv.slice(2), {}); // https://nodejs.org/api/process.html#process_process_platform
// const isWindows = process.platform === "win32";

if (Object.prototype.hasOwnProperty.call(args, 'all')) {
  (0, _testAllSites.default)();
} else {
  (0, _visualRegressionTests.default)();
}