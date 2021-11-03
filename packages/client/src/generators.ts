/** @link [Proof Key for Code Exchange by OAuth Public Clients](https://datatracker.ietf.org/doc/html/rfc7636) */

import { fromUint8Array } from 'js-base64';
import { customAlphabet } from 'nanoid';

import {
  CODE_VERIFIER_ALPHABET,
  CODE_VERIFIER_MAX_LENGTH,
  RANDOM_STRING_MAX_LENGTH,
} from './constants';
import { encodeBase64 } from './utils';

/**
 * @param length The length of the string to generate.
 */
function generateRandomString(length: number) {
  return customAlphabet(CODE_VERIFIER_ALPHABET, length)();
}

/**
 * Generates random bytes and encodes them in url safe base64.
 * @param length The length of the string (before base64url-encoding) to generate.
 */
export const generateRandomInBase64 = (length = RANDOM_STRING_MAX_LENGTH) =>
  encodeBase64(generateRandomString(length));

/**
 * Generates random bytes and encodes them in url safe base64.
 */
export const generateState = () => generateRandomInBase64();

/**
 * Generates random bytes and encodes them in url safe base64.
 */
export const generateNonce = () => generateRandomInBase64();

/**
 * Generates code verifier use max_length
 * @link [Client Creates a Code Verifier](https://datatracker.ietf.org/doc/html/rfc7636#section-4.1)
 */
export const generateCodeVerifier = () => generateRandomString(CODE_VERIFIER_MAX_LENGTH);

/**
 * Calculates the S256 PKCE code challenge for an arbitrary code verifier.
 * Encodes in url safe base64.
 * @param codeVerifier Code verifier to calculate the S256 code challenge for
 * @link [Client Creates the Code Challenge](https://datatracker.ietf.org/doc/html/rfc7636#section-4.2)
 */
export const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
  const encoded = new TextEncoder().encode(codeVerifier);
  const challenge = new Uint8Array(await crypto.subtle.digest('SHA-256', encoded));
  return fromUint8Array(challenge).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};
