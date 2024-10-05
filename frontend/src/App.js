import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.css';

// PAGES 
import Activate from "./screens/Activate"
import Home from "./screens/home/index"
import LoginPage from "./screens/login/index"
import SignUpPage from "./screens/sign-up/index"
import ForgotPasswordPage from "./screens/forgot-password/index"
import ResetPasswordPage from "./screens/reset-password/index"
import NotFoundPage from "./components/four-zero-four/four-zero-four"
import BookingsUserView from "./screens/user-screens/bookings"
import Layout from "./hoca/Layout"
import CalendarScreen from "./screens/mandys-screens/calendar-screen"
// STORE
import store from "./store"

function App() {
  return (
    <Provider store={store}>
      <Router>
      {/* <ScrollToTop /> */}
      <Layout>
        <div id="main">
          <div className="inner">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/activate/:uid/:token" element={<Activate />} />
              <Route exact path="/signup" element={<SignUpPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/reset-password" element={<ForgotPasswordPage  />} />
              <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordPage />} />
              <Route exact path="/user-bookings" element={<BookingsUserView />} />
              <Route exact path="/mandy/calendar" element={<CalendarScreen />} />
              <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
          </div>
        </div>
        {/* <Sidebar /> */}
      </Layout>
    </Router>
  </Provider>
  )
}

export default App;
