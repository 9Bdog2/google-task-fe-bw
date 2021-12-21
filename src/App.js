import { useEffect, useState } from "react";
import "./App.css";
import { HiOutlinePlusSm } from "react-icons/hi";
import { BsJournalPlus } from "react-icons/bs";
import { Dropdown } from "./components/Dropdown/Dropdown";
import { SingleTask } from "./components/SingleTask/SingleTask";
import { Modal } from "./components/Modal/Modal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [planners, setPlanners] = useState([]);
  const [open, setOpen] = useState(false);
  const [openPlanner, setOpenPlanner] = useState(false);
  const [selected, setSelected] = useState("");
  

  const fetchPlanners = async () => {
    try {
      const response = await fetch("https://google-task-backend-strive.herokuapp.com/planners")
      if (response.ok) {
        let data = await response.json();
        setPlanners(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
    fetchPlanners();
    fetchTasks();
  }, [])


  const deletePlanner = async()=> {
  console.log("Planner id:",selected)
    try {
      await fetch(`https://google-task-backend-strive.herokuapp.com/planners/${selected}`, {
        method:"DELETE",
      })
      alert(`the Planner with an id of ${selected} is deleted`)
    } catch (error) {
      console.log('something went wrong :(', error);
    }
  }

 
  return (
    <>
      <div className="app__wrap">
        <img src="/assets/logo.png" alt="logo" />
        <div className="app__header">
        {selected !== "" && <button onClick={deletePlanner}>Delete planner</button>}
        <div className="app__buttons">

          <Dropdown
            planners={planners}
            fetchSelPlanner={(tasks, sel) => {
              setTasks(tasks);
              setSelected(sel);
            }}
            />
          <div className="app__plus" onClick={() => setOpen((op) => !op)}>
            <HiOutlinePlusSm />
          </div>
          <div className="app__plus" onClick={() => setOpenPlanner((op) => !op)}>
            <BsJournalPlus />
          </div>
            </div>
        </div>

        {tasks?.map((task) => {
          return <SingleTask key={task.id} content={task.content} id={task.id} setDone={()=> {}} />;
        })}
      </div>
      <Modal type="task" planners={planners} isOpen={open} close={() => setOpen(false)} />
      <Modal type="planner" isOpen={openPlanner} close={() => setOpenPlanner(false)} />
    </>
  );
}

export default App;
