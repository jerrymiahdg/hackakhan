import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import Timer from "./Timer";

const Pomodoro = ({ assignments }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isFocus, setIsFocus] = useState(true);

  const selectAssignment = (id) => () => {
    setSelectedAssignment(id);
  };

  return (
    <div>
      {!selectedAssignment && (
        <div className="gap-5 flex flex-col">
          <h1 className="font-bold">Select an assignment to focus on.</h1>
          {assignments.map((el) => (
            <button
              className="bg-neutral-200 rounded-xl p-2"
              onClick={selectAssignment(el.id)}
            >
              <h1 key={el.id}>{el.name}</h1>
            </button>
          ))}
        </div>
      )}
      {selectedAssignment && (
        <div className="w-full flex flex-col gap-10">
          <h1 className="text-3xl">
            {isFocus ? (
              <>
                Focusing on{" "}
                <span className="font-bold">
                  {assignments.find((el) => el.id == selectedAssignment).name}
                </span>
              </>
            ) : (
              <h1>Break</h1>
            )}
          </h1>
          {isFocus ? (
            <Timer
              key="0"
              timerLen={25 * 60}
              onExpire={() => {
                setIsFocus((isFocus) => !isFocus);
              }}
              autoStart={true}
            />
          ) : (
            <Timer
              key="1"
              timerLen={5 * 60}
              onExpire={() => {
                setSelectedAssignment(null);
                setIsFocus((isFocus) => !isFocus);
              }}
              autoStart={false}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Pomodoro;
