import React from 'react'

const Register = () => {
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter Full Name" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder="Enter Email" autoComplete='off' />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="number" className="form-control" id="phone" placeholder="Enter Phone Number" />
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">Password</label>
          <input type="password" className="form-control" id="pass" placeholder="Enter Password" autoComplete='off' />
        </div>
        <div className="mb-3">
          <label htmlFor="cpass" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpass" placeholder="Enter Confirm Password" />
        </div>
        <div className="d-flex justify-content-end py-3">
          <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Close</button>
          <button type="submit" className="btn signIn">SignUp</button>
        </div>
      </form>
    </>
  )
}

export default Register