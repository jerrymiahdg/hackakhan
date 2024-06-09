import { useEffect, useState } from "react";

const List = ({ assignments }) => {
  const [listAssignments, setListAssignments] = useState(assignments);

  useEffect(() => {
    setListAssignments(assignments);
  }, [assignments]);

  const removeAssignment = (i) => () =>
    setListAssignments((prev) => {
      return prev.filter((el) => el.id !== i);
    });

  return (
    <div className="flex flex-col gap-5">
      {listAssignments.map((el, i) => (
        <div
          className="w-full bg-neutral-100 border border-neutral-300 p-5 rounded-2xl flex flex-col gap-5"
          key={i}
        >
          <h1 className="font-bold">{el.name}</h1>
          <div className="flex gap-5">
            <h1 className="w-full">{el.desc}</h1>
            <button
              className="p-2 border border-neutral-300 rounded-2xl text-center hover:bg-neutral-200 transition-all"
              onClick={removeAssignment(el.id)}
            >
              Done
            </button>
          </div>
        </div>
      ))}
      {listAssignments.length > 0 || <h1>Completed all assignments!</h1>}
    </div>
  );
};

export default List;
