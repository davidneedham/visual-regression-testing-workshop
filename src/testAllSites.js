// Local dependencies
import sitesToTest from './sitesToTest';

// External dependencies
const {execSync} = require('child_process');
import log from 'fancy-log';
import colors from 'ansi-colors';

export default function () {
    const siteCount = Object.keys(sitesToTest).length;
    let i = 1;
    for (var site in sitesToTest) {
        log(colors.yellow(`Testing site ${i} of ${siteCount}...`));
        // https://nodejs.org/docs/latest/api/child_process.html#child_process_child_process_execsync_command_options
        execSync(`node dist/index.js --site=${site}`, {stdio: [0, 1, 2]});
        i++;
    }

    log(colors.green(`Done testing ${siteCount} sites!`));
    
}