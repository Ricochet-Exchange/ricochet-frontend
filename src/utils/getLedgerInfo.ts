import { IFrameEthereumProvider } from '@ledgerhq/iframe-provider';
import { LedgerHQFrameConnector } from './ledgerhq-frame-connector/connector';

export const getLedgerProvider = async (
	ledgerHQFrame: LedgerHQFrameConnector,
): Promise<IFrameEthereumProvider | undefined> => {
	if (ledgerHQFrame.isLedgerApp()) {
		await ledgerHQFrame.activate();
		return ledgerHQFrame.getProvider();
	}
	return undefined;
};

export const getLedgerChainId = async (ledgerHQFrame: LedgerHQFrameConnector) => ledgerHQFrame.getChainId();
