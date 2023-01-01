import { getSFFramework } from 'utils/fluidSDKinstance';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import { chainSettings } from 'constants/chainSettings';
import { CoinOption } from 'types/coinOption';
import { TransactionReceipt } from '@ethersproject/providers';

import {
	MATICxAddress,
	rexLPETHAddress,
	RICAddress,
	usdcxRicExchangeAddress,
	ricRexShirtLaunchpadAddress,
	ricRexHatLaunchpadAddress,
	//WETHxAddress
} from 'constants/polygon_config';
import Erc20Abi from 'constants/Erc20.json';
import Erc20Bytes32Abi from 'constants/Erc20bytes32.json';
import BankAbi from 'constants/Bank.json';
import Web3 from 'web3';
import { Signer } from '@ethersproject/abstract-signer';
import Operation from '@superfluid-finance/sdk-core/dist/main/Operation';
import { Framework } from '@superfluid-finance/sdk-core';
import { ethers } from 'ethers';
import { indexIDA } from '../constants/flowConfig';
import { gas } from './gasEstimator';

export const downgrade = async (contract: any, amount: string, address: string) =>
	contract.methods.downgrade(amount).send({
		from: address,
		...(await gas()),
	});

export const downgradeMatic = async (contract: any, amount: string, address: string) =>
	contract.methods.downgradeToETH(amount).send({
		from: address,
		// value: amount,
		...(await gas()),
	});

export const allowance = (contract: any, address: string, superTokenAddress: string) =>
	contract.methods.allowance(address, superTokenAddress).call();

export const approve = async (contract: any, address: string, tokenAddress: string, amount: string) =>
	contract.methods.approve(tokenAddress, amount).send({
		from: address,
		...(await gas()),
	});

export const upgrade = async (contract: any, amount: string, address: string) =>
	contract.methods.upgrade(amount).send({
		from: address,
		...(await gas()),
	});

export const upgradeMatic = async (contract: any, amount: string, address: string) => {
	contract.methods.upgradeByETH().send({
		from: address,
		value: amount,
		...(await gas()),
	});
};

export const stopFlow = async (exchangeAddress: string, inputTokenAddress: string, web3: Web3) => {
	try {
		const address = await getAddress(web3);
		const provider = new ethers.providers.Web3Provider(web3.currentProvider as any);
		const framework = await getSFFramework(web3);
		const signer = provider.getSigner();
		const { maxFeePerGas, maxPriorityFeePerGas } = await gas();
		await framework.cfaV1
			.deleteFlow({
				superToken: inputTokenAddress,
				sender: address,
				receiver: exchangeAddress,
				overrides: {
					maxFeePerGas,
					maxPriorityFeePerGas,
				},
			})
			.exec(signer);
	} catch (e: any) {
		console.error(e);
		throw new Error(e);
	}
};

const executeBatchOperations = async (
	operations: Operation[],
	framework: Framework,
	signer: Signer,
): Promise<TransactionReceipt> => {
	const txnResponse = await framework.batchCall(operations).exec(signer);
	return txnResponse.wait();
};

