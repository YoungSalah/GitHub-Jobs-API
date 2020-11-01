import React, { useRef, useState } from 'react';
import axios from 'axios'
import FetchJobs from './FetchJobs'
import DisplayJobs from './DisplayJobs/DisplayJobs'
import JobsPagination from './JobsPagination'
import SearchJobs from './SearchJobs';
function App() {
  const [param, setParam] = useState({})
  const [page, setPage] = useState(1)
  const {jobs, loading ,error} = FetchJobs(param, page)
 // console.log(jobs)
  function onParamChange (e){
    console.log(1)
    const name = e.target.name
    const value = e.target.value
    console.log([name],value)
    setParam(prev =>{
      return{...param,[name]:value}
    })
    s
  }
  return (
    <div className="container mt-5">
        <h1 className="font-weight-light mb-4 text-left text-Dark">
        Github Jobs API
        </h1>
      <SearchJobs onParamChange={onParamChange} setParam={setParam}/>
      <JobsPagination page={page} setPage={setPage} />
        {loading && <h1>Loading . . .</h1>}
        {error && <h1>Error, try refreshing . . .</h1>}
      <DisplayJobs jobs={jobs} />
    </div>
  );
}

export default App;
