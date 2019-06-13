// External dependencies
import backstop from 'backstopjs';
import log from 'fancy-log';
import colors from 'ansi-colors';

// Local dependencies
import throwError from './throwError';
import backstopConfig from './backstopConfig';
import sitesToTest from './sitesToTest';

export default function (siteToTest) {

    // Ensure the selected site exists in the config
    const siteExists = Object.prototype.hasOwnProperty.call(sitesToTest, siteToTest);

    // Throw an error if it doesn't
    if (!siteExists) {
        throwError(colors.red(`${colors.bold(siteToTest)} is not a valid site. Check the name you entered against the ${colors.grey('sitesToTest.js')} config file`));
    }

    // Stash the current site
    const site = sitesToTest[siteToTest];
    
    // Stash the site label
    const boldLabel = `${colors.bold(`${site.label}`)}`;

    // Let the user know we are starting the tests
    log(colors.bgYellow(`Running visual regression tests on ${boldLabel}...\n`));

    // Generate site specific configuration.
    const currentConfig = backstopConfig(site.nonProductionBaseUrl, site.productionBaseUrl, site.pathsToTest, site.name);

    // Disable logging since BackstopJS is noisy
    // console.log = function () {};

    backstop('reference', {
        config: currentConfig
    }).then(() => {
        backstop('test', {
            config: currentConfig
        }).then(() => {
            log(colors.bgGreen(`Backstop JS tests passed for ${site.label}!`));
        }).catch(() => {
            log(colors.bgRed(colors.white(`Backstop JS tests failed for ${site.label}!`)));
        });
    }).catch(() => {
        log(colors.bgRed(colors.white(`Backstop JS tests failed for ${site.label}!`)));
    });
}