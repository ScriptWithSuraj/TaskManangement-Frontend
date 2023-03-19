import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "../DatePicker/DatePicker";
import { IconButton } from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import { deleteTasks, updateTasks } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import NestedList from "../List/NestedList";

function Task({ task }) {
  console.log(task._id);
  const [ham, setHam] = useState(false);
  const [reminder, setReminder] = useState(false);
  const handleHam = () => {
    setHam((prevState) => !prevState);
    // console.log(ham);
  };
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const result = await deleteTasks({ task_id: task._id });
      if (result.status === 200) {
        if (result.data.status === 200) {
          navigate("/login");
          setHam(false);
        }
        if (result.data.status === 403) {
          toast(result.data.data);
          return;
        }
        if (result.data.status === 422) {
          toast(result.data.message);
          return;
        }
      }
    } catch (error) {
      toast("Something wrong happend");
    }
  };
  const handleUpdate = async () => {
    try {
      const result = await updateTasks({ task_id: task._id });
      if (result.status === 200) {
        if (result.data.status === 200) {
          navigate("/login");
          setHam(false);
        }
        if (result.data.status === 403) {
          toast(result.data.data);
          return;
        }
        if (result.data.status === 422) {
          toast(result.data.message);
          return;
        }
      }
    } catch (error) {
      toast("Something wrong happend");
    }
  };
  const handleClose = () => {
    setHam(false);
    if (reminder) setReminder(false);
  };
  // useEffect(() => {
  //   setHam(false);
  //   console.log(ham);
  // }, [ham]);
  return (
    <div className="col-sm-3 mx-3 my-2 alert bg-dark">
      {/* <ToastContainer /> */}
      <div className="d-flex justify-content-end">
        {!ham ? (
          <IconButton onClick={handleHam}>
            <DensityMediumIcon sx={{ color: "white" }} />
          </IconButton>
        ) : (
          <div>
            <div className="d-flex justify-content-between">
              {reminder && (
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "whitesmoke",
                      opacity: [0.9, 0.8, 0.7],
                    },
                    borderRadius: 2,
                  }}
                >
                  <FormControl className="mx-2">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio size="small" />}
                        label="Daily"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio size="small" />}
                        label="Weekly"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio size="small" />}
                        label="Monthly"
                      />
                    </RadioGroup>
                  </FormControl>
                  <NestedList className="mt-0" />
                </Box>
              )}
              <ul>
                <li onClick={handleDelete}>Delete</li>
                <li onClick={handleUpdate}>Update</li>
                <li onClick={() => setReminder((prevState) => !prevState)}>
                  Set Reminder
                </li>
                <li onClick={handleClose}>Close</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="d-flex flex-column justify-content-between">
        <div
          className={`mb-3 ${
            task.isCompleted ? "text-success" : "text-warning"
          }`}
        >
          {`Status: ${task.isCompleted ? "Completed" : "Pending"}`}
        </div>
      </div>
      <div className="card-body ">
        <h4 className="text-info card-title mb-1">{`${task.title}`}</h4>
        <p className="card-text text-white">{`  ${task.desc}`}</p>
        <DatePicker>
          <DateTimePicker
            className="mb-3"
            sx={{
              width: "65%",
              "& .MuiOutlinedInput-root": {
                height: "30px",
                fontSize: "10px",
                backgroundColor: "#dfdff5",
              },
            }}
          />
        </DatePicker>
        <p className="card-text">{moment(task.date).fromNow()}</p>
      </div>
    </div>
  );
}

export default Task;
