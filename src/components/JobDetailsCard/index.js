import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import SimilarJobs from '../SimilarJobs'
import {BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {ImNewTab} from 'react-icons/im'

import './index.css'

const JobDetailsCard = props => {
  const {jobDetails, similarJobs} = props
  console.log(similarJobs)
  const {
    id,
    companyLogoUrl,
    companyWebsiteUrl,
    jobDescription,
    title,
    rating,
    location,
    packagePerAnnum,
    employmentType,
    skills,
    lifeAtCompany,
  } = jobDetails

  const skill = skills.map(each => ({
    imageUrl: each.image_url,
    name: each.name,
  }))

  return (
    <>
      <li className="jobs-list-item">
        <div className="job-card-header">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
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
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="hor-line" />
        <div className="description-header">
          <h2 className="description-heading">Description</h2>
          <a href={companyWebsiteUrl} target="_blank" className="visit">
            Visit
            <span>
              <ImNewTab />
            </span>
          </a>
        </div>
        <p>{jobDescription}</p>
        <div>
          <h1>Skills</h1>
          <ul className="skills-container">
            {skill.map(each => (
              <li className="skills-list">
                <img src={each.imageUrl} alt="" className="skill-logo" />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
          <div>
            <h1>Life at Company</h1>
            <div className="life-at-company">
              <p>{lifeAtCompany.description}</p>
              <img src={lifeAtCompany.image_url} />
            </div>
          </div>
        </div>
      </li>
      <h1 className="similarJobs-heading">Similar Jobs</h1>
      <ul className="similarJobs-container">
        {similarJobs.map(each => (
          <SimilarJobs eachJob={each} key={each.id} />
        ))}
      </ul>
    </>
  )
}

export default JobDetailsCard
