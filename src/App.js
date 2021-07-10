// import logo from './logo.svg';
import Web3 from 'web3';
import React, { useState, Component } from 'react';
import './App.css';
import { DAIxAddress, DAIAddress, WETHxAddress, WETHAddress, RICAddress, hostAddress, idaAddress, rickosheaAppAddress } from "./polygon_config";
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
      account: "-",                // User's address
      network: "",                 // network that user is on - TODO: react to network change
      balance: "",                 // not used
      loading: true,               // (not used yet) boolean for if base interface has loaded
      notConnected: true,          // (not used yet) boolean for if the user has connected wallet
      web3: null,                  // Window-injected web3 object
      sf: null,                    // Superfluid SDK object
      sfUser:null,                 // Superfluid User object (tied to a specific token)
      ricUser:null,                // Superfluid User object for contract, used so we can get netflow
      host:null,                   // Superfluid host contract instance
      ida:null,                    // Superfluid Instant Distribution Agreement contract instance
      superAppFlowAmount:"",                  // How much the user has streaming (storing as instance variable so it can be shown on front end)
      isSubscribed:false,          // True if the user has approved the streaming
      userFlowDeets:{cfa: {
        netFlow:"-",
        }
      },                                                   // Json details on the user's flows from user.details() -> getFlowDeets()
      ricoFlowDeets:{cfa: {
        netFlow:"-",
        }
      },                                                   // Json details on the user's flows from user.details() -> getFlowDeets()
      flowQuery:{ flowsOwned: [] , flowsReceived: [] },    // Json details on user's flows from subgraph query -> queryFlows() 
    };

    this.startFlow = this.startFlow.bind(this);
    this.stopFlow = this.stopFlow.bind(this);
    this.getOnlySuperAppFlows = this.getOnlySuperAppFlows.bind(this);
    this.upgrade = this.upgrade.bind(this);
    this.checkIfDAIxApproved = this.checkIfDAIxApproved.bind(this);
    this.approveDAI = this.approveDAI.bind(this);
    this.sweepTokenBalanceUpdate = this.sweepTokenBalanceUpdate.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const web3 = new Web3(window.ethereum)
    try {
      // WEB3 SET UP
      //TODO: handle network switch

      // Connecting to browser injected web3
      await window.ethereum.enable()
      this.setState({notConnected:false})
      this.setState({web3:web3})

      // Gettin user account
      await web3.eth.getAccounts((error,accounts) => {
        this.setState({account:accounts[0]})
        console.log(accounts)
      })

      // Initializing Superfluid framework
      const sf = new SuperfluidSDK.Framework({
        ethers: new Web3Provider(window.ethereum),
        tokens: ['DAI','ETH'],
        version: "v1"
      });
      await sf.initialize()

      // Setting some Superfluid instance variables
      // NOTE: this part could be adjusted if working with different input tokens (not just DAIx)
      this.setState({
        sf: sf,
        sfUser: sf.user({
          address: this.state.account,
          token: DAIxAddress
        }),
        ricUser: sf.user({
          address: rickosheaAppAddress,
          token: DAIxAddress
        })
      })

      console.log(this.state.sfUser)

      this.getOnlySuperAppFlows()
      this.getFlowDeets()
      this.queryFlows()
      this.checkIfDAIxApproved()

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

      // let user = this.state.account;
      // let isSubscribed =  await this.state.ida.methods.getSubscription(
      //                               WETHxAddress,
      //                               rickosheaAppAddress, // publisher
      //                               0, // indexId
      //                               user).call()
      // this.setState({
      //   isSubscribed: isSubscribed.approved
      // })
      // console.log("Is Approved?", this.state.isSubscribed)

    } catch(err) {
      console.log("ERROR IN WEB3 SET UP:", err)
    }

    try {
      // Handling account switch
      window.ethereum.on('accountsChanged', function (accounts) {
        // Re-do the WEB3 SET UP if accounts are changed
        this.loadData()
      }.bind(this))
    } catch (err) {
      console.log("Error in handling account switch",err)
    }

    // window.ethereum.on('confirmation',() => console.log('test'))

    // Updating token balances on UI
    // this.getTokenBalance(this.state.account,DAIxAddress)
    // this.getTokenBalance(this.state.account,WETHxAddress)
    // this.getTokenBalance(this.state.account,RICAddress)
    this.sweepTokenBalanceUpdate()
    // setInterval(() => this.getTokenBalance(this.state.account,DAIxAddress),100000);
    // setInterval(() => this.getTokenBalance(this.state.account,WETHxAddress),100000);
  }

  async getTokenBalance(userAddress,tokenAddress) {
    var tokenInst = new this.state.web3.eth.Contract(erc20ABI,tokenAddress);
    tokenInst.methods.balanceOf(userAddress).call().then(function (bal) {
        document.getElementById(`balance-${tokenAddress}`).innerHTML = (bal/1000000000000000000).toFixed(7);
    })
  }

  async sweepTokenBalanceUpdate() {
    this.getTokenBalance(this.state.account,DAIxAddress)
    this.getTokenBalance(this.state.account,WETHxAddress)
    this.getTokenBalance(this.state.account,RICAddress)
    this.getTokenBalance(this.state.account,DAIAddress)
  }

  async stopFlow() {
    let sf = this.state.sf
    let sfUser = this.state.sfUser
    console.log("Stopping flow with:",sfUser)
    await sfUser.flow({
      recipient: await sf.user({ address: rickosheaAppAddress, token: DAIxAddress }), // address: would be rickosheaAppaddress, currently not deployed
      flowRate: "0"
    });
    this.getFlowDeets()
    this.getOnlySuperAppFlows()
  }

  async startFlow() {
    const web3 = new Web3(window.ethereum)
    let sf = this.state.sf
    let sfUser = this.state.sfUser
    console.log("Creating flow with:",sfUser)
    let flowInput = Math.round( ( document.getElementById("input-amt-"+DAIxAddress).value * Math.pow(10,18) ) / 2592000 ) // Say I start a stream of 10 DAIx per month. Is the flow in gwei (which is registered as to the second) calculated as [ (10 DAIx) *(10^18) ] / [30 * 24 * 60 * 60]  = 3858024691358.025 -> round to nearest int
    console.log("Would flow:",flowInput)

    // if(this.state.isSubscribed) {

    //   await sfUser.flow({
    //     recipient: await sf.user({ address: rickosheaAppAddress, token: DAIxAddress }), // address: would be rickosheaAppaddress, currently not deployed
    //     flowRate: flowInput.toString(),
    //     options: {
    //       userData
    //     }
    //   });

    // } else {

    let call = [
          [
              201, // approve the ticket fee
              sf.agreements.ida.address,
              web3.eth.abi.encodeParameters(
                ["bytes", "bytes"],
                [
                    sf.agreements.ida.contract.methods
                        .approveSubscription(
                            WETHxAddress,
                            rickosheaAppAddress,
                            0, // INDEX_ID
                            "0x"
                        )
                        .encodeABI(), // callData
                    "0x" // userData
                ]
              )
          ],
          [
              201, // approve the ticket fee
              sf.agreements.ida.address,
              web3.eth.abi.encodeParameters(
                ["bytes", "bytes"],
                [
                    sf.agreements.ida.contract.methods
                        .approveSubscription(
                            RICAddress,
                            rickosheaAppAddress,
                            1, // INDEX_ID
                            "0x"
                        )
                        .encodeABI(), // callData
                    "0x" // userData
                ]
              )
          ],
          [
            201, // create constant flow (10/mo)
            sf.agreements.cfa.address,
            web3.eth.abi.encodeParameters(
                ["bytes", "bytes"],
                [
                    sf.agreements.cfa.contract.methods
                        .createFlow(
                            DAIxAddress,
                            rickosheaAppAddress,
                            flowInput.toString(),
                            "0x"
                        )
                        .encodeABI(), // callData
                    "0x" // userData
                ]
            )
          ],
        ]

    await sf.host.batchCall(call);
    // }
    
    document.getElementById("input-amt-"+DAIxAddress).value = ""

    // Defensive code: For some reason getOnlySuperAppFlows() doesn't update superAppFlowAmount properly when it's zero
    this.getFlowDeets()
    this.getOnlySuperAppFlows()

    if (flowInput===0) {
      this.setState({
        superAppFlowAmount: 0
      })
    } else {
      this.getOnlySuperAppFlows()
    }
    
  }

  async getFlowDeets() {
    console.log('Calculating Total Value Streaming...')
    this.setState({
      userFlowDeets: await this.state.sfUser.details(),
      ricoFlowDeets: await this.state.ricUser.details()
    })
    console.log('Total Value Streaming Calculation Complete')
  }

  async getOnlySuperAppFlows() {
    let details = (await this.state.sfUser.details()).cfa.flows.outFlows

    var i
    for (i=0; i<details.length;i++) {
      if (details[i].receiver === rickosheaAppAddress) {
        this.setState({
          superAppFlowAmount: -details[i].flowRate
        })
      }
    }
  }

  async queryFlows() {

    const QUERY_URL = `https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-rinkeby`

    const query = `{
      account(id: "${rickosheaAppAddress.toLowerCase()}") {
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

    // console.log(this.state.flowQuery)

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

    await tokenInstx
    .methods.upgrade(
      this.state.web3.utils.toWei(upgradeAmount,"ether")
    ).send({ from: this.state.account })
    
    document.getElementById("upgrade-amount").value = ""
    this.sweepTokenBalanceUpdate()
  }

  async checkIfDAIxApproved() {
    // hasApprovedDAI is false by default
    var tokenInst = new this.state.web3.eth.Contract(erc20ABI,DAIAddress)

    await tokenInst.methods.allowance(this.state.account,DAIxAddress).call().then( (amount) => {
      if (amount.length != "1" + "0".repeat(42)) {
        // if the user has approved DAI before, hasAppreovedDAI is marked true
        this.setState({
          hasApprovedDAI: true
        })
        console.log("DAIx Approved?",this.state.hasApprovedDAI)
      } else {
        this.setState({
          hasApprovedDAI: false
        })
        console.log("DAIx Approved?",this.state.hasApprovedDAI)
      }
      console.log('Amount Approved',amount)
    })

    if (this.state.hasApprovedDAI) {
      document.getElementById("approve-button").disabled = true
      document.getElementById("upgrade-button").disabled = false
    } else {
      document.getElementById("upgrade-button").disabled = true
      document.getElementById("approve-button").disabled = false
    }

  }


  render() {
    // var superAppFlowAmount = parseInt( this.state.userFlowDetails.cfa.netFlow )
    return (
      <body class="indigo lighten-4">
      <div class="container">
          <div class="row">
            <div class= "col-6">
              <p></p>
            </div>
            <div class= "col-6">
              <p style={{float:"right" }}>Your Wallet: <span id="wallet-address" class="badge bg-secondary">{this.state.account}</span></p>
            </div>
          </div>
            <div class="row">
            <div class="col-6">
              <div class="card">
                <div class="card-body">
                    <img src="logo.jpeg" style={{width:100, height:75, float:"left", marginRight: 20 }}></img>
                    <h3>Ricochet</h3>
                    <p>Scaling and simplifying Dollar-cost Averaging (DCA)</p>
                    <hr></hr>
                    <h4>Dollar-Cost Averaging on SushiSwap with Ricochet</h4>
                    <p>Alice and Bob open a stream in units of DAI/month. Periodically Ricochet’s keeper triggers a public distribute method on Ricochet contract to:</p>
                    <ol>
                      <li>Swap DAI to WETH on SushiSwap</li>
                      <li>Instantly distribute the output of the swap to Alice and Bob</li>
                      <li>Transfer a fee taken in the output token (WETH) to the Ricochet contract owner</li>
                    </ol>
                    <img src="arch.png" style={{width:"100%", float:"left", marginRight: 20, marginBottom: 20 }}></img>
                    <div>
                      <h5>Ricochet Exchange Fees</h5>
                      <p>There are two fees taken during the distribute:</p>
                      <ul>
                        <li>SushiSwap Exchange (0.3%)</li>
                        <li>Ricochet Exchange (2.0%)</li>
                      </ul>
                    </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">DAIx to WETHx</h5>
                  <div class= "col-6">
                    <p>Exchange Contract Address: <span id="pool-address" class="badge bg-primary">{rickosheaAppAddress}</span></p>
                  </div>
                  <p>Your Balance:</p>

                  <p><span id='balance-0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2'>0</span> DAIx</p>
                  <p><span id="balance-0x27e1e4E6BC79D93032abef01025811B7E4727e85">0</span> WETHx</p>
                  <p><span id="balance-0x263026e7e53dbfdce5ae55ade22493f828922965">0</span> RIC</p>
                  <div>
                    <input type="text" class="field-input" id="input-amt-0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2" placeholder={( -( this.state.superAppFlowAmount*(30*24*60*60) )/Math.pow(10,18) ).toFixed(4)}/>
                    <button id="startFlowButton" class="button_slide slide_right" onClick={this.startFlow}>Start</button>
                    <button id="stopFlowButton" class="button_slide slide_right" onClick={this.stopFlow}>Stop</button>
                    <p>DAIx/month</p>
                  </div>
                  <p class="one-off">Total Value Streaming: {( ( this.state.ricoFlowDeets.cfa.netFlow*(30*24*60*60) )/Math.pow(10,18) ).toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} /DAIx month</p>
                </div>
              </div>
              <br/>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Upgrade Your DAI to DAIx Here</h5>
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
              <br/>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Network Config</h5>
                  <table id = "network-table">
                    <td colspan="2">
                      <p>To use Matic-Mainnet with Superfluid, you'll need a RPC URL to connect your metamask or application to a Polygon node.</p>
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
