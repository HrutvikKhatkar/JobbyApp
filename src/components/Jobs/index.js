import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import AllJobs from '../AllJobs'
import Loader from 'react-loader-spinner'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const apiStatusConstantsProfile = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Profile = ({userDetails}) => (
  <div className="profile-container">
    <img
      src={
        userDetails.profileImageUrl ||
        'https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg'
      }
      alt="profile"
      className="profile-img"
    />
    <h1 className="profile-heading">{userDetails.name}</h1>
    <p className="profile-description">{userDetails.shortBio}</p>
  </div>
)

const Filter = ({list, selectedValues, onToggle}) => (
  <ul className="ul-employment-types">
    {list.map(each => (
      <li
        className="list-item"
        key={each.employmentTypeId || each.salaryRangeId}
      >
        <label className="employment-type">
          <input
            type="checkbox"
            value={each.employmentTypeId || each.salaryRangeId}
            onChange={onToggle}
            className="input-checkbox"
            checked={selectedValues.includes(
              each.employmentTypeId || each.salaryRangeId,
            )}
          />
          {each.label}
        </label>
      </li>
    ))}
  </ul>
)

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    userDetails: {},
    searchInput: '',
    selectedEmploymentTypes: [],
    selectedSalaryRanges: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getData()
  }

  getProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstantsProfile.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/profile`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        console.log(fetchedData.profile_details)

        const updatedData = {
          name: fetchedData.profile_details.name,
          profileImageUrl: fetchedData.profile_details.profile_image_url,
          shortBio: fetchedData.profile_details.short_bio,
        }

        this.setState({
          userDetails: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {searchInput, selectedEmploymentTypes, selectedSalaryRanges} =
      this.state
    const jwtToken = Cookies.get('jwt_token')

    const employmentTypes = selectedEmploymentTypes.join(',')
    const salaryRanges = selectedSalaryRanges.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${salaryRanges}&search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.jobs.map(job => ({
          id: job.id,
          companyLogoUrl: job.company_logo_url,
          jobDescription: job.job_description,
          title: job.title,
          rating: job.rating,
          location: job.location,
          packagePerAnnum: job.package_per_annum,
          employmentType: job.employment_type,
        }))
        this.setState({
          jobsList: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = () => {
    this.getData()
  }

  onToggleEmploymentType = event => {
    const {selectedEmploymentTypes} = this.state
    const value = event.target.value
    if (selectedEmploymentTypes.includes(value)) {
      this.setState(
        {
          selectedEmploymentTypes: selectedEmploymentTypes.filter(
            type => type !== value,
          ),
        },
        this.getData,
      )
    } else {
      this.setState(
        {
          selectedEmploymentTypes: [...selectedEmploymentTypes, value],
        },
        this.getData,
      )
    }
  }

  onToggleSalaryRange = event => {
    const {selectedSalaryRanges} = this.state
    const value = event.target.value
    if (selectedSalaryRanges.includes(value)) {
      this.setState(
        {
          selectedSalaryRanges: selectedSalaryRanges.filter(
            range => range !== value,
          ),
        },
        this.getData,
      )
    } else {
      this.setState(
        {
          selectedSalaryRanges: [...selectedSalaryRanges, value],
        },
        this.getData,
      )
    }
  }

  renderJobsSuccessView = () => {
    const {jobsList, searchInput} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-msg">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return <AllJobs jobsData={jobsList} searchInputValue={searchInput} />
  }

  renderJobsFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-msg">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={this.getData} className="retry-button">
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {
      searchInput,
      selectedEmploymentTypes,
      selectedSalaryRanges,
      userDetails,
    } = this.state
    const {name, profileImageUrl, shortBio} = userDetails
    return (
      <>
        <Header />
        <div className="jobs-page">
          <div className="filter-container">
            <Profile userDetails={userDetails} />
            <hr className="hor-line" />
            <h1 className="employment-types-heading">Types of Employment</h1>
            <ul className="ul-employment-types">
              {employmentTypesList.map(each => (
                <li className="list-item" key={each.employmentTypeId}>
                  <label className="employment-type">
                    <input
                      type="checkbox"
                      value={each.employmentTypeId}
                      onChange={this.onToggleEmploymentType}
                      className="input-checkbox"
                      checked={selectedEmploymentTypes.includes(
                        each.employmentTypeId,
                      )}
                    />
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="hor-line" />
            <h1 className="employment-types-heading">Salary Range</h1>
            <ul className="ul-salary-ranges">
              {salaryRangesList.map(each => (
                <li className="list-item" key={each.salaryRangeId}>
                  <label className="employment-type">
                    <input
                      type="checkbox"
                      value={each.salaryRangeId}
                      onChange={this.onToggleSalaryRange}
                      className="input-checkbox salary-checkbox"
                      checked={selectedSalaryRanges.includes(
                        each.salaryRangeId,
                      )}
                    />
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobs-container">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="jobs-list-container">{this.renderJobsView()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
