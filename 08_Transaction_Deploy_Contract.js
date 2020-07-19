var Tx = require('ethereumjs-tx');
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/68db556933734df6bdc48df282f06f7f');

const account1 = "0x178c6d093366B5E691397444E58EF454ad8bA08F"; // Account 1 in my "METAMASK" wallet.
const privateKey1 = "7292aae9801dd676b063c839d86b0da56c43dfb71e8610f001b05a75cb12d5db";
const privateKey1Buffer = Buffer.from(privateKey1, 'hex');


//console.log("Buffer 1 = ",privateKey1Buffer);

web3.eth.getTransactionCount(account1, (err, txCount)=>{
    const data = "608060405234801561001057600080fd5b5061019b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063967e6e6514610046578063bd23dee014610064578063d5dcf127146100e7575b600080fd5b61004e610115565b6040518082815260200191505060405180910390f35b61006c61011e565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100ac578082015181840152602081019050610091565b50505050905090810190601f1680156100d95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610113600480360360208110156100fd57600080fd5b810190808035906020019092919050505061015b565b005b60008054905090565b60606040518060400160405280601781526020017f446f20736f6d6520776f726b2066726f6d2048756d616e000000000000000000815250905090565b806000819055505056fea264697066735822122020945f24a5a77a8c8a77fdad7efad809eb7a7edaf9202ec7a223ca8a519c01c264736f6c634300060b0033"
        
    const dataBuffer = Buffer.from(data, 'hex');
    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(900000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        data: dataBuffer //ad ox on "const data", than not need to use dataBuffer, simply "data: data". In data, contract bytecode is copy paste.
      }

    const tx = new Tx.Transaction(txObject, { chain: 'ropsten' });
    tx.sign(privateKey1Buffer);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:', err);
        console.log('txHash:', txHash);
    });
    

});


