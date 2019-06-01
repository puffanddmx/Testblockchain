const account = require('./account').account;
const block = require('./block').block;
const transaction = require('./transaction').transaction;

/** 
*  @class       저장소 class
*  @classdesc   chain 정보 및 world state(accounts) 정보를 저장하는 저장소. 아직 file or DB로 저장하지 않고 memory로 저장. 
**/
class storage {

  /**
  * @method   storage.constructor  
  * @description  생성자
  **/ 
  constructor() {
    this.blocks = [];
    this.blockCache = new Map();
    this.accounts = new Map();
    this.txPool = [];
  }

  /**
  * @method   storage.addBlock
  * @description  block 정보를 저장하는 함수.
  * @param {object} block    저장할 block 정보
  **/
  addBlock(block) {
    this.blocks.push(block);
    this.blockCache.set(block.hash,block);
  }

  /**
  * @method   storage.getBlock      
  * @description  저장된 block 정보를 조회하는 함수
  * @param {string} hash   조회할 block의 hash
  * @return block
  **/
  getBlock(hash) {
      
    if(this.blockCache.has(hash))
      return this.blockCache.get(hash);

    throw new Error('No block information.');
  }

  /**
  * @method   storage.getBlocks      
  * @description  저장된 block 정보를 조회하는 함수, 다수의 block 조회
  * @param {Number} start 조회할 첫번째 block의 height
  * @param {Number} count 조회할 block의 수
  * @return block list
  **/
  getBlocks(start,count) {
      
    if(this.blocks.length > 0)
      return this.blocks.slice(start-1,start+count-1);

    throw new Error('No blocks information.');
  }

  /**
  * @method   storage.getAllBlocks      
  * @description  저장된 모든 block 정보를 조회하는 함수
  * @return block list
  **/
  getAllBlocks() {
    return this.blocks;
  }

  /**
  * @method   storage.getCurrentBlock      
  * @description  최신 block 정보를 조회하는 함수
  * @return block
  **/
  getCurrentBlock(){
    if(this.blocks.length > 0)
      return this.blocks[this.blocks.length-1];

    throw new Error('No block information.');
  }

  /**
  * @method   storage.getBlockHeight      
  * @description  block height를 조회하는 함수
  * @return block height
  **/
  getBlockHeight() {
    return this.blocks.length;
  }

  /**
  * @method   storage.addAccount      
  * @description  account 정보를 저장하는 함수
  * @param {string} account
  **/
  addAccount(account) {
    this.accounts.set(account.address,account);
  }

  /**
  * @method   storage.getAccounts      
  * @description  모든 account 정보를 조회하는 함수
  * @return account list
  **/
  getAccounts() {
    return Array.from(this.accounts.values());
  }

  /**
  * @method   storage.getBalance      
  * @description  특정 account의 balance를 조회하는 함수
  * @return balance
  **/
  getBalance(address){

    if(this.accounts.has(address))
      return this.accounts.get(address).getBalance();

    throw new Error('No account information.');
  }

  /**
  * @method   storage.setBalance      
  * @description  특정 account의 balance를 설정하는 함수
  * @param {string} address
  * @param {Number} balance
  **/
  setBalance(address,balance){

    if(this.accounts.has(address)){
      this.accounts.get(address).setBalance(balance);
      return;
    }
      
    throw new Error('No account information.');
  }

  /**
  * @method   storage.appendBalance      
  * @description  특정 account의 balance를 update하는 함수
  * @param {string} address
  * @param {Number} balance
  **/
  appendBalance(address,balance){

    if(this.accounts.has(address)){
      this.accounts.get(address).appendBalance(balance);
      return;
    }

    throw new Error('No account information.');
  }

  /**
  * @method   storage.addTransaction      
  * @description  Transaction을 txpool에 저장하는 함수
  * @param {object} transaction
  **/
  addTransaction(transaction){
    this.txPool.push(transaction);
  }

  /**
  * @method   storage.getTransactions      
  * @description  txpool있는 모든 Transaction 정보를 반환하는 함수
  * @return Transaction list
  **/
  getTransactions() {
    return this.txPool;
  }

  /**
  * @method   storage.clearTxPool      
  * @description  txpool을 비우는 함수
  **/
  clearTxPool(){
    this.txPool = [];
  }
}

module.exports = {
  storage : storage
}