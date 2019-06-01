let assert = require("assert");
let account = require("../blockchain/account").account;
let block = require("../blockchain/block").block;
let utils = require("../blockchain/utils");
let chain = require("../blockchain/chain");

describe('test', function() {

  before(function () {

  });

  describe('account test', function() {

    it('getNewAddress', function() {
          
      let acc1 = new account();
      let address = acc1.getNewAddress();

      assert(address != undefined);
      //console.log(address);
    });
      
  });

  describe('block test', function() {

    it('create test', function() {
        
      let block1 = new block();
      let content = block1.getContent();

      assert(content != undefined);
      //console.log(content);
    });
    
  });

  describe('hash test', function() {

    it('sha256 test', function() {
            
      let data = 'testtest';
      let hash = utils.sha256(data);

      assert.equal(hash,'37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
    });

        
    it('hash160 test', function() {
            
      let data = 'testtest';
      let hash = utils.hash160(data);

      assert.equal(hash,'8200bd0425cc70c7d698df3fe412044eaab83f94');
    });

        
    it('hash256 test', function() {
            
      let data = 'testtest';
      let hash = utils.hash256(data);

      assert.equal(hash,'9a984e219b07f9b645ef35f4de938b4741abe2e0b4adc88b40e9367170c91cc8');
    });
        
  });

  describe('mining test', function() {

    it('mining test', function() {
            
      chain.generateBlock();
      let blockHeight = chain.getBlockHeight();
      chain.generateBlock();
      blockHeight = chain.getBlockHeight();
      chain.generateBlock();
      blockHeight = chain.getBlockHeight();

      assert(blockHeight == 3);
      //console.log(content);
    });
      
  });

  describe('chain test', function() {

    it('verify test', function() {
            
      let verify = chain.verifyChain();

      assert(verify.result == "success");
    });
  
  });
      
  after(function () {

  });
  
});