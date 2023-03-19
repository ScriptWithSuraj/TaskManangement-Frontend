import React from "react";
import { useState, useEffect } from "react";
import { register } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

function Register() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);

  const handleInputChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const handleRegister = async () => {
    const result = await register(registerData);
    if (result.status === 200) {
      if (result.data.status === 403) {
        setErrors(result.data.data);
        toast.error(result.data.message, {
          position: "bottom-center",
          hideProgressBar: true,
          autoClose: 100,
          theme: "colored",
          pauseOnHover: false,
          closeOnClick: false,
        });
        return;
      }
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigate("/");

        return;
      }
      if (result.data.status === 422) {
        toast.error(result.data.message, {
          position: "bottom-center",
          hideProgressBar: true,
          autoClose: 100,
          theme: "colored",
          pauseOnHover: false,
          closeOnClick: false,
        });
      }
    } else {
      toast("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <ToastContainer />
        <div className="justify-content-center row mt-4">
          <div className="border-dark   bg-dark col-lg-5 card mb-3">
            <div className="card-header h4 text-center">Register Here</div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter user name"
                />
                {errors?.username && (
                  <small id="emailHelp" className="form-text  text-danger">
                    {errors.username.msg}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail2" className="form-label mt-4">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  className="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                {errors?.email && (
                  <small id="emailHelp" className="form-text  text-danger">
                    {errors.email.msg}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmai3" className="form-label mt-4">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  className="form-control"
                  id="exampleInputEmail3"
                  aria-describedby="emailHelp"
                  placeholder="Enter password"
                />
                {errors?.password && (
                  <small id="emailHelp" className="form-text  text-danger">
                    {errors.password.msg}
                  </small>
                )}
              </div>
              <div className="row justify-content-md-center form-group mt-4 ">
                <button
                  type="button"
                  className="col-sm-6 btn btn-dark mt-4 center"
                  onClick={handleRegister}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
