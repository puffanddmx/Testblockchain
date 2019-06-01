const utils = require('./utils');
const storage = require('./storage').storage;

/** 
*  @class       합의 알고리즘 관련 class
*  @classdesc   pow 함의를 위한 기능 및 chain 검증기능을 포함함.
**/
class consensus {

  /**
  * @method   consensus.constructor
  * @description  생성자
  **/ 
  constructor() {

  }

  /**
  * @method   consensus.pow
  * @description  pow를 수행하여 새로 생성된 block hash값이 난이도 보다 작은지 판단함 
  * @param {string} blockContent    생성할 block 정보
  * @param {string} difficultyBits  난이도 bits
  * @return block hash
  **/
  pow(blockContent, difficultyBits) {

    let target = Math.pow(2,256-difficultyBits);
    let hash = utils.sha256(blockContent);
    let blockHash = parseInt(hash, 16);
    if(target > blockHash)
      return hash;
                    
    return '';
  }

  /**
  * @method   consensus.verifyChain
  * @description  현재 저장된 block정보를 기반으로 genesys block 부터 다시 chain을 생성하여 각 block의 hash값을 비교한다. 비교 후 동일한지 판단하여 chain을 검증한다.
  * @param {object} storage    block chain 저장소 
  * @return 검증 결과 값
  **/
  verifyChain(storage){

    // 검증 결과 
    let ret = {
      result : "success",
      details : []
    }

    let blocks = storage.getAllBlocks();
    let prevHash = '';

    // genesys block 부터 현재 생성된 마지막 blcok 까지 검증
    for(let i=0; i < blocks.length; i++){

      let block = blocks[i];

      block.setPrevHash(prevHash);

      let blockHash = block.getHash();
      let blockContent = block.getContent();
      let verifyHash = utils.sha256(blockContent);

      ret.details.push({
        height : i+1,
        blockHash : blockHash,
        verifyHash : verifyHash
      })

      // 기존 block hash값과 새로 생성한 hash 값 비교
      if(blockHash != verifyHash){
        ret.result = "fail";
        break;
      }

      prevHash = verifyHash;
    }

    return ret;
  }
}

module.exports = {
  consensus : consensus
}