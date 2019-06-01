
const bitcoin = require('bitcoinjs-lib');

/**
* @method   sha256      
* @description sha256 hash 함수
* @param {string} data
* @return hash
**/
function sha256(data) {
  let hash = bitcoin.crypto.sha256(Buffer.from(data));
  return hash.toString('hex');
}

/**
* @method   hash160      
* @description ripemd hash 함수
* @param {string} data
* @return hash
**/
function hash160(data) {
  let hash = bitcoin.crypto.ripemd160(Buffer.from(data));
  return hash.toString('hex');
}

/**
* @method   hash256      
* @description sha256 double hash 함수
* @param {string} data
* @return hash
**/
function hash256(data) {
  let hash = bitcoin.crypto.hash256(Buffer.from(data));
  return hash.toString('hex');
}

module.exports = {
  sha256 : sha256,
  hash160 : hash160,
  hash256 : hash256,
}