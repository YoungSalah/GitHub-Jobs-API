
import axios from 'axios'
import { useReducer  , useEffect } from 'react';


const URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";
const ACTIONS = {
    MAKE_REQ:'make-req',
    GET_DATA:'get-data',
    ERROR:'error',
    HAS_NEXT_PAGE: 'has-next-page'
}
function reducer(state,action){
    switch(action.type){
        case ACTIONS.MAKE_REQ:
            return {jobs:[], loading:true, error:null}
        case ACTIONS.GET_DATA:
            return {...state , jobs:action.payload, loading:false, error:null}
        case ACTIONS.ERROR:
            return {...state , jobs:[], error:action.error, loading:false}
        case ACTIONS.HAS_NEXT_PAGE:
            return{...state,  hasNextPage:action.payload.hasNextPage}
        default:
            return state
    }
}
export default function FetchJobs(param,page){
    const [state, dispatch] = useReducer(reducer, {jobs: [], loading : true, error:null})
    useEffect(() => {
        const cancelToken1= axios.CancelToken.source()
        const cancelToken2= axios.CancelToken.source()

       async function getRequest(){
            try
            {
                dispatch({type:ACTIONS.MAKE_REQ}) 

                let getResponse  = await axios.get(URL,{
                    cancelToken: cancelToken1.token,
                    params :{ page:page, description:param.Description, location: param.Location}
                 }) 
                dispatch({type:ACTIONS.GET_DATA, payload:getResponse.data})
            }
            catch(err){
                if(axios.isCancel(err)) return
                dispatch({type:ACTIONS.ERROR, error:err})
            }
            try
            {
                let HasNextResponse = await axios.get(URL,{
                    cancelToken: cancelToken2.token,
                    params :{ page:page+1, description:param.Description, location: param.Location}
                 })
    
                dispatch({type:ACTIONS.HAS_NEXT_PAGE, payload:{hasNextPage: HasNextResponse.data.length !== 0}})
            }
            catch(err){
                if(axios.isCancel(err)) return
                dispatch({type:ACTIONS.ERROR, error:err})
            }
       
        }
        getRequest();
        return () =>{
            cancelToken1.cancel()
            cancelToken2.cancel()
        }
    },[param,page])
    return state
}