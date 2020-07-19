console.log(Web3);

const rpcURL = "https://ropsten.infura.io/v3/68db556933734df6bdc48df282f06f7f";
let web3 = new Web3(rpcURL);

let address = "0x3333551d0AC45F1e3edaC3d7639852ad436652F2";
let abi = [
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

const contract = new web3.eth.Contract(abi, address);

console.log("contract ",contract);
console.log("Methods ",contract.methods);
console.log("getAge ",contract.methods.getAge);
console.log("doSomework ",contract.methods.doSomework);

contract.methods.getAge().call(function(err,result){
	console.log("Age: ",result);

});

contract.methods.doSomework().call(function(err,result){
	console.log("Work: ",result);

});

