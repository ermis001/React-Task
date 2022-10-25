import React, {useState} from 'react';
import Multiselect from 'multiselect-react-dropdown';
import nextId from 'react-id-generator';

import './App.css';
import JobsiteTable from './Jobsite-table/JobsiteTable';
import Drivers from './Mock-data/mock-drivers.json';

const App = () =>  {

  const [drivers, setDrivers] = useState(Drivers);

  const [addDriver, setAddDriver] = useState({
    id: '',
    jobsiteName: '',
    status: '',
    categoryIncluded: []
})


const handleaddDriverName = (event) => {
  event.preventDefault();

  const fieldName = event.target.getAttribute('name');
  const fieldValue = event.target.value;

  const newDriver = {...addDriver};
  newDriver[fieldName] = fieldValue;

  setAddDriver(newDriver);
}


const handleaddDriverStatus = (event) => {
  event.preventDefault();

  const fieldName = event.target.getAttribute('name');
  const fieldValue = event.target.value;

  const newDriver = {...addDriver};
  newDriver[fieldName] = fieldValue;

  setAddDriver(newDriver);
}

const handleAddFormSubmit = (event) => {
  event.preventDefault();
  const newDriver = {
      id: nextId(),
      jobsiteName: addDriver.jobsiteName,
      status: addDriver.status,
      categoryIncluded: addDriver.categoryIncluded,
      items: []
  };

  const newdrivers = [...drivers, newDriver];
  document.querySelector('.driver-form').classList.add('hidden')
  setDrivers(newdrivers);
}


  const statusCount = (type) => {
    const statusCounts = drivers.filter(driver => driver.status === type);
    return statusCounts.length;
  }

  const closeFormButton = (event) => {
    event.preventDefault();
    document.querySelector('.driver-form').classList.add('hidden')
  }

  const openFormButton = () => {
    document.querySelector('.driver-form').classList.remove('hidden')
  }

  return (
    <div className="App">
      <div className='table-status'>
        <div className='item On-Road'>{statusCount('On-Road')} On Road</div>
        <div className='item Completed'>{statusCount('Completed')} Completed</div>
        <div className='item On-Hold'>{statusCount('On-Hold')} On Hold</div>
      </div>
      <JobsiteTable drivers={drivers} openFormButton={openFormButton}/>
      <div className='driver-form hidden'>
      <section>
            <div className="top-border">
                <h5>Title</h5>
                <button onClick={closeFormButton}>&#10006;</button>
            </div>
            <div className="container-form">
                <p><span>&#x1F6C8; </span>Informative piece of text regarding this modal.</p>

                <form 
                className='form'
                onSubmit={handleAddFormSubmit}>
                  <div id='name'>
                    <label>Name</label>
                    <input
                        type="text"
                        name="jobsiteName"
                        required='required'
                        placeholder="Type the jobsite's name"
                        onChange={handleaddDriverName}
                    />
                  </div>
                  <div id='category-included'>
                    <label>Category Included</label>
                    <Multiselect
                    closeOnSelect={true }
                    showArrow={true}
                    avoidHighlightFirstOption={true}
                    className="multiselect"
                    isObject={false}
                    options={["Sidewalk Shed", "Scaffold", "Shoring"]}
                    onChange={(e)=> {
                        const newDriver = {...addDriver}
                        newDriver.categoryIncluded = [...e]
                        setAddDriver(newDriver);
                    }}
                    />
                  </div>
                  <div id='status'>
                    <label>Status</label>
                    <select 
                        defaultValue={'Select an option'}
                        name="status"
                        placeholder="Select One"
                        onChange={handleaddDriverStatus}>
                        <option disabled hidden>Select an option</option>
                        <option value="Completed">Completed</option>
                        <option value="In-Progress">In Progress</option>
                        <option value="On-Road">On Road</option>
                        <option value="On-Hold">On Hold</option>
                    </select>
                  </div>
                <div className='form-buttons'>
                    <button id='cancel-btn' onClick={closeFormButton}>Cancel Changes</button>
                    <button id='save-btn' type="submit" onClick={handleAddFormSubmit}>Save Changes</button>
                </div>
                </form>
            </div>
        </section>
      </div>
    </div>
  );
}

export default App;