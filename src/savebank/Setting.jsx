import { Field, Formik, Form, useFormik } from 'formik'
import { } from 'react-router-dom'
import React from 'react'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { updateUserProfile } from '../redux/redux'
import { updateCurrency } from '../redux/redux'
import { savingsgoalAndExpenseLimit } from '../redux/redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { deleteUserAccount } from '../redux/redux'
import { useNavigate } from 'react-router-dom'


function Setting() {
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const PasswordChangeSchema = Yup.object().shape({
    currentpassword: Yup.string().required('Required'),
    newpassword: Yup.string().min(6, 'Too Short!').required('Required'),
    confirmpassword: Yup.string().oneOf([Yup.ref('newpassword')], 'Passwords must match').required('Required'),
    Email: Yup.string().required('Required').email('invalid email')
  });

  const formik = useFormik({
    initialValues: {
      Email: '',
      currentpassword: '',
      newpassword: '',
    },
    onSubmit: (values) => {
      dispatch(updateUserProfile(values))
      console.log(values)
    },

    validationSchema: PasswordChangeSchema

  })

  const currencyFormik = useFormik({
    initialValues: {
      currency: "$"
    },
    onSubmit: (values) => {
      dispatch(updateCurrency(values))
    }
  })

  const budgetFormik = useFormik({
    initialValues: {
      savinggoal: '',
      expenselimit: '',
    },
    onSubmit: (values) => {
      dispatch(savingsgoalAndExpenseLimit(values))
      console.log(values);
    }
  })

  const deleteacc = () => {
    dispatch(deleteUserAccount())
    navigate('/signup')

  }

  return (
    <div className='  min-vh-100 bg-light '>
      <h2 className="text-center my-5 mb-4" style={{ color: '#054455' }}>Settings</h2>

      <div class="accordion accordion-flush m-auto form-wrapper p-1 rounded shadow bg-white w-md-75 w-lg-75 m-sm-100" id="accordionFlushExample" style={{ maxWidth: '400px' }}>



        <div class="accordion accordion-flush my-3 form-wrapper p-1 rounded shadow bg-white w-100" id="accordionFlushExample" style={{ maxWidth: '400px' }}>
          <div class="accordion-item ">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                <b style={{ color: '#034254' }}>User Profile</b>
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <Formik >
                  <Form onSubmit={formik.handleSubmit} >
                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#034254' }}>Name</label>
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter name"
                        style={{
                          border: '1px solid #034254',
                          borderRadius: '5px',
                          width: '100%',
                          color: '#034254',
                        }}{...formik.getFieldProps("name")}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#034254' }}>Email</label>
                      <Field
                        type="email"
                        name="Email"
                        className="form-control"
                        placeholder="Enter email"
                        style={{
                          border: '1px solid #034254',
                          borderRadius: '5px',
                          width: '100%',
                          color: '#034254',
                        }}
                        {...formik.getFieldProps("Email")}

                      />
                      {formik.errors.Email && formik.touched.Email && (
                        <div className="text-danger">{formik.errors.Email}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#034254' }}>Current Password </label>
                      <Field
                        type="password"
                        name="currentpassword"
                        className="form-control"
                        placeholder="Current password"
                        style={{
                          border: '1px solid #034254',
                          borderRadius: '5px',
                          width: '100%',
                          color: '#034254',
                        }}

                        {...formik.getFieldProps("currentpassword")}
                      />
                      {formik.errors.currentpassword && formik.touched.currentpassword && (
                        <div className="text-danger">{formik.errors.currentpassword}</div>
                      )}
                    </div>



                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#034254' }}>New Password</label>
                      <Field
                        type="password"
                        name="newpassword"
                        className="form-control"
                        placeholder="New password"
                        style={{
                          border: '1px solid #034254',
                          borderRadius: '5px',
                          width: '100%',
                          color: '#034254',
                        }}
                        {...formik.getFieldProps("newpassword")}

                      />
                      {formik.errors.newpassword && formik.touched.newpassword && (
                        <div className="text-danger">{formik.errors.newpassword}</div>
                      )}
                    </div>


                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#034254' }}>Confirm Password</label>
                      <Field
                        type="password"
                        name="confirmpassword"
                        className="form-control"
                        placeholder="Confirm password"
                        style={{
                          border: '1px solid #034254',
                          borderRadius: '5px',
                          width: '100%',
                          color: '#034254',
                        }}
                        {...formik.getFieldProps("confirmpassword")}

                      />
                      {formik.errors.confirmpassword && formik.touched.confirmpassword && (
                        <div className="text-danger">{formik.errors.confirmpassword}</div>
                      )}
                    </div>



                    <button
                      type="submit"
                      className="btn"
                      style={{
                        backgroundColor: '#034254',
                        color: '#fff',
                        width: '100%',
                        border: 'none',
                        borderRadius: '5px',
                      }}
                    >
                      Save Profile
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>

        </div>

        <div class="accordion accordion-flush my-3 form-wrapper p-1 rounded shadow bg-white w-100" id="accordionFlushExample" style={{ maxWidth: '400px' }}>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                <b style={{ color: '#034254' }}>Budget Settings</b>
              </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">

                <Formik>
                  <Form onSubmit={budgetFormik.handleSubmit} className="p-2">
                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#034254' }}>Monthly Savings Goal</label>
                      <Field
                        type="number"
                        name="savinggoal"
                        className="form-control"
                        {...budgetFormik.getFieldProps('savinggoal')}
                        style={{
                          border: '1px solid #034254',
                          borderRadius: '5px',
                          width: '100%',
                          color: '#034254',
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#034254' }}>Monthly Expense Limit</label>
                      <Field
                        type="number"
                        name="expenselimit"
                        className="form-control"
                        {...budgetFormik.getFieldProps('expenselimit')}

                        style={{
                          border: '1px solid #034254',
                          borderRadius: '5px',
                          width: '100%',
                          color: '#034254',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn"
                      style={{
                        backgroundColor: '#034254',
                        color: '#fff',
                        width: '100%',
                        border: 'none',
                        borderRadius: '5px',
                      }}
                    >
                      Save Budget
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>

        </div>
        <div class="accordion accordion-flush my-3 form-wrapper p-1 rounded shadow bg-white w-100" id="accordionFlushExample" style={{ maxWidth: '400px' }}>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                <b style={{ color: '#034254' }}> Currency</b>
              </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <Formik >
                  <Form onSubmit={currencyFormik.handleSubmit} className="p-2">
                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#034254' }}>Select Currency</label>
                      <Field
                        as="select"
                        name="currency"
                        className="form-select"
                        {...currencyFormik.getFieldProps('currency')}


                        style={{
                          border: '1px solid #034254',
                          borderRadius: '5px',
                          width: '100%',
                          color: '#034254',
                        }}
                      >
                        <option value="$">USD ($)</option>
                        <option value="€">EUR (€)</option>
                        <option value="£">GBP (£)</option>
                        <option value="¥">JPY (¥)</option>
                        <option value="₦">NGN (₦)</option>
                      </Field>
                    </div>

                    <button
                      type="submit"
                      className="btn"
                      style={{
                        backgroundColor: '#034254',
                        color: '#fff',
                        width: '100%',
                        border: 'none',
                        borderRadius: '5px',
                      }}
                    >
                      Save Currency
                    </button>
                  </Form>

                </Formik>
              </div>
            </div>
          </div>

        </div>
        {/* <div class="accordion accordion-flush my-3 form-wrapper p-1 rounded shadow bg-white w-100" id="accordionFlushExample" style={{ maxWidth: '400px' }}>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                <b>Income Cycles</b>
              </button>
            </h2>
            <div id="flush-collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item’s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.
              </div>
            </div>
          </div>

        </div> */}

        <div class="accordion accordion-flush my-3 form-wrapper p-1 rounded shadow bg-white w-100" id="accordionFlushExample" style={{ maxWidth: '400px' }}>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                <b style={{ color: '#034254' }}>Notification Settings</b>
              </button>
            </h2>
            <div id="flush-collapseFive" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <Formik
                  initialValues={{
                    emailnotification: false,
                    pushnotification: false,
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  <Form className="p-2">
                    <div className="form-check mb-3">
                      <Field
                        type="checkbox"
                        name="emailnotification"
                        className="form-check-input"
                        id="emailnotification"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="emailnotification"
                        style={{ color: '#034254' }}
                      >
                        Email Notifications
                      </label>
                    </div>

                    <div className="form-check mb-3">
                      <Field
                        type="checkbox"
                        name="pushnotification"
                        className="form-check-input"
                        id="pushnotification"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="pushnotification"
                        style={{ color: '#034254' }}
                      >
                        Push Notifications
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn"
                      style={{
                        backgroundColor: '#034254',
                        color: '#fff',
                        width: '100%',
                        border: 'none',
                        borderRadius: '5px',
                      }}
                    >
                      Save Notification
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>

        </div>




        <button style={{ width: "100%", border: "none", color: "white", backgroundColor: "red", borderRadius: "8px", padding: "10px", fontWeight: "bolder" }} type="button" class="btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
          Delete Profile
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content text-center p-5">
              <div style={{ fontSize: "70px", color: "#E5CC6D" }}>
                <FontAwesomeIcon icon={faCircleExclamation} />
              </div>
              <h3 style={{ color: "#034254" }}>Are you sure? </h3>
              <div class="modal-body">
                <p style={{ color: "#034254", fontSize: "20px" }}>Deleting your profile is permanent and cannot be undone.</p>
              </div>
              <div class=" d-flex justify-content-around">
                <button onClick={() => deleteacc()} style={{ backgroundColor: "#034254", color: "white" }} type="button" class="btn">Yes, delete it</button>
                <button style={{ backgroundColor: "#E5CC6D", color: "white" }} type="button" class="btn btn" data-bs-dismiss="modal">No, cancel</button>

              </div>
            </div>
          </div>
        </div>



      </div>

    </div>
  )
}

export default Setting