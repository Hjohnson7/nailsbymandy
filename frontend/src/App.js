import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.css';

// PAGES 
import Activate from "./containers/Activate"
import Home from "./containers/home/index"
import LoginPage from "./containers/login/index"
import SignUpPage from "./containers/sign-up/index"
import ForgotPasswordPage from "./containers/forgot-password/index"
import ResetPasswordPage from "./containers/reset-password/index"
import NotFoundPage from "./components/four-zero-four/four-zero-four"
import './styles/assets/css/main.css';
// STORE
import store from "./store"

function App() {
  return (
    <Provider store={store}>
      <Router>
      <ScrollToTop />
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
              <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
          </div>
        </div>
        <Sidebar />
      </Layout>
    </Router>
  </Provider>
  )
}

export default App;
