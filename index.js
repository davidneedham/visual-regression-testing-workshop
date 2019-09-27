#!/usr/bin/env node

// External dependencies
const commander = require('commander');
const inquirer = require('inquirer');
const colors = require('ansi-colors');

// Local dependencies
const visualRegressionTestSite = require('./inc/visualRegressionTestSite');
const sitesToTest = require('./inc/sitesToTest');
const throwError = require('./inc/utils').throwError;

// Get the site names
const siteNames = Object.keys(sitesToTest);

// Throw an error if there are not sites defined
if (siteNames.length === 0) {
    throwError(
        colors.red(
            `There are no sites defined in the ${colors.grey('sitesToTest.js')} config file`
        )
    );
}

// Start a new program
const program = new commander.Command();

// Set the program version
program.version('1.0.0');

// Allow site name to be passed as an option
program
    .option('-s, --site [siteName]', 'specify a site to be tested');

// Process the arguments
program.parse(process.argv);

// If a site was specified, use it
if (program.site) {
    visualRegressionTestSite(program.site);
} else {
    // Build the site choices
    let siteChoices = [];

    for (let [key, value] of Object.entries(sitesToTest)) {
        siteChoices.push({
            name: value.label,
            value: key
        });
    }

    // Ask which site should be used
    inquirer
        .prompt([{
            type: 'list',
            name: 'site',
            message: 'Which site do you want to test?',
            choices: siteChoices
        }])
        .then(answers => {
            if (Object.prototype.hasOwnProperty.call(answers, 'site')) {
                visualRegressionTestSite(answers.site);
            }
        });
}
