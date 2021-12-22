import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { Option } from "../Option/Option";
import { SingleTask } from "../SingleTask/SingleTask";

import "./Dropdown.css";

export const Dropdown = ({ fetchSelPlanner, planners }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [tasks, setTasks] = useState([]);


  const fetchTasks = async () => {
      try {
        const response = await fetch("https://google-task-backend-strive.herokuapp.com/tasks")    
        if (response.ok) {
          let data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  
  

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchSelPlanner(selected?.tasks, selected?.id || "");
  }, [selected]);

  return (
    <>
      <div
        className="dropdown__wrap"
        onClick={(e) => {
          setOpen((op) => !op);
        }}
      >
        {!selected?.name ? "Select a planner" : selected?.name}
        {open && (
          <div className="dropdown__content">
            <div onClick={() => setSelected(undefined)}>
              <Option plannerName={"See All"} />
            </div>
            {planners?.map((planner) => {
              return (
                <div key={planner.id} onClick={() => setSelected(planner)}>
                  <Option plannerName={planner.name} plannerId={planner.id} />
                </div>
              );
            })}
            
          
          </div>
        )}
      </div>
      {selected===undefined && tasks.map((task) => {
          return <SingleTask key={task.id} content={task.content} id={task.id} setDone={()=> {}} />;
        })}
    </>
  );
};
