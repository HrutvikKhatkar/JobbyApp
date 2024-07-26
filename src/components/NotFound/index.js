import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => {
  return (
    <Link to="/bad-path">
      <div className="notFound-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          className="not found"
        />
        <h1 className="heading">Page Not Found</h1>
        <p className="para">
          We are sorry, the page you requested could not be found
        </p>
      </div>
    </Link>
  )
}

export default NotFound
