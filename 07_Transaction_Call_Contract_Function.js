var Tx = require('ethereumjs-tx');
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/68db556933734df6bdc48df282f06f7f');

const account1 = "0x178c6d093366B5E691397444E58EF454ad8bA08F"; // Account 1 in my "METAMASK" wallet.
const privateKey1 = "7292aae9801dd676b063c839d86b0da56c43dfb71e8610f001b05a75cb12d5db";
const privateKey1Buffer = Buffer.from(privateKey1, 'hex');

const contractAddress = "0x3333551d0AC45F1e3edaC3d7639852ad436652F2";

const abi = [
	{
		"inputs": [],
		"name": "doSomework",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAge",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setAge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const contract = new web3.eth.Contract(abi, contractAddress);



console.log("Buffer 1 = ",privateKey1Buffer);

web3.eth.getTransactionCount(account1, (err, txCount)=>{
    //const dataBuffer = Buffer.from(data, 'hex');
    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to: contractAddress,
        data: contract.methods.setAge(46).encodeABI()
      }

    const tx = new Tx.Transaction(txObject, { chain: 'ropsten' });
    tx.sign(privateKey1Buffer);

    const serializedTx = tx.serialize();
	const raw = '0x' + serializedTx.toString('hex');
	
	//console.log("tx = ",tx);
    //console.log("serializedTx = ",serializedTx);
    //console.log("raw = ",raw);


    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:', err);
        console.log('txHash:', txHash);
    });
    

});

contract.methods.getAge().call(function(err,result){
	console.log("Age: ",result);

});
