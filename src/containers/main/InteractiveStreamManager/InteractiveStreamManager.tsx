import { Coin } from 'constants/coins';
import { flowConfig, InvestmentFlow, RoutesToFlowTypes } from 'constants/flowConfig';
import {
	DAIxAddress,
	MATICxAddress,
	RICAddress,
	StIbAlluoBTCAddress,
	StIbAlluoETHAddress,
	StIbAlluoUSDAddress,
	USDCxAddress,
	WBTCxAddress,
	WETHxAddress,
} from 'constants/polygon_config';
import { useShallowSelector } from 'hooks/useShallowSelector';
import React, { FC, useCallback, useEffect, useState } from 'react';
import type { DefaultEdgeOptions, Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'react-flow-renderer';
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
import { useRouteMatch } from 'react-router-dom';
import { selectMain, selectUserStreams } from 'store/main/selectors';
import { CoinNode } from './CoinNode';
import HoverCard from './HoverCard';
import StreamModal from './StreamModal';
// import './reactFlow.styles.module.scss';

const sourceCoins = [
	Coin.USDCx,
	Coin.DAIx,
	Coin.WBTCx,
	Coin.WETHx,
	Coin.RIC,
	Coin.MATICx,
	Coin.StIbAlluoETH,
	Coin.StIbAlluoUSD,
	Coin.StIbAlluoBTC,
].map((coin, idx) => {
	return {
		name: coin,
		type: 'input',
		position: { x: -250, y: idx * 50 },
		sourcePosition: Position.Right,
		targetPosition: undefined,
	};
});

const targetCoins = [
	Coin.USDCx,
	Coin.DAIx,
	Coin.WBTCx,
	Coin.WETHx,
	Coin.RIC,
	Coin.MATICx,
	Coin.StIbAlluoETH,
	Coin.StIbAlluoUSD,
	Coin.StIbAlluoBTC,
].map((coin, idx) => {
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
	[Coin.StIbAlluoETH]: [Coin.StIbAlluoUSD],
	[Coin.StIbAlluoUSD]: [Coin.StIbAlluoETH],
	[Coin.StIbAlluoBTC]: [Coin.StIbAlluoUSD],
	[Coin.StIbAlluoUSD]: [Coin.StIbAlluoBTC],
};

const addressesMap = {
	[Coin.USDCx]: USDCxAddress,
	[Coin.DAIx]: DAIxAddress,
	[Coin.WBTCx]: WBTCxAddress,
	[Coin.WETHx]: WETHxAddress,
	[Coin.RIC]: RICAddress,
	[Coin.MATICx]: MATICxAddress,
	[Coin.StIbAlluoETH]: StIbAlluoETHAddress,
	[Coin.StIbAlluoUSD]: StIbAlluoUSDAddress,
	[Coin.StIbAlluoBTC]: StIbAlluoBTCAddress,
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
	const { coingeckoPrices } = state;

	useEffect(() => {
		if (flowType) {
			setFilteredList(flowConfig.filter((each) => each.type === flowType));
		}
	}, [flowType, state, userStreams]);

	const initialNodes: Node<any>[] = [...sourceCoins, ...targetCoins].map((coin, idx) => {
		const outgoingStreams = userStreams.filter((stream) => {
			return stream.tokenA === (addressesMap as any)[coin.name];
		});
		const incomingStreams = userStreams.filter((stream) => {
			return stream.tokenB === (addressesMap as any)[coin.name];
		});

		let conversionMultiplier = 1;
		const props = new Map();
		let outgoingFlowRate = '0',
			incomingFlowRate = '0';

		if (outgoingStreams.length === 1 || incomingStreams.length === 1) {
			const outgoingStream = outgoingStreams.length > 0 && outgoingStreams[0];
			// check if coin has outgoing stream
			if (outgoingStream) {
				outgoingFlowRate = state[outgoingStream.flowKey]?.placeholder || '0';
				const streamedSoFar = state[outgoingStream.flowKey]?.streamedSoFar;
				const streamedSoFarTimestamp = state[outgoingStream.flowKey]?.streamedSoFarTimestamp;
				props.set('streamedSoFar', streamedSoFar);
				props.set('streamedSoFarTimestamp', streamedSoFarTimestamp);
			}

			const incomingStream = incomingStreams.length > 0 && incomingStreams[0];
			// check if coin has incoming stream
			if (incomingStream) {
				incomingFlowRate = state[incomingStream.flowKey]?.placeholder || '0';
				const streamedSoFar = state[incomingStream.flowKey]?.streamedSoFar;
				const streamedSoFarTimestamp = state[incomingStream.flowKey]?.streamedSoFarTimestamp;
				const { tokenA, tokenB } = incomingStream;
				props.set('streamedSoFar', streamedSoFar);
				props.set('streamedSoFarTimestamp', streamedSoFarTimestamp);

				if (coingeckoPrices) {
					conversionMultiplier = (coingeckoPrices[tokenA] || 0) / (coingeckoPrices[tokenB] || 1);
				}
				props.set('conversionMultiplier', conversionMultiplier);
			}
			const netFlowRate = +incomingFlowRate - +outgoingFlowRate;

			props.set('flowRate', Math.abs(netFlowRate));
			props.set('direction', netFlowRate < 0 ? -1 : 1);
		}

		return {
			id: `${coin.name}-${idx}`,
			position: coin.position,
			data: {
				label: (
					<CoinNode
						coin={coin.name}
						balance={balances ? balances[(addressesMap as any)[coin.name]] : '-'}
						{...Object.fromEntries(props)}
					/>
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
			target: 'RIC-13',
			id: 'reactflow__edge-USDCx-0-RIC-13',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'RIC-4',
			target: 'USDCx-9',
			id: 'reactflow__edge-RIC-4-USDCx-9',
			style: {
				opacity: 0,
			},
		},

		// WETHx
		{
			animated: false,
			source: 'USDCx-0',
			target: 'WETHx-12',
			id: 'reactflow__edge-USDCx-0-WETHx-12',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'DAIx-1',
			target: 'WETHx-12',
			id: 'reactflow__edge-DAIx-1-WETHx-12',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'WETHx-3',
			target: 'USDCx-9',
			id: 'reactflow__edge-WETHx-3-USDCx-9',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'WETHx-3',
			target: 'DAIx-10',
			id: 'reactflow__edge-WETHx-3-DAIx-10',
			style: {
				opacity: 0,
			},
		},

		// WBTCx
		{
			animated: false,
			source: 'USDCx-0',
			sourceHandle: null,
			target: 'WBTCx-11',
			targetHandle: null,
			id: 'reactflow__edge-USDCx-0-WBTCx-11',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'DAIx-1',
			target: 'WBTCx-11',
			id: 'reactflow__edge-DAIx-1-WBTCx-11',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'WBTCx-2',
			target: 'USDCx-9',
			id: 'reactflow__edge-WBTCx-2-USDCx-9',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'WBTCx-2',
			target: 'DAIx-10',
			id: 'reactflow__edge-WBTCx-2-DAIx-10',
			style: {
				opacity: 0,
			},
		},

		// MATICx
		{
			animated: false,
			source: 'USDCx-0',
			target: 'MATICx-14',
			id: 'reactflow__edge-USDCx-0-MATICx-14',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'DAIx-1',
			target: 'MATICx-14',
			id: 'reactflow__edge-DAIx-1-MATICx-14',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'MATICx-5',
			target: 'USDCx-9',
			id: 'reactflow__edge-MATICx-5-USDCx-9',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'MATICx-5',
			target: 'DAIx-10',
			id: 'reactflow__edge-MATICx-5-DAIx-10',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'StIbAlluoETH-6',
			target: 'StIbAlluoUSD-16',
			id: 'reactflow__edge-StIbAlluoETH-6-StIbAlluoUSD-16',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'StIbAlluoUSD-7',
			target: 'StIbAlluoETH-15',
			id: 'reactflow__edge-StIbAlluoUSD-7-StIbAlluoETH-15',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'StIbAlluoBTC-8',
			target: 'StIbAlluoUSD-16',
			id: 'reactflow__edge-StIbAlluoBTC-8-StIbAlluoUSD-16',
			style: {
				opacity: 0,
			},
		},
		{
			animated: false,
			source: 'StIbAlluoUSD-7',
			target: 'StIbAlluoBTC-17',
			id: 'reactflow__edge-StIbAlluoUSD-7-StIbAlluoBTC-17',
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

	let coinAconversionMultiplier = 1;
	let coinBconversionMultiplier = 1;

	if (coingeckoPrices && stream) {
		const { tokenA, tokenB } = stream;
		coinAconversionMultiplier = (coingeckoPrices[tokenA] || 0) / (coingeckoPrices[tokenB] || 1);
		coinBconversionMultiplier = (coingeckoPrices[tokenB] || 0) / (coingeckoPrices[tokenA] || 1);
	}

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
					flowRate={hasStream ? state[stream.flowKey]?.placeholder : undefined}
				/>
			)}
			{hasStream && showStreamCard && activeEdge && (
				<HoverCard
					handleOpen={handleOpen}
					onClickStop={handleStop(flow)}
					setShowStreamCard={setShowStreamCard}
					coinA={activeEdge.source.split('-')[0]}
					coinB={activeEdge.target.split('-')[0]}
					coinAconversionMultiplier={coinAconversionMultiplier}
					coinBconversionMultiplier={coinBconversionMultiplier}
					stream={state[stream.flowKey]?.streamedSoFar}
					streamTimestamp={state[stream.flowKey]?.streamedSoFarTimestamp}
					flowRate={state[stream.flowKey]?.placeholder}
					onStop={() => deleteEdge(activeEdge)}
				/>
			)}
		</div>
	);
};
