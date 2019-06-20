#!/usr/bin/env node
// External dependencies
"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _ansiColors = _interopRequireDefault(require("ansi-colors"));

var _visualRegressionTestSite = _interopRequireDefault(require("./visualRegressionTestSite"));

var _sitesToTest = _interopRequireDefault(require("./sitesToTest"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Local dependencies
// Get the site names
const siteNames = Object.keys(_sitesToTest.default); // Throw an error if there are not sites defined

if (siteNames.length === 0) {
  (0, _utils.throwError)(_ansiColors.default.red(`There are no sites defined in the ${_ansiColors.default.grey('sitesToTest.js')} config file`));
} // Start a new program


const program = new _commander.default.Command(); // Set the program version

program.version('1.0.0'); // Allow site name to be passed as an option

program.option('-s, --site [siteName]', 'specifiy a site to be tested'); // Process the arguments

program.parse(process.argv); // If a site was specified, use it

if (program.site) {
  (0, _visualRegressionTestSite.default)(program.site);
} else {
  // Build the site choices
  let siteChoices = [];

  for (let [key, value] of Object.entries(_sitesToTest.default)) {
    siteChoices.push({
      name: value.label,
      value: key
    });
  } // Ask which site should be used


  _inquirer.default.prompt([{
    type: 'list',
    name: 'site',
    message: 'Which site do you want to test?',
    choices: siteChoices
  }]).then(answers => {
    if (Object.prototype.hasOwnProperty.call(answers, 'site')) {
      (0, _visualRegressionTestSite.default)(answers.site);
    }
  });
}