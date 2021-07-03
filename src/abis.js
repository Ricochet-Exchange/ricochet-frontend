export const erc20ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
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
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
      "inputs": [],
      "name": "totalSupply",
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
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]

export const sfABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "agreementType",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "code",
          "type": "address"
        }
      ],
      "name": "AgreementClassRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "agreementType",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "code",
          "type": "address"
        }
      ],
      "name": "AgreementClassUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISuperApp",
          "name": "app",
          "type": "address"
        }
      ],
      "name": "AppRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "contract ISuperfluidGovernance",
          "name": "oldGov",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "contract ISuperfluidGovernance",
          "name": "newGov",
          "type": "address"
        }
      ],
      "name": "GovernanceReplaced",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISuperApp",
          "name": "app",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "reason",
          "type": "uint256"
        }
      ],
      "name": "Jail",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "contract ISuperTokenFactory",
          "name": "newFactory",
          "type": "address"
        }
      ],
      "name": "SuperTokenFactoryUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "code",
          "type": "address"
        }
      ],
      "name": "SuperTokenLogicUpdated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bitmap",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "agreementType",
          "type": "bytes32"
        }
      ],
      "name": "addToAgreementClassesBitmap",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "newBitmap",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperApp",
          "name": "targetApp",
          "type": "address"
        }
      ],
      "name": "allowCompositeApp",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        },
        {
          "internalType": "int256",
          "name": "allowanceUsedDelta",
          "type": "int256"
        }
      ],
      "name": "appCallbackPop",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "newCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        },
        {
          "internalType": "contract ISuperApp",
          "name": "app",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "appAllowanceGranted",
          "type": "uint256"
        },
        {
          "internalType": "int256",
          "name": "appAllowanceUsed",
          "type": "int256"
        }
      ],
      "name": "appCallbackPush",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "appCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint32",
              "name": "operationType",
              "type": "uint32"
            },
            {
              "internalType": "address",
              "name": "target",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "internalType": "struct ISuperfluid.Operation[]",
          "name": "operations",
          "type": "tuple[]"
        }
      ],
      "name": "batchCall",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperAgreement",
          "name": "agreementClass",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "callData",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "userData",
          "type": "bytes"
        }
      ],
      "name": "callAgreement",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "returnedData",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperAgreement",
          "name": "agreementClass",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "callData",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "userData",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "callAgreementWithContext",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "newCtx",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "returnedData",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperApp",
          "name": "app",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "callData",
          "type": "bytes"
        }
      ],
      "name": "callAppAction",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "returnedData",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperApp",
          "name": "app",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "callData",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "callAppActionWithContext",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "newCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperApp",
          "name": "app",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "callData",
          "type": "bytes"
        },
        {
          "internalType": "bool",
          "name": "isTermination",
          "type": "bool"
        },
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "callAppAfterCallback",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "appCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperApp",
          "name": "app",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "callData",
          "type": "bytes"
        },
        {
          "internalType": "bool",
          "name": "isTermination",
          "type": "bool"
        },
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "callAppBeforeCallback",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "cbdata",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "allowanceWantedMore",
          "type": "uint256"
        },
        {
          "internalType": "int256",
          "name": "allowanceUsedDelta",
          "type": "int256"
        }
      ],
      "name": "ctxUseAllowance",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "newCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "decodeCtx",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "appLevel",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "callType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "msgSender",
              "type": "address"
            },
            {
              "internalType": "bytes4",
              "name": "agreementSelector",
              "type": "bytes4"
            },
            {
              "internalType": "bytes",
              "name": "userData",
              "type": "bytes"
            },
            {
              "internalType": "uint256",
              "name": "appAllowanceGranted",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "appAllowanceWanted",
              "type": "uint256"
            },
            {
              "internalType": "int256",
              "name": "appAllowanceUsed",
              "type": "int256"
            },
            {
              "internalType": "address",
              "name": "appAddress",
              "type": "address"
            }
          ],
          "internalType": "struct ISuperfluid.Context",
          "name": "context",
          "type": "tuple"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint32",
              "name": "operationType",
              "type": "uint32"
            },
            {
              "internalType": "address",
              "name": "target",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "internalType": "struct ISuperfluid.Operation[]",
          "name": "operations",
          "type": "tuple[]"
        }
      ],
      "name": "forwardBatchCall",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "agreementType",
          "type": "bytes32"
        }
      ],
      "name": "getAgreementClass",
      "outputs": [
        {
          "internalType": "contract ISuperAgreement",
          "name": "agreementClass",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperApp",
          "name": "app",
          "type": "address"
        }
      ],
      "name": "getAppLevel",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "appLevel",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperApp",
          "name": "app",
          "type": "address"
        }
      ],
      "name": "getAppManifest",
      "outputs": [
        {
          "internalType": "bool",
          "name": "isSuperApp",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isJailed",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "noopMask",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getGovernance",
      "outputs": [
        {
          "internalType": "contract ISuperfluidGovernance",
          "name": "governance",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSuperTokenFactory",
      "outputs": [
        {
          "internalType": "contract ISuperTokenFactory",
          "name": "factory",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSuperTokenFactoryLogic",
      "outputs": [
        {
          "internalType": "address",
          "name": "logic",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperAgreement",
          "name": "agreementClass",
          "type": "address"
        }
      ],
      "name": "isAgreementClassListed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "yes",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "agreementType",
          "type": "bytes32"
        }
      ],
      "name": "isAgreementTypeListed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "yes",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperApp",
          "name": "app",
          "type": "address"
        }
      ],
      "name": "isApp",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperApp",
          "name": "app",
          "type": "address"
        }
      ],
      "name": "isAppJailed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "isJail",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperApp",
          "name": "app",
          "type": "address"
        },
        {
          "internalType": "contract ISuperApp",
          "name": "targetApp",
          "type": "address"
        }
      ],
      "name": "isCompositeAppAllowed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "isAppAllowed",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "isCtxValid",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        },
        {
          "internalType": "contract ISuperApp",
          "name": "app",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "reason",
          "type": "uint256"
        }
      ],
      "name": "jailApp",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "newCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bitmap",
          "type": "uint256"
        }
      ],
      "name": "mapAgreementClasses",
      "outputs": [
        {
          "internalType": "contract ISuperAgreement[]",
          "name": "agreementClasses",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperAgreement",
          "name": "agreementClassLogic",
          "type": "address"
        }
      ],
      "name": "registerAgreementClass",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "configWord",
          "type": "uint256"
        }
      ],
      "name": "registerApp",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "configWord",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "registrationKey",
          "type": "string"
        }
      ],
      "name": "registerAppWithKey",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "bitmap",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "agreementType",
          "type": "bytes32"
        }
      ],
      "name": "removeFromAgreementClassesBitmap",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "newBitmap",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidGovernance",
          "name": "newGov",
          "type": "address"
        }
      ],
      "name": "replaceGovernance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperAgreement",
          "name": "agreementClassLogic",
          "type": "address"
        }
      ],
      "name": "updateAgreementClass",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperTokenFactory",
          "name": "newFactory",
          "type": "address"
        }
      ],
      "name": "updateSuperTokenFactory",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "updateSuperTokenLogic",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]

