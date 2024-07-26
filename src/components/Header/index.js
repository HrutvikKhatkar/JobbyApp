import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="navbar-container">
      <Link to="/" className="website-logo-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <ul className="header-link-item">
        <Link to="/" className="link-item">
          <li className="list-item">Home</li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li className="list-item">Jobs</li>
        </Link>
      </ul>
      <button className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
