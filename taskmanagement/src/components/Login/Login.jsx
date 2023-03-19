import React, { useState, useEffect } from "react";
import { login } from "../../services/api";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import Alerts from "../Alerts/Alerts";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);

  const [errors, seterrors] = useState(null);
  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    const result = await login(loginData);
    console.log(result);
    if (result.status === 200) {
      if (result.data.status === 200) {
        toast("Login successfully");
        localStorage.setItem("user", JSON.stringify(result.data.data));
        localStorage.setItem("token", JSON.stringify(result.data.data.token));
        navigate("/");
        return;
      }
      if (result.data.status === 403) {
        seterrors(result.data.data);
        toast.error(result.data.data, {
          position: "bottom-center",
          hideProgressBar: true,
          autoClose: 100,
        });
        return;
      }
      if (result.data.status === 422) {
        seterrors(result.data.data);
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
          <div className="border-dark   bg-dark col-lg-5 card mt-4">
            <div className="card-body">
              <h4 className="card-title">Login Here </h4>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  Email address
                </label>
                <input
                  type="email"
                  onChange={handleInputChange}
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                {errors?.email ? (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.email.msg}
                  </small>
                ) : (
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail2" className="form-label mt-4">
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleInputChange}
                  name="password"
                  className="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  placeholder="Enter password"
                />
                {errors?.password ? (
                  <small id="emailHelp" className="form-text text-danger">
                    {errors.password.msg}
                  </small>
                ) : (
                  <small id="emailHelp" className="form-text text-muted">
                    Your password is safe.
                  </small>
                )}
              </div>
              <button
                type="button"
                className="btn btn-dark mt-4"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
