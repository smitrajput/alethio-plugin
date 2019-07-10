import React, { Component } from 'react';
import { Container, Form,Button,Input,Message,Header,Icon, Segment, Table } from 'semantic-ui-react'
// import { addABI, decodeMethod } from 'abi-decoder';
import abiDecoder from 'abi-decoder';
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
				raw_data:any,
				tokenDetail: any
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
			token_balances:[],
			contract_abi:'',
			token_contract_address:'',
			transaction_hash:'',
			transactions:'',
			raw_data:''
		};
		this.getContractDetails.bind(this);
		// this._renderAccountTokenBalances.bind(this);
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
		var request = `https://api.aleth.io/v1/tokens/${this.state.token_contract_address}`
		await fetch(request, {
			method: 'GET',
			headers: {
				'username':'main_k5ua5idae7skpuciub5afanpxys3q',
			}
		})
		.then(response => response.json())
		.then(json => {
			console.log(json);
			this.setState({token_details:json})
		})
	}

	getTokenBalance = async () => {
		// console.log("this is contract. hurray");
		let url = `https://web3api.io/api/v1/addresses/${this.state.account_address}/tokens`;
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
		this.setState({token_balances:jsonData["payload"]["records"]})
	}

	getTransactions = async () => {
		let jsonData;
		let data;
		try{
			var request = `https://api.aleth.io/v1/contracts/${this.state.contract_address}/transactions`
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
		// const testABI = JSON.parse(this.state.contract_abi) ;
		const testABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"guy","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"symbol_","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"}]
		console.log("Test API ",testABI);
		abiDecoder.addABI(testABI);
		// const testData = this.state.raw_data;
		const testData = '0x53d9d9100000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114de5000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114daa';
		// console.log(typeof(testABI))
		// console.log("contract abi  : ", testABI);
		// console.log("raw data : ", testData);

		let decodedData = abiDecoder.decodeMethod(testData);
		console.log("decoded data ",decodedData);
		// this.setState({params:JSON.stringify(decodedData)})
	}

	getTransactionAndDecode = async () => {
		let jsonData;
		let data;
		await this.decodeParams();
		// try{
		// 	var request = `https://api.aleth.io/v1/transactions/${this.state.transaction_hash}`
		// 	await fetch(request, {
		// 	method: 'GET',
		// 	headers: {
		// 		'username':'main_k5ua5idae7skpuciub5afanpxys3q',
		// 	}
		// })
		// .then(response => response.json())
		// .then(jsonData => {
		// 	console.log(jsonData);
		// 	// this.setState({transactions:(jsonData["data"])})
		// 	// console.log(this.state.transactions);
		// 	this.setState({transaction_details:JSON.stringify(jsonData)})
		// 	this.setState({raw_data:jsonData['data']['attributes']['msgPayload']['raw']})
		// 	// this.setState.raw_data = (jsonData['data']['attributes']['msgPayload']['raw'])
		// 	this.decodeParams();
		// })
		// }
		// catch{
		// 	console.log('error');
		// 	return;
		// };
	}

	// _renderAccountTokenBalances = async () => {
	// 	console.log(this.state.token_balances)
	// 	if(this.state.token_balances != null){
	// 		return this.state.token_balances.map((tokenDetails: any, index: any) => {
	// 			let {address, holder, amount, decimals, name, symbol, isERC20, isERC721, isERC777, isERC884, isERC998} = tokenDetails;
	// 			return(
	// 				<tr key={address} className="">
	// 					<td className="">{name} [{symbol}]</td>
	// 					<td className="">{amount*Math.pow(10, -1 * decimals)}</td>
	// 				</tr>
	// 				// <Table.Row key={address}>
	// 				// 	<Table.Cell>{name} [{symbol}]</Table.Cell>
	// 				// 	{/* <Table.Cell>{symbol}</Table.Cell> */}
	// 				// 	<Table.Cell>{amount*Math.pow(10, -1 * decimals)}</Table.Cell>
	// 				// </Table.Row>
	// 			)
	// 		})
	// 	}
	// }

	render(){
		let contractTokenDetails;
		if(this.state.token_details != ""){
			if(this.state.token_details["errors"] == undefined){
				contractTokenDetails =
				<Container style={{margin:10}}>
				<Table definition>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Token Name:</Table.Cell>
							<Table.Cell>{this.state.token_details["data"]["attributes"]["name"]}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Symbol:</Table.Cell>
							<Table.Cell>{this.state.token_details["data"]["attributes"]["symbol"]}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Total Supply:</Table.Cell>
							<Table.Cell>{this.state.token_details["data"]["attributes"]["totalSupply"]}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Decimals:</Table.Cell>
							<Table.Cell>{this.state.token_details["data"]["attributes"]["decimals"]}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
			}
			else{
				contractTokenDetails =
				<Container style={{margin:10}}>
					<Header inverted as="h4">Error: </h4> Address is not a token contract address!
				</Container>

			}
		}
		else{
			contractTokenDetails = <Container style={{margin:10}}></Container>
		}


		let rows = this.state.token_balances.map((tokenDetails: any) => {
			// let {address, holder, amount, decimals, name, symbol, isERC20, isERC721, isERC777, isERC884, isERC998} = tokenDetails;
			return <AccountTokenBalanceRow key={tokenDetails.address} data={tokenDetails}></AccountTokenBalanceRow>
		})

		let accountTokenDetails;
		if(this.state.token_balances != ""){
			accountTokenDetails =
			<Container style={{margin:10}}>
				<table className="ui definition table">
					<tbody className="">
						{rows}
					</tbody>
				</table>
			</Container>
		}
		else{
			accountTokenDetails = <Container style={{margin:10}}></Container>
		}




		return(

			<div>
				<Container fluid>
					<div style={ {marginLeft: 10, marginRight: 10}}>
						<Container fluid>
							<Segment inverted>
								<Form inverted>
								<Header inverted as="h2" textAlign="center">Token Contract Details</Header>
									<Form.Group widths='equal'>
										<Form.Input fluid label='Enter Token Contract Address' placeholder='Token Contract Address' value={this.state.token_contract_address} onChange={(e)=>this.setState({token_contract_address:e.target.value})}/>
										{/* <Form.Input fluid label='Last name' placeholder='Last name' /> */}
									</Form.Group>
									<Button type='submit' onClick={this.getTokenDetails}>Get Token Details</Button>
									{contractTokenDetails}
								</Form>
							</Segment>
						</Container>
					</div>

					<div style={ {marginLeft: 10, marginRight: 10, marginTop: 20}}>
						<Container fluid>
							<Segment inverted>
								<Form inverted>
								<Header inverted as="h2" textAlign="center">Account Token Balances</Header>
									<Form.Group widths='equal'>
										<Form.Input fluid label='Enter Account Address' placeholder='Account Address' value={this.state.account_address} onChange={(e)=>this.setState({account_address:e.target.value})}/>
										{/* <Form.Input fluid label='Last name' placeholder='Last name' /> */}
									</Form.Group>
									<Button type='submit' onClick={this.getTokenBalance}>Get Token Balances</Button>
									{accountTokenDetails}
								</Form>
							</Segment>
						</Container>
					</div>

					<div style={ {marginLeft: 10, marginRight: 10, marginTop: 20}}>
						<Container fluid>
							<Segment inverted>
								<Form inverted>
								<Header inverted as="h2" textAlign="center">Decode Transaction Parameters</Header>
									<Form.Group widths='equal'>
										<Form.Input fluid label='Enter Contract Address' placeholder='Contract Address' value={this.state.contract_address} onChange={(e)=>this.setState({contract_address:e.target.value})}/>
										<Form.Input fluid label='Enter Contract ABI' placeholder='Contract ABI' value={this.state.contract_abi} onChange={(e)=>this.setState({contract_abi: e.target.value})}/>
									</Form.Group>
									<Button type='submit' onClick={this.getTransactions}>Get Contract Transactions</Button>
									<Form.Group widths="equal" style={{marginTop: 20}}>
										<Form.Input fluid label="Enter Transaction Hash" placeholder="Transaction Hash" value={this.state.transaction_hash} onChange={(e)=>this.setState({transaction_hash:e.target.value})}/>
									</Form.Group>
									<Button type="submit" onClick={this.decodeParams}> Get Decoded Parameters for the Transaction</Button>
								</Form>
							</Segment>
						</Container>
					</div>
				</Container>
			</div>



			// 	<p>Enter Transaction Hash : </p>
			// 	<input value={this.state.transaction_hash} onChange={(e)=>this.setState({transaction_hash:e.target.value})} ></input>
			// 	<br />

			// 	<button onClick={this.decodeParams}> get Decoded Parameters for the transaction </button>
			// 	<p>{this.state.params}</p>

			// 	{/* <button onClick={this.getTransactions}> get Transaction Details </button>
			// 	<p>{this.state.transaction_details}</p>
			// 	<p> Decoded Parameters : <br /> {this.state.params}</p> */}
			// 	</div>
			//  </Layout>
		);
	}
}

const AccountTokenBalanceRow = (props) => {
	return(

		<tr className="">
			<td className="">{props.data.name} [{props.data.symbol}]</td>
			<td className="">{props.data.amount*Math.pow(10, -1 * props.data.decimals)}</td>
		</tr>

	)
}
export default Contract;
