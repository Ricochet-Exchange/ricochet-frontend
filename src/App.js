// import logo from './logo.svg';
import Web3 from "web3";
import React, { useState, Component } from "react";
import "./App.css";
import {
	chainId,
	DAIxAddress,
	DAIAddress,
	WETHxAddress,
	WETHAddress,
	RICAddress,
	hostAddress,
	idaAddress,
	rickosheaAppAddress,
	wethxDaixExchangeAddress,
	daixWethxExchangeAddress,
} from "./polygon_config";
import { erc20ABI, sfABI, idaABI, superTokenABI } from "./abis";
import axios from "axios";

const { web3tx, toWad, wad4human } = require("@decentral.ee/web3-helpers");
const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { Web3Provider } = require("@ethersproject/providers");

// TODO: catch if user is not on Goerli
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			account: "Connecting to Wallet", // User's address
			network: "", // network that user is on - TODO: react to network change
			balance: "", // not used
			loading: true, // (not used yet) boolean for if base interface has loaded
			isConnectedBrowserWallet: false, // boolean for if the user has browser web3 connected
			isConnectedChain: false, // boolean for if the user is on correct chain
			web3: null, // Window-injected web3 object
			sf: null, // Superfluid SDK object
			sfUser: null, // Superfluid User object (tied to a specific token)
			daiUser: null, // Superfluid User object for contract, used so we can get netflow
			wethUser: null, // Superfluid User object for contract, used so we can get netflow
			host: null, // Superfluid host contract instance
			ida: null,
			daiFlowRate: 0,
			wethFlowRate: 0, // Superfluid Instant Distribution Agreement contract instance
			superAppFlowAmount: "", // How much the user has streaming (storing as instance variable so it can be shown on front end)
			isSubscribed: false, // True if the user has approved the streaming
			userFlowDeets: {
				cfa: {
					netFlow: "-",
				},
			}, // Json details on the user's flows from user.details() -> getFlowDeets()
			daiFlowInfo: {
				cfa: {
					netFlow: "-",
				},
			},
			wethFlowInfo: {
				cfa: {
					netFlow: "-",
				},
			}, // Json details on the user's flows from user.details() -> getFlowDeets()
			flowQuery: { flowsOwned: [], flowsReceived: [] }, // Json details on user's flows from subgraph query -> queryFlows()
			tokenBalances: {},
			tokens: {
				wethx: WETHxAddress,
				daix: DAIxAddress,
			},
		};

		this.startFlow = this.startFlow.bind(this);
		this.stopFlow = this.stopFlow.bind(this);
		this.upgradeDAI = this.upgradeDAI.bind(this);
		this.downgradeETHx = this.downgradeETHx.bind(this);
		this.upgradeETH = this.upgradeETH.bind(this);
		this.checkIfApproved = this.checkIfApproved.bind(this);
		this.approveDAI = this.approveDAI.bind(this);
		this.approveETH = this.approveETH.bind(this);

		this.getTokenBalance = this.getTokenBalance.bind(this);
		this.sweepTokenBalanceUpdate = this.sweepTokenBalanceUpdate.bind(this);
		this.sweepQueryFlows = this.sweepQueryFlows.bind(this);
		this.downgradeDAIx = this.downgradeDAIx.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}

	async loadData() {
		const web3 = new Web3(window.ethereum);
		try {
			// WEB3 SET UP
			this.setState({
				isConnectedChain: (await web3.eth.getChainId()) == chainId,
			});
			console.log("Correct chain?", this.state.isConnectedChain);

			// Connecting to browser injected web3
			try {
				await window.ethereum.enable();
				this.setState({ isConnectedBrowserWallet: true });
				this.setState({ web3: web3 });
				// Getting user account
				await web3.eth.getAccounts((error, accounts) => {
					this.setState({ account: accounts[0] });
					console.log(accounts);
				});
			} catch {
				document.getElementById("approve-button").disabled = true;
				document.getElementById("upgrade-button").disabled = true;
				document.getElementById("startFlowButton").disabled = true;
				document.getElementById("stopFlowButton").disabled = true;
				window.alert(
					"Browser wallet not detected - please install Metamask to use dApp"
				);
			}

			if (!this.state.isConnectedChain) {
				document.getElementById("approve-button").disabled = true;
				document.getElementById("upgrade-button").disabled = true;
				document.getElementById("startFlowButton").disabled = true;
				document.getElementById("stopFlowButton").disabled = true;
				window.alert("Incorrect Chain - Please switch to Matic Mainnet");
			}

			// Getting user data and superfluid framework initialized
			if (this.state.isConnectedBrowserWallet && this.state.isConnectedChain) {
				// Initializing Superfluid framework
				const sf = new SuperfluidSDK.Framework({
					ethers: new Web3Provider(window.ethereum),
					tokens: ["DAI", "ETH"],
					version: "v1",
				});
				await sf.initialize();

				// Setting some Superfluid instance variables
				// NOTE: this part could be adjusted if working with different input tokens (not just DAIx)
				await this.setState({
					sf: sf,
					sfUser: sf.user({
						address: this.state.account,
						token: DAIxAddress,
					}),
					daiUser: sf.user({
						address: daixWethxExchangeAddress,
						token: DAIxAddress,
					}),
					wethUser: sf.user({
						address: wethxDaixExchangeAddress,
						token: WETHxAddress,
					}),
				});

				console.log("SF USER SET", this.state.sfUser);

				// Initializing Superfluid SuperApp components
				this.setState({
					host: await new web3.eth.Contract(sfABI, hostAddress),
				});
				console.log("Host Address:", this.state.host._address);
				this.setState({
					ida: await new web3.eth.Contract(idaABI, idaAddress),
				});
				console.log("IDA Address:", this.state.ida._address);

				let user = this.state.account;
				let isSubscribed = await this.state.ida.methods
					.getSubscription(
						WETHxAddress,
						rickosheaAppAddress, // publisher
						0, // indexId
						user
					)
					.call();
				this.setState({
					isSubscribed: isSubscribed.approved,
				});
				console.log("Is Approved?", this.state.isSubscribed);
			}
		} catch (err) {
			console.log("ERROR IN WEB3 SET UP:", err);
		}

		if (this.state.isConnectedBrowserWallet && this.state.isConnectedChain) {
			await this.sweepTokenBalanceUpdate();
			await this.checkIfApproved(DAIAddress, DAIxAddress);
			await this.checkIfApproved(WETHAddress, WETHxAddress);
			await this.sweepQueryFlows();
			// setInterval(() => this.getTokenBalance(this.state.account,DAIxAddress),100000);
			// setInterval(() => this.getTokenBalance(this.state.account,WETHxAddress),100000);
		}

		try {
			window.ethereum.on(
				"accountsChanged",
				function (accounts) {
					// Re-do the WEB3 SET UP if accounts are changed
					window.location.reload();
				}.bind(this)
			);
		} catch (err) {
			console.log("Error in handling account set up", err);
		}
		// Handling chain switch
		// try {
		try {
			window.ethereum.on(
				"chainChanged",
				function (accounts) {
					// Re-do the WEB3 SET UP if chain is changed
					console.log("CHAIN CHANGE, RELOADING WEB3 SET UP");
					// this.loadData()
					window.location.reload();
				}.bind(this)
			);
		} catch {
			console.log("Error in handling chain set up");
		}
	}

	async getTokenBalance(userAddress, tokenAddress) {
		var tokenInst = new this.state.web3.eth.Contract(erc20ABI, tokenAddress);
		await tokenInst.methods
			.balanceOf(userAddress)
			.call()
			.then(
				function (bal) {
					// Appending to the tokenBalances instance variable dictionary
					let copyBalance = this.state.tokenBalances;
					copyBalance[tokenAddress] = bal;
					this.setState({ tokenBalances: copyBalance });
				}.bind(this)
			);
	}

	async sweepTokenBalanceUpdate() {
		await this.getTokenBalance(this.state.account, DAIxAddress);
		await this.getTokenBalance(this.state.account, WETHxAddress);
		await this.getTokenBalance(this.state.account, WETHAddress);
		await this.getTokenBalance(this.state.account, RICAddress);
		await this.getTokenBalance(this.state.account, DAIAddress);
	}

	async stopFlow(exchangeAddress, inputTokenAddress) {
		let sf = this.state.sf;
		let sfUser = sf.user({
			address: this.state.account,
			token: inputTokenAddress,
		});
		console.log("Stopping flow with:", sfUser);
		await sfUser.flow({
			recipient: await sf.user({
				address: exchangeAddress,
				token: inputTokenAddress,
			}),
			flowRate: "0",
		});
		await this.sweepQueryFlows();
		document.getElementById(
			"input-amt-flowsReceived-" + inputTokenAddress.toLowerCase()
		).value = "";
	}

	async startFlow(exchangeAddress, inputTokenAddress, outputTokenAddress) {
		const web3 = new Web3(window.ethereum);
		let sf = this.state.sf;
		let sfUser = sf.user({
			address: this.state.account,
			token: inputTokenAddress,
		});
		console.log("Creating flow with:", sfUser);
		let flowInput = Math.round(
			(document.getElementById(
				"input-amt-flowsReceived-" + inputTokenAddress.toLowerCase()
			).value *
				Math.pow(10, 18)) /
				2592000
		); // Say I start a stream of 10 DAIx per month. Is the flow in gwei (which is registered as to the second) calculated as [ (10 DAIx) *(10^18) ] / [30 * 24 * 60 * 60]  = 3858024691358.025 -> round to nearest int
		console.log("Would flow:", flowInput);
		let call = [];

		console.log("outputTokenAddress", outputTokenAddress);
		console.log("exchangeAddress", exchangeAddress);
		console.log("sfUser.address", sfUser.address);
		let isSubscribed = await this.state.ida.methods
			.getSubscription(
				outputTokenAddress,
				exchangeAddress, // publisher
				0, // indexId
				sfUser.address
			)
			.call();

		console.log("Is Subscribed? - ", isSubscribed.approved);

		try {
			if (isSubscribed.approved) {
				console.log("Already subscribed");

				await sfUser.flow({
					recipient: await sf.user({
						address: exchangeAddress,
						token: inputTokenAddress,
					}), // address: would be rickosheaAppaddress, currently not deployed
					flowRate: flowInput.toString(),
				});
			} else {
				console.log("Beginning batch call");

				call = [
					[
						201, // approve the ticket fee
						sf.agreements.ida.address,
						web3.eth.abi.encodeParameters(
							["bytes", "bytes"],
							[
								sf.agreements.ida.contract.methods
									.approveSubscription(
										outputTokenAddress,
										exchangeAddress,
										0, // INDEX_ID
										"0x"
									)
									.encodeABI(), // callData
								"0x", // userData
							]
						),
					],
					// NOTE: Bring this back for liquidity mining, probably put this somewhere else
					// [
					//     201, // approve the ticket fee
					//     sf.agreements.ida.address,
					//     web3.eth.abi.encodeParameters(
					//       ["bytes", "bytes"],
					//       [
					//           sf.agreements.ida.contract.methods
					//               .approveSubscription(
					//                   RICAddress,
					//                   exchangeAddress,
					//                   1, // INDEX_ID
					//                   "0x"
					//               )
					//               .encodeABI(), // callData
					//           "0x" // userData
					//       ]
					//     )
					// ],
					[
						201, // create constant flow (10/mo)
						sf.agreements.cfa.address,
						web3.eth.abi.encodeParameters(
							["bytes", "bytes"],
							[
								sf.agreements.cfa.contract.methods
									.createFlow(
										inputTokenAddress,
										exchangeAddress,
										flowInput.toString(),
										"0x"
									)
									.encodeABI(), // callData
								"0x", // userData
							]
						),
					],
				];

				try {
					await sf.host.batchCall(call);
				} catch (e) {
					console.log(e.code);
					if (e.code == -32603) {
						console.log(e.code);
						document.getElementById(`error-${exchangeAddress}`).innerHTML =
							e.data.message;
						const timer = setTimeout(() => {
							document.getElementById(`error-${exchangeAddress}`).innerHTML =
								"";
						}, 5000);
					}
				}
			}
		} catch (e) {
			console.log(e);
		}

		// }
		console.log("Start Flow Batch Call Complete");
		document.getElementById(
			"input-amt-flowsReceived-" + inputTokenAddress.toLowerCase()
		).value = "";

		await this.sweepQueryFlows();
	}

	async sweepQueryFlows() {
		await this.queryFlows(
			wethxDaixExchangeAddress,
			"flowsReceived",
			WETHxAddress
		);
		await this.queryFlows(
			daixWethxExchangeAddress,
			"flowsReceived",
			DAIxAddress
		);
		await this.queryFlows(wethxDaixExchangeAddress, "flowsOwned", WETHxAddress);
		await this.queryFlows(daixWethxExchangeAddress, "flowsOwned", DAIxAddress);
	}

	// async getFlowDeets() {
	//   /// NOTE: This is a very time consuming sections because its all web3 calls
	//   console.log('Calculating Total Value Streaming...')
	//   this.setState({
	//     userFlowDeets: await this.state.sfUser.details(),
	//     daiFlowInfo: await this.state.daiUser.details(),
	//     wethFlowInfo: await this.state.wethUser.details()
	//   })

	//   console.log("Outflows", this.state.wethFlowInfo);

	//   try {
	//     let temp = (await this.state.daiFlowInfo.cfa.flows.inFlows.filter(flow => flow.sender === this.state.account))[0]
	//     this.setState({
	//       daiFlowRate: (temp === undefined) ? 0 : temp.flowRate
	//     })
	//   } catch (e) {
	//     if (e instanceof TypeError) {
	//       console.log("No DAI flow")
	//     }
	//   }

	//   try {
	//     // console.log("Flowrate", await this.state.wethFlowInfo.cfa.flows.inFlows.filter(flow => flow.receiver === this.state.wethxDaixExchangeAddress))
	//     let temp = (await this.state.wethFlowInfo.cfa.flows.inFlows.filter(flow => flow.sender === this.state.account))[0]
	//     this.setState({
	//       wethFlowRate: (temp === undefined) ? 0 : temp.flowRate
	//     })
	//   } catch (e) {
	//     if (e instanceof TypeError) {
	//       console.log("No WETH flow")
	//     }
	//   }

	//   console.log('Total Value Streaming Calculation Complete')
	//   document.getElementById("data-loading").innerHTML = "✔"

	// }

	// make sure address passed in is LOWER CASE!!!

	async queryFlows(queryAddress, receiveOrOwned, tokenAddress) {
		const QUERY_URL = `https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-matic`;

		const query = `{
      account(id: "${queryAddress.toLowerCase()}") {
          flowsOwned {
              lastUpdate
              flowRate
              sum
              recipient {
                id
              }
              token {
                  id
                  symbol
              }
              events {
                flowRate
                sum
                transaction {
                  timestamp
                }
              }
          }
          flowsReceived {
            lastUpdate
            flowRate
            sum
            owner {
              id
            }
            token {
                id
                symbol
            }
            events {
              flowRate
              sum
              transaction {
                timestamp
              }
            }
          }

      }
    }`;

		// When doing the totalFlowed = timeDelta*flowRate + sum, it appears sum is terribly off
		// TODO: ask Fran why I'm getting 26 when it should be like 3
		// For now, only showing Streamed So Far since last time flow was changed
		const result = await axios.post(QUERY_URL, { query });
		console.log("GraphQL Result");

		// If the user doesn't have any flows, you need to make sure flowQuery doesn't get set to null so rendering the empty doesn't crash
		if (result.data.data.account != null) {
			this.setState({
				flowQuery: result.data.data.account,
			});
		} else {
			this.setState({
				flowQuery: { flowsOwned: [], flowsReceived: [] },
			});
		}

		console.log(this.state.flowQuery);

		let sum = 0;

		// Only time we sum flowsOwned is to show user current streaming amount
		if (receiveOrOwned == "flowsReceived") {
			await this.state.flowQuery["flowsReceived"].forEach((flow) => {
				if (
					flow["token"]["id"] == tokenAddress.toLowerCase() &&
					flow["owner"]["id"] == this.state.account.toLowerCase()
				) {
					sum += parseInt(flow["flowRate"]);
				}
			});
			document.getElementById(
				"input-amt-" + receiveOrOwned + "-" + tokenAddress.toLowerCase()
			).placeholder = ((sum / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(3);
		}
		// If we're getting sum of flowsReceived, we're trying to show how much TVS the stream market has
		else if (receiveOrOwned == "flowsOwned") {
			await this.state.flowQuery["flowsReceived"].forEach((flow) => {
				if (flow["token"]["id"] == tokenAddress.toLowerCase()) {
					sum += parseInt(flow["flowRate"]);
				}
			});
			document.getElementById(
				"flowsOwned" + "-" + tokenAddress.toLowerCase()
			).innerHTML = ((sum / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(3);
			document.getElementById(
				"totalFlows" + "-" + tokenAddress.toLowerCase()
			).innerHTML = this.state.flowQuery["flowsReceived"].length;
		}

		console.log(
			`sum ${sum} | ${receiveOrOwned} | token: ${tokenAddress} | Stream market ${queryAddress}`
		);
	}

	async approveDAI() {
		var tokenInst = new this.state.web3.eth.Contract(erc20ABI, DAIAddress);

		await tokenInst.methods
			.approve(DAIxAddress, "1" + "0".repeat(42))
			.send({ from: this.state.account });
		await this.checkIfApproved(DAIAddress, DAIxAddress);
	}

	async approveETH() {
		var tokenInst = new this.state.web3.eth.Contract(erc20ABI, WETHAddress);

		await tokenInst.methods
			.approve(WETHxAddress, "1" + "0".repeat(42))
			.send({ from: this.state.account });
		await this.checkIfApproved(WETHAddress, WETHxAddress);
	}

	async upgradeDAI() {
		var tokenInstx = new this.state.web3.eth.Contract(
			superTokenABI,
			DAIxAddress
		);
		var upgradeAmount = document.getElementById(
			`upgrade-amount-${DAIAddress}`
		).value;

		if (upgradeAmount > 0) {
			await tokenInstx.methods
				.upgrade(this.state.web3.utils.toWei(upgradeAmount, "ether"))
				.send({ from: this.state.account });
		}

		document.getElementById(`upgrade-amount-${DAIAddress}`).value = "";
		await this.sweepTokenBalanceUpdate();
	}

	async upgradeETH() {
		var tokenInstx = new this.state.web3.eth.Contract(
			superTokenABI,
			WETHxAddress
		);
		var upgradeAmount = document.getElementById(
			`upgrade-amount-${WETHAddress}`
		).value;

		if (upgradeAmount > 0) {
			await tokenInstx.methods
				.upgrade(this.state.web3.utils.toWei(upgradeAmount, "ether"))
				.send({ from: this.state.account });
		}

		document.getElementById(`upgrade-amount-${WETHAddress}`).value = "";
		await this.sweepTokenBalanceUpdate();
	}

	async downgradeDAIx() {
		var tokenInstx = new this.state.web3.eth.Contract(
			superTokenABI,
			DAIxAddress
		);
		var downgradeAmount = document.getElementById(
			`downgrade-amount-${DAIxAddress}`
		).value;

		if (downgradeAmount > 0) {
			await tokenInstx.methods
				.downgrade(this.state.web3.utils.toWei(downgradeAmount, "ether"))
				.send({ from: this.state.account });
		}

		document.getElementById(`downgrade-amount-${DAIxAddress}`).value = "";
		await this.sweepTokenBalanceUpdate();
	}

	async downgradeETHx() {
		var tokenInstx = new this.state.web3.eth.Contract(
			superTokenABI,
			WETHxAddress
		);
		var downgradeAmount = document.getElementById(
			`downgrade-amount-${WETHxAddress}`
		).value;

		if (downgradeAmount > 0) {
			await tokenInstx.methods
				.downgrade(this.state.web3.utils.toWei(downgradeAmount, "ether"))
				.send({ from: this.state.account });
		}

		document.getElementById(`downgrade-amount-${WETHxAddress}`).value = "";
		await this.sweepTokenBalanceUpdate();
	}

	async checkIfApproved(tokenAddress, superTokenAddress) {
		// hasApproved is false by default
		var tokenInst = new this.state.web3.eth.Contract(erc20ABI, tokenAddress);

		await tokenInst.methods
			.allowance(this.state.account, superTokenAddress)
			.call()
			.then((amount) => {
				console.log("Token Address", tokenAddress);
				console.log("Super Token Address", superTokenAddress);
				console.log("Amount Approved:", parseInt(amount));
				console.log(
					"Balance",
					parseInt(this.state.tokenBalances[superTokenAddress])
				);
				if (
					parseInt(amount) >
					parseInt(this.state.tokenBalances[superTokenAddress])
				) {
					// if the user has approved DAI before, hasAppreovedDAI is marked true
					this.setState({
						hasApproved: true,
					});
				} else {
					this.setState({
						hasApproved: false,
					});
				}
				console.log(`Enough ${tokenAddress} Approved?`, this.state.hasApproved);
			});

		if (this.state.hasApproved) {
			document.getElementById(`approve-button-${tokenAddress}`).disabled = true;
			document.getElementById(
				`upgrade-button-${tokenAddress}`
			).disabled = false;
		} else {
			document.getElementById(`upgrade-button-${tokenAddress}`).disabled = true;
			document.getElementById(
				`approve-button-${tokenAddress}`
			).disabled = false;
		}
	}

	async approveSubscription(tokenAddress, exchangeAddress) {
		const web3 = new Web3(window.ethereum);
		let sf = this.state.sf;

		let call = [
			[
				201, // approve the ticket fee
				sf.agreements.ida.address,
				web3.eth.abi.encodeParameters(
					["bytes", "bytes"],
					[
						sf.agreements.ida.contract.methods
							.approveSubscription(
								tokenAddress,
								exchangeAddress,
								1, // INDEX_ID
								"0x"
							)
							.encodeABI(), // callData
						"0x", // userData
					]
				),
			],
		];

		await sf.host
			.batchCall(call)
			.catch((err) => alert("You've already approved RIC for this exchange."));
	}

	render() {
		return (
			<body class="bod">
				<div class="container">
					<br />
					<div class="row">
						<div class="col-6">
							<img
								src="logo-png2.png"
								style={{
									width: "15%",
									float: "left",
									marginRight: 20,
									marginBottom: 20,
								}}
							></img>
							<h5 style={{ float: "right", color: "white" }}>
								<span id="wallet-address" class="badge bg-secondary">
									{this.state.account.substring(0, 10)}...
								</span>
							</h5>
						</div>
						<div class="col-6">
							<h5 class="badge bg-primary">
								<a
									target="_blank"
									style={{ textDecoration: "none", color: "white" }}
									href="./RicochetExchangeWhitepaper.pdf"
								>
									Whitepaper
								</a>
							</h5>
							&nbsp;
							<h5 class="badge bg-primary">
								<a
									target="_blank"
									style={{ textDecoration: "none", color: "white" }}
									href="https://docs.ricochet.exchange/"
								>
									Docs
								</a>
							</h5>
							&nbsp;
							<h5 class="badge bg-primary">
								<a
									target="_blank"
									style={{ textDecoration: "none", color: "white" }}
									href="https://discord.gg/mss4t2ED3y"
								>
									Discord
								</a>
							</h5>
							&nbsp;
							{/* <h5 id="data-loading" class="badge bg-warning">Loading Data...</h5>&nbsp; */}
							<h5 style={{ float: "right" }}>
								<span class="badge bg-info">
									<span id="balance-0x263026e7e53dbfdce5ae55ade22493f828922965">
										{(
											this.state.tokenBalances[RICAddress] / Math.pow(10, 18)
										).toFixed(6)}
									</span>{" "}
									RIC{" "}
								</span>
							</h5>
						</div>
					</div>

					<div class="row">
						<div class="col-6"></div>
						<div class="col-6"></div>
					</div>

					<div class="row">
						<div class="col-6">
							<div class="card">
								<div class="card-body market">
									<h5 class="card-title">
										<a
											target="_blank"
											style={{ textDecoration: "none", color: "black" }}
											href="https://polygonscan.com/address/0x27C7D067A0C143990EC6ed2772E7136Cfcfaecd6"
										>
											DAI >> WETH
										</a>
									</h5>
									<hr></hr>

									<div>
										<h5>
											<span class="badge bg-primary">
												Your Balance:{" "}
												{(
													this.state.tokenBalances[DAIxAddress] /
													Math.pow(10, 18)
												).toFixed(6)}{" "}
												DAIx
											</span>
											<br />
										</h5>
										<input
											type="text"
											class="field-input"
											id="input-amt-flowsReceived-0x1305f6b6df9dc47159d12eb7ac2804d4a33173c2"
											placeholder={"-"}
										/>
										<button
											id="startFlowButton"
											class="button_slide slide_right"
											onClick={() =>
												this.startFlow(
													daixWethxExchangeAddress,
													DAIxAddress,
													WETHxAddress
												)
											}
										>
											Start/Edit
										</button>
										<button
											id="stopFlowButton"
											class="button_slide slide_right"
											onClick={() =>
												this.stopFlow(daixWethxExchangeAddress, DAIxAddress)
											}
										>
											Stop
										</button>
										<button
											id="approveRICButton"
											class="button_slide slide_right"
											onClick={() => this.approveSubscription(RICAddress, daixWethxExchangeAddress)}
										>
											Approve RIC
										</button>
										<p>DAIx/month</p>
										<p
											id="error-0x27C7D067A0C143990EC6ed2772E7136Cfcfaecd6"
											style={{ color: "grey" }}
										></p>
									</div>
									<p class="one-off">
										Total Value Streaming:{" "}
										<span
											id="flowsOwned-0x1305f6b6df9dc47159d12eb7ac2804d4a33173c2"
											style={{ color: "black" }}
										></span>{" "}
										DAIx/month
									</p>
									<p class="one-off">
										Total Streams:{" "}
										<span
											id="totalFlows-0x1305f6b6df9dc47159d12eb7ac2804d4a33173c2"
											style={{ color: "black" }}
										></span>{" "}
									</p>
									{/* {( ( this.state.daiFlowInfo.cfa.netFlow*(30*24*60*60) )/Math.pow(10,18) ).toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} */}
								</div>
							</div>
							<br />
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Upgrade DAI to DAIx</h5>
									<hr></hr>
									<table id="upgrade-table">
										<tr>
											<td>
												<input
													type="text"
													class="field-input"
													id="upgrade-amount-0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
													placeholder={"Amount"}
												/>
											</td>
											<td>
												<button
													id="approve-button-0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
													class="button_slide"
													onClick={this.approveDAI}
												>
													Approve
												</button>
											</td>
											<td>
												<button
													id="upgrade-button-0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
													class="button_slide slide_right"
													onClick={this.upgradeDAI}
												>
													Upgrade
												</button>
											</td>
										</tr>
										<tr>
											<td class="one-off">
												Your DAI Balance:{" "}
												{(
													this.state.tokenBalances[DAIAddress] /
													Math.pow(10, 18)
												).toFixed(6)}
											</td>
										</tr>
									</table>
								</div>
							</div>
							<br />
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Downgrade DAIx to DAI</h5>
									<hr></hr>
									<table id="upgrade-table">
										<tr>
											<td>
												<input
													type="text"
													class="field-input"
													id="downgrade-amount-0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2"
													placeholder={"Amount"}
												/>
											</td>
											<td>
												<button
													id="downgrade-button-0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2"
													class="button_slide slide_right"
													onClick={this.downgradeDAIx}
												>
													Downgrade
												</button>
											</td>
										</tr>
										<tr>
											<td class="one-off">
												Your DAIx Balance:{" "}
												{(
													this.state.tokenBalances[DAIxAddress] /
													Math.pow(10, 18)
												).toFixed(6)}
											</td>
										</tr>
									</table>
								</div>
							</div>
							<br />
              <div class="card">
								<div class="card-body">
									<h5 class="card-title">Approve DAIx Subscription</h5>
									<hr></hr>
                  <button
                    id="approveDAIxButton"
                    class="button_slide slide_right"
                    onClick={() => this.approveSubscription(DAIxAddress, wethxDaixExchangeAddress)}
                  >
                    Approve DAIx Subscription
                  </button>
								</div>
							</div>
						</div>

						<div class="col-6">
							<div class="card">
								<div class="card-body market">
									<h5 class="card-title">
										<a
											target="_blank"
											style={{ textDecoration: "none", color: "black" }}
											href="https://polygonscan.com/address/0x5786D3754443C0D3D1DdEA5bB550ccc476FdF11D"
										>
											ETH >> DAI
										</a>
									</h5>
									<hr></hr>
									<div>
										<h5>
											<span class="badge bg-primary">
												Your Balance:{" "}
												{(
													this.state.tokenBalances[WETHxAddress] /
													Math.pow(10, 18)
												).toFixed(6)}{" "}
												WETHx{" "}
											</span>
											<br />
										</h5>
										<input
											type="text"
											class="field-input"
											id="input-amt-flowsReceived-0x27e1e4e6bc79d93032abef01025811b7e4727e85"
											placeholder={"-"}
										/>
										<button
											id="startFlowButton"
											class="button_slide slide_right"
											onClick={() =>
												this.startFlow(
													wethxDaixExchangeAddress,
													WETHxAddress,
													DAIxAddress
												)
											}
										>
											Start/Edit
										</button>
										<button
											id="stopFlowButton"
											class="button_slide slide_right"
											onClick={() =>
												this.stopFlow(wethxDaixExchangeAddress, WETHxAddress)
											}
										>
											Stop
										</button>
										<button
											id="approveRicWethButton"
											class="button_slide slide_right"
											onClick={() => this.approveSubscription(RICAddress, wethxDaixExchangeAddress)}
										>
											Approve RIC
										</button>
										<p>WETHx/month</p>
										<p
											id="error-0x5786D3754443C0D3D1DdEA5bB550ccc476FdF11D"
											style={{ color: "grey" }}
										></p>
									</div>
									<p class="one-off">
										Total Value Streaming:{" "}
										<span
											id="flowsOwned-0x27e1e4e6bc79d93032abef01025811b7e4727e85"
											style={{ color: "black" }}
										></span>{" "}
										ETHx/month
									</p>
									<p class="one-off">
										Total Streams:{" "}
										<span
											id="totalFlows-0x27e1e4e6bc79d93032abef01025811b7e4727e85"
											style={{ color: "black" }}
										></span>{" "}
									</p>
									{/* {( ( this.state.wethFlowInfo.cfa.netFlow*(30*24*60*60) )/Math.pow(10,18) ).toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} */}
								</div>
							</div>
							<br />

							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Upgrade ETH to ETHx</h5>
									<hr></hr>
									<table id="upgrade-table">
										<tr>
											<td>
												<input
													type="text"
													class="field-input"
													id="upgrade-amount-0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
													placeholder={"Amount"}
												/>
											</td>
											<td>
												<button
													id="approve-button-0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
													class="button_slide"
													onClick={this.approveETH}
												>
													Approve
												</button>
											</td>
											<td>
												<button
													id="upgrade-button-0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
													class="button_slide slide_right"
													onClick={this.upgradeETH}
												>
													Upgrade
												</button>
											</td>
										</tr>
										<tr>
											<td class="one-off">
												Your WETH Balance:{" "}
												{(
													this.state.tokenBalances[WETHAddress] /
													Math.pow(10, 18)
												).toFixed(6)}
											</td>
										</tr>
									</table>
								</div>
							</div>

							<br />
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Downgrade WETHx to WETH</h5>
									<hr></hr>
									<table id="upgrade-table">
										<tr>
											<td>
												<input
													type="text"
													class="field-input"
													id="downgrade-amount-0x27e1e4E6BC79D93032abef01025811B7E4727e85"
													placeholder={"Amount"}
												/>
											</td>
											<td>
												<button
													id="downgrade-button-0x27e1e4E6BC79D93032abef01025811B7E4727e85"
													class="button_slide slide_right"
													onClick={this.downgradeETHx}
												>
													Downgrade
												</button>
											</td>
										</tr>
										<tr>
											<td class="one-off">
												Your WETHx Balance:{" "}
												{(
													this.state.tokenBalances[WETHxAddress] /
													Math.pow(10, 18)
												).toFixed(6)}
											</td>
										</tr>
									</table>
								</div>
							</div>
							<br />

              <div class="card">
								<div class="card-body">
									<h5 class="card-title">Approve ETHx Subscription</h5>
									<hr></hr>
                  <button
                    id="approveETHxButton"
                    class="button_slide slide_right"
                    onClick={() => this.approveSubscription(WETHxAddress, daixWethxExchangeAddress)}
                  >
                    Approve DAIx Subscription
                  </button>
								</div>
							</div>

						</div>
					</div>

					<div class="col-2">
						<p></p>
					</div>
				</div>
			</body>
		);
	}
}

export default App;

// calcing flow rate: 10 DAI/month:
// {"cfa":
//   {"flows":
//     {"inFlows":[],
//     "outFlows":[{"sender":"0xc41876DAB61De145093b6aA87417326B24Ae4ECD",
//                  "receiver":"0xf40C0a8D9bCf57548a6afF14374ac02D2824660A",
//                  "flowRate":"3858024691358"}]},
//     "netFlow":"-3858024691358"},
//   "ida":{"subscriptions":[]}}

// If
