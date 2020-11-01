
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
    //console.log(action)
    switch(action.type){
        case ACTIONS.MAKE_REQ:
            return {jobs:[], loading:true, error:null}
        case ACTIONS.GET_DATA:
            return {jobs:action.payload, loading:false, error:null}
        case ACTIONS.ERROR:
            return {jobs:[], error:action.error, loading:false}
        case ACTIONS.HAS_NEXT_PAGE:
            return{hasNextPage:action.payload.hasNextPage}
        default:
            return state
    }
}
export default function FetchJobs(param,page){
    const [state, dispatch] = useReducer(reducer, {jobs: [], loading : true, error:null})
    console.log(',,,,,,,,,,,,,,,,,,,,,,,', param.Location,param.Description, param)
    useEffect(() => {
        const cancelToken= axios.CancelToken.source()
       async function getRequest(){
            try
            {
                dispatch({type:ACTIONS.MAKE_REQ}) 
                let getResponse  = await axios.get(URL,{
                    cancelToken: cancelToken.token,
                    params :{ page:page, Description:param.Description, Location: param.Location}
                 }) 
                dispatch({type:ACTIONS.GET_DATA, payload:getResponse.data})
                
               /* let HasNextResponse = await axios.get(URL,{
                    params :{markdown:true, page:page+1, ...param}
                 })
                dispatch({type:ACTIONS.HAS_NEXT_PAGE, payload:{hasNextPage: getResponse.data.length !== 0}}) */
            }
            catch(err){
                console.log(err)
                dispatch({type:ACTIONS.ERROR, error:err})
            }
        }
        getRequest();
        return () =>{
            cancelToken.cancel()
        }
    },[param,page])
   // console.log(state)
    return state
}