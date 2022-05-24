import React, { useCallback, useState } from 'react';
import ReactFlow, {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	Controls,
	MarkerType,
} from 'react-flow-renderer';
import type { Node, Edge, DefaultEdgeOptions, OnNodesChange, OnEdgesChange } from 'react-flow-renderer';

const initialNodes: Node<any>[] = [];
const initialEdges: Edge<any>[] = [];

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
				<Controls />
				<Background />
			</ReactFlow>
		</>
	);
};
