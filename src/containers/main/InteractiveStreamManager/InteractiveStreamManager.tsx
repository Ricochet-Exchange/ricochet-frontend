import React, { useCallback, useState } from 'react';
import ReactFlow, {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	Controls,
	MarkerType,
	MiniMap,
	Position,
} from 'react-flow-renderer';
import type { Node, Edge, DefaultEdgeOptions, OnNodesChange, OnEdgesChange } from 'react-flow-renderer';
import { Coin } from 'constants/coins';
import { CoinNode } from './CoinNode';

const sourceCoins = [Coin.USDCx, Coin.DAIx, Coin.WBTCx, Coin.WETHx, Coin.RIC].map((coin) => {
	return { name: coin, type: 'input' };
});

const targetCoins = [Coin.USDCx, Coin.DAIx, Coin.WBTCx, Coin.WETHx, Coin.RIC].map((coin) => {
	return {
		name: coin,
		type: 'output',
	};
});

const marketMap = {
	[Coin.USDCx]: [Coin.WBTCx, Coin.WETHx, Coin.RIC],
	[Coin.DAIx]: [Coin.WETHx],
	[Coin.WBTCx]: [Coin.USDCx],
	[Coin.WETHx]: [Coin.USDCx, Coin.DAIx],
	[Coin.RIC]: [Coin.USDCx],
};

const initialNodes: Node<any>[] = [...sourceCoins, ...targetCoins].map((coin, idx) => {
	return {
		id: idx.toString(),
		position: { x: coin.type === 'input' ? 250 : 300, y: 50 * idx },
		data: {
			label: <CoinNode coin={coin.name} balance={1000} />,
		},
		type: coin.type,
		sourcePosition: coin.type === 'input' ? Position.Right : undefined,
		targetPosition: coin.type === 'output' ? Position.Left : undefined,
	};
});
const initialEdges: Edge<any>[] = [];

const nodeColor = (node: Node<any>) => {
	switch (node.type) {
		case 'input':
			return 'red';

		case 'output':
			return 'green';

		default:
			return 'blue';
	}
};

export const InteractiveStreamManager = () => {
	const [nodes, setNodes] = useState<Node<any>[]>(initialNodes);
	const [edges, setEdges] = useState<Edge<any>[]>(initialEdges);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const onNodesChange: OnNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[setNodes],
	);
	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[setEdges],
	);

	const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

	const defaultEdgeOptions: DefaultEdgeOptions = {
		animated: true,
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	};

	return (
		<>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				defaultEdgeOptions={defaultEdgeOptions}
				fitView
			>
				<MiniMap nodeColor={nodeColor} />
				<Controls />
				<Background />
			</ReactFlow>
		</>
	);
};
