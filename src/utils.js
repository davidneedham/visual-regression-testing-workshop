export function throwError(message) {
    console.error(message);
    process.exit(0);
}

export function untrailingSlashIt(str) {
    return str.replace(/\/$/, '');
}

export function trailingSlashIt(str) {
    return str.replace(/\/$/, '') + '/';
}