"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _backstopjs = _interopRequireDefault(require("backstopjs"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _ansiColors = _interopRequireDefault(require("ansi-colors"));

var _utils = require("./utils");

var _backstopConfig = _interopRequireDefault(require("./backstopConfig"));

var _sitesToTest = _interopRequireDefault(require("./sitesToTest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// External dependencies
// Local dependencies
function _default(siteToTest) {
  // Ensure the selected site exists in the config
  const siteExists = Object.prototype.hasOwnProperty.call(_sitesToTest.default, siteToTest); // Throw an error if it doesn't

  if (!siteExists) {
    (0, _utils.throwError)(_ansiColors.default.red(`${_ansiColors.default.bold(siteToTest)} is not a valid site. Check the name you entered against the ${_ansiColors.default.grey('sitesToTest.js')} config file`));
  }

  const site = _sitesToTest.default[siteToTest]; // Stash the site label

  const boldLabel = `${_ansiColors.default.bold(`${site.label}`)}`; // Let the user know we are starting the tests

  (0, _fancyLog.default)(_ansiColors.default.bgYellow(`Running visual regression tests on ${boldLabel}...\n`)); // Generate site specific configuration.

  const currentConfig = (0, _backstopConfig.default)(site.nonProductionBaseUrl, site.productionBaseUrl, site.pathsToTest, site.name); // Disable logging since BackstopJS is noisy
  // console.log = function () {};

  (0, _backstopjs.default)('reference', {
    config: currentConfig
  }).then(() => {
    (0, _backstopjs.default)('test', {
      config: currentConfig
    }).then(() => {
      (0, _fancyLog.default)(_ansiColors.default.bgGreen(`Backstop JS tests passed for ${site.label}!`));
    }).catch(() => {
      (0, _fancyLog.default)(_ansiColors.default.bgRed(_ansiColors.default.white(`Backstop JS tests failed for ${site.label}!`)));
    });
  }).catch(() => {
    (0, _fancyLog.default)(_ansiColors.default.bgRed(_ansiColors.default.white(`Backstop JS tests failed for ${site.label}!`)));
  });
}