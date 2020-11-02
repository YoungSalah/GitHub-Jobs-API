import React from 'react'
import ReactPaginate from 'react-paginate';

export default function JobsPagination({page, setPage, hasNextPage}) {
    console.log('is it hasnextpage', hasNextPage)
    function adjustPage(num){
        setPage(prev => + prev+num)
    }
    let PageEqualsOneOrLess = !(page<=1)
    let PageBiggerThanTwo = (page >3)
    console.log(PageBiggerThanTwo, PageEqualsOneOrLess)
    return (
        <nav>
            <ul className="pagination pagination-sm mt-4">
                {
                    PageEqualsOneOrLess &&
                        (
                            <>
                                <li className="page-item ">
                                <a className="font-weight-bold text-light bg-dark page-link" href="#" onClick={()=>adjustPage(-1)} aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                </li>

                                {
                                    PageBiggerThanTwo &&
                                    <>
                                        <li className="page-item">
                                            <a 
                                            className="text-light font-weight-bold bg-dark page-link" 
                                            href="#"
                                            onClick = { () => setPage(1)}
                                            > 1 </a>
                                        </li>
                                        <li className="page-item">
                                            <a 
                                            className="font-weight-bold text-light bg-dark page-link" 
                                            href="#"
                                            >...</a>
                                        </li>
                                    </>
                                }

                                <li className="page-item"><a className="font-weight-bold text-light bg-dark page-link" href="#" onClick={()=>adjustPage(-1)}>{page-1}</a></li>
                            </>
                        )
                }

                <li className="page-item">
                    <a className="text-light font-weight-bold bg-light text-dark border-dark page-link" active >{page}</a>
                </li>

                {
                    hasNextPage &&
                        (
                            <>
                                <li className="page-item">
                                    <a className="text-light font-weight-bold bg-dark page-link"  onClick={()=>adjustPage(1)}>{page+1}</a>
                                </li>
                                <li className="page-item">
                                    <a className="text-light bg-dark font-weight-bold page-link" onClick={()=>adjustPage(1)} aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </>
                        )
                }
            </ul>
        </nav>
    )
}
