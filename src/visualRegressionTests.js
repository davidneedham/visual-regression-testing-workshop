// Local dependencies
import throwError from './throwError';
import sitesToTest from './sitesToTest';
import testAllSites from './testAllSites';
import visualRegressionTestSite from './visualRegressionTestSite';

// External dependencies
import readline from 'readline';
import minimist from 'minimist';
import colors from 'ansi-colors';

export default function () {
    const args = minimist(process.argv.slice(2), {});
    const sitesToTestKeys = Object.keys(sitesToTest);
    if (sitesToTestKeys.length === 1) {
        visualRegressionTestSite(sitesToTestKeys[0]);
    } else if (Object.prototype.hasOwnProperty.call(args, 'site')) {
        visualRegressionTestSite(args.site);
    } else {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log("\nAvailable sites:\n");
        let siteNumMap = [];

        for (const site in sitesToTest) {
            siteNumMap.push(site);
        }

        for (let [key, site] of siteNumMap.entries()) {
            console.log(`[${colors.bold(key)}]: ${site}`);
        }

        rl.question(`\nEnter the ${colors.bold('number')} of the site you want to test or enter ${colors.bold('all')} to test all sites: `, (userSite) => {
            if ('all' === userSite) {
                testAllSites();
            } else if (siteNumMap.includes(userSite)) {
                visualRegressionTestSite(userSite);
            } else if (Array.from(siteNumMap.keys()).includes(parseInt(userSite))) {
                visualRegressionTestSite(siteNumMap[userSite]);
            } else {
                throwError(colors.red(`${colors.gray(userSite)} is not a valid site. Check the name you entered against the ${colors.gray('sitesToTest.js')} config file`));
            }
            rl.close();
        });

    }

}