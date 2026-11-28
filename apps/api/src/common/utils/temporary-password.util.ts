import { randomInt } from 'node:crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

/** Cryptographically random temporary password (letters + digits, no look-alikes). */
export function generateTemporaryPassword(length = 14): string {
  let out = '';
  while (!/[A-Za-z]/.test(out) || !/[0-9]/.test(out) || out.length < length) {
    out = Array.from({ length }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');
  }
  return out;
}
