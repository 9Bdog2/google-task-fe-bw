import { useState } from "react";
import "./Modal.css";

export const Modal = ({ isOpen, close, type, planners }) => {
  const [select, setSelect] = useState([]);
  const [task, newTask] = useState("");

  const handleAddTask = async (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      const postNewTask = await fetch("https://google-task-backend-strive.herokuapp.com/tasks/:id", { 
        method: "POST",
      })
      close();
    } else {
      newTask(event.target.value);
    }
  };
  const handleAddPlanner = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      const postNewPlanner = async () => {
        try {
          const newPlanner = await fetch("https://google-task-backend-strive.herokuapp.com/planners", {
            method: "POST",
          })
        } catch (error) {
          console.log(error)
        }
      }
      close();
    }
  };
  return (
    <>
      {type === "task"
        ? isOpen && (
            <>
              <div className="modal__bg" onClick={() => close()}></div>
              <div className="modal__inner">
                <div className="modal__controls" onClick={() => close()}>
                  x
                </div>
                <h2>Create new task</h2>
                <small>Press enter to create</small>
                <input type="text" onKeyUp={(e) => handleAddTask(e)} />
                <h3>Choose a planner</h3>
                <div className="modal__planners">
                  {planners?.map((planner) => {
                    return (
                      <div className={planner.id === select ? "option__modal--click" : "option__modal"} onClick={() => setSelect(planner.id)}>
                        {planner.name}
                      </div>
                    );
                  })}
                </div>
              </div>{" "}
            </>
          )
        : isOpen && type === "planner" && (
          <>
          <div className="modal__bg" onClick={() => close()}></div>
            <div className="modal__inner">
              <div className="modal__controls" onClick={() => close()}>
                x
              </div>
              <h2>Create new planner</h2>
              <small>Press enter to create</small>
              <input type="text" onKeyUp={(e) => handleAddPlanner(e)} />
            </div>
            </>
          )}
    </>
  );
};
