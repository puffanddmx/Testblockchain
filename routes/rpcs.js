const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {

  /**
  * @method   getCoinbaseAddress   
  * @description  (json rpc2) coinbase address를 조회함
  * @return coinbase address or error
  **/
  res.rpc('getCoinbaseAddress', function(params, respond){

    try{
      let address = chain.getCoinbaseAddress();
        respond(
        {
          result:  {
            address: address
          }
        }
      );
    }
    catch(e){
      respond(e);
    }

  });

  /**
  * @method   setCoinbaseAddress   
  * @description  (json rpc2) coinbase address를 설정함
  * @param {string} address
  * @return success or fail or error
  **/
  res.rpc('setCoinbaseAddress', function(params, respond){

    try{
      let address = params.address;
      chain.setCoinbaseAddress(address);

      respond(
        {
          result: 'success'
        }
      );
    }
    catch(e){
      respond({error:e});
    }

  });

  /**
  * @method   getNewAddress   
  * @description  (json rpc2) 새로운 account(address)를 생성함
  * @return address or error
  **/
  res.rpc('getNewAddress', function(params, respond){

    try{
      let address = chain.makeAccount();
        respond(
        {
          result:  {
            address: address
          }
        }
      );
    }
    catch(e){
      respond(e);
    }

  });

  /**
  * @method   getBalance   
  * @description  (json rpc2) 특정 address에 대한 balance를 조회함
  * @param {string} address
  * @return balance or error
  **/
  res.rpc('getBalance', function(params, respond){

    try{
      let address = params.address;
      let balance = chain.getBalance(address);

      respond(
        {
          result:  {
            address: address,
            balance: balance
          }
        }
      );
    }
    catch(e){
      respond({error:e});
    }

  });

  /**
  * @method   getAccounts   
  * @description  (json rpc2) 모든 account 정보를 조회함
  * @return address list or error
  **/
  res.rpc('getAccounts', function(params, respond){

    try{
      let accounts = chain.getAccounts();

      respond(
        {
          result:  {
            accounts: accounts
          }
        }
      );
    }
    catch(e){
      respond({error:e});
    }

  });

  /**
  * @method   transfer   
  * @description  (json rpc2) 거래를 생성함
  * @param {string} from  보내는 account의 address
  * @param {string} to    받는 account의 address
  * @param {Number} value 보내는 coin amount 
  * @return success or fail or error
  **/
  res.rpc('transfer', function(params, respond){
    try{

      let from = params.from;
      let to = params.to;
      let value = Number(params.value);

      if(from == undefined || from == '')
        throw new Error('There is no information from.');

      if(to == undefined || to == '')
        throw new Error('There is no information to.');

      if(value <= 0)
        throw new Error('Balances less than 0 can not be transferred.');

      let ret = chain.transfer(from,to,value);

      // transaction sign 기능을 구현하지 않아 txid를 생성하지 않음
      // 따라서 결과값을 txid(hash) 대신 success/fail로 대체

      respond(
        {
          result: ret? 'success':'fail'
        }
      );
    }
    catch(e){
      respond({error:e});
    }
  });

  /**
  * @method   getBlock   
  * @description  (json rpc2) 특정 block 정보를 조회함
  * @param {string} hash
  * @return block or error
  **/
  res.rpc('getBlock', function(params, respond){
    try{
      let hash = params.hash;
      let block = chain.getBlock(hash);

      respond(
        {
          result:  {
            block: block
          }
        }
      );
    }
    catch(e){
      respond({error:e});
    }
  });

  /**
  * @method   getBlocks   
  * @description  (json rpc2) 복수의 block 정보를 조회함, start는 1부터 시작, count는 1보다 커야함
  * @param {Number} start 조회할 첫번째 block의 height
  * @param {Number} count 조회할 block의 수
  * @return block list or error
  **/
  res.rpc('getBlocks', function(params, respond){
    try{

      let start = params.start;
      let count = params.count;

      if(start == undefined || start < 1)
        throw new Error('Must be a start greater than 0.');

      if(count == undefined || count < 1)
        throw new Error('Must be a count greater than 0.');

      let blocks = chain.getBlocks(start,count);

      respond(
        {
          result:  {
            blocks: blocks
          }
        }
      );
    }
    catch(e){
      respond({error:e});
    }
  });

  /**
  * @method   getBlockHeight   
  * @description  (json rpc2) block height를 조회함
  * @return block height or error
  **/
  res.rpc('getBlockHeight', function(params, respond){
    try{
      let height = chain.getBlockHeight();

      respond(
        {
          result:  {
            height: height
          }
        }
      );
    }
    catch(e){
      respond({error:e});
    }
  });

  /**
  * @method   generateBlock   
  * @description  (json rpc2) 새로운 block을 생성함
  * @return block hash or error
  **/
  res.rpc('generateBlock', function(params, respond){
    try{
      let hash = chain.generateBlock();

      respond(
      {
        result:  {
            hash: hash
          }
        }
      );
    }
    catch(e){
      respond({error:e});
    }
  });

  /**
  * @method   verifyChain   
  * @description  (json rpc2) chain에 포함된 모든 block을 검증함
  * @return 검증 결과 or error
  **/
  res.rpc('verifyChain',  function(params, respond){

    try{
    
      let result = chain.verifyChain();

      respond(
        {
          result: result
        }
      );
    }
    catch(e){
      respond({error:e});
    }

  });

});

module.exports = router;
