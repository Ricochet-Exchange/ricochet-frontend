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
import type { Node, Edge, DefaultEdgeOptions, OnNodesChange, OnEdgesChange, OnConnect } from 'react-flow-renderer';
import { Coin } from 'constants/coins';
import { CoinNode } from './CoinNode';
import StreamModal from './StreamModal';
import HoverCard from './HoverCard';

const sourceCoins = [Coin.USDCx, Coin.DAIx, Coin.WBTCx, Coin.WETHx, Coin.RIC].map((coin, idx) => {
	return {
		name: coin,
		type: 'input',
		position: { x: -250, y: idx * 50 },
		sourcePosition: Position.Right,
		targetPosition: undefined,
	};
});

const targetCoins = [Coin.USDCx, Coin.DAIx, Coin.WBTCx, Coin.WETHx, Coin.RIC].map((coin, idx) => {
	return {
		name: coin,
		type: 'output',
		position: { x: 250, y: idx * 50 },
		sourcePosition: undefined,
		targetPosition: Position.Left,
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
		position: coin.position,
		data: {
			label: <CoinNode coin={coin.name} balance={1000} />,
		},
		type: coin.type,
		sourcePosition: coin.sourcePosition,
		targetPosition: coin.targetPosition,
		style: { border: coin.type === 'input' ? '1px solid palevioletred' : '1px solid lightseagreen' },
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
	const [activeEdge, setActiveEdge] = useState<Edge<any>[]>([]);
	const [startNode, setStartNode] = useState<Node<any> | null>(null);

	const [showStreamCard, setShowStreamCard] = useState<boolean>(false);

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

	const onConnect: OnConnect = useCallback(
		(connection) => {
			console.log(connection);
			// console.log(initialNodes)
			const source = initialNodes.find((node) => node.id === connection.source);
			const target = initialNodes.find((node) => node.id === connection.target);

			if (!source || !target) {
				return;
			}

			// console.log(source.data.label.props.coin)

			// console.log((marketMap as Record<any, Coin[]>)[source.data.label.props.coin], connection.source, connection)

			if (
				(marketMap as Record<any, Coin[]>)[source.data.label.props.coin].includes(target.data.label.props.coin)
			) {
				handleOpen();
				// if not connected
				setEdges((eds) => {
					const edge = addEdge({ ...connection, animated: false }, eds);
					console.log('onConnect: ', edge);
					// if (!streamHasStarted) {
					const newActiveEdge = edge.find((e) => e.animated === false)!;
					setActiveEdge([newActiveEdge]);
					// }
					// setActiveEdge(edge)
					return edge;
				});
			}
		},
		[setEdges],
	);

	const defaultEdgeOptions: DefaultEdgeOptions = {
		animated: true,
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	};

	const updateEdge = (edge: Edge<any>) => {};

	const deleteEdge = (edge: Edge<any>) => {
		setEdges((eds) => eds.filter((e) => e.id !== edge.id));
	};

	const filterNodes = (node: Node<any>, reset = false) => {
		setNodes((nodes) => {
			return nodes.map((n) => {
				if (
					(n.type === 'output' &&
						!(marketMap as any)[node?.data.label.props.coin].includes(n.data.label.props.coin)) ||
					(n.type === 'input' && n.data.label.props.coin !== node?.data.label.props.coin)
				) {
					n.style = { ...n.style, opacity: reset ? 1 : 0.5 };
				}
				return n;
			});
		});
	};

	const resetNodes = () => {
		if (!startNode) {
			console.error('startNode not found');
			return;
		}
		filterNodes(startNode, true);
	};

	const hasStream = false;

	return (
		<div style={{ width: '100%', height: '100%', position: 'relative' }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onNodeClick={(node) => console.log(node)}
				onEdgeClick={(edge) => {
					console.log(edge);
					setShowStreamCard(true);
				}}
				onPaneClick={(evt) => setShowStreamCard(false)}
				onConnectStart={(evt, params) => {
					// change opacity of incompatible nodes
					console.log('change opacity of incompatible nodes');

					if (params.handleType === 'target') {
						return;
					} else {
						console.log('handleId: ', params.handleId);
					}
					const node = nodes.find((n) => n.id === params.nodeId);
					if (!node) {
						console.error('node not found');
						return;
					}
					setStartNode(node);
					filterNodes(node);
				}}
				onConnectStop={(evt) => {
					console.log('reset opacity of incompatible nodes');
					resetNodes();
				}}
				defaultEdgeOptions={defaultEdgeOptions}
				fitView
			>
				<MiniMap nodeColor={nodeColor} />
				<Controls />
				<Background />
			</ReactFlow>
			<StreamModal
				open={open}
				handleOpen={handleOpen}
				handleClose={handleClose}
				handleStart={useCallback(() => {
					edges.map((edge) => {
						if (edge.id === activeEdge[0].id) {
							edge.animated = true;
							edge.label = '10 k';
						}
						return edge;
					});
					setEdges([...edges]);
				}, [activeEdge, edges])}
				handleStop={() => deleteEdge(activeEdge[0])}
				activeEdge={activeEdge}
				setEdges={setEdges}
				resetNodes={resetNodes}
				hasStream={hasStream}
			/>
			{!hasStream && showStreamCard && (
				<HoverCard
					handleOpen={handleOpen}
					handleStop={() => deleteEdge(activeEdge[0])}
					setShowStreamCard={setShowStreamCard}
				/>
			)}
		</div>
	);
};
