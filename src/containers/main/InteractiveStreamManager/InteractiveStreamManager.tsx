import React, { FC, useCallback, useEffect, useState } from 'react';
import ReactFlow, {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	Controls,
	GetMiniMapNodeAttribute,
	MiniMap,
	Position,
} from 'react-flow-renderer';
import type { Node, Edge, DefaultEdgeOptions, OnNodesChange, OnEdgesChange, OnConnect } from 'react-flow-renderer';
import { Coin } from 'constants/coins';
import { CoinNode } from './CoinNode';
import StreamModal from './StreamModal';
import HoverCard from './HoverCard';
import { flowConfig, InvestmentFlow, RoutesToFlowTypes } from 'constants/flowConfig';
import { useRouteMatch } from 'react-router-dom';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain, selectUserStreams } from 'store/main/selectors';
import {
	DAIxAddress,
	MATICxAddress,
	RICAddress,
	USDCxAddress,
	WBTCxAddress,
	WETHxAddress,
} from 'constants/polygon_config';
// import './reactFlow.styles.module.scss';

const sourceCoins = [Coin.USDCx, Coin.DAIx, Coin.WBTCx, Coin.WETHx, Coin.RIC, Coin.MATICx].map((coin, idx) => {
	return {
		name: coin,
		type: 'input',
		position: { x: -250, y: idx * 50 },
		sourcePosition: Position.Right,
		targetPosition: undefined,
	};
});

const targetCoins = [Coin.USDCx, Coin.DAIx, Coin.WBTCx, Coin.WETHx, Coin.RIC, Coin.MATICx].map((coin, idx) => {
	return {
		name: coin,
		type: 'output',
		position: { x: 250, y: idx * 50 },
		sourcePosition: undefined,
		targetPosition: Position.Left,
	};
});

const marketMap = {
	[Coin.USDCx]: [Coin.WBTCx, Coin.WETHx, Coin.RIC, Coin.MATICx],
	[Coin.DAIx]: [Coin.WETHx, Coin.WBTCx, Coin.MATICx],
	[Coin.WBTCx]: [Coin.USDCx, Coin.DAIx],
	[Coin.WETHx]: [Coin.USDCx, Coin.DAIx],
	[Coin.RIC]: [Coin.USDCx],
	[Coin.MATICx]: [Coin.USDCx, Coin.DAIx],
};

const addressesMap = {
	[Coin.USDCx]: USDCxAddress,
	[Coin.DAIx]: DAIxAddress,
	[Coin.WBTCx]: WBTCxAddress,
	[Coin.WETHx]: WETHxAddress,
	[Coin.RIC]: RICAddress,
	[Coin.MATICx]: MATICxAddress,
};

const nodeColor: GetMiniMapNodeAttribute = (node: Node<any>) => {
	switch (node.type) {
		case 'input':
			return '#ff0072';

		case 'output':
			return '#0041d0';

		default:
			return '#ffffff';
	}
};

type InteractiveStreamManagerProps = {
	handleStart: any;
	handleStop: any;
};

