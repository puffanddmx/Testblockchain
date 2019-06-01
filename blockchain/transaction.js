
// transaction hash 및 sign 기능은 구현하지 않음.

/** 
*  @class       transaction class
*  @classdesc   tansaction 정보를 나타내며 from, to, value 정보를 포함한다.
**/
class transaction {

  /**
  * @method   transaction.constructor  
  * @param {string} from  보내는 account의 address
  * @param {string} to    받는 account의 address
  * @param {Number} value 보내는 coin amount 
  * @description  생성자
  **/ 
  constructor(from, to, value) {
    this.from = from;
    this.to = to;
    this.value = value;
  }

  /**
  * @method   transaction.getFrom      
  * @description from 정보를 조회하는 함수
  * @return from
  **/
  getFrom(){
    return this.from;
  }

  /**
  * @method   transaction.getTo      
  * @description to 정보를 조회하는 함수
  * @return to
  **/
  getTo(){
    return this.to;
  }

  /**
  * @method   transaction.getValue      
  * @description value 정보를 조회하는 함수
  * @return value
  **/
  getValue(){
    return this.value;
  }

  /**
  * @method   transaction.toString
  * @description  transaction 정보를 serialize한 값을 반환하는 함수
  * @return contents 
  **/
  toString() {
    return this.from+this.to+this.value;
  }
}

module.exports = {
  transaction : transaction
}