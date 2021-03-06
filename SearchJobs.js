import React from 'react'

export default function SearchJobs({onParamChange,setParam}) {
  
    return (
    <form>
        <div className="form-row ">
            <div className="form-group col-md-6">
                <label className="text-left">Description</label>
                <input 
                className="form-control" 
                id="inputEmail4" 
                placeholder="Filter by title, benefits, companies, expertise" 
                name="Description"
                onChange={onParamChange}
                />
            </div>
            <div className="form-group col-md-6">
                <label>Location</label>
                <input className="form-control" id="inputPassword4" 
                placeholder="Filter by city, state, zip code, or country"
                name="Location"
                onChange={onParamChange}
                 />
            </div>  
           
        </div>
    </form>
    )
}
