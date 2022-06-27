import type { Pool } from 'constants/flowConfig';
import { FlowEnum, FlowTypes } from 'constants/flowConfig';

export interface Row {
	// wrapped coins(eg, WETH)
	coinA: string;
	coinB: string;
	// super tokens(eg, ETHx)
	tokenA: string;
	tokenB: string;
	// --- * ---
	exchangeAddress: string;
	superToken: string;
	// --- * ---
	// --- * ---
	pool: Pool;
	type: FlowTypes;
	key: FlowEnum;
	// --- * ---
	// --- * ---
	input: string;
	output: string;
	// --- * ---
	inflowRate: string;
	streamed: string;
	received: string;
	streamInTokenBalance?: string;
	distributeOutTokenBalance?: string;
	tvs: string;
	streams?: number;
}
