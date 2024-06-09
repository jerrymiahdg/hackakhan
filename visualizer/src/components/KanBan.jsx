import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const KanBan = ({ assignments }) => {
  const [kanbanAssignments, setKanbanAssignments] = useState(
    assignments.map((assignment) => {
      return {
        name: assignment.name,
        state: "todo",
        id: Math.trunc(Math.random() * 1000),
      };
    })
  );

  const changeState = (id, state) => {
    setKanbanAssignments((prev) => {
      return prev.map((el) => {
        if (el.id !== id) {
          return el;
        }
        const copy = { ...el };
        copy.state = state;
        return copy;
      });
    });
  };

  return (
    <div className="h-min flex gap-5 justify-between">
      <div className="w-full bg-red-100 py-4 rounded-2xl h-full flex flex-col gap-5">
        <div className="px-4">
          <h1 className="font-bold">To-do</h1>
        </div>
        {kanbanAssignments
          .filter((el) => el.state === "todo")
          .map((el) => (
            <div
              key={el.id}
              className="bg-black/5 flex justify-between p-1 pl-2"
            >
              <h1>{el.name}</h1>
              <button onClick={() => changeState(el.id, "doing")}>
                <ChevronRight />
              </button>
            </div>
          ))}
      </div>
      <div className="w-full bg-orange-100 py-4 rounded-2xl h-full flex flex-col gap-5">
        <div className="px-4">
          <h1 className="font-bold">Doing</h1>
        </div>
        {kanbanAssignments
          .filter((el) => el.state === "doing")
          .map((el) => (
            <div
              key={el.id}
              className="bg-black/5 flex justify-between p-1 pl-2"
            >
              <button onClick={() => changeState(el.id, "todo")}>
                <ChevronLeft />
              </button>
              <h1>{el.name}</h1>
              <button onClick={() => changeState(el.id, "done")}>
                <ChevronRight />
              </button>
            </div>
          ))}
      </div>
      <div className="w-full bg-green-100 py-4 rounded-2xl h-full flex flex-col gap-5">
        <div className="px-4">
          <h1 className="font-bold">Done</h1>
        </div>
        {kanbanAssignments
          .filter((el) => el.state === "done")
          .map((el) => (
            <div
              key={el.id}
              className="bg-black/5 flex justify-between p-1 pl-2"
            >
              <button onClick={() => changeState(el.id, "doing")}>
                <ChevronLeft />
              </button>
              <h1>{el.name}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default KanBan;
