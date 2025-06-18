// import React, { useEffect, useState } from 'react'
import { Field, Formik, Form, ErrorMessage } from 'formik'
import * as Yup from "yup"
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../redux/redux';
import { useNavigate } from 'react-router-dom';


function Addexpense() {

  const dispatch = useDispatch()
  const navigate = useNavigate()


// for form 
  const validator = Yup.object({
    type: Yup.string().required("Transaction type is required"),
    Movement: Yup.number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .positive("Amount must be positive"),
    Category: Yup.string().required("Category is required"),
    Description: Yup.string().required("Description is required"),
    date: Yup.date().required("Date is required")
  });

  const initialValues = {
    type: "expense",
    Movement: [0,0,0],
    Category: "",
    date: new Date().toISOString(),
    Description: ""
  };



  return (
    <div>

      <div className="d-flex justify-content-center align-items-center mt-5 bg-light">
        <div className="form-wrapper p-4 rounded shadow bg-white w-75" style={{ maxWidth: '400px' }}>

          <Formik
            initialValues={initialValues}
            validationSchema={validator}
            onSubmit={(values) => {
              dispatch(addTransaction(values));
              navigate('/dashboard')
            }}
          >
            {({ values, handleSubmit, handleChange }) => (
              <div>

                {values.type === "expense" ? (<h4 className="text-center mb-4 text-main">Create Expense</h4>) : (<h4 className="text-center mb-4 text-main">Add Income</h4>)}



                <Form onSubmit={handleSubmit}>
                  {/* Radio Buttons */}
                  <div className="mb-3 text-center">
                    <Field
                      type="radio"
                      name="type"
                      value="expense"
                      checked={values.type === 'expense'}
                      onChange={handleChange}
                      className=" me-2"

                    />
                    <label className="form-label text-main me-3"> Expense</label>
                    <Field
                      type="radio"
                      name="type"
                      value="income"
                      checked={values.type === 'income'}
                      onChange={handleChange}
                      className=" me-2"
                    />
                    <label className="form-label text-main me-3"> Income</label>

                     <ErrorMessage name="type" component="div" className="text-danger small" />
                  </div>


                  {
                    values.type === "expense" ? (<div>
                      <div className="mb-3">
                        <label className="form-label text-main">Category</label>
                        <Field as="select" name="Category" className="form-select text-main">
                          <option value="">Select a category</option>
                          <option value="food">Food</option>
                          <option value="transport">Transport</option>
                          <option value="airtime">Airtime</option>
                          <option value="utility">Utility</option>
                          <option value="rent">Rent</option>
                          <option value="data">Data</option>
                          <option value="entertainment">Entertainment</option>
                          <option value="others">Others</option>
                        </Field>
                        <ErrorMessage name="Category" component="div" className="text-danger small" />
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-main">Description</label>
                        <Field
                          name="Description"
                          type="text"
                          className="form-control text-main"
                          placeholder="e.g, Groceries from Supermarket"
                        />
                         <ErrorMessage name="Description" component="div" className="text-danger small" />
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-main">Amount</label>
                        <Field
                          name="Movement"
                          type="number"
                          className="form-control text-main"
                          placeholder="Amount"
                        />
                         <ErrorMessage name="Movement" component="div" className="text-danger small" />

                      </div>
                    </div>) : (<div>
                      <div className="mb-3">
                        <label className="form-label text-main">Category</label>
                        <Field as="select" name="Category" className="form-select text-main">
                          <option value="">Select a category</option>
                          <option value="salary">Salary</option>
                          <option value="investments">Investments</option>
                          <option value="gifts">Gifts</option>
                          <option value="others">Others</option>
                        </Field>
                        <ErrorMessage name="Category" component="div" className="text-danger small" />

                      </div>

                      <div className="mb-3">
                        <label className="form-label text-main">Description</label>
                        <Field
                          name="Description"
                          type="text"
                          className="form-control text-main"
                          placeholder="e.g, Monthly Salary"
                        />
                         <ErrorMessage name="Description" component="div" className="text-danger small" />

                      </div>

                      <div className="mb-3">
                        <label className="form-label text-main">Amount</label>
                        <Field
                          name="Movement"
                          type="number"
                          className="form-control text-main"
                          placeholder="Amount"
                        />
                         <ErrorMessage name="Movement" component="div" className="text-danger small" />

                      </div>
                    </div>
                    )

                  }



                  {/* Submit */}
                  <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: '#054455' }}>
                    {values.type === "expense" ? ('Save Expense') : ('Save Income')}


                  </button>


                </Form>
              </div>

            )}
          </Formik>
        </div>
      </div>


    </div>
  )
}

export default Addexpense