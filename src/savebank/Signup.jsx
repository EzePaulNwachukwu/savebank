import React from 'react'
import { Formik, useFormik, Form } from 'formik'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RegisterNewUser } from '../redux/redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"

function Signup() {
  const validator = Yup.object({
    Fullname: Yup.string().required("Full name required").min(6, "Fullnmae: 6 charecter min").max(20, 'Fullname: 20 char max'),
    Email: Yup.string().required("email is required").email("invalide email address"),
    Password: Yup.string().required('Set a password').min(6, 'password: 6 char min').max(8, 'password: 8 char max')
  })


  const navigate = useNavigate()

  const registerUser = useSelector(
    registerUser => registerUser.bankapp.users
  )
  const disp = useDispatch()


  const formik = useFormik({
    initialValues: {
      id: Date.now(),
      Fullname: '',
      Password: '',
      Email: "",
      Transaction: [],
      currency: "",
      savinggoal: "",
      expenselimit: ""

    },
    onSubmit: values => {
      disp(RegisterNewUser(values));
      navigate('/signin')
    },
    validationSchema: validator
  });

  console.log(registerUser)


  return (
    <div className="container d-flex justify-content-center align-items-center py-5">

      <div className="col-md-6 col-lg-5 p-4 shadow rounded" style={{ backgroundColor: '#f9f9f9' }}>
        <h2 className="text-center mb-4" style={{ color: '#054455' }}>Create Your SpendXP Account</h2>
        <Formik>
          <Form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{ color: '#054455' }}>Full Name</label>
              <input
                type="text"
                name="Fullname"
                className="form-control"
                placeholder="Full Name"
                {...formik.getFieldProps('Fullname')}
              />
              {formik.touched.Fullname && formik.errors.Fullname && (
                <div className="text-danger">{formik.errors.Fullname}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: '#054455' }}>Email Address</label>
              <input
                type="email"
                name="Email"
                className="form-control"
                placeholder="Email Address"
                {...formik.getFieldProps('Email')}
              />
              {formik.touched.Email && formik.errors.Email && (
                <div className="text-danger">{formik.errors.Email}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: '#054455' }}>Password</label>
              <input
                type="password"
                name="Password"
                className="form-control"
                placeholder="Password"
                {...formik.getFieldProps('Password')}
              />
              {formik.touched.Password && formik.errors.Password && (
                <div className="text-danger">{formik.errors.Password}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn w-100 text-white"
              style={{ backgroundColor: '#054455' }}
            >
              Sign up
            </button>

            <small>Already have an account? <Link to={'/signin'}>sign in</Link></small>
          </Form>


        </Formik>





      </div>
    </div>
  )
}
export default Signup