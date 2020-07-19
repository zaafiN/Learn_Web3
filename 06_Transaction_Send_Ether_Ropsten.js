var Tx = require('ethereumjs-tx');
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/1f07f4de6926451ca3a03c31df316dad');

const account1 = "0x178c6d093366B5E691397444E58EF454ad8bA08F"; // account 1 in my wallet
const account2 = "0x5dd4E994E66B016fa89608FDbE4b7F191Fc4b7Db"; // account 2 in my wallet

const privateKey1 = "7292aae9801dd676b063c839d86b0da56c43dfb71e8610f001b05a75cb12d5db";
const privateKey2 = "395b6a2b43b031f4d4e0d44b294c74f4c95967d42e627b72f5981e3b8aef11d0";

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');
const privateKey2Buffer = Buffer.from(privateKey2, 'hex');

console.log("Buffer 1 = ",privateKey1Buffer);
console.log("Buffer 2 = ",privateKey2Buffer);

web3.eth.getTransactionCount(account1, (err, txCount)=>{

    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       account2,
        value:    web3.utils.toHex(web3.utils.toWei('2', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    const tx = new Tx.Transaction(txObject, { chain: 'ropsten', hardfork: 'petersburg' });
    tx.sign(privateKey1Buffer);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    //console.log("tx = ",tx);
    //console.log("serializedTx = ",serializedTx);
    //console.log("raw = ",raw);

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
    });

});
