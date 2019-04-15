"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sitesToTest = _interopRequireDefault(require("./sitesToTest"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _ansiColors = _interopRequireDefault(require("ansi-colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Local dependencies
// External dependencies
const {
  execSync
} = require('child_process');

function _default() {
  const siteCount = Object.keys(_sitesToTest.default).length;
  let i = 1;

  for (var site in _sitesToTest.default) {
    (0, _fancyLog.default)(_ansiColors.default.yellow(`Testing site ${i} of ${siteCount}...`)); // https://nodejs.org/docs/latest/api/child_process.html#child_process_child_process_execsync_command_options

    execSync(`node dist/index.js --site=${site}`, {
      stdio: [0, 1, 2]
    });
    i++;
  }

  (0, _fancyLog.default)(_ansiColors.default.green(`Done testing ${siteCount} sites!`));
}