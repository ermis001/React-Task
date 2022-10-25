import React, {useState} from "react";
import { Link } from "react-router-dom";
import './JobsiteTable.css';


const JobsiteTable = ( { drivers, openFormButton } ) => {

    const [searchDriver, setSearchDriver] = useState('');

    return (
        <div className="jobsite-table">
            <h5>Title</h5>
            <div className="search-panel">
                <p><span>&#x1F6C8; </span>Informative piece of text regarding t his modal.</p>
                <div className="search-bar">
                    <input placeholder=" Search a driver"
                    onChange={event => {setSearchDriver(event.target.value)}}
                    />
                    <div className="create-buttons">
                     <button onClick={openFormButton}>Create</button><button onClick={openFormButton}>+</button>
                    </div>
                </div>
            </div>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Jobsite Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.filter((val) => {
                                    if(searchDriver === ''){
                                        return val
                                    }else if(val.jobsiteName.toLowerCase().includes(searchDriver.toLocaleLowerCase())) {
                                        return val
                                    }}).map(driver => 
                             <tr key={driver.id}>
                                <td><Link to={`/itemsList/${driver.id}`}>{driver.jobsiteName}</Link></td>
                                <td><button  className={`btn ${driver.status}`}>{driver.status}</button></td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default JobsiteTable