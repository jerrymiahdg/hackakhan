import { useState } from "react";

const List = ({ assignments }) => {
  const [listAssignments, setListAssignments] = useState(
    assignments.map((el, i) => {
      return { name: el, id: i };
    })
  );

  const removeAssignment = (i) => () =>
    setListAssignments((prev) => {
      return prev.filter((el) => el.id !== i);
    });

  return (
    <div className=" flex flex-col gap-5">
      {listAssignments.map((el) => (
        <div
          className="w-full bg-neutral-200 p-5 rounded-2xl flex flex-col gap-5"
          key={el.id}
        >
          <h1 className="font-bold">{el.name}</h1>
          <h1 className="">Description</h1>
          <button
            className="text-left text-red-500 underline"
            onClick={removeAssignment(el.id)}
          >
            Done
          </button>
        </div>
      ))}
      {listAssignments.length > 0 || <h1>Completed all assignments!</h1>}
    </div>
  );
};

export default List;
