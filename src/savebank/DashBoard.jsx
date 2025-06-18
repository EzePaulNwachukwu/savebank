import React, { useState } from 'react'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { loadUserFromStorage } from '../redux/redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, useFormik, Form, Field, ErrorMessage } from 'formik'
import { savingsgoalAndExpenseLimit } from '../redux/redux'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, } from "recharts";
import * as Yup from "yup"
import { setBudget } from '../redux/redux'

function DashBoard() {
  const [loadpage, setloadpage] = useState(false)

  useEffect(() => {
    loadUserFromStorage()
    setInterval(() => {
      setloadpage(true)

    }, 1000)

  })

  const dispatch = useDispatch()

  const logedin = useSelector(
    logedin => logedin.bankapp.users
  )

  // for budget form
  const validator = Yup.object({
    budgetCategory: Yup.string().required("budget category is required"),
    budgetAmount: Yup.date().required("Date is required")
  });

  const initialValues = {
    budgetCategory: "",
    budgetAmount: ""
  }



  // geting from user
  const incomeTransactions = logedin?.Transaction?.filter(tx => tx.type === 'income') || [];
  const expenseTransactions = logedin?.Transaction?.filter(tx => tx.type === "expense") || [];
  const incomeMovement = incomeTransactions?.map((move) => move.Movement) || [];
  const totallIncome = incomeMovement?.reduce((a, b) => a + b, 0) || [];
  const expensesMovement = expenseTransactions?.map((debit) => debit.Movement) || [];
  const totalExpenses = expensesMovement?.reduce((a, b) => a + b, 0) || [];
  const allTotal = totallIncome - totalExpenses

  console.log(totallIncome)
  console.log(expenseTransactions)
  console.log(totalExpenses)

  // for dashboard circle
  const getTotalByCategory = (category) => (expenseTransactions.filter(tx => tx.Category === category).reduce((sum, tx) => sum + tx.Movement, 0))

  const foodMovement = getTotalByCategory('food');
  const utilityMovement = getTotalByCategory('utility');
  const entertainmentMovement = getTotalByCategory('entertainment');
  const dataMovement = getTotalByCategory('data');
  const rentMovement = getTotalByCategory('rent');
  const airtimeMovement = getTotalByCategory('airtime');
  const transportMovement = getTotalByCategory('transport');

  const chartData = [
    { category: "Food", amount: foodMovement },
    { category: "Utility", amount: utilityMovement },
    { category: "Entertainment", amount: entertainmentMovement },
    { category: "Data", amount: dataMovement },
    { category: "Rent", amount: rentMovement },
    { category: "Airtime", amount: airtimeMovement },
    { category: "Transport", amount: transportMovement }
  ].filter(item => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);
  console.log(chartData)


  const rankColors = ["#ff4d4f", "#fa8c16", "#fadb14", "#52c41a", "#1890ff", "#722ed1", "#034254"];
  const colors = chartData?.map((_, index) => rankColors[index] || "#d9d9d9") || [];


  // for weekly expenses
  const getWeeklyTotals = (Transactions) => {
    const weeklyTotals = [0, 0, 0, 0]; // Week 1 to Week 4

    Transactions.forEach((tx) => {
      const date = new Date(tx.date);
      if (!isNaN(date)) {
        const day = date.getDate();
        const weekIndex = Math.min(Math.floor((day - 1) / 7), 3); // 0 to 3
        weeklyTotals[weekIndex] += tx.Movement;
      }
    });

    return [
      { week: "Week 1", amount: weeklyTotals[0] },
      { week: "Week 2", amount: weeklyTotals[1] },
      { week: "Week 3", amount: weeklyTotals[2] },
      { week: "Week 4", amount: weeklyTotals[3] },
    ];
  };
  const weeklyData = getWeeklyTotals(expenseTransactions);







  // date and time
  function formatDateToWAT(dateString) {
    const date = new Date(dateString);
    const options = {
      timeZone: 'Africa/Lagos',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    return date.toLocaleString('en-GB', options).replace(',', '');
  }
  // const tdate = formatDateToWAT(expenseTransactions[0].date);


  return (
    <div style={{ backgroundColor: "#F9FAFB", color: "#034254" }}>

      {loadpage ? (<div>
        <h3 className='text-center my-5'>Dashboard</h3>

        <div className='container m-auto  sm-w-100 '>
          <div className='row my-5  container m-auto box-3 '>
            <div className=' my-2 col-lg-4 col-sm-12 col-md-4 dashboxgreen  '>
              <p>Total Income</p>
              <h2>{logedin.currency}{totallIncome.toLocaleString()}</h2>
            </div>

            <div className=' my-2 col-lg-4 col-sm-12 col-md-4     dashboxgreen'>
              <p>Total Expenses</p>
              <h2>{logedin.currency}{totalExpenses.toLocaleString()}</h2>
            </div>

            <div className=' my-2 col-lg-4 col-sm-12 col-md-4   dashboxyellow'>
              <p>Monthly Savings</p>
              <h2>{logedin.currency}{allTotal.toLocaleString()}</h2>
            </div>
          </div>



          <div className='my-5 container'>
            <div className='unlock my-3'>
              <p className="text-xl fw-bolder text-left mb-4">Expenses by Category</p>

              {chartData !== " " ?
                (<div className="w-full  p-4 rounded-2xl shadow-md bg-white " style={{ height: "400px" }}>
                  <ResponsiveContainer width="100%" height="100%" >
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={110}
                        label
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>) : (<p className='text-center text-dark'>No expense data available yet.</p>)}


            </div>
            <div className='unlock my-3'>
              <p className='text-left fw-bolder'>Weekly Expenses</p>

              {
                weeklyData !== " "? (
                  <div className="w-full  p-4 rounded-2xl shadow-md bg-white" style={{ height: "400px", width: "100%" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={weeklyData}
                        margin={{ top: 20, right: 20, left: 30, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis
                          domain={[0, 100000]}
                          tickCount={11}
                          tickFormatter={(value) =>
                            `${logedin.currency}${value.toLocaleString()}`
                          }
                        />
                        <Tooltip
                          formatter={(value) => [
                            `${logedin.currency}${value.toLocaleString()}`,
                            "Expense",
                          ]}
                        />
                        <Bar dataKey="amount" fill="#034254" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>) : (<p className='text-center'>No weekly expense data available yet.</p>)
              }





            </div>
            <div className='unlock my-3'>
              <div className='d-flex justify-content-between'>
                <p className='text-left fw-bolder'>Budget vs. Actual</p>

                <button class="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasForm">
                  <FontAwesomeIcon icon={faAdd} />
                </button>

              </div>
              <div className='text-center' >
                <p className='text-center'>No budgets set yet. Add a budget to start tracking your spending!.</p>
                <button style={{ backgroundColor: "#FFD94C", color: "#034254" }} class="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasForm">
                  Add Your First Budget <FontAwesomeIcon icon={faAdd} />
                </button>
              </div>
            </div>

            <div className='unlock my-3'>
              {
                logedin.Transaction !== "" ? (
                  <div >
                    <ul className="reverse-list " >
                      {logedin.Transaction.map((TRf) => (
                        <li style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px #E7E8E9 solid" }}>
                          <div >
                            <b>{TRf.Category}</b>
                            <p>{formatDateToWAT(TRf.date)}</p>
                          </div>
                          {
                            TRf.type === "income" ? (<b style={{ color: "#01C952" }}>+{logedin.currency}{TRf.Movement}</b>) : (<b style={{ color: "red" }}>-{logedin.currency}{TRf.Movement}</b>)
                          }

                        </li>
                      ))}



                    </ul>
                  </div>


                ) : (<><p className='text-left fw-bolder'>Recent Transaction</p>
                  <p className='text-center'>No expense data available yet.</p></>)
              }


            </div>
          </div>


        </div>




        <div class="offcanvas offcanvas-bottom offcanvas-custom h-50" tabindex="-1" id="offcanvasForm">
          <Formik initialValues={initialValues} validationSchema={validator} onSubmit={(values) => {
            dispatch(setBudget(values))
          }}>

            {({ values, handleSubmit, handleChange }) => (<Form className='h-100' onSubmit={handleSubmit} >
              <div class="mb-3">
                <label for="exampleInput1" class="form-label">Category</label>
                <Field as="select" name="budgetCategory" className="form-select text-main" style={{
                  border: '1px solid #034254',
                  borderRadius: '5px',
                  width: '100%',
                  color: '#034254',

                }}  >
                  <option value="">Select a category</option>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="airtime">Airtime</option>
                  <option value="utility">Utility</option>
                  <option value="rent">Rent</option>
                  <option value="data">Date</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="others">Others</option>
                </Field>
                <ErrorMessage name="budgetCategory" component="div" className="text-danger small" />

              </div>
              <div class="mb-3">
                <label for="exampleInput2" class="form-label">Budget Amount({logedin.currency})</label>

                <Field
                  type="number"
                  name="budgetAmount"
                  className="form-control"

                  id="exampleInput2"
                  style={{
                    border: '1px solid #034254',
                    borderRadius: '5px',
                    width: '100%',
                    color: '#034254',
                  }}
                />
                <ErrorMessage name="budgetAmount" component="div" className="text-danger small" />

              </div>
              <div class="row justify-content-between m-auto mt-3">
                <button style={{ backgroundColor: " #034254", color: "white" }} type="submit" class="btn col-5 ">Add</button>
                <button style={{ backgroundColor: "#FFD94C", color: "#034254" }} type="button" class="btn col-5" data-bs-dismiss="offcanvas">Cancel</button>
              </div>
            </Form>)}

          </Formik>
        </div>  </div>) : (


        <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
          <div class="text-center">
            <div class="spinner-border " role="status" style={{ width: "4rem", height: "4rem", color: " #034254" }} >
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3 fs-5 text-secondary">Please wait, loading dashboard...</p>
          </div>
        </div>


      )}

    </div>
  )
}

export default DashBoard