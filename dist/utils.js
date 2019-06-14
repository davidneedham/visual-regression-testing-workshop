"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throwError = throwError;
exports.untrailingSlashIt = untrailingSlashIt;
exports.trailingSlashIt = trailingSlashIt;

function throwError(message) {
  console.error(message);
  process.exit(0);
}

function untrailingSlashIt(str) {
  return str.replace(/\/$/, '');
}

function trailingSlashIt(str) {
  return str.replace(/\/$/, '') + '/';
}