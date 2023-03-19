import React from "react";
import { gettask, getToken } from "../../services/api";
import Header from "../Header/Header";
import Task from "../Task/Task";
import { useEffect, useState } from "react";
import AddTask from "../AddTask/AddTask";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [userTask, setUserTask] = useState([]);
  const navigate = useNavigate();
  const [refreshTask, setRefreshTask] = useState();
  useEffect(() => {
    if (!getToken()) {
      navigate("/login ");
    }
    fetchTasks();
    console.log(userTask);
  }, [refreshTask]);
  async function fetchTasks() {
    const result = await gettask();
    if (result.status === 200) {
      if (result.data.status === 200) {
        setUserTask(result.data.data.tasks.reverse());
      }
    }
  }
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {userTask.map((t) => (
            <Task task={t} key={t._id} />
          ))}
        </div>
      </div>
      <div
        className=""
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-outline-dark btn-dark"
        >
          Add
        </button>
      </div>
      <AddTask setRefreshTask={setRefreshTask} />
    </div>
  );
}

export default HomePage;
