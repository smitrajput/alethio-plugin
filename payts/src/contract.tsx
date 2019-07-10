import React, { Component } from 'react';
import { Form,Button,Input,Message,Header,Icon } from 'semantic-ui-react'
// import { addABI, decodeMethod } from 'abi-decoder';
// import abiDecoder from 'abi-decoder';
const abiDecoder = require('abi-decoder');
import { array } from "prop-types";
// import Layout from '../../components/Layout.js';
// import factory from '../../ethereum/factory';
// import web3 from '../../ethereum/web3';
// import { Router } from '../../routes';

type MyProps = { };
type MyState = {
				title: string,
				contract_details:string,
				token_details:any,
				params:any,
				transaction_details:any,
				contract_address:any,
				account_address:any,
				token_balances:any,
				contract_abi:any,
				token_contract_address:any,
				transaction_hash:any,
				transactions:any,
				raw_data:any
				// transactions:any
				};

class Contract extends Component<MyProps, MyState>{

	constructor(props:any){
		super(props);
		this.state ={
			title:'',
			contract_details:'',
			token_details:'',
			params:'',
			transaction_details:'',
			contract_address:'',
			account_address:'',
			token_balances:'',
			contract_abi:'',
			token_contract_address:'',
			transaction_hash:'',
			transactions:'',
			raw_data:''
		};
		this.getContractDetails.bind(this);
	}


	getContractDetails = async () => {
		console.log("this is contract. hurray");
		var request = 'https://api.aleth.io/v1/contracts/0x2af47a65da8CD66729b4209C22017d6A5C2d2400'
		await fetch(request, {
			method: 'GET',
			headers: {
				'username':'main_k5ua5idae7skpuciub5afanpxys3q',
			}
		})
		.then(response => response.json())
		.then(json => {
			console.log(json);
			this.setState({contract_details:JSON.stringify(json)})
		})
	}

	getTokenDetails = async () => {
		console.log("this is contract. hurray");
		var request = 'https://api.aleth.io/v1/tokens/0xcd63bb3586e871611cc60befcadf8e56bc7aeea3'
		await fetch(request, {
			method: 'GET',
			headers: {
				'username':'main_k5ua5idae7skpuciub5afanpxys3q',
			}
		})
		.then(response => response.json())
		.then(json => {
			console.log(json);
			this.setState({token_details:JSON.stringify(json)})
		})
	}

	getTokenBalance = async () => {
		console.log("this is contract. hurray");
		let url = `https://web3api.io/api/v1/addresses/0xD43541554551Fb3fBB472a4c295a5d6C6B8fa5dd/tokens`;
		let api_key = "UAK85fcd3c978f3c11801d9dbb5c989a815";
		let data;
		try{
			data = await fetch(url, {
				method: 'GET',
				headers: {
					'x-api-key': api_key,
				}
			});
		}
		catch{
			console.log('error')
			return;
		}
	let jsonData = await data.json();
		console.log(jsonData);
		this.setState({token_balances:JSON.stringify(jsonData)})
	}

	getTransactions = async () => {
		let jsonData;
		let data;
		try{
			var request = 'https://api.aleth.io/v1/contracts/0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359/transactions'
			await fetch(request, {
			method: 'GET',
			headers: {
				'username':'main_k5ua5idae7skpuciub5afanpxys3q',
			}
		})
		.then(response => response.json())
		.then(jsonData => {
			console.log(jsonData);
			// this.setState({transactions:(jsonData["data"])})
			// console.log(this.state.transactions);
			this.setState({transactions:JSON.stringify(jsonData)})
		})
		}
		catch{
			console.log('error');
			return;
		};
	}

