import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="home-container">
        <div className="content-container">
          <h1 className="heading-home">Find The Job That Fits Your Life</h1>
          <p className="description-home">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the jobs that fits your abilities and
            potential.
          </p>
          <Link to="/jobs" className="link-item">
            <button type="button" className="jobs-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
