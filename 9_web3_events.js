console.log(Web3);

const rpcURL = "https://ropsten.infura.io/v3/68db556933734df6bdc48df282f06f7f";
let web3 = new Web3(rpcURL);

let address = "0x608a4B682e2e053551e6AE933cAf72514FEDdFab";
let abi =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "logString",
		"type": "event"
	},
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
		"stateMutability": "nonpayable",
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


contract.methods.getAge().call(function(err,result){
	console.log("Age: ",result);

});

contract.methods.doSomework().call(function(err,result){
	console.log("Work: ",result);

});

contract.events.logString({
    fromBlock: 0
}, function(error, event){
	 console.log("callback = ",event); })
.on("connected", function(subscriptionId){
    console.log("connected = ",subscriptionId);
})
.on('data', function(event){
    console.log('data = ',event); // same results as the optional callback above
})
.on('changed', function(event){
	// remove event from local database
	console.log('changed = ',event);
})
.on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
	console.log('error = ',error);
	console.log('receipt = ',receipt);
});




contract.getPastEvents(
    'logString',
    {
      fromBlock: 0,
      toBlock: 'latest'
    },
    (err, events) => {
         console.log("Events = ",events);
         console.log("Error = ",err);
    }
  )