import "./SingleTask.css";
import { BsCircle, BsCheckCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../Modal/Modal.css";
import { useNavigate } from "react-router-dom";

export const SingleTask = ({ content, id, setDone }) => {
  const [isChecked, setChecked] = useState(false);
  const [singleTask, setSingleTask] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchSingleTask = async () => {
    try {
      let response = await fetch(`%{process.env.REACT_APP_BE_PROD_URL}/tasks`);
      if (response.ok) {
        let singleTaskData = await response.json();
        setSingleTask(singleTaskData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isChecked) {
      //if the task has been marked as done
      setTimeout(() => {
        setDone(id);
      }, 500);
      console.log("isChecked");
    }
  }, [isChecked]);

  const updateTask = async (event) => {
    try {
      let response = await fetch(`https://google-task-backend-strive.herokuapp.com/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: event.target.value,
        }),
      });
      if (response.ok) {
        console.log("Task updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="single__wrap">
        <div className="single__checkmark" onClick={() => setChecked((check) => !check)}>
          {!isChecked ? <BsCircle /> : <BsCheckCircle />}
        </div>
        <div className="single__content"> {content} </div>
      </div>
      <div>
        <Button variant="info" onClick={handleShow}>
          Update
        </Button>
        <Button variant="danger">Delete</Button>
      </div>
      <Modal className="modal__bg" show={show} onHide={handleClose}>
        <Modal.Body className="modal__inner">
          <h2>Update task</h2>
          <small>Press enter to update</small>
          <input type="text" onKeyUp={(e) => updateTask(e)} />

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateTask()}>
            Save Changes
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
