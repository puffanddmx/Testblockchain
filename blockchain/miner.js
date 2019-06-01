const block = require('./block').block;
const transaction = require('./transaction').transaction;
const storage = require('./storage').storage;
const config = require('../config/config');
const consensus = require('./consensus').consensus;

/** 
*  @class       miner class
*  @classdesc   block을 생성하는 기능을 포함함
**/
class miner {

    /**
    * @method   miner.constructor  
    * @param {string} coinbase  blcok 생성시 보상을 받을 coinbase address
    * @param {object} storage  block chain 저장소
    * @description  생성자
    **/ 
    constructor(coinbase, storage) {
        this.coinbase = coinbase;
        this.storage = storage;
        this.consensus = new consensus();
    }

    /**
    * @method   miner.generateBlock  
    * @description  새로운 block을 생성하는 함수
    **/ 
    generateBlock(){

        let gBlock = new block();

        //set prev block hash
        //genesys block          
        if(this.storage.getBlockHeight() == 0)
            gBlock.setPrevHash('');                     
        else
            gBlock.setPrevHash(this.storage.getCurrentBlock().getHash());

        //coinbase tx
        let coinbaseTx = new transaction('', this.coinbase, config.blockReward);
        gBlock.addTransaction(coinbaseTx);
        //select tx
        gBlock.addTransactions(this.storage.getTransactions());
        //set difficultyBits
        gBlock.setDifficultyBits(config.difficultyBits);

        let hash = '';

        while(true){

            //set block create time
            gBlock.setTimeStamp(new Date().getTime());
            //nonce increse
            gBlock.increaseNonce();

            let blockContent = gBlock.getContent();
            console.log(blockContent);
            hash = this.consensus.pow(blockContent,config.difficultyBits);
            
            if(hash != ''){
                gBlock.setHash(hash);
                break;
            }
        }

        // save block
        this.storage.addBlock(gBlock);

        // accounts balance update
        gBlock.getTransactions().forEach(tx => {
            
            let from = tx.getFrom();
            let to = tx.getTo();
            let value = tx.getValue();

            if( from != ''){
                this.storage.appendBalance(from,-value);
            }
            
            if( to != ''){
                this.storage.appendBalance(to,value);
            }
        });

        // clear tx pool
        this.storage.clearTxPool();

        console.log(`New block created by hashing ${gBlock.getNonce()} times.`);
     
        return hash;
    }
}

module.exports = {
    miner : miner
}
