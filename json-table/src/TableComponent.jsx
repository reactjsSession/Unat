import {useEffect, useState} from 'react'
const BASE_URL = 'https://jsonplaceholder.typicode.com';
function TableComponent(){
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [isLoader, setLoader] = useState(false);
    const [searchParam, setSearchParam] = useState('');
    const [filterData, setFilterData] = useState([])
    const [isSearching, setIsSearching] = useState(false);
    useEffect(() => {
        const controller = new AbortController();
                const signal = controller.signal;
                const advanceFetchData = async () => {
                    setLoader(true)
                    try {
                        const response = await fetch(`${BASE_URL}/comments?postId=${page}`)
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                          }
                        const res = await response.json();
                        console.log(res)
                        setData(res)
                        setLoader(true)
                    } catch (err) {
                        setError(err.message || 'Something went wrong');
                    } finally {
                        setLoader(false)
                    }
                }
                advanceFetchData()
                return () => {
                    controller.abort();
                    console.log("Clean up the API")
                }
            }, [page])
            const searchHandler = () => {
                const filtered = Array.isArray(data)
                    ? data.filter((item) =>
                          item.email.toLowerCase().includes(searchParam.toLowerCase())
                      )
                    : [];
                setFilterData(filtered);
                setIsSearching(true);
            };
        
            const nextPageHandler = () => {
                setPage(page + 1)
            }
            const prevPageHandler = () => {
                setPage(page - 1)
            }
        
            const inputHandler = (e) => {
                const value = e.target.value
                setSearchParam(value)
        
            }
         
            return (
                <>
                    <div class="search"><input value={searchParam} onChange={inputHandler}/> 
                    <button onClick={searchHandler}>Search</button>
                    </div>
                    {isLoader && <div>Loading....</div>}
                    {error && <div>Somthing went wrong, Please try again</div>}
                    {!isLoader && <table className="table_container">
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Body</th>
                        </tr>
                        {(!error && isSearching && filterData.length === 0) && <td colspan="5"> No Data Found</td>}
                        {(isSearching ? filterData : data).map((item, index) => {
                            return (
                                <tr key={item.id}> 
                                <td>{item.id} </td>
                                <td>{item.email}</td> 
                                <td>{item.name}</td>
                                <td>{item.body}</td>
                                </tr>
                            )
                        })}
                    </table>
                    }
                    <div class="page-nav">
                    <button onClick={prevPageHandler} disabled={page===1}>&lt;</button>
                    <h4>{page}</h4>
                    <button onClick={nextPageHandler}>&gt;</button>
                    </div>
                </>
            )
        
        }
export default TableComponent