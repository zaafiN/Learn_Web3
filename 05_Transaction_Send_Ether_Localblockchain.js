var Tx = require('ethereumjs-tx');
const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545');

const account1 = "0xE9fd82DbF2C1956270570526e1BBE10fB13483d1";
const account2 = "0x92f44e2C8A4bDF3614149514efc84567429d9939";

const privateKey1 = "c1887eded025fc00613ec6efef9017621c7ffe112225d9c95bc536a7fe257e04";
const privateKey2 = "bec909ebef40f8f3dff97200de8a1685ee9ee7a530af4eff64eba934d0829f21";

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');
const privateKey2Buffer = Buffer.from(privateKey2, 'hex');

console.log("Buffer 1 = ",privateKey1Buffer);
console.log("Buffer 2 = ",privateKey2Buffer);

web3.eth.getTransactionCount(account1, (err, txCount)=>{

    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       account2,
        value:    web3.utils.toHex(web3.utils.toWei('6', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    const tx = new Tx.Transaction(txObject);
    tx.sign(privateKey1Buffer);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

   // console.log("tx = ",tx);
   // console.log("serializedTx = ",serializedTx);
   // console.log("raw = ",raw);

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
       console.log('txHash:', txHash)
   });

});