export const startFlow = async (
	idaContract: any,
	exchangeAddress: string,
	inputTokenAddress: string,
	outputTokenAddress: string,
	amount: number,
	web3: Web3,
	referralId?: string,
) => {
	try {
		const address = await getAddress(web3);
		const framework = await getSFFramework(web3);
		const config = indexIDA.find(
			(data) =>
				data.input === inputTokenAddress &&
				data.output === outputTokenAddress &&
				data.exchangeAddress === exchangeAddress,
		);
		if (!config) {
			throw new Error(
				`No config found for this pair: , ${inputTokenAddress}, ${outputTokenAddress}, ${exchangeAddress}`,
			);
		}
		const provider = new ethers.providers.Web3Provider(web3.currentProvider as any);
		const signer = provider.getSigner();
		const web3Subscription = await framework.idaV1.getSubscription({
			superToken: config.output,
			publisher: exchangeAddress,
			indexId: config.outputIndex.toString(),
			subscriber: address,
			providerOrSigner: provider,
		});
		const userFlow = await framework.cfaV1.getFlow({
			superToken: inputTokenAddress,
			sender: address,
			receiver: exchangeAddress,
			providerOrSigner: provider,
		});
		const { maxFeePerGas, maxPriorityFeePerGas } = await gas();
		if (web3Subscription.approved) {
			const transactionData = {
				superToken: inputTokenAddress,
				sender: address,
				receiver: exchangeAddress,
				flowRate: amount.toString(),
				overrides: {
					maxFeePerGas,
					maxPriorityFeePerGas,
				},
			};
			const tx =
				Number(userFlow.flowRate) !== 0
					? await framework.cfaV1.updateFlow(transactionData).exec(signer)
					: await framework.cfaV1.createFlow(transactionData).exec(signer);
			return tx;
		} else {
			const userData = referralId ? web3.eth.abi.encodeParameter('string', referralId) : '0x';
			if (
				exchangeAddress === usdcxRicExchangeAddress ||
				exchangeAddress === ricRexShirtLaunchpadAddress ||
				exchangeAddress == ricRexHatLaunchpadAddress
			) {
				const operations = [
					await framework.idaV1.approveSubscription({
						superToken: outputTokenAddress,
						indexId: '0',
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					await framework.cfaV1.createFlow({
						superToken: inputTokenAddress,
						sender: address,
						receiver: exchangeAddress,
						flowRate: amount.toString(),
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
				];
				await executeBatchOperations(operations, framework, signer);
			} else if (outputTokenAddress === rexLPETHAddress) {
				const operations = [
					await framework.idaV1.approveSubscription({
						superToken: outputTokenAddress,
						indexId: '0',
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					await framework.idaV1.approveSubscription({
						superToken: RICAddress,
						indexId: '1',
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					/* await framework.idaV1.approveSubscription({
						superToken: WETHxAddress,
						indexId: '2',
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}), */
					await framework.idaV1.approveSubscription({
						superToken: MATICxAddress,
						indexId: '3',
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					await framework.cfaV1.createFlow({
						superToken: inputTokenAddress,
						sender: address,
						receiver: exchangeAddress,
						flowRate: amount.toString(),
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
				];
				await executeBatchOperations(operations, framework, signer);
			} else if (config.subsidy) {
				const operations = [
					await framework.idaV1.approveSubscription({
						superToken: config.output,
						indexId: config.outputIndex.toString(),
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					await framework.idaV1.approveSubscription({
						superToken: config.subsidy,
						indexId: config.subsidyIndex?.toString() || '0',
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					await framework.cfaV1.createFlow({
						superToken: config.input,
						sender: address,
						receiver: exchangeAddress,
						flowRate: amount.toString(),
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
				];
				await executeBatchOperations(operations, framework, signer);
			} else {
				const operations = [
					await framework.idaV1.approveSubscription({
						superToken: config.output,
						indexId: config.outputIndex.toString(),
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					await framework.cfaV1.createFlow({
						superToken: config.input,
						sender: address,
						receiver: exchangeAddress,
						flowRate: amount.toString(),
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
				];
				await executeBatchOperations(operations, framework, signer);
			}
		}
	} catch (e: any) {
		console.error(e);
		throw new Error(e);
	}
};

export const switchNetwork = async () => {
	const { ethereum } = window as any;
	try {
		await ethereum.request({ method: 'eth_requestAccounts' });
		await ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: `0x${chainSettings.chainId.toString(16)}` }],
		});
		return true;
	} catch (error: any) {
		if (error.code === 4902) {
			try {
				await ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [
						{
							chainId: `0x${chainSettings.chainId.toString(16)}`,
							chainName: chainSettings.chanName,
							nativeCurrency: chainSettings.nativeCurrency,
							rpcUrls: chainSettings.rpcUrls,
							blockExplorerUrls: chainSettings.blockExplorerUrls,
						},
					],
				});
				return true;
			} catch (e) {
				throw new Error(error);
			}
		}

		if (error.code === 4001) {
			// User rejected the request.
			throw new Error(error);
		}
	}
};

export const registerToken = async (options: CoinOption) => {
	const tokenAdded = await (window as any).ethereum.request({
		method: 'wallet_watchAsset',
		params: {
			type: 'ERC20',
			options,
		},
	});

	return tokenAdded;
};

export const approveToken = async (
	accountAddress: string,
	bankAddress: string,
	tokenContract: any,
	web3: Web3,
	wad?: any,
) => {
	const mainWad = wad || web3.utils.toBN(2).pow(web3.utils.toBN(255));
	const approveRes = await tokenContract.methods
		.approve(bankAddress, mainWad)
		.send({
			from: accountAddress,
			...(await gas()),
		})
		.once('transactionHash', (txHash: string) => {
			console.log(txHash);
		})
		.then((resp: string) => resp);

	return approveRes;
};
