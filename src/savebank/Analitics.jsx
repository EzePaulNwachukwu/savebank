import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { loadUserFromStorage } from '../redux/redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function Analitics() {
  const [loadpage, setloadpage] = useState(false)

  const userlogedin = useSelector(
    analize => analize.bankapp.users
  )
  // if (!userlogedin || !userlogedin.Transaction) {
  //   return <div>Loading...</div>; // Or show spinner
  // }
  useEffect(() => {
    loadUserFromStorage()
    setInterval(() => {
      setloadpage(true)

    }, 1000)

  })



  const expenseTransactions = userlogedin?.Transaction?.filter(tx => tx.type === 'expense') || [];
  const incomeTransactions = userlogedin?.Transaction?.filter(tx => tx.type === 'income') || [];
  const incomeMovement = incomeTransactions?.map((move) => move.Movement) || [];
  const totallIncome = incomeMovement?.reduce((a, b) => a + b, 0) || [];
  const expensesMovement = expenseTransactions?.map((debit) => debit.Movement) || [];
  const totalExpenses = expensesMovement?.reduce((a, b) => a + b, 0) || [];
  const allTotal = totallIncome - totalExpenses


  const getTotalByCategory = (category) => (expenseTransactions.filter(tx => tx.Category === category).reduce((sum, tx) => sum + tx.Movement, 0))

  // Now use it like this:
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

  // Add percentage to each item
  function getCategoryPercentage(category, chartData, totalBalance) {
    const categoryItem = chartData.find(item => item.category.toLowerCase() === category.toLowerCase());

    if (!categoryItem || totalBalance === 0) return "0%";

    const percentage = ((categoryItem.amount / totalBalance) * 100).toFixed(2);
    return `${percentage}%`;
  }

  // calculate top expenses
  const topExpenses = chartData[0]?.category || []
  const topExpensesPercentage = getCategoryPercentage(topExpenses, chartData, totalExpenses)

  const topCategoryAmount = chartData[0]?.amount || [];
  const fifteenPercentOfTopCategory = (topCategoryAmount * 0.15).toFixed(2);
  console.log(fifteenPercentOfTopCategory)



  // get monthly totall 

  const getMonthlyTotals = (Transactions) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthlyTotals = new Array(12).fill(0);

    Transactions.forEach(tx => {
      const date = new Date(tx.date);
      console.log(date)
      if (!isNaN(date)) {
        const monthIndex = date.getMonth(); 
        monthlyTotals[monthIndex] += tx.Movement;
      }
    });

    return months.map((month, i) => ({
      month,
      amount: monthlyTotals[i]
    }));
  };
  const monthlyData = getMonthlyTotals(expenseTransactions);




  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  //  calculate total per day
  const getDailyTotals = (Transactions) => {
    const dailyTotals = new Array(7).fill(0); 

    Transactions.forEach((tx) => {
      const date = new Date(tx.date);
      if (!isNaN(date)) {
        const day = date.getDay(); 
        dailyTotals[day] += tx.Movement;
      }
    });

    return weekDays.map((day, index) => ({
      day,
      amount: dailyTotals[index],
    }));
  };
  const dailyData = getDailyTotals(expenseTransactions);


    // for weekly expenses
  const getWeeklyTotals = (Transactions) => {
    const weeklyTotals = [0, 0, 0, 0]; 
    Transactions.forEach((tx) => {
      const date = new Date(tx.date);
      if (!isNaN(date)) {
        const day = date.getDate();
        const weekIndex = Math.min(Math.floor((day - 1) / 7), 3); 
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


   // Get average (only over months that have expenses)
  const AVG = (Data) => {
    const nonZeroMonths = Data?.filter(m => m.amount > 0) || [];
    const total = nonZeroMonths.reduce((sum, m) => sum + m.amount, 0);
    return  nonZeroMonths.length > 0 ? total / nonZeroMonths.length : 0;
  }

  const monthlyaverage = AVG(monthlyData)
  const weeklyAvG = AVG(weeklyData)
  const dailyAVG = AVG(dailyData)

  return (
    <div style={{ backgroundColor: "#F9FAFB", color: "#034254" }}>

      {loadpage ? (<div> <h3 className='text-center my-5'>Analytics</h3>

        <div className='container m-auto  sm-w-100 '>

          <div className="container mt-4">
            <div className="row justify-content-center">
              <div className="card shadow-sm col-12 col-md-10 col-lg-8  col-sm-12">
                <div className="card-body" style={{ color: "#034254" }}>
                  <p className='text-center fw-bolder'>Monthly Expenses</p>

                  {expenseTransactions ? (<div style={{ height: "400px", width: "100%", color: "#034254" }}>
                    <ResponsiveContainer width="100%" height="100%" margin="auto">
                      <BarChart
                        data={monthlyData}
                        margin={{ top: 20, right: 20, left: 30, bottom: 30 }}

                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis
                          domain={[0, 100000]}
                          tickCount={11}
                          tickFormatter={(value) =>
                            `${userlogedin.currency}${value.toLocaleString()}`
                          }
                        />
                        <Tooltip
                          formatter={(value) => [
                            `${userlogedin.currency}${value.toLocaleString()}`,
                            "Expense",
                          ]}
                        />
                        <Bar dataKey="amount" fill="#034254" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>) : (<p className='text-center'>No expense data yet. </p>)}

                </div>
              </div>
            </div>
          </div>

          <div className="container  mt-4">
            <div className="row justify-content-center">
              <div className="card shadow-sm col-12 col-md-10 col-lg-8">
                <div className="card-body" style={{ color: "#034254" }}>
                  <p className='text-center fw-bolder'>Daily Expenses (Last 7 Days)</p>

                  {expenseTransactions ? (
                    <div style={{ width: "100%", height: 400, color: "#034254" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={dailyData}
                          margin={{ top: 20, right: 30, bottom: 20, left: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" angle={-15} interval={0} height={60} />
                          <YAxis domain={[0, 100000]}
                            tickFormatter={(value) =>
                              `${userlogedin.currency}${value.toLocaleString()}`
                            }
                          />
                          <Tooltip formatter={(value) => [
                            `${userlogedin.currency}${value.toLocaleString()}`,
                            "Expense",
                          ]} />
                          <Bar dataKey="amount" fill="#034254" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>) : (<p className='text-center'>No  recent weekly data .</p>)}
                </div>
              </div>
            </div>
          </div>




        </div>

        <div className="container  mt-4" >
          <div className="row justify-content-center">
            <div className="card shadow-sm col-12 col-md-10 col-lg-8">
              <div className="card-body " style={{ color: "#034254" }}>
                <h3>Details Insight</h3>
                <div className='insightdatails row align-items-center my-3'>
                  <div className='col-lg-6 col-sm-12 col-md-5' >
                    <b>Financial Summary</b>
                    <div className='insightdatails'>
                      <p>Total Income:</p>
                      <p>{userlogedin.currency}{totallIncome.toLocaleString()}</p>
                    </div>
                    <div className='insightdatails'>
                      <p>Total Expenses:</p>
                      <p> {userlogedin.currency}{totalExpenses.toLocaleString()}</p>
                    </div>
                    <div className='insightdatails'>
                      <p>Savings:</p>
                      <p>
                        {allTotal > 0 ? (<> {userlogedin.currency}{allTotal.toLocaleString()}</>) : (<p style={{ color: "#FB2C50" }}> {userlogedin.currency}{allTotal.toLocaleString()}</p>)}
                      </p>
                    </div>
                    <div className='insightdatails'>
                      <p>Top Category:</p>
                      <p>{topExpenses} ({userlogedin.currency}{chartData[0]?.amount.toLocaleString() || []})</p>
                    </div>

                  </div>
                  <div className='col-lg-6 col-sm-12 col-md-5'>
                    <b>Average Spending Over Time</b>
                    <div className='insightdatails'>
                      <p>Daily Avg:</p>
                      <p>{userlogedin.currency}{dailyAVG.toLocaleString()}</p>
                    </div>
                    <div className='insightdatails'>
                      <p>Weekly Avg:</p>
                      <p>{userlogedin.currency}{weeklyAvG.toLocaleString()}</p>
                    </div>
                    <div className='insightdatails'>
                      <p>Monthly Avg:</p>
                      <p>{userlogedin.currency}{monthlyaverage.toLocaleString()}</p>
                    </div>

                  </div>
                </div>
                <div>
                  <h4>Personalized Recommendations</h4>
                  <ul>
                    <li>Your top category, {topExpenses}, takes up {topExpensesPercentage} of expenses. Cutting 15% could save {userlogedin.currency}{(topCategoryAmount - fifteenPercentOfTopCategory).toLocaleString()} monthly.</li>
                    <li>Spending is 190.2% of income. Trim €9,699.998 from discretionary items to boost savings.</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>) : (<div class="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div class="text-center">
          <div class="spinner-border " role="status" style={{ width: "4rem", height: "4rem", color: " #034254" }} >
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 fs-5 text-secondary">Please wait, loading charts...</p>
        </div>
      </div>)}


    </div>
  )
}

export default Analitics