import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {eachJob} = props
  const {
    // id,
    companyLogoUrl,
    jobDescription,
    title,
    rating,
    location,
    employmentType,
  } = eachJob
  return (
    <li className="list-item-similar-jobs">
      <div className="job-card-header">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div>
          <h1 className="job-card-heading">{title}</h1>
          <div className="rating">
            <FaStar className="rating-star" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div className="loc-pos-package">
        <div className="loc-pos">
          <IoLocationSharp className="location" />
          <p>{location}</p> <BsFillBriefcaseFill className="location" />
          <p>{employmentType}</p>
        </div>
      </div>
      <hr className="hor-line" />
      <h2 className="description-heading">Description</h2>
      <p>{jobDescription}</p>
    </li>
  )
}

export default SimilarJobs
