#!/usr/bin/env node

// External dependencies
import commander from 'commander';
import inquirer from 'inquirer';
import colors from 'ansi-colors';

// Local dependencies
import visualRegressionTestSite from './visualRegressionTestSite';
import sitesToTest from './sitesToTest';
import {throwError} from './utils';

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
    .option('-s, --site [siteName]', 'specifiy a site to be tested');

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