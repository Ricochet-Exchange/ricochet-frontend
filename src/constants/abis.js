export const launchpadABI = [
  {
    inputs: [
      { internalType: "contract ISuperfluid", name: "host", type: "address" },
      {
        internalType: "contract IConstantFlowAgreementV1",
        name: "cfa",
        type: "address",
      },
      {
        internalType: "contract IInstantDistributionAgreementV1",
        name: "ida",
        type: "address",
      },
      { internalType: "string", name: "registrationKey", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      { indexed: false, internalType: "int96", name: "newRate", type: "int96" },
      {
        indexed: false,
        internalType: "int96",
        name: "totalInflow",
        type: "int96",
      },
    ],
    name: "UpdatedStream",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "_superToken",
        type: "address",
      },
      { internalType: "address", name: "_agreementClass", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "bytes", name: "_agreementData", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "_ctx", type: "bytes" },
    ],
    name: "afterAgreementCreated",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "_superToken",
        type: "address",
      },
      { internalType: "address", name: "_agreementClass", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "bytes", name: "_agreementData", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "_ctx", type: "bytes" },
    ],
    name: "afterAgreementTerminated",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "_superToken",
        type: "address",
      },
      { internalType: "address", name: "_agreementClass", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "bytes", name: "_agreementData", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "_ctx", type: "bytes" },
    ],
    name: "afterAgreementUpdated",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "beforeAgreementCreated",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "beforeAgreementTerminated",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "beforeAgreementUpdated",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "streamer", type: "address" }],
    name: "closeStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "distribute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "streamer", type: "address" }],
    name: "emergencyCloseStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencyDrain",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getFeeRate",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "index", type: "uint32" },
      { internalType: "address", name: "streamer", type: "address" },
    ],
    name: "getIDAShares",
    outputs: [
      { internalType: "bool", name: "exist", type: "bool" },
      { internalType: "bool", name: "approved", type: "bool" },
      { internalType: "uint128", name: "units", type: "uint128" },
      { internalType: "uint256", name: "pendingDistribution", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInputToken",
    outputs: [
      { internalType: "contract ISuperToken", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastDistributionAt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOutputIndexId",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOutputRate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOutputToken",
    outputs: [
      { internalType: "contract ISuperToken", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSharePrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "streamer", type: "address" }],
    name: "getStreamRate",
    outputs: [
      { internalType: "int96", name: "requesterFlowRate", type: "int96" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalInflow",
    outputs: [{ internalType: "int96", name: "", type: "int96" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "inputToken",
        type: "address",
      },
      {
        internalType: "contract ISuperToken",
        name: "outputToken",
        type: "address",
      },
      { internalType: "address", name: "originator", type: "address" },
      { internalType: "address", name: "beneficiary", type: "address" },
      { internalType: "uint256", name: "outputRate", type: "uint256" },
      { internalType: "uint128", name: "feeRate", type: "uint128" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isAppJailed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint128", name: "feeRate", type: "uint128" }],
    name: "setFeeRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const erc20ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const sfABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "agreementType",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "code",
        type: "address",
      },
    ],
    name: "AgreementClassRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "agreementType",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "code",
        type: "address",
      },
    ],
    name: "AgreementClassUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
    ],
    name: "AppRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract ISuperfluidGovernance",
        name: "oldGov",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract ISuperfluidGovernance",
        name: "newGov",
        type: "address",
      },
    ],
    name: "GovernanceReplaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reason",
        type: "uint256",
      },
    ],
    name: "Jail",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract ISuperTokenFactory",
        name: "newFactory",
        type: "address",
      },
    ],
    name: "SuperTokenFactoryUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperToken",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "code",
        type: "address",
      },
    ],
    name: "SuperTokenLogicUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bitmap",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "agreementType",
        type: "bytes32",
      },
    ],
    name: "addToAgreementClassesBitmap",
    outputs: [
      {
        internalType: "uint256",
        name: "newBitmap",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "targetApp",
        type: "address",
      },
    ],
    name: "allowCompositeApp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
      {
        internalType: "int256",
        name: "allowanceUsedDelta",
        type: "int256",
      },
    ],
    name: "appCallbackPop",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "appAllowanceGranted",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "appAllowanceUsed",
        type: "int256",
      },
    ],
    name: "appCallbackPush",
    outputs: [
      {
        internalType: "bytes",
        name: "appCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "operationType",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct ISuperfluid.Operation[]",
        name: "operations",
        type: "tuple[]",
      },
    ],
    name: "batchCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperAgreement",
        name: "agreementClass",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "callAgreement",
    outputs: [
      {
        internalType: "bytes",
        name: "returnedData",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperAgreement",
        name: "agreementClass",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "callAgreementWithContext",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "returnedData",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
    ],
    name: "callAppAction",
    outputs: [
      {
        internalType: "bytes",
        name: "returnedData",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "callAppActionWithContext",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "isTermination",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "callAppAfterCallback",
    outputs: [
      {
        internalType: "bytes",
        name: "appCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "isTermination",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "callAppBeforeCallback",
    outputs: [
      {
        internalType: "bytes",
        name: "cbdata",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "allowanceWantedMore",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "allowanceUsedDelta",
        type: "int256",
      },
    ],
    name: "ctxUseAllowance",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "decodeCtx",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "appLevel",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "callType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "msgSender",
            type: "address",
          },
          {
            internalType: "bytes4",
            name: "agreementSelector",
            type: "bytes4",
          },
          {
            internalType: "bytes",
            name: "userData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "appAllowanceGranted",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "appAllowanceWanted",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "appAllowanceUsed",
            type: "int256",
          },
          {
            internalType: "address",
            name: "appAddress",
            type: "address",
          },
        ],
        internalType: "struct ISuperfluid.Context",
        name: "context",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "operationType",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct ISuperfluid.Operation[]",
        name: "operations",
        type: "tuple[]",
      },
    ],
    name: "forwardBatchCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "agreementType",
        type: "bytes32",
      },
    ],
    name: "getAgreementClass",
    outputs: [
      {
        internalType: "contract ISuperAgreement",
        name: "agreementClass",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
    ],
    name: "getAppLevel",
    outputs: [
      {
        internalType: "uint8",
        name: "appLevel",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
    ],
    name: "getAppManifest",
    outputs: [
      {
        internalType: "bool",
        name: "isSuperApp",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isJailed",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "noopMask",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGovernance",
    outputs: [
      {
        internalType: "contract ISuperfluidGovernance",
        name: "governance",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSuperTokenFactory",
    outputs: [
      {
        internalType: "contract ISuperTokenFactory",
        name: "factory",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSuperTokenFactoryLogic",
    outputs: [
      {
        internalType: "address",
        name: "logic",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperAgreement",
        name: "agreementClass",
        type: "address",
      },
    ],
    name: "isAgreementClassListed",
    outputs: [
      {
        internalType: "bool",
        name: "yes",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "agreementType",
        type: "bytes32",
      },
    ],
    name: "isAgreementTypeListed",
    outputs: [
      {
        internalType: "bool",
        name: "yes",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
    ],
    name: "isApp",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
    ],
    name: "isAppJailed",
    outputs: [
      {
        internalType: "bool",
        name: "isJail",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "contract ISuperApp",
        name: "targetApp",
        type: "address",
      },
    ],
    name: "isCompositeAppAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "isAppAllowed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "isCtxValid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "reason",
        type: "uint256",
      },
    ],
    name: "jailApp",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bitmap",
        type: "uint256",
      },
    ],
    name: "mapAgreementClasses",
    outputs: [
      {
        internalType: "contract ISuperAgreement[]",
        name: "agreementClasses",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperAgreement",
        name: "agreementClassLogic",
        type: "address",
      },
    ],
    name: "registerAgreementClass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "configWord",
        type: "uint256",
      },
    ],
    name: "registerApp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "configWord",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "registrationKey",
        type: "string",
      },
    ],
    name: "registerAppWithKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bitmap",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "agreementType",
        type: "bytes32",
      },
    ],
    name: "removeFromAgreementClassesBitmap",
    outputs: [
      {
        internalType: "uint256",
        name: "newBitmap",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidGovernance",
        name: "newGov",
        type: "address",
      },
    ],
    name: "replaceGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperAgreement",
        name: "agreementClassLogic",
        type: "address",
      },
    ],
    name: "updateAgreementClass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperTokenFactory",
        name: "newFactory",
        type: "address",
      },
    ],
    name: "updateSuperTokenFactory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "token",
        type: "address",
      },
    ],
    name: "updateSuperTokenLogic",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const idaABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "IndexCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "IndexSubscribed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "units",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "IndexUnitsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "IndexUnsubscribed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "oldIndexValue",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "newIndexValue",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "totalUnitsPending",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "totalUnitsApproved",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "IndexUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "SubscriptionApproved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "SubscriptionRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "units",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "SubscriptionUnitsUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "agreementType",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "approveSubscription",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "calculateDistribution",
    outputs: [
      {
        internalType: "uint256",
        name: "actualAmount",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "newIndexValue",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "claim",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "createIndex",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "deleteSubscription",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "distribute",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
    ],
    name: "getIndex",
    outputs: [
      {
        internalType: "bool",
        name: "exist",
        type: "bool",
      },
      {
        internalType: "uint128",
        name: "indexValue",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "totalUnitsApproved",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "totalUnitsPending",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
    ],
    name: "getSubscription",
    outputs: [
      {
        internalType: "bool",
        name: "exist",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
      {
        internalType: "uint128",
        name: "units",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "pendingDistribution",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
    ],
    name: "getSubscriptionByID",
    outputs: [
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
      {
        internalType: "uint128",
        name: "units",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "pendingDistribution",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
    ],
    name: "listSubscriptions",
    outputs: [
      {
        internalType: "address[]",
        name: "publishers",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "indexIds",
        type: "uint32[]",
      },
      {
        internalType: "uint128[]",
        name: "unitsList",
        type: "uint128[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "realtimeBalanceOf",
    outputs: [
      {
        internalType: "int256",
        name: "dynamicBalance",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "deposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "owedDeposit",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "revokeSubscription",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "uint128",
        name: "indexValue",
        type: "uint128",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "updateIndex",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "units",
        type: "uint128",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "updateSubscription",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const superTokenABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "state",
        type: "bytes",
      },
    ],
    name: "AgreementAccountStateUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "data",
        type: "bytes32[]",
      },
    ],
    name: "AgreementCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "penaltyAccount",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "rewardAccount",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardAmount",
        type: "uint256",
      },
    ],
    name: "AgreementLiquidated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "liquidatorAccount",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "penaltyAccount",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "bondAccount",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bailoutAmount",
        type: "uint256",
      },
    ],
    name: "AgreementLiquidatedBy",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "slotId",
        type: "uint256",
      },
    ],
    name: "AgreementStateUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "AgreementTerminated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "data",
        type: "bytes32[]",
      },
    ],
    name: "AgreementUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenHolder",
        type: "address",
      },
    ],
    name: "AuthorizedOperator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "bailoutAccount",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bailoutAmount",
        type: "uint256",
      },
    ],
    name: "Bailout",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "operatorData",
        type: "bytes",
      },
    ],
    name: "Burned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "operatorData",
        type: "bytes",
      },
    ],
    name: "Minted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenHolder",
        type: "address",
      },
    ],
    name: "RevokedOperator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "operatorData",
        type: "bytes",
      },
    ],
    name: "Sent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenDowngraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "authorizeOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        internalType: "bytes32[]",
        name: "data",
        type: "bytes32[]",
      },
    ],
    name: "createAgreement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultOperators",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "downgrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getAccountActiveAgreements",
    outputs: [
      {
        internalType: "contract ISuperAgreement[]",
        name: "activeAgreements",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "dataLength",
        type: "uint256",
      },
    ],
    name: "getAgreementData",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "data",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "slotId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dataLength",
        type: "uint256",
      },
    ],
    name: "getAgreementStateSlot",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "slotData",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHost",
    outputs: [
      {
        internalType: "address",
        name: "host",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUnderlyingToken",
    outputs: [
      {
        internalType: "address",
        name: "tokenAddr",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "granularity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "underlyingToken",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "underlyingDecimals",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "n",
        type: "string",
      },
      {
        internalType: "string",
        name: "s",
        type: "string",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "isAccountCritical",
    outputs: [
      {
        internalType: "bool",
        name: "isCritical",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isAccountCriticalNow",
    outputs: [
      {
        internalType: "bool",
        name: "isCritical",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "isAccountSolvent",
    outputs: [
      {
        internalType: "bool",
        name: "isSolvent",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isAccountSolventNow",
    outputs: [
      {
        internalType: "bool",
        name: "isSolvent",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenHolder",
        type: "address",
      },
    ],
    name: "isOperatorFor",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "liquidator",
        type: "address",
      },
      {
        internalType: "address",
        name: "penaltyAccount",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rewardAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bailoutAmount",
        type: "uint256",
      },
    ],
    name: "makeLiquidationPayouts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "operationApprove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "operationDowngrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "operationTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "operationUpgrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "operatorData",
        type: "bytes",
      },
    ],
    name: "operatorBurn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "operatorData",
        type: "bytes",
      },
    ],
    name: "operatorSend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "realtimeBalanceOf",
    outputs: [
      {
        internalType: "int256",
        name: "availableBalance",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "deposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "owedDeposit",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "realtimeBalanceOfNow",
    outputs: [
      {
        internalType: "int256",
        name: "availableBalance",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "deposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "owedDeposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "revokeOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "selfBurn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "selfMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "send",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "int256",
        name: "delta",
        type: "int256",
      },
    ],
    name: "settleBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "dataLength",
        type: "uint256",
      },
    ],
    name: "terminateAgreement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "transferAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        internalType: "bytes32[]",
        name: "data",
        type: "bytes32[]",
      },
    ],
    name: "updateAgreementData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "slotId",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "slotData",
        type: "bytes32[]",
      },
    ],
    name: "updateAgreementStateSlot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "upgrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "upgradeByETH",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs:[
      {
        internalType: "uint256",
        name: "amount", // "wad",
        type: "uint256"
      }
    ],
    name: "downgradeToETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];


