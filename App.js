import React, { useState } from 'react';
import FetchJobs from './FetchJobs'
import DisplayJobs from './DisplayJobs/DisplayJobs'
import JobsPagination from './JobsPagination'
import SearchJobs from './SearchJobs';
function App() {
  const [param, setParam] = useState({})
  const [page, setPage] = useState(1)
  const {jobs, loading ,error, hasNextPage} = FetchJobs(param, page)
  function onParamChange (e){
    const name = e.target.name
    const value = e.target.value
    setPage(1)
    setParam(prev =>{
      return{...param,[name]:value}
    })
    
  }
  return (
    <div className="container mt-5">
        <h1 className="font-weight-light mb-4 text-left text-Dark">
        Github Jobs API
        </h1>
      <SearchJobs onParamChange={onParamChange} setParam={setParam}/>
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
        {loading && <h1>Loading . . .</h1>}
        {error && <h1>Error, try refreshing . . .</h1>}
      <DisplayJobs jobs={jobs} />
    </div>
  );
}

export default App;