export const InteractiveStreamManager: FC<InteractiveStreamManagerProps> = ({ handleStart, handleStop }) => {
	const state = useShallowSelector(selectMain);
	const { balances, web3, isReadOnly, address } = state;
	const userStreams = useShallowSelector(selectUserStreams);
	const [filteredList, setFilteredList] = useState(flowConfig);
	const match = useRouteMatch();
	const flowType = RoutesToFlowTypes[match.path];

	useEffect(() => {
		if (flowType) {
			setFilteredList(flowConfig.filter((each) => each.type === flowType));
		}
	}, [flowType, state, userStreams]);

	const initialNodes: Node<any>[] = [...sourceCoins, ...targetCoins].map((coin, idx) => {
		return {
			id: `${coin.name}-${idx}`,
			position: coin.position,
			data: {
				label: (
					<CoinNode coin={coin.name} balance={balances ? balances[(addressesMap as any)[coin.name]] : '-'} />
				),
			},
			type: coin.type,
			sourcePosition: coin.sourcePosition,
			targetPosition: coin.targetPosition,
		};
	});

	const initialEdges: Edge<any>[] = [
		// RIC
		{
			animated: false,
			source: 'USDCx-0',
			target: 'RIC-10',
			id: 'reactflow__edge-USDCx-0-RIC-10',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'RIC-4',
			target: 'USDCx-6',
			id: 'reactflow__edge-RIC-4-USDCx-6',
			style: {
				opacity: 0,
			},
		},

		// WETHx
		{
			animated: false,
			source: 'USDCx-0',
			target: 'WETHx-9',
			id: 'reactflow__edge-USDCx-0-WETHx-9',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'DAIx-1',
			target: 'WETHx-9',
			id: 'reactflow__edge-DAIx-1-WETHx-9',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'WETHx-3',
			target: 'USDCx-6',
			id: 'reactflow__edge-WETHx-3-USDCx-6',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'WETHx-3',
			target: 'DAIx-7',
			id: 'reactflow__edge-WETHx-3-DAIx-7',
			style: {
				opacity: 0,
			},
		},

		// WBTCx
		{
			animated: false,
			source: 'USDCx-0',
			sourceHandle: null,
			target: 'WBTCx-8',
			targetHandle: null,
			id: 'reactflow__edge-USDCx-0-WBTCx-8',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'DAIx-1',
			target: 'WBTCx-8',
			id: 'reactflow__edge-DAIx-1-WBTCx-8',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'WBTCx-2',
			target: 'USDCx-6',
			id: 'reactflow__edge-WBTCx-2-USDCx-6',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'WBTCx-2',
			target: 'DAIx-7',
			id: 'reactflow__edge-WBTCx-2-DAIx-7',
			style: {
				opacity: 0,
			},
		},

		// MATICx
		{
			animated: false,
			source: 'USDCx-0',
			target: 'MATICx-11',
			id: 'reactflow__edge-USDCx-0-MATICx-11',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'DAIx-1',
			target: 'MATICx-11',
			id: 'reactflow__edge-DAIx-1-MATICx-11',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'MATICx-5',
			target: 'USDCx-6',
			id: 'reactflow__edge-MATICx-5-USDCx-6',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'MATICx-5',
			target: 'DAIx-7',
			id: 'reactflow__edge-MATICx-6-DAIx-7',
			style: {
				opacity: 0,
			},
		},
	];

	const [nodes, setNodes] = useState<Node<any>[]>(initialNodes);
	const [edges, setEdges] = useState<Edge<any>[]>(initialEdges);
	const [activeEdge, setActiveEdge] = useState<Edge<any> | null>(null);
	const [startNode, setStartNode] = useState<Node<any> | null>(null);

	const [amount, setAmount] = React.useState('0');

	const [flow, setFlow] = useState<InvestmentFlow | null>(null);

	useEffect(() => {
		if (activeEdge) {
			const config = filteredList.find(
				(flow) =>
					activeEdge.source.split('-')[0].includes(flow.coinA) &&
					activeEdge.target.split('-')[0].includes(flow.coinB),
			);
			if (config) {
				setFlow(config);
			}
		}
	}, [activeEdge, filteredList, userStreams]);

	useEffect(() => {
		setEdges((prev) => {
			const current = prev.map((edge) => {
				const stream = userStreams.find(
					(stream) => edge.source.includes(stream.coinA) && edge.target.includes(stream.coinB),
				);
				if (stream) {
					return {
						...edge,
						style: {
							opacity: 1,
						},
						animated: true,
						label: `${state[stream.flowKey]?.placeholder} ${stream.coinA}/month`,
					};
				}
				return edge;
			});

			return current;
		});
	}, [flow, state, userStreams]);

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
			const source = initialNodes.find((node) => node.id === connection.source);
			const target = initialNodes.find((node) => node.id === connection.target);

			if (!source || !target) {
				return;
			}

			if (
				userStreams.find(
					(stream) =>
						source.data.label.props.coin.includes(stream.coinA) &&
						target.data.label.props.coin.includes(stream.coinB),
				)
			) {
				return;
			}

			if (
				(marketMap as Record<any, Coin[]>)[source.data.label.props.coin].includes(target.data.label.props.coin)
			) {
				setEdges((eds) => {
					const edge = addEdge({ ...connection, animated: false }, []);
					const newActiveEdge = edge.find(
						(e) => connection.source?.includes(e.source) && connection.target?.includes(e.target),
					)!;
					setActiveEdge(newActiveEdge);
					return edge;
				});
				handleOpen();
			}
		},
		[initialNodes, userStreams],
	);

	const defaultEdgeOptions: DefaultEdgeOptions = {
		animated: true,
	};

	const deleteEdge = (edge: Edge<any>) => {
		if (edge)
			setEdges((eds) => {
				const ed = eds.find((e) => e.id === edge.id);
				if (ed) {
					ed.animated = false;
				}
				return eds.filter((ed) => ed.animated);
			});
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

	const stream = activeEdge
		? userStreams.find(
				(stream) => activeEdge.source.includes(stream.coinA) && activeEdge.target.includes(stream.coinB),
		  )
		: undefined;

	const hasStream = stream !== undefined;

	const onStart = () => {
		// update edge
		if (!hasStream && activeEdge) {
			edges.map((edge) => {
				if (edge.id === activeEdge.id) {
					edge.animated = true;
					edge.label = `${amount} ${edge.source.split('-')[0]} /month`;
					edge.style = {
						...edge.style,
						opacity: 1,
					};
				}
				return edge;
			});
			setEdges([...edges]);
		}
	};

	return (
		<div style={{ width: '100%', height: '100%', position: 'relative' }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onEdgeClick={(evt, edge) => {
					if (edge.animated === true) {
						setActiveEdge(edge);
						setShowStreamCard(true);
					}
				}}
				onPaneClick={(evt) => {
					setShowStreamCard(false);
				}}
				onConnectStart={(evt, params) => {
					if (params.handleType === 'target') {
						return;
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
					setNodes((nodes) => {
						return nodes.map((n) => {
							n.style = { ...n.style, opacity: 1 };
							return n;
						});
					});
				}}
				defaultEdgeOptions={defaultEdgeOptions}
				fitView
			>
				<MiniMap nodeColor={nodeColor} />
				<Controls />
				<Background />
			</ReactFlow>
			{open && activeEdge && flow && (
				<StreamModal
					flow={flow}
					activeEdge={activeEdge}
					address={address}
					onStart={onStart}
					web3={web3}
					isReadOnly={isReadOnly}
					flowType={flowType}
					open={open}
					handleOpen={handleOpen}
					handleClose={handleClose}
					onClickStart={handleStart(flow)}
					onClickStop={handleStop(flow)}
					setEdges={setEdges}
					amount={amount}
					setAmount={setAmount}
					resetNodes={resetNodes}
					hasStream={hasStream}
					deleteEdge={() => deleteEdge(activeEdge)}
					flowRate={stream ? state[stream.flowKey]?.placeholder : undefined}
				/>
			)}
			{hasStream && showStreamCard && activeEdge && (
				<HoverCard
					handleOpen={handleOpen}
					onClickStop={handleStop(flow)}
					setShowStreamCard={setShowStreamCard}
					coinA={activeEdge.source.split('-')[0]}
					coinB={activeEdge.target.split('-')[0]}
					stream={state[stream.flowKey]?.streamedSoFar}
					flowRate={state[stream.flowKey]?.placeholder}
					onStop={() => deleteEdge(activeEdge)}
				/>
			)}
		</div>
	);
};
