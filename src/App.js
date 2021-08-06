// import logo from './logo.svg';
import Web3 from 'web3';
import React, { useState, Component } from 'react';
import './App.css';
import { chainId, DAIxAddress, DAIAddress, WETHxAddress, WETHAddress, RICAddress, hostAddress, idaAddress, rickosheaAppAddress, wethxDaixExchangeAddress, daixWethxExchangeAddress } from "./polygon_config";
import { erc20ABI, sfABI, idaABI, superTokenABI } from "./abis"
import axios from 'axios';

const { web3tx, toWad, wad4human } = require("@decentral.ee/web3-helpers");
const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { Web3Provider } = require("@ethersproject/providers");

// TODO: catch if user is not on Goerli
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: "-",                                           // User's address
      network: "",                                            // network that user is on - TODO: react to network change
      balance: "",                                            // not used
      loading: true,                                          // (not used yet) boolean for if base interface has loaded
      isConnectedBrowserWallet:false,                         // boolean for if the user has browser web3 connected
      isConnectedChain:false,                                 // boolean for if the user is on correct chain
      web3: null,                                             // Window-injected web3 object
      sf: null,                                               // Superfluid SDK object
      sfUser:null,                                            // Superfluid User object (tied to a specific token)
      daiUser:null,                                           // Superfluid User object for contract, used so we can get netflow
      wethUser:null,                                           // Superfluid User object for contract, used so we can get netflow
      host:null,                                              // Superfluid host contract instance
      ida:null,
      daiFlowRate: 0,
      wethFlowRate: 0,                                        // Superfluid Instant Distribution Agreement contract instance
      superAppFlowAmount:"",                                  // How much the user has streaming (storing as instance variable so it can be shown on front end)
      isSubscribed:false,                                     // True if the user has approved the streaming
      userFlowDeets:{cfa: {
        netFlow:"-",
        }
      },                                                      // Json details on the user's flows from user.details() -> getFlowDeets()
      daiFlowInfo:{cfa: {
        netFlow:"-",
        }
      },
      wethFlowInfo:{cfa: {
        netFlow:"-",
        }
      },                                                       // Json details on the user's flows from user.details() -> getFlowDeets()
      flowQuery:{ flowsOwned: [] , flowsReceived: [] },        // Json details on user's flows from subgraph query -> queryFlows()
      tokenBalances: {},
      tokens: {
        wethx: WETHxAddress,
        daix: DAIxAddress
      },
      wethxDaixExchangeAddress: wethxDaixExchangeAddress,
      daixWethxExchangeAddress: daixWethxExchangeAddress,
    };

    this.startFlow = this.startFlow.bind(this);
    this.stopFlow = this.stopFlow.bind(this);
    this.upgrade = this.upgrade.bind(this);
    this.checkIfDAIxApproved = this.checkIfDAIxApproved.bind(this);
    this.approveDAI = this.approveDAI.bind(this);
    this.approveRIC = this.approveRIC.bind(this);
    this.getTokenBalance = this.getTokenBalance.bind(this);
    this.sweepTokenBalanceUpdate = this.sweepTokenBalanceUpdate.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const web3 = new Web3(window.ethereum)
    try {
      // WEB3 SET UP
      this.setState({
        isConnectedChain : (await web3.eth.getChainId()) == chainId
      })
      console.log("Correct chain?",this.state.isConnectedChain)

      // Connecting to browser injected web3
      try {
        await window.ethereum.enable()
        this.setState({isConnectedBrowserWallet:true})
        this.setState({web3:web3})
        // Getting user account
        await web3.eth.getAccounts((error,accounts) => {
          this.setState({account:accounts[0]})
          console.log(accounts)
        })
      } catch {
        document.getElementById("approve-button").disabled = true
        document.getElementById("upgrade-button").disabled = true
        document.getElementById("startFlowButton").disabled = true
        document.getElementById("stopFlowButton").disabled = true
        window.alert('Browser wallet not detected - please install Metamask to use dApp')
      }

      if ( !this.state.isConnectedChain )  {
        document.getElementById("approve-button").disabled = true
        document.getElementById("upgrade-button").disabled = true
        document.getElementById("startFlowButton").disabled = true
        document.getElementById("stopFlowButton").disabled = true
        window.alert('Incorrect Chain - Please switch to Matic Mainnet')
      }

      // Getting user data and superfluid framework initialized
      if (this.state.isConnectedBrowserWallet && this.state.isConnectedChain) {

        // Initializing Superfluid framework
        const sf = new SuperfluidSDK.Framework({
          ethers: new Web3Provider(window.ethereum),
          tokens: ['DAI','ETH'],
          version: "v1"
        });
        await sf.initialize()

        // Setting some Superfluid instance variables
        // NOTE: this part could be adjusted if working with different input tokens (not just DAIx)
        await this.setState({
          sf: sf,
          sfUser: sf.user({
            address: this.state.account,
            token: DAIxAddress
          }),
          daiUser: sf.user({
            address: daixWethxExchangeAddress,
            token: DAIxAddress
          }),
          wethUser: sf.user({
            address: wethxDaixExchangeAddress,
            token: WETHxAddress
          })
        })


        console.log("SF USER SET",this.state.sfUser)

        // Initializing Superfluid SuperApp components
        this.setState({
          host: await new web3.eth.Contract(
            sfABI,
            hostAddress
          )
        })
        console.log("Host Address:",this.state.host._address)
        this.setState({
          ida: await new web3.eth.Contract(
            idaABI,
            idaAddress
          )
        })
        console.log("IDA Address:",this.state.ida._address)

        let user = this.state.account;
        let isSubscribed =  await this.state.ida.methods.getSubscription(
                                      WETHxAddress,
                                      rickosheaAppAddress, // publisher
                                      0, // indexId
                                      user).call()
        this.setState({
          isSubscribed: isSubscribed.approved
        })
        console.log("Is Approved?", this.state.isSubscribed)
      }

    } catch(err) {
      console.log("ERROR IN WEB3 SET UP:", err)
    }

    if (this.state.isConnectedBrowserWallet && this.state.isConnectedChain) {
      this.getFlowDeets()
      this.queryFlows()
      this.sweepTokenBalanceUpdate()
      this.checkIfDAIxApproved()
      // setInterval(() => this.getTokenBalance(this.state.account,DAIxAddress),100000);
      // setInterval(() => this.getTokenBalance(this.state.account,WETHxAddress),100000);
    }

    try {
      window.ethereum.on('accountsChanged', function (accounts) {
        // Re-do the WEB3 SET UP if accounts are changed
        window.location.reload()
      }.bind(this))
    } catch (err) {
      console.log("Error in handling account set up",err)
    }
    // Handling chain switch
    // try {
    try{
      window.ethereum.on('chainChanged', function (accounts) {
        // Re-do the WEB3 SET UP if chain is changed
        console.log("CHAIN CHANGE, RELOADING WEB3 SET UP")
        // this.loadData()
        window.location.reload()
      }.bind(this))
    } catch {
      console.log("Error in handling chain set up")
    }

  }

  async getTokenBalance(userAddress,tokenAddress) {
    var tokenInst = new this.state.web3.eth.Contract(erc20ABI,tokenAddress);
    tokenInst.methods.balanceOf(userAddress).call().then(function (bal) {
        document.getElementById(`balance-${tokenAddress}`).innerHTML = (bal/1000000000000000000).toFixed(7)
        // Appending to the tokenBalances instance variable dictionary
        let copyBalance = this.state.tokenBalances
        copyBalance[tokenAddress] = bal
        this.setState({tokenBalances : copyBalance})
    }.bind(this))
  }

  async sweepTokenBalanceUpdate() {
    this.getTokenBalance(this.state.account,DAIxAddress)
    this.getTokenBalance(this.state.account,WETHxAddress)
    this.getTokenBalance(this.state.account,RICAddress)
    this.getTokenBalance(this.state.account,DAIAddress)
  }

  async stopFlow(exchangeAddress, inputTokenAddress) {
    let sf = this.state.sf
    let sfUser = sf.user({
      address: this.state.account,
      token: inputTokenAddress
    })
    console.log("Stopping flow with:",sfUser)
    await sfUser.flow({
      recipient: await sf.user({ address: exchangeAddress, token: inputTokenAddress }),
      flowRate: "0"
    });
    this.getFlowDeets()
    document.getElementById("input-amt-"+DAIxAddress).value = ""
  }

  async startFlow(exchangeAddress, inputTokenAddress, outputTokenAddress) {
    const web3 = new Web3(window.ethereum)
    let sf = this.state.sf
    let sfUser = sf.user({
      address: this.state.account,
      token: inputTokenAddress
    })
    console.log("Creating flow with:",sfUser)
    let flowInput = Math.round( ( document.getElementById("input-amt-"+inputTokenAddress).value * Math.pow(10,18) ) / 2592000 ) // Say I start a stream of 10 DAIx per month. Is the flow in gwei (which is registered as to the second) calculated as [ (10 DAIx) *(10^18) ] / [30 * 24 * 60 * 60]  = 3858024691358.025 -> round to nearest int
    console.log("Would flow:",flowInput)
    let call = []

    let isSubscribed = await this.state.ida.methods.getSubscription(
                                  outputTokenAddress,
                                  exchangeAddress, // publisher
                                  0, // indexId
                                  sfUser.address).call()


    console.log("Is Subscribed? - ",isSubscribed.approved)

    if(isSubscribed.approved) {
      console.log("Already subscribed")

      await sfUser.flow({
        recipient: await sf.user({ address: exchangeAddress, token: inputTokenAddress }), // address: would be rickosheaAppaddress, currently not deployed
        flowRate: flowInput.toString()
      })

    } else {
      console.log("Beginning batch call")

      call = [
        [
            201,
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
                  "0x" // userData
              ]
            )
        ],
        // [
        //     201,
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
                  "0x" // userData
              ]
          )
        ],
      ]
    }

    await sf.host.batchCall(call);
    // }
    console.log("Start Flow Batch Call Complete")
    document.getElementById("input-amt-"+inputTokenAddress).value = ""

    this.getFlowDeets()

  }


  async getFlowDeets() {
    /// NOTE: This is a very time consuming sections because its all web3 calls
    console.log('Calculating Total Value Streaming...')
    this.setState({
      userFlowDeets: await this.state.sfUser.details(),
      daiFlowInfo: await this.state.daiUser.details(),
      wethFlowInfo: await this.state.wethUser.details()
    })

    console.log("Outflows", this.state.wethFlowInfo);

    try {
      let temp = (await this.state.daiFlowInfo.cfa.flows.inFlows.filter(flow => flow.sender === this.state.account))[0]
      this.setState({
        daiFlowRate: (temp === undefined) ? 0 : temp.flowRate
      })
    } catch (e) {
      if (e instanceof TypeError) {
        console.log("No DAI flow")
      }
    }

    try {
      // console.log("Flowrate", await this.state.wethFlowInfo.cfa.flows.inFlows.filter(flow => flow.receiver === this.state.wethxDaixExchangeAddress))
      let temp = (await this.state.wethFlowInfo.cfa.flows.inFlows.filter(flow => flow.sender === this.state.account))[0]
      this.setState({
        wethFlowRate: (temp === undefined) ? 0 : temp.flowRate
      })
    } catch (e) {
      if (e instanceof TypeError) {
        console.log("No WETH flow")
      }
    }

    console.log('Total Value Streaming Calculation Complete')
    document.getElementById("data-loading").innerHTML = "✔"

  }


  async queryFlows() {

    const QUERY_URL = `https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-matic`

    const query = `{
      account(id: "${daixWethxExchangeAddress.toLowerCase()}") {
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
    }`

    // When doing the totalFlowed = timeDelta*flowRate + sum, it appears sum is terribly off
    // TODO: ask Fran why I'm getting 26 when it should be like 3
    // For now, only showing Streamed So Far since last time flow was changed
    const result = await axios.post(QUERY_URL, { query })
    console.log(result)

    // If the user doesn't have any flows, you need to make sure flowQuery doesn't get set to null so rendering the empty doesn't crash
    if (result.data.data.account != null) {
      this.setState({
        flowQuery : result.data.data.account
      })
    } else {
      this.setState({
        flowQuery:{ flowsOwned: [] , flowsReceived: [] }
      })
    }
  }

  async approveDAI() {
    var tokenInst = new this.state.web3.eth.Contract(erc20ABI,DAIAddress)

    await tokenInst
    .methods.approve(
      DAIxAddress,
      "1" + "0".repeat(42),
    ).send({ from: this.state.account })
    this.checkIfDAIxApproved()
  }

  async upgrade() {
    var tokenInstx = new this.state.web3.eth.Contract(superTokenABI,DAIxAddress)
    var upgradeAmount = document.getElementById("upgrade-amount").value

    if (upgradeAmount > 0) {
      await tokenInstx
      .methods.upgrade(
        this.state.web3.utils.toWei(upgradeAmount,"ether")
      ).send({ from: this.state.account })
    }

    document.getElementById("upgrade-amount").value = ""
    this.sweepTokenBalanceUpdate()
  }

  async checkIfDAIxApproved() {
    // hasApprovedDAI is false by default
    var tokenInst = new this.state.web3.eth.Contract(erc20ABI,DAIAddress)

    await tokenInst.methods.allowance(this.state.account,DAIxAddress).call().then( (amount) => {
      if (parseInt(amount) >= parseInt(this.state.tokenBalances[DAIxAddress])) {
        // if the user has approved DAI before, hasAppreovedDAI is marked true
        this.setState({
          hasApprovedDAI: true
        })
        console.log("Enough DAIx Approved?",this.state.hasApprovedDAI)
      } else {
        this.setState({
          hasApprovedDAI: false
        })
        console.log("Enough DAIx Approved?",this.state.hasApprovedDAI)
      }
    })

    if (this.state.hasApprovedDAI) {
      document.getElementById("approve-button").disabled = true
      document.getElementById("upgrade-button").disabled = false
    } else {
      document.getElementById("upgrade-button").disabled = true
      document.getElementById("approve-button").disabled = false
    }

  }

  async approveRIC(exchangeAddress) {

    const web3 = new Web3(window.ethereum)
    let sf = this.state.sf

    let call = [
      [
          201, // approve the ticket fee
          sf.agreements.ida.address,
          web3.eth.abi.encodeParameters(
            ["bytes", "bytes"],
            [
                sf.agreements.ida.contract.methods
                    .approveSubscription(
                        RICAddress,
                        exchangeAddress,
                        1, // INDEX_ID
                        "0x"
                    )
                    .encodeABI(), // callData
                "0x" // userData
            ]
          )
      ]
    ]


    await sf.host.batchCall(call).catch(err => alert("You've already approved RIC for this exchange."))


  }


  render() {
    return (
      <body class="bod">
      <div class="container">
        <br/>
          <div class="row">

            <div class= "col-6">
              <h5 style={{float:"right" }}>Your Wallet: <span id="wallet-address" class="badge bg-secondary">{this.state.account}</span></h5>
            </div>
            <div class= "col-6">
            <h5 class="badge bg-primary"><a target="_blank" style={{textDecoration:"none", color:"white" }} href="./RicochetExchangeWhitepaper.pdf">Whitepaper</a></h5>&nbsp;
            <h5 class="badge bg-primary"><a target="_blank" style={{textDecoration:"none", color:"white" }} href="https://docs.ricochet.exchange/">Docs</a></h5>&nbsp;
            <h5 class="badge bg-primary"><a target="_blank" style={{textDecoration:"none", color:"white" }} href="https://discord.gg/mss4t2ED3y">Discord</a></h5>&nbsp;
            <h5 id="data-loading" class="badge bg-warning">Loading Data...</h5>&nbsp;
            <h5 style={{float:"right" }}><span class="badge bg-info"><span id="balance-0x263026e7e53dbfdce5ae55ade22493f828922965">0</span> RIC </span></h5>
            </div>

          </div>

          <div class="row">
            <div class= "col-6">
            </div>
            <div class= "col-6">
            </div>
          </div>


          <div class="row">
            <div class="col-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><a target="_blank" style={{textDecoration:"none", color:"black" }} href="https://polygonscan.com/address/0x27C7D067A0C143990EC6ed2772E7136Cfcfaecd6">DAI >> ETH</a></h5>
                <hr></hr>

                <div>
                  <h5><span class="badge bg-primary">Your Balance: <span id='balance-0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2'>0</span> DAIx</span><br/></h5>
                  <input type="text" class="field-input" id="input-amt-0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2" placeholder={( ( this.state.daiFlowRate*(30*24*60*60) )/Math.pow(10,18) ).toFixed(4)}/>

                  <button id="startFlowButton" class="button_slide slide_right" onClick={() => this.startFlow(this.state.daixWethxExchangeAddress, this.state.tokens.daix, this.state.tokens.wethx)}>Start</button>
                  <button id="stopFlowButton" class="button_slide slide_right" onClick={() => this.stopFlow(this.state.daixWethxExchangeAddress, this.state.tokens.daix)}>Stop</button>
                  <button id="approveRicDaiButton" class="button_slide slide_right" onClick={() => this.approveRIC(this.state.daixWethxExchangeAddress)}>Approve RIC</button>
                  <p>DAIx/month</p>
                </div>
                <p class="one-off">Total Value Streaming: {( ( this.state.daiFlowInfo.cfa.netFlow*(30*24*60*60) )/Math.pow(10,18) ).toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} DAIx/month</p>

              </div>
            </div>
            <br/>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Upgrade Your DAI to DAIx Here</h5>
                <hr></hr>
                <table id = "upgrade-table">
                  <tr>
                    <td><input type="text" class="field-input" id="upgrade-amount" placeholder={"Amount"}/></td>
                    <td><button id="approve-button" class="button_slide" onClick={this.approveDAI}>Approve</button></td>
                    <td><button id="upgrade-button" class="button_slide slide_right" onClick={this.upgrade}>Upgrade</button></td>
                  </tr>
                  <tr>
                    <td class="one-off">Your DAI Balance: <span id="balance-0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063">Loading</span></td>
                  </tr>
                </table>
              </div>
            </div>
            </div>
            <div class="col-6">

              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"><a target="_blank" style={{textDecoration:"none", color:"black" }}  href="https://polygonscan.com/address/0x5786D3754443C0D3D1DdEA5bB550ccc476FdF11D">ETH >> DAI</a></h5>
                  <hr></hr>
                  <div>
                    <h5><span class="badge bg-primary">Your Balance: <span id="balance-0x27e1e4E6BC79D93032abef01025811B7E4727e85">0</span> WETHx </span><br/></h5>
                    <input type="text" class="field-input" id="input-amt-0x27e1e4E6BC79D93032abef01025811B7E4727e85" placeholder={( -( this.state.wethFlowRate*(30*24*60*60) )/Math.pow(10,18) * -1).toFixed(4)}/>
                    <button id="startFlowButton" class="button_slide slide_right" onClick={() => this.startFlow(this.state.wethxDaixExchangeAddress, this.state.tokens.wethx, this.state.tokens.daix)}>Start</button>
                    <button id="stopFlowButton" class="button_slide slide_right" onClick={() => this.stopFlow(this.state.wethxDaixExchangeAddress, this.state.tokens.wethx)}>Stop</button>
                    <button id="approveRicWethButton" class="button_slide slide_right" onClick={() => this.approveRIC(this.state.wethxDaixExchangeAddress)}>Approve RIC</button>
                    <p>WETHx/month</p>
                  </div>
                  <p class="one-off">Total Value Streaming: {( ( this.state.wethFlowInfo.cfa.netFlow*(30*24*60*60) )/Math.pow(10,18)).toFixed(6).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} ETHx/month</p>

                </div>
              </div>
              <br/>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Network Config</h5>
                  <hr></hr>
                  <table id = "network-table">
                    <td colspan="2">
                      <p>To use Matic-Mainnet with Superfluid, you'll need the below RPC URL to connect your Metamask to a Polygon node.</p>
                    </td>

                    <tr>
                      <td class="network-items">Network Name</td>
                      <td>Matic Mainnet</td>
                    </tr>
                    <tr>
                      <td class="network-items">Chain ID</td>
                      <td>137</td>
                    </tr>
                    <tr>
                      <td class="network-items">Gas Token</td>
                      <td>MATIC</td>
                    </tr>
                    <tr>
                      <td class="network-items">RPC</td>
                      <td>https://rpc-endpoints.superfluid.dev/matic</td>
                    </tr>

                  </table>
                </div>
              </div>
              <br/>

            </div>
          </div>


          <div class= "col-2">
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