export const idaABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "userData",
          "type": "bytes"
        }
      ],
      "name": "IndexCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "subscriber",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "userData",
          "type": "bytes"
        }
      ],
      "name": "IndexSubscribed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "subscriber",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "units",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "userData",
          "type": "bytes"
        }
      ],
      "name": "IndexUnitsUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "subscriber",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "userData",
          "type": "bytes"
        }
      ],
      "name": "IndexUnsubscribed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "oldIndexValue",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "newIndexValue",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "totalUnitsPending",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "totalUnitsApproved",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "userData",
          "type": "bytes"
        }
      ],
      "name": "IndexUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "subscriber",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "userData",
          "type": "bytes"
        }
      ],
      "name": "SubscriptionApproved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "subscriber",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "userData",
          "type": "bytes"
        }
      ],
      "name": "SubscriptionRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "subscriber",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "units",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "userData",
          "type": "bytes"
        }
      ],
      "name": "SubscriptionUnitsUpdated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "agreementType",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "approveSubscription",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "newCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "calculateDistribution",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "actualAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "newIndexValue",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "internalType": "address",
          "name": "subscriber",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "claim",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "newCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "createIndex",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "newCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "internalType": "address",
          "name": "subscriber",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "deleteSubscription",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "newCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "distribute",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "newCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        }
      ],
      "name": "getIndex",
      "outputs": [
        {
          "internalType": "bool",
          "name": "exist",
          "type": "bool"
        },
        {
          "internalType": "uint128",
          "name": "indexValue",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "totalUnitsApproved",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "totalUnitsPending",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "internalType": "address",
          "name": "subscriber",
          "type": "address"
        }
      ],
      "name": "getSubscription",
      "outputs": [
        {
          "internalType": "bool",
          "name": "exist",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        },
        {
          "internalType": "uint128",
          "name": "units",
          "type": "uint128"
        },
        {
          "internalType": "uint256",
          "name": "pendingDistribution",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "agreementId",
          "type": "bytes32"
        }
      ],
      "name": "getSubscriptionByID",
      "outputs": [
        {
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        },
        {
          "internalType": "uint128",
          "name": "units",
          "type": "uint128"
        },
        {
          "internalType": "uint256",
          "name": "pendingDistribution",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "subscriber",
          "type": "address"
        }
      ],
      "name": "listSubscriptions",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "publishers",
          "type": "address[]"
        },
        {
          "internalType": "uint32[]",
          "name": "indexIds",
          "type": "uint32[]"
        },
        {
          "internalType": "uint128[]",
          "name": "unitsList",
          "type": "uint128[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "realtimeBalanceOf",
      "outputs": [
        {
          "internalType": "int256",
          "name": "dynamicBalance",
          "type": "int256"
        },
        {
          "internalType": "uint256",
          "name": "deposit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "owedDeposit",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "publisher",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "revokeSubscription",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "newCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "internalType": "uint128",
          "name": "indexValue",
          "type": "uint128"
        },
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "updateIndex",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "newCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISuperfluidToken",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "indexId",
          "type": "uint32"
        },
        {
          "internalType": "address",
          "name": "subscriber",
          "type": "address"
        },
        {
          "internalType": "uint128",
          "name": "units",
          "type": "uint128"
        },
        {
          "internalType": "bytes",
          "name": "ctx",
          "type": "bytes"
        }
      ],
      "name": "updateSubscription",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "newCtx",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]