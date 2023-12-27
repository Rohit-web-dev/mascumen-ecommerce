import React from 'react'

const Login = () => {
  return (
    <>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder="Enter Email" />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter password" />
        </div>
        <p className="note">*Note: You don't have account please click the signup button</p>
        <div className="d-flex justify-content-end py-3">
          <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Close</button>
          <button type="submit" className="btn signIn">SignIn</button>
        </div>
      </form>
    </>
  )
}

export default Login