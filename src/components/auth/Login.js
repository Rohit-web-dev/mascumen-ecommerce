"use client"
import React, { useState } from 'react';
import appwriteService from "@/appwrite/config";
import { useRouter } from "next/navigation";
import CommonToast from '../common/CommonToast';
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice"


const Login = ({ handleClose, handleSucess }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const session = await appwriteService.login(formData);
      if (session) {
        // console.log('Logged in:', session);
        dispatch(login({ userData: session }));
        CommonToast("success", "Logged in successfully");
        handleSucess();
      }
    } catch (error) {
      setError('Login failed:', error.message);
    }
  };


  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            autoComplete="off"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            autoComplete="off"
            id="exampleInputPassword1"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <p className="note">
          *Note: You don't have an account; please click the signup button
        </p>
        {error && <p className="text-danger mt-8 text-center">{error}</p>}
        <div className="d-flex justify-content-end py-3">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={handleClose}
          >
            Close
          </button>
          <button type="submit" className="btn signIn">
            SignIn
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
