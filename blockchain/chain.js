const storage = require('./storage').storage;
const account = require('./account').account;
const transaction = require('./transaction').transaction;
const miner = require('./miner').miner;
const consensus = require('./consensus').consensus;

/** 
*  @class       block chain을 control하기위한 wrapper class
*  @classdesc   block chain을 control하기 위한 wrapper class로 저장소 정보를 포함하며 accont 생성, transaction transfer, generate block등의 기능을 수행함
**/
class chain {

  /**
  * @method   chain.constructor
  * @description  생성자
  **/ 
  constructor() {
    this.storage = new storage();

    // conbase account 생성
    let address = this.makeAccount();
    this.coinbase = address;
  }

  /**
  * @method   chain.getCoinbaseAddress
  * @description  coinbase address를 반환하는 함수
  * @return coinbase address
  **/
  getCoinbaseAddress(){
    return this.coinbase;
  }

  /**
  * @method   chain.setCoinbaseAddress
  * @description  coinbase address를 설정하는 함수
  * @param {string} address  
  **/
  setCoinbaseAddress(address){
    this.coinbase = address;
  }

  /**
  * @method   chain.makeAccount
  * @description  account를 생성하는 함수
  * @return address
  **/
  makeAccount() {
    let acc = new account();
    let address = acc.getNewAddress();
    this.storage.addAccount(acc);
    
    return address;
  }

  /**
  * @method   chain.getBalance
  * @description  address 정보로 balance를 조회하는 함수
  * @param {string} address  
  * @return balance
  **/
  getBalance(address) {
    return this.storage.getBalance(address);
  }

  /**
  * @method   chain.getAccounts
  * @description  모든 계정정보를 조회하는 함수
  * @return account list
  **/
  getAccounts() {
    return this.storage.getAccounts();
  }

  /**
  * @method   chain.transfer
  * @description  transaction을 생성하여 coin의 가치를 이동시키는 함수
  * @param {string} from  보내는 account의 address
  * @param {string} to    받는 account의 address
  * @param {Number} value 보내는 coin amount 
  * @return 성공/실패, 보통 block chain들은 transaction이 생성되면 txid(transaction hash)를 반환한다. 아직 transaction sign기능을 구현하지 않아 성공/실패 결과만 전달함.
  **/
  transfer(from, to, value){

    try{
  
      if(this.getBalance(from) >= value){
        let tx = new transaction(from,to,value);
        this.storage.addTransaction(tx);
        return true;
      }
    }
    catch(e){
      throw new Error('There is not enough balance.');
    }
  }

  /**
  * @method   chain.getBlock
  * @description 단일 block 정보를 조회한다
  * @param {string} hash 조회할 block의 hash
  * @return block
  **/
  getBlock(hash){
    return this.storage.getBlock(hash);
  }

  /**
  * @method   chain.getBlocks
  * @description 복수의 block 정보를 조회한다
  * @param {Number} start 조회할 첫번째 block의 height
  * @param {Number} count 조회할 block의 수
  * @return block list
  **/
  getBlocks(start, count){
    return this.storage.getBlocks(start, count);
  }

  /**
  * @method   chain.getBlockHeight
  * @description 현재 chain의 block height를 조회한다.
  * @return block height
  **/
  getBlockHeight(){
    return this.storage.getBlockHeight();
  }

  /**
  * @method   chain.generateBlock
  * @description block을 생성한다.
  * @return 생성된 block의 hash
  **/
  generateBlock(){
      
    let mining = new miner(this.coinbase,this.storage);
    return mining.generateBlock();
  }

   /**
  * @method   chain.verifyChain
  * @description 현재 chain의 block을 검증한다.
  * @return 검증 결과값
  **/
  verifyChain(){
    let cs = new consensus();
    return cs.verifyChain(this.storage);
  }
}

module.exports = new chain();