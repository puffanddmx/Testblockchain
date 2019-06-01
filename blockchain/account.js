const bitcoin = require('bitcoinjs-lib');

/** 
*  @class       account class
*  @classdesc   계정 정보를 나타내며 balance 정보를 포함하고 address 생성 기능이 있음
**/
class account {

  /**
  * @method   account.constructor
  * @description  생성자
  **/ 
  constructor() {
    this.balance = 0;
  }

  /**
  * @method   account.getNewAddress
  * @description  address를 생성하는 method, bitcoin 주소를 생성
  * @return   address string를 반환  
  **/
  getNewAddress() {

    if(this.address)
      return this.address;

    // random 방식으로 keypair 생성
    // transaction sign 기능을 구현하지 않을 예정이러 privite key를 저장하지 않음
    const btcKeyPair = bitcoin.ECPair.makeRandom()
    const btcAddress = bitcoin.payments.p2pkh({ pubkey: btcKeyPair.publicKey })
    this.address = btcAddress.address;
    console.log(this.address);
    
    return this.address;
  }

  /**
  * @method   account.getAddress
  * @description  기존에 생성된 address를 반환하는 함수
  * @return   address string를 반환  
  **/
  getAddress() {
    return this.address;
  }

  /**
  * @method   account.getBalance
  * @description  account에 대한 balance를 반환하는 함수
  * @return   balance를 반환  
  **/
  getBalance() {
    return this.balance;
  }

  /**
  * @method   account.setBalance
  * @description  account에 대한 balance를 설정하는 함수
  * @param   {Number} balance  
  **/
  setBalance(balance) {
    this.balance = balance;
  }

  /**
  * @method   account.appendBalance
  * @description  account에 대한 balance를 추가하는 함수
  * @param   {Number} balance  
  **/
  appendBalance(balance) {
    this.balance += balance;
  }
}

module.exports = {
  account : account
}
