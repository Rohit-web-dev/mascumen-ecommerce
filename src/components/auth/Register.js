"use client"
import React, { FormEvent, useState } from 'react';
import appwriteService from "@/appwrite/config";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    //const filteredData = Object.fromEntries(Object.entries(formData).filter(([key]) => key !== 'phone' && key !== 'confirmPassword'));


    try {
      // console.log('huddel',appwriteService);
       const result = await appwriteService.createUserAccount(formData);
      // // console.log('huddel',formData);
        if (result) {
      //   setAuthStatus(true)
         console.info(result)}
      console.log('handlesignup',formData)
    }
      // Handle the result, e.g., show a success message or redirect the user
      // console.log(result);
    catch(error) {
      // Handle errors, e.g., show an error message to the user
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            autoComplete="off"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="number"
            className="form-control"
            id="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            autoComplete="off"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpass" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Enter Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex justify-content-end py-3">
          <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">
            Close
          </button>
          <button type="submit" className="btn signIn">
            SignUp
          </button>
        </div>
      </form>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

    </>
  );
};

export default Register;