	decodeParams = async () => {
		// console.log(typeof(this.state.contract_abi))
		// console.log(typeof((this.state.contract_abi)))
		const testABI = JSON.parse(this.state.contract_abi) ;
		// const testABI = [{"inputs": [{"type": "address", "name": ""}], "constant": true, "name": "isInstantiation", "payable": false, "outputs": [{"type": "bool", "name": ""}], "type": "function"}, {"inputs": [{"type": "address[]", "name": "_owners"}, {"type": "uint256", "name": "_required"}, {"type": "uint256", "name": "_dailyLimit"}], "constant": false, "name": "create", "payable": false, "outputs": [{"type": "address", "name": "wallet"}], "type": "function"}, {"inputs": [{"type": "address", "name": ""}, {"type": "uint256", "name": ""}], "constant": true, "name": "instantiations", "payable": false, "outputs": [{"type": "address", "name": ""}], "type": "function"}, {"inputs": [{"type": "address", "name": "creator"}], "constant": true, "name": "getInstantiationCount", "payable": false, "outputs": [{"type": "uint256", "name": ""}], "type": "function"}, {"inputs": [{"indexed": false, "type": "address", "name": "sender"}, {"indexed": false, "type": "address", "name": "instantiation"}], "type": "event", "name": "ContractInstantiation", "anonymous": false}];
		console.log("Test API ",testABI);
		abiDecoder.addABI(testABI);
		const testData = this.state.raw_data;
		// const testData = '0x53d9d9100000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114de5000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114daa';
		// console.log(typeof(testABI))
		console.log("contract abi  : ", testABI);
		console.log("raw data : ", testData);

		let decodedData = abiDecoder.decodeMethod(testData);
		console.log("decoded data ",decodedData);
		this.setState({params:JSON.stringify(decodedData)})
	}

	getTransactionAndDecode = async () => {
		let jsonData;
		let data;
		// await this.decodeParams();
		try{
			var request = `https://api.aleth.io/v1/transactions/${this.state.transaction_hash}`
			await fetch(request, {
			method: 'GET',
			headers: {
				'username':'main_k5ua5idae7skpuciub5afanpxys3q',
			}
		})
		.then(response => response.json())
		.then(jsonData => {
			console.log(jsonData);
			// this.setState({transactions:(jsonData["data"])})
			// console.log(this.state.transactions);
			this.setState({transaction_details:JSON.stringify(jsonData)})
			this.setState({raw_data:jsonData['data']['attributes']['msgPayload']['raw']})
			// this.setState.raw_data = (jsonData['data']['attributes']['msgPayload']['raw'])
			this.decodeParams();
		})
		}
		catch{
			console.log('error');
			return;
		};
	}

	render(){
		return(

			<div>
				<p>Enter Token Contract Address : </p>
				<input value={this.state.token_contract_address} onChange={(e)=>this.setState({token_contract_address:e.target.value})} ></input>
				<br />
				<button onClick={this.getTokenDetails}> get Token Details </button>
				<p>{this.state.token_details}</p>
				<br />
				<p>Enter Account Address : </p>
				<input value={this.state.account_address} onChange={(e)=>this.setState({account_address:e.target.value})} ></input>
				<br />
				<button onClick={this.getTokenBalance}> get All Token Balances </button>
				<p>Token Balances for this Acoount : </p>
				<p>{this.state.token_balances}</p>
				<br />


				<h3>Decode Transaction Parameters</h3>
				<p>Enter Contract Address : </p>
				<input value={this.state.contract_address} onChange={(e)=>this.setState({contract_address:e.target.value})} ></input>
				<br />
				<p>Enter Contract ABI : </p>
				<input value={this.state.contract_abi} onChange={(e)=>this.setState({contract_abi:e.target.value})} ></input>
				<br />
				<p> Entered ABI : </p>
				<p>{this.state.contract_abi}</p>

				<button onClick={this.getTransactions}> get Transactions for this contract </button>
				<p>{this.state.transactions}</p>
				<br />

				<p>Enter Transaction Hash : </p>
				<input value={this.state.transaction_hash} onChange={(e)=>this.setState({transaction_hash:e.target.value})} ></input>
				<br />

				<button onClick={this.getTransactionAndDecode}> get Decoded Parameters for the transaction </button>
				<p>{this.state.params}</p>

				{/* <button onClick={this.getTransactions}> get Transaction Details </button>
				<p>{this.state.transaction_details}</p>
				<p> Decoded Parameters : <br /> {this.state.params}</p> */}
				</div>
			//  </Layout>
		);
	}
}

export default Contract;
