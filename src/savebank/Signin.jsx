import React, { useEffect, useState } from 'react'
import { Formik, useFormik, Form } from 'formik'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginUser } from '../redux/redux';
import { useNavigate } from 'react-router-dom';
import { loadUserFromStorage } from '../redux/redux';
import { Link } from 'react-router-dom';


function Signin() {
  const [logedin, setlogedin] = useState([])
  const login = useSelector(
    login => login.bankapp.users
  )
  const disp = useDispatch()

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      Email: '',
      Password: ''
    },
    onSubmit: values => {
      const result = disp(loginUser(values));

      if (result.payload?.success) {
        navigate('/dashboard'); // 👈 useNavigate here
      } else {
        alert('Invalid credentials');
        navigate('/signin')
      }

    },
  });


  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      <div className="col-md-6 col-lg-4 p-4 shadow rounded" style={{ backgroundColor: '#f9f9f9' }}>
        <h2 className="text-center mb-4" style={{ color: '#054455' }}>Sign In to SpendXP</h2>
        <Formik>
          <Form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <input
                type='email'
                name="Email"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder='Email Address'
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <input type="password" name='Password'
                placeholder="Password"
                value={formik.values.Password}
                onChange={formik.handleChange}
                className="form-control" />

            </div>

            <button type="submit" className="btn w-100 text-white"
              style={{ backgroundColor: '#054455' }}>Sign in</button>

            <small>Don’t have an account? <Link to={"/signup"}>Signup</Link> </small>

          </Form>
        </Formik>
      </div>


    </div>
  )
}

export default Signin