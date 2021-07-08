// import logo from './logo.svg';
import Web3 from 'web3';
import React, { useState, Component } from 'react';
import './App.css';
import { fUSDCxAddress, ETHxAddress, RICAddress, hostAddress, idaAddress, rickosheaAppAddress } from "./rinkeby_config";
import { erc20ABI, sfABI, idaABI } from "./abis"
const { web3tx, toWad, wad4human } = require("@decentral.ee/web3-helpers");


const SuperfluidSDK = require("@superfluid-finance/js-sdk");

// @ethersproject/providers npm install didn't work
const { Web3Provider } = require("@ethersproject/providers");

// Account 3 (for reference): 0xcf4b5f6ccd39a2b5555ddd9e23f3d0b11843086e

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
      // userFlowDetails: null,       // Superfluid user flow details (what flows the user has currently occuring)
      sf: null,                    // Superfluid SDK object
      sfUser:null,                 // Superfluid User object (tied to a specific token)
      host:null,                   // Superfluid host contract instance
      ida:null,                    // Superfluid Instant Distribution Agreement contract instance
      flowAmt:"",                   // How much the user has streaming (storing as instance variable so it can be shown on front end)
      isSubscribed:false            // True if the user has approved the streaming
    };

    this.startFlow = this.startFlow.bind(this);
    this.stopFlow = this.stopFlow.bind(this);
    this.getOnlySuperAppFlows = this.getOnlySuperAppFlows.bind(this);
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
        tokens: ['fUSDC','ETH']
      });
      await sf.initialize()

      // Setting some Superfluid instance variables
      // NOTE: this part could be adjusted if working with different input tokens (not just USDCx)
      this.setState({
        sf: sf,
        sfUser: sf.user({
          address: this.state.account,
          token: fUSDCxAddress
        })
      })
      // this.setState({userFlowDetails:await this.state.sfUser.details()})
      // this.setState({
      //   flowAmt: parseInt( ( await this.state.sfUser.details() ).cfa.netFlow ) // TODO: Figure out how to make userFlowDetails a one-stop-shop and not have to pull netflow out of it everytime
      // })
      // this.setState({
      //   flowAmt: this.getOnlySuperAppFlows()
      // })
      console.log(this.state.sfUser)
      this.getOnlySuperAppFlows()
      console.log( "Net flow", this.state.flowAmt )

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
                                    ETHxAddress,
                                    rickosheaAppAddress, // publisher
                                    0, // indexId
                                    user).call()
      this.setState({
        isSubscribed: isSubscribed.approved
      })
      console.log("Is Approved?", this.state.isSubscribed)

    } catch(err) {
      console.log("ERROR IN WEB3 SET UP:", err)
    }

    // Handling account switch
    window.ethereum.on('accountsChanged', function (accounts) {
      // this.setState({account:accounts[0]})
      // Re-do the WEB3 SET UP if accounts are changed
      this.loadData()
    }.bind(this))

    // window.ethereum.on('confirmation',() => console.log('test'))

    // Updating token balances on UI
    this.getTokenBalance(this.state.account,fUSDCxAddress)
    this.getTokenBalance(this.state.account,ETHxAddress)
    this.getTokenBalance(this.state.account,RICAddress)
    setInterval(() => this.getTokenBalance(this.state.account,fUSDCxAddress),100000);
    setInterval(() => this.getTokenBalance(this.state.account,ETHxAddress),100000);
  }

  async getTokenBalance(userAddress,tokenAddress) {
    var tokenInst = new this.state.web3.eth.Contract(erc20ABI,tokenAddress);
    console.log("Address in getTokenBalance: ",userAddress)
    tokenInst.methods.balanceOf(userAddress).call().then(function (bal) {
        // console.log(tokenAddress,'balance is',bal)
        document.getElementById(`balance-${tokenAddress}`).innerHTML = (bal/1000000000000000000).toFixed(4);
    })
  }

  async stopFlow() {
    let sf = this.state.sf
    let sfUser = this.state.sfUser
    console.log("Stopping flow with:",sfUser)
    await sfUser.flow({
      recipient: await sf.user({ address: rickosheaAppAddress, token: fUSDCxAddress }), // address: would be rickosheaAppaddress, currently not deployed
      flowRate: "0"
    });
  }

  // Starting a Superfluid flow based on what user selects in field
  async startFlow() {
    const web3 = new Web3(window.ethereum)
    let sf = this.state.sf
    let sfUser = this.state.sfUser
    console.log("Creating flow with:",sfUser)
    const userData = { message: "here's a flow account 2", flowId: "1" } // This is just arbitrary
    let flowInput = Math.round( ( document.getElementById("input-amt-"+ETHxAddress).value * Math.pow(10,18) ) / 2592000 ) // Say I start a stream of 10 USDCx per month. Is the flow in gwei (which is registered as to the second) calculated as [ (10 USDCx) *(10^18) ] / [30 * 24 * 60 * 60]  = 3858024691358.025 -> round to nearest int
    console.log("Would flow:",flowInput)

    let isStreaming = false;

    if(this.state.isSubscribed) {

      await sfUser.flow({
        recipient: await sf.user({ address: rickosheaAppAddress, token: fUSDCxAddress }), // address: would be rickosheaAppaddress, currently not deployed
        flowRate: flowInput.toString(),
        options: {
          userData
        }
      });

    } else {

      let call = [
              [
                  201, // approve the ticket fee
                  sf.agreements.ida.address,
                  web3.eth.abi.encodeParameters(
                    ["bytes", "bytes"],
                    [
                        sf.agreements.ida.contract.methods
                            .approveSubscription(
                                ETHxAddress,
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
                                fUSDCxAddress,
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
    }

    document.getElementById("input-amt-"+ETHxAddress).value = ""

    // Defensive code: For some reason getOnlySuperAppFlows() doesn't update flowAmt properly when it's zero
    if (flowInput===0) {
      this.setState({
        flowAmt: 0
      })
    } else {
      this.getOnlySuperAppFlows()
    }
  }


  async getOnlySuperAppFlows() {
    let details = (await this.state.sfUser.details()).cfa.flows.outFlows

    var i
    for (i=0; i<details.length;i++) {
      if (details[i].receiver === rickosheaAppAddress) {
        console.log("Here's the stream to the superapp",details[i].flowRate)
        this.setState({
          flowAmt: -details[i].flowRate
        })
      }
    }
  }



  render() {
    // var flowAmt = parseInt( this.state.userFlowDetails.cfa.netFlow )
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
                    <p>Alice and Bob open a stream in units of USDC/month. Periodically Ricochet’s keeper triggers a public distribute method on Ricochet contract to:</p>
                    <ol>
                    <li>Swap USDC to ETH on SushiSwap</li>
                    <li>Instantly distribute the output of the swap to Alice and Bob</li>
                    <li>Transfer a fee taken in the output token (ETH) to the Ricochet contract owner</li>
                    </ol>
                    <img src="arch.png" style={{width:"100%", float:"left", marginRight: 20 }}></img>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">USDCx to ETHx</h5>
                  <div class= "col-6">
                    <p>Exchange Contract Address: <span id="pool-address" class="badge bg-primary">{rickosheaAppAddress}</span></p>
                  </div>
                  <p>Your Balance:</p>

                  <p><span id='balance-0x0F1D7C55A2B133E000eA10EeC03c774e0d6796e8'>0</span> USDCx</p>
                  <p><span id="balance-0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90">0</span> DAIx</p>
                  <p><span id="balance-0x369A77c1A8A38488cc28C2FaF81D2378B9321D8B">0</span> RIC</p>
                  <div>
                  <input type="text" id="input-amt-0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90" placeholder={( -( this.state.flowAmt*(30*24*60*60) )/Math.pow(10,18) ).toFixed(4)  }/>
                  <button id="startFlowButton" onClick={this.startFlow}>Start</button>
                  <button id="stopFlowButton" onClick={this.stopFlow}>Stop</button>
                  </div>
                  <p> USDCx/month</p>
                </div>
              </div>
              <br/>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Ricochet Exchange Fees</h5>
                  <p>There are two fees taken during the distribute:</p>
                  <ul>
                    <li>SushiSwap Exchange (0.3%)</li>
                    <li>Ricochet Exchange (2.0%)</li>
                  </ul>
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

    // calcing flow rate: 10 USDC/month:
    // {"cfa":
    //   {"flows":
    //     {"inFlows":[],
    //     "outFlows":[{"sender":"0xc41876DAB61De145093b6aA87417326B24Ae4ECD",
    //                  "receiver":"0xf40C0a8D9bCf57548a6afF14374ac02D2824660A",
    //                  "flowRate":"3858024691358"}]},
    //     "netFlow":"-3858024691358"},
    //   "ida":{"subscriptions":[]}}

    // If
