const transactions = require('./transaction').transaction;


/** 
*  @class       block class
*  @classdesc   블록 정보를 나타내며 block hash, previous block hash, nonce, difficultyBits, transactions, block create time 정보가 있음
**/
class block {

  /**
  * @method   block.constructor
  * @description  생성자
  **/ 
  constructor() {
    this.hash = '';
    this.prevHash = '';
    this.nonce = 0;
    this.difficultyBits = 0;
    this.transactions = [];
    this.timeStamp = 0;
  }

  /**
  * @method   block.setHash
  * @description  block hash 정보를 설정하는 함수
  * @param {string} hash  
  **/
  setHash(hash) {
    this.hash = hash;
  }

  /**
  * @method   block.getHash
  * @description  block hash 정보 반환하는 함수
  * @return block hash  
  **/
  getHash() {
    return this.hash;
  }

  /**
  * @method   block.setPrevHash
  * @description  previous block hash 정보를 설정하는 함수
  * @param {string} hash  
  **/
  setPrevHash(hash) {
    this.prevHash = hash;
  }

  /**
  * @method   block.getPrevHash
  * @description  previous block hash 정보 반환하는 함수
  * @return previous block hash  
  **/
  getPrevHash() {
    return this.prevHash;
  }

  /**
  * @method   block.setNonce
  * @description  nonce 정보를 설정하는 함수
  * @param {Numnber} nonce  
  **/
  setNonce(nonce) {
    this.nonce = nonce;
  }

  /**
  * @method   block.getNonce
  * @description  nonce 정보 반환하는 함수
  * @return nonce 
  **/
  getNonce() {
    return this.nonce;
  }

  /**
  * @method   block.increaseNonce
  * @description  nonce 값을 1 증가 시키는 함수
  **/
  increaseNonce() {
    this.nonce++;
  }

  /**
  * @method   block.setDifficultyBits
  * @description  난이도 bit를 설정하는 함수
  * @param {Number} bits  
  **/
  setDifficultyBits(bits) {
    this.difficultyBits = bits;
  }

  /**
  * @method   block.getDifficultyBits
  * @description  난이도 bit를 반환하는 함수
  * @return difficultyBits 
  **/
  getDifficultyBits() {
    return this.difficultyBits;
  }

  /**
  * @method   block.addTransaction
  * @description  단일 Transaction을 추가하는 함수
  * @param {object} transaction  
  **/
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  /**
  * @method   block.addTransactions
  * @description  Transaction list를 추가하는 함수
  * @param {list} transactions  
  **/
  addTransactions(transactions) {
    this.transactions = this.transactions.concat(transactions);
  }

  /**
  * @method   block.getTransactions
  * @description  Transaction list를 반환하는 함수
  * @return transactions 
  **/
  getTransactions() {
    return this.transactions;
  }

  /**
  * @method   block.setTimeStamp
  * @description  block create time을 설정하는 함수
  * @param {Number} timeStamp  
  **/
  setTimeStamp(timeStamp) {
    this.timeStamp  = timeStamp;
  }

  /**
  * @method   block.getTimeStamp
  * @description  block create time을 반환하는 함수
  * @return timeStamp 
  **/
  getTimeStamp() {
    return this.timeStamp;
  }

  /**
  * @method   block.getContent
  * @description  block 정보를 serialize한 값을 반환하는 함수
  * @return contents 
  **/
  getContent() {

    let contents = this.prevHash + this.nonce.toString() + this.difficultyBits.toString();

    this.transactions.forEach(tx => {
      contents += tx.toString();
    });

    contents += this.timeStamp;

    return contents;
  }
}

module.exports = {
  block : block
}