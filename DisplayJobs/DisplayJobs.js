import React , {useState} from 'react'
import JobsUI from './JobsUI'
import MarkdownPreview from '@uiw/react-markdown-preview';
export default function DisplayJobs({jobs}) {

    console.log(jobs.length)//justify-content-md-center
  
   let JobsList =  jobs.length ? (jobs.map( (job,index) => {
        return(
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-lg-3" >
                <div className="card text-left bg-dark text-light" >
                    <div className="card-body">
                        <h5 className="card-title font-weight-normal">
                            {job.title}
                        </h5>
                        <h6 className="card-subtitle mb-3 font-weight-bold">
                            {job.company}
                        </h6>
                        <img className="text-center" alt="COMPANY LOGO"
                         width="100%" height="120"
                         src={job.company_logo} 
                         />
                         ss
                        <h6 className="card-subtitle mb-3 mt-5 font-weight-light">
                            {new Date(job.created_at).toLocaleDateString() }
                        </h6>
                        <h6 className="card-subtitle mb-2 text-light">
                            {job.created_url}
                        </h6>
                        <span className="badge badge-secondary mr-2 bg-secondary">
                            {job.location}
                        </span>
                        <span className="badge badge-secondary  bg-secondary">{job.type}</span>
                            <MarkdownPreview className="card-text" source={job.how_to_apply} /> 
                        <a href="#" className=" card-link text-dark">more details</a>
                        <a href="#" className="card-link text-dark">Card link</a>
                        <button className="btn btn-light float-right" data-toggle="collapse" data-target={'#card'+index}>Toggle details</button>
                        <div id={'card'+index} className="collapse mt-4">
                            <MarkdownPreview source={job.description} />
                        </div>
                    </div>
                </div>
            </div> 
        )
    })) : null
    
    //console.log(JobsList, 33333333333333333)
    return (
        <div>
            {JobsList ? <JobsUI jobs={JobsList} /> : '' }
        </div>
    )
}
