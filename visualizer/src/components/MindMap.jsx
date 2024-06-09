import ReactFlow, {
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  Background,
  useStore,
} from "reactflow";
import { useEffect, useState, useRef, useCallback } from "react";
import "reactflow/dist/style.css";

let id = 0;
const getId = () => `dndnode_${id++}`;

const MindMap = ({ assignments }) => {
  const [subtask, setSubtask] = useState("");

  const getSubtask = () => {
    return subtask;
  };

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    assignments.map((assignment, i) => {
      console.log(assignment);

      return {
        id: assignment.id,
        data: { label: assignment.name },
        position: { x: i * 200, y: 0 },
        type: "input",
      };
    })
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: "" },
      };

      setSubtask((subtask) => {
        newNode.data.label = subtask;
        return subtask;
      });

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // const [edges, setEdges] = useState([
  //   // {
  //   //   id: "1-2",
  //   //   source: "1",
  //   //   target: "2",
  //   // },
  // ]);

  // const nodeTypes = { custom: CustomNode };
  // useEffect(() => {
  //   assignments.forEach((assignment, i) => {
  //     setNodes((prev) => [
  //       ...prev,
  //       {
  //         id: toString(assignment.id),
  //         data: { label: assignment.name },
  //         position: { x: i * Math.random() * 400, y: 0 },
  //         type: "input",
  //       },
  //     ]);
  //     console.log(nodes);
  //   });
  // }, []);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex flex-col gap-5">
      {/* <div className="flex justify-around">
        {assignments.map((assignment) => (
          <div>{assignment.name}</div>
        ))}
      </div> */}
      <div className="h-[500px] bg-white p-2 rounded-xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Controls showInteractive={false} />
          {/* <Panel position="top-left" /> */}
        </ReactFlow>
      </div>
      <div className="flex gap-5">
        <input
          type="text"
          placeholder="Name of subtask"
          className="p-2 rounded-xl"
          value={subtask}
          onChange={(e) => setSubtask(e.target.value)}
        />
        <div
          className="text-sm text-center w-[160px] dndnode output border p-3 border-black rounded bg-white"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          {subtask || "Subtask"}
        </div>
      </div>
    </div>
  );
};

export default MindMap;
