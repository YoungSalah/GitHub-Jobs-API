import React from 'react'

export default function JobsUI({jobs}) {
    const newArray = []
    for(var i=0,j=0; i<jobs.length; i++){
        if(jobs[j+1]){
            newArray.push(
                <div className="row mb-5" key={j} >
                    {jobs[j++]}
                    {jobs[j++]}
                </div>
            )
        }
    }
    console.log(newArray, 'new array')
    return (
        <div>
            {newArray}
        </div>
    )
}
