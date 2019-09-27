exports.throwError = function throwError(message) {
    console.error(message);
    process.exit(0);
};

exports.untrailingSlashIt = function untrailingSlashIt(str) {
    return str.replace(/\/$/, '');
};

exports.trailingSlashIt = function trailingSlashIt(str) {
    return str.replace(/\/$/, '') + '/';
};

exports.unleadingSlashIt = function unleadingSlashIt(str) {
    return str.replace(/^\//, '');
};

exports.leadingSlashIt = function leadingSlashIt(str) {
    return '/' + str.replace(/^\//, '');
};