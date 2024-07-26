import JobCard from '../JobCard'
import './index.css'
const AllJobs = props => {
  const {jobsData, searchInputValue} = props

  const filteredJobData = jobsData.filter(each =>
    each.title.toLowerCase().includes(searchInputValue.toLowerCase()),
  )
  // console.log(filetedJobData)
  return (
    <ul className="ul-jobs">
      {filteredJobData.map(each => (
        <JobCard eachJob={each} key={each.id} />
      ))}
    </ul>
  )
}

export default AllJobs