export const streamExchangeABI = [
  {"inputs":[{"internalType":"contract ISuperfluid","name":"host","type":"address"},{"internalType":"contract IConstantFlowAgreementV1","name":"cfa","type":"address"},{"internalType":"contract IInstantDistributionAgreementV1","name":"ida","type":"address"},{"internalType":"contract ISuperToken","name":"inputToken","type":"address"},{"internalType":"contract ISuperToken","name":"outputToken","type":"address"},{"internalType":"contract ISuperToken","name":"subsidyToken","type":"address"},{"internalType":"contract IUniswapV2Router02","name":"sushiRouter","type":"address"},{"internalType":"address payable","name":"oracle","type":"address"},{"internalType":"uint256","name":"requestId","type":"uint256"},{"internalType":"string","name":"registrationKey","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"int96","name":"newRate","type":"int96"},{"indexed":false,"internalType":"int96","name":"totalInflow","type":"int96"}],"name":"UpdatedStream","type":"event"},{"inputs":[{"internalType":"contract ISuperToken","name":"_superToken","type":"address"},{"internalType":"address","name":"_agreementClass","type":"address"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"bytes","name":"_agreementData","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"_ctx","type":"bytes"}],"name":"afterAgreementCreated","outputs":[{"internalType":"bytes","name":"newCtx","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISuperToken","name":"_superToken","type":"address"},{"internalType":"address","name":"_agreementClass","type":"address"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"bytes","name":"_agreementData","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"_ctx","type":"bytes"}],"name":"afterAgreementTerminated","outputs":[{"internalType":"bytes","name":"newCtx","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISuperToken","name":"_superToken","type":"address"},{"internalType":"address","name":"_agreementClass","type":"address"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"bytes","name":"_agreementData","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"_ctx","type":"bytes"}],"name":"afterAgreementUpdated","outputs":[{"internalType":"bytes","name":"newCtx","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISuperToken","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"beforeAgreementCreated","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ISuperToken","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"beforeAgreementTerminated","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ISuperToken","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"beforeAgreementUpdated","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"streamer","type":"address"}],"name":"closeStream","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"streamer","type":"address"}],"name":"emergencyCloseStream","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyDrain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"}],"name":"getCurrentValue","outputs":[{"internalType":"bool","name":"ifRetrieve","type":"bool"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"_timestampRetrieved","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"getDataBefore","outputs":[{"internalType":"bool","name":"_ifRetrieve","type":"bool"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"uint256","name":"_timestampRetrieved","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFeeRate","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"},{"internalType":"address","name":"streamer","type":"address"}],"name":"getIDAShares","outputs":[{"internalType":"bool","name":"exist","type":"bool"},{"internalType":"bool","name":"approved","type":"bool"},{"internalType":"uint128","name":"units","type":"uint128"},{"internalType":"uint256","name":"pendingDistribution","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"getIndexForDataBefore","outputs":[{"internalType":"bool","name":"found","type":"bool"},{"internalType":"uint256","name":"index","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInputToken","outputs":[{"internalType":"contract ISuperToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLastDistributionAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"}],"name":"getNewValueCountbyRequestId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOuputIndexId","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOuputToken","outputs":[{"internalType":"contract ISuperToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRateTolerance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRequestId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"streamer","type":"address"}],"name":"getStreamRate","outputs":[{"internalType":"int96","name":"requesterFlowRate","type":"int96"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSubsidyIndexId","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSubsidyRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSubsidyToken","outputs":[{"internalType":"contract ISuperToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSushiRouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTellorOracle","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getTimestampbyRequestIDandIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalInflow","outputs":[{"internalType":"int96","name":"","type":"int96"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isAppJailed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"isInDispute","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"retrieveData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"feeRate","type":"uint128"}],"name":"setFeeRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"oracle","type":"address"}],"name":"setOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"rateTolerance","type":"uint128"}],"name":"setRateTolerance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"}],"name":"setRequestId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"subsidyRate","type":"uint128"}],"name":"setSubsidyRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}

];
