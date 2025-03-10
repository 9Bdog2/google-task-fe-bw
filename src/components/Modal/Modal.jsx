import { useState, useEffect } from "react";
import "./Modal.css";

export const Modal = ({ isOpen, close, type, planners }) => {
  const [select, setSelect] = useState([]);
  const [task, newTask] = useState("");
  
  // console.log(select);
  const addNewPlanner = async (event) => {
    try {
        await fetch("https://google-task-backend-strive.herokuapp.com/planners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: event.target.value }),
      })
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
 
  const addNewTask = async (event) => {
    try {
      // const item = event.target.value;
      // console.log(item)
      // newTask([...task, item])
      let response = await fetch ("https://google-task-backend-strive.herokuapp.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({ content: event.target.value, done: false, plannerId: select }),      
      })
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTask = (event) => {
    if (event.key === "Enter") {
      addNewTask(event);
      window.location.reload();
      close();
    } else {
      newTask(event.target.value);
    }
  };

  const handleAddPlanner = (event) => {
    if (event.key === "Enter") {
      addNewPlanner(event);
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
                <input type="text" onKeyUp={(event) => handleAddTask(event)} />
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
