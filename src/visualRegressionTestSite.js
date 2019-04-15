// Local dependencies
import throwError from './throwError';
import backstopConfig from './backstopConfig';
import sitesToTest from './sitesToTest';

// External dependencies
import path from 'path';
import backstop from 'backstopjs';
import log from 'fancy-log';
import colors from 'ansi-colors';

export default function (siteToTest) {
    const siteExists = Object.prototype.hasOwnProperty.call(sitesToTest, siteToTest);
    let rootDir = path.dirname(require.main.filename);
    if (rootDir.endsWith('dist')) {
        rootDir = rootDir.substring(0, rootDir.indexOf('/dist'));
    }

    if (!siteExists) {
        throwError(colors.red(`${colors.gray(siteToTest)} is not a valid site. Check the name you entered against the ${colors.gray('sitesToTest.js')} config file`));
    }

    sitesToTest[siteToTest].name = siteToTest;
    const site = sitesToTest[siteToTest];

    log(colors.yellow(`Testing: ${site.label}`));

    log(`Generating configuration for ${site.label}`);
    const currentConfig = backstopConfig(site.nonProductionBaseUrl, site.productionBaseUrl, site.pathsToTest, site.name);

    log(`Running Backstop tests for ${site.label}`);
    backstop('reference', {
        config: currentConfig
    }).then(() => {
        log(`Backstop JS reference complete for ${site.label}! Starting tests.`);
        backstop('test', {
            config: currentConfig
        }).then(() => {

            log(colors.yellow(`Report saved to ${colors.gray(`${rootDir}/backstop_data/${site.name}/html_report/index.html`)}`));
            log(colors.green(`Backstop JS tests passed for ${site.label}!`));

        }).catch(() => {

            log(`Report saved to "${rootDir}/backstop_data/${site.name}/html_report/index.html"`);
            throwError(colors.red(`Backstop JS tests failed for ${colors.gray(site.label)}!`));

        });
    }).catch(() => {
        throwError(colors.red(`Backstop JS reference failed for ${colors.gray(site.label)}! Please check the BackstopReferenceBaseUrl`));
    });
}