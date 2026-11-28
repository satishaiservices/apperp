"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemporaryPassword = generateTemporaryPassword;
const node_crypto_1 = require("node:crypto");
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
function generateTemporaryPassword(length = 14) {
    let out = '';
    while (!/[A-Za-z]/.test(out) || !/[0-9]/.test(out) || out.length < length) {
        out = Array.from({ length }, () => ALPHABET[(0, node_crypto_1.randomInt)(ALPHABET.length)]).join('');
    }
    return out;
}
//# sourceMappingURL=temporary-password.util.js.map