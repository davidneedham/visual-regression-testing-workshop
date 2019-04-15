"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _throwError = _interopRequireDefault(require("./throwError"));

var _sitesToTest = _interopRequireDefault(require("./sitesToTest"));

var _testAllSites = _interopRequireDefault(require("./testAllSites"));

var _visualRegressionTestSite = _interopRequireDefault(require("./visualRegressionTestSite"));

var _readline = _interopRequireDefault(require("readline"));

var _minimist = _interopRequireDefault(require("minimist"));

var _ansiColors = _interopRequireDefault(require("ansi-colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Local dependencies
// External dependencies
function _default() {
  const args = (0, _minimist.default)(process.argv.slice(2), {});
  const sitesToTestKeys = Object.keys(_sitesToTest.default);

  if (sitesToTestKeys.length === 1) {
    (0, _visualRegressionTestSite.default)(sitesToTestKeys[0]);
  } else if (Object.prototype.hasOwnProperty.call(args, 'site')) {
    (0, _visualRegressionTestSite.default)(args.site);
  } else {
    const rl = _readline.default.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log("\nAvailable sites:\n");
    let siteNumMap = [];

    for (const site in _sitesToTest.default) {
      siteNumMap.push(site);
    }

    for (let [key, site] of siteNumMap.entries()) {
      console.log(`[${_ansiColors.default.bold(key)}]: ${site}`);
    }

    rl.question(`\nEnter the ${_ansiColors.default.bold('number')} of the site you want to test or enter ${_ansiColors.default.bold('all')} to test all sites: `, userSite => {
      if ('all' === userSite) {
        (0, _testAllSites.default)();
      } else if (siteNumMap.includes(userSite)) {
        (0, _visualRegressionTestSite.default)(userSite);
      } else if (Array.from(siteNumMap.keys()).includes(parseInt(userSite))) {
        (0, _visualRegressionTestSite.default)(siteNumMap[userSite]);
      } else {
        (0, _throwError.default)(_ansiColors.default.red(`${_ansiColors.default.gray(userSite)} is not a valid site. Check the name you entered against the ${_ansiColors.default.gray('sitesToTest.js')} config file`));
      }

      rl.close();
    });
  }
}