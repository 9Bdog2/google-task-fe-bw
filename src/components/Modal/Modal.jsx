import { useState } from "react";
import "./Modal.css";
import {useParams, useNavigate} from 'react-router-dom'

export const Modal = ({ isOpen, close, type, planners }) => {
  const [select, setSelect] = useState([]);
  const [task, newTask] = useState("");
  const {plannerId} = useParams()
  const navigate = useNavigate()

  const addNewPlanner = async (event) => {
    try {
      let response = await fetch("https://google-task-backend-strive.herokuapp.com/planners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: event.target.value }),
      })
    } catch (error) {
      console.log(error);
    }
  };

  const updatePlanner = async(event)=> {
    const newPlanner = {name:event.target.value}
    try {
      const response = await fetch("https://google-task-backend-strive.herokuapp.com/planners"+ plannerId,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlanner),
      })
      if (!response.ok) throw new Error("Fetch Failed");
    } catch (error) {
      console.log('something went wrong :(', error);
    }
  }

  const deletePlanner = async()=> {
    try {
      const response = await fetch("https://google-task-backend-strive.herokuapp.com/planners"+ plannerId, {
        method:"DELETE",
      })
      if (!response.ok) throw new Error("Fetch Failed");
      navigate("/")
    } catch (error) {
      console.log('something went wrong :(', error);
    }
  }
  const handleAddTask = async (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      close();
    } else {
      newTask(event.target.value);
    }
  };
  const handleAddPlanner = async (event) => {
    console.log(event.key);
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
        : isOpen &&
          type === "planner" && (
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
