import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTasks } from "../../services/api";
function AddTask({ setRefreshTask }) {
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const handleSave = async () => {
    if (!desc.length) {
      toast.error("Decription is required", {
        position: "bottom-center",
        hideProgressBar: true,
        autoClose: 100,
        theme: "colored",
        pauseOnHover: false,
        closeOnClick: false,
      });
    } else if (!title.length) {
      toast.error("Title is required", {
        position: "bottom-center",
        hideProgressBar: true,
        autoClose: 100,
        theme: "colored",
        pauseOnHover: false,
        closeOnClick: false,
      });
    } else {
      const result = await createTasks({ desc: desc, title: title });
      if (result.status === 200) {
        if (result.data.status === 200) {
          setRefreshTask(new Date());
          toast.success("Task added", {
            position: "bottom-center",
            hideProgressBar: true,
            autoClose: 100,
            theme: "colored",
            pauseOnHover: false,
            closeOnClick: false,
          });
          setDesc("");
          setTitle("");
        } else {
          toast.error(result.data.message, {
            position: "bottom-center",
            hideProgressBar: true,
            autoClose: 100,
            theme: "colored",
            pauseOnHover: false,
            closeOnClick: false,
          });
        }
      }
    }
  };
  return (
    <div className="modal mt-5" id="exampleModal">
      <ToastContainer />
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Add New Task</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              arial-label="close"
            >
              <span arial-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <input
                name=" "
                className="form-control"
                rows={1}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
                value={title}
              />
              <textarea
                name=" "
                className="form-control mt-4"
                rows={2}
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                placeholder="Enter the description"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={handleSave}
              // data-bs-dismiss={`${title} && ${desc} ? "modal":""`}
            >
              Save Task
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setDesc("");
                setTitle("");
              }}
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
