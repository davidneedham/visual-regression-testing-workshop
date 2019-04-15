"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _throwError = _interopRequireDefault(require("./throwError"));

var _backstopConfig = _interopRequireDefault(require("./backstopConfig"));

var _sitesToTest = _interopRequireDefault(require("./sitesToTest"));

var _path = _interopRequireDefault(require("path"));

var _backstopjs = _interopRequireDefault(require("backstopjs"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _ansiColors = _interopRequireDefault(require("ansi-colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Local dependencies
// External dependencies
function _default(siteToTest) {
  const siteExists = Object.prototype.hasOwnProperty.call(_sitesToTest.default, siteToTest);

  let rootDir = _path.default.dirname(require.main.filename);

  if (rootDir.endsWith('dist')) {
    rootDir = rootDir.substring(0, rootDir.indexOf('/dist'));
  }

  if (!siteExists) {
    (0, _throwError.default)(_ansiColors.default.red(`${_ansiColors.default.gray(siteToTest)} is not a valid site. Check the name you entered against the ${_ansiColors.default.gray('sitesToTest.js')} config file`));
  }

  _sitesToTest.default[siteToTest].name = siteToTest;
  const site = _sitesToTest.default[siteToTest];
  (0, _fancyLog.default)(_ansiColors.default.yellow(`Testing: ${site.label}`));
  (0, _fancyLog.default)(`Generating configuration for ${site.label}`);
  const currentConfig = (0, _backstopConfig.default)(site.nonProductionBaseUrl, site.productionBaseUrl, site.pathsToTest, site.name);
  (0, _fancyLog.default)(`Running Backstop tests for ${site.label}`);
  (0, _backstopjs.default)('reference', {
    config: currentConfig
  }).then(() => {
    (0, _fancyLog.default)(`Backstop JS reference complete for ${site.label}! Starting tests.`);
    (0, _backstopjs.default)('test', {
      config: currentConfig
    }).then(() => {
      (0, _fancyLog.default)(_ansiColors.default.yellow(`Report saved to ${_ansiColors.default.gray(`${rootDir}/backstop_data/${site.name}/html_report/index.html`)}`));
      (0, _fancyLog.default)(_ansiColors.default.green(`Backstop JS tests passed for ${site.label}!`));
    }).catch(() => {
      (0, _fancyLog.default)(`Report saved to "${rootDir}/backstop_data/${site.name}/html_report/index.html"`);
      (0, _throwError.default)(_ansiColors.default.red(`Backstop JS tests failed for ${_ansiColors.default.gray(site.label)}!`));
    });
  }).catch(() => {
    (0, _throwError.default)(_ansiColors.default.red(`Backstop JS reference failed for ${_ansiColors.default.gray(site.label)}! Please check the BackstopReferenceBaseUrl`));
  });
}