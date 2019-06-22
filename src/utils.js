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

export function unleadingSlashIt(str) {
    return str.replace(/^\//, '');
}

export function leadingSlashIt(str) {
    return '/' + str.replace(/^\//, '');
}