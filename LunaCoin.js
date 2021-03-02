
const SHA256= require('crypto-js/sha256');
var today = new Date();


//////BLOCKCHAIN
class myBlockchain{
    constructor(){
        this.chain = [this.genBlock()];
        this.strength = 2;
    }

    //genesis block
    genBlock(){
        return new myBlock(today, "$5", "Genesis block initiation", "This is the content for the genesis block");
    }

    //features newest block
    recentBlock(){
        return this.chain[this.chain.length - 1];
    }

    createTransaction(transactions){
        this.pendingTrans.push(transactions);
    }

    //add
    minePending(rewardAddress){
        let block = new myBlock( today, this.pendingTrans); //create block
        block.mine(this.strength); //mine block
        this.chain.push(block); //add block to chain
        this.pendingTrans = [new transactions(null, rewardAddress, this. reward)];
    }

    walletBalance(address){
        let balance = 0;
        for (const block of this.chain){
            for (const trans of this.transactions){
                if (trans.from === address){
                    balance -= trans.amount;
                }
                if (trans.to === address){
                    balance += trans.amount;
                }
            }
        }
    }
}
 
//TRANSACTIONS
class Transaction{
    constructor(from,to, amount){
        this.from = from;
        this.to = to;
        this.amount = amount;
    }
}
//BLOCK
class myBlock{
    constructor(timestamp, transactions, previousHash = ' ', content){
   
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.findHash();
        this.nonce = 0;
    }

    findHash(){
        return SHA256(this.timestamp + this.transactions + this.previousHash +this.nonce).toString();
    }

    //ensure proof of work --botcoin method
    mine(strength){
        while(this.hash.substring(0, strength) !== Array(strength + 1).join("0")){
            this.nonce++;
            this.hash = this.findHash();
            console.log("Mining new block ....\n");
        } 

        console.log("Block mined: " + this.hash);
    }
}

//difficulty controls strength of proof of work

let cieloCoin = new myBlockchain;

cieloCoin.createTransaction(new Transaction("address1" ,"address2",100));
cieloCoin.createTransaction(new Transaction("address2" ,"address1", 50));

console.log('\n starting miner...');
cieloCoin.minePending("cielo-address");

console.log("\nbalance is ", cieloCoin.walletBalance('cielo-address'));