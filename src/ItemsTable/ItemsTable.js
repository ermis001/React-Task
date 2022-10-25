import React, {useState, useEffect} from "react";
import './ItemsTable.css'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Drivers from '../Mock-data/mock-drivers.json';


const ItemsTable = () => {

    const [items, setItems] = useState([]);
    const [drivers, setDrivers] = useState(Drivers)
    const [itemsListCopy, setItemsListCopy] = useState(items)
    const [searchDriver, setSearchDriver] = useState('');
    const {id} = useParams();
    // const [editItemId, setEditItemId] = useState(null);
    const [editItemData, setEditItemData] = useState({
        id: "",
        item: "",
        quantity: "",
        description: "",
        notes: "",
        category: ""
      });
    useEffect(()=>{
        let driver = Drivers.find(driver => driver.id === id)
        setItems(driver.items)
    },[])

    let driverData = Drivers.find(driver => driver.id === id)

    const sortByCategory = (category) => {
        let filteredItems = items.filter(item => item.category == category)
        setItemsListCopy(filteredItems)
    }
    let iteration = 0;

    const showElement = (element) => {
        document.querySelector(element)
        .classList.remove('hidden');
    }
    const hideElement = (element) => {
        document.querySelector(element)
        .classList.add('hidden');
    }

    const getItemData = (id) => {
        const item = items.find(item => item.id == id);
        setEditItemData({
            id: item.id,
            item: item.item,
            quantity: item.quantity,
            description: item.description,
            notes: item.notes,
            category: item.category
        })

        showElement('.edit-item-form');
    };
    
    const updateItemData = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newItemData = { ...editItemData };
        newItemData[fieldName] = fieldValue;
    
        setEditItemData(newItemData);
      };

    const submitItemData = (event) => {
        event.preventDefault();

        const selectedItem = items.findIndex(item => item.id === editItemData.id);
        
        items[selectedItem] = {...editItemData}
        
        setItemsListCopy(items.filter(item => item.category == editItemData.category));
        hideElement('.edit-item-form')
    }


    return(
        <div className="items-container">
            <div className="category-nav">
                <h3>{driverData.jobsiteName}</h3>
                <div className="category-btn">
                    {driverData.categoryIncluded.map((category)=>{
                        return(
                            <button 
                            key={category} 
                            onClick={()=> {sortByCategory(category)}}
                            >{category}</button>
                            )})}
                    <Link to={'/'}><button id="back-btn">Go Back</button></Link>
                </div>
            </div>
                {itemsListCopy.length === 0?
                <div className="items-table-container">
                    <div className="search-nav">
                    <h2>Data Grid</h2>
                    <input placeholder="Search a driver"
                    onClick={()=> {{document.querySelector('.list-of-drivers').classList.toggle('hidden')}}}
                    onChange={event => {setSearchDriver(event.target.value)}}
                    onFocus={()=>{showElement('.list-of-drivers')}}/>
                    </div>
                    <div className="list-of-drivers hidden">
                        <ul>
                        {drivers.filter((val) => {
                                    if(searchDriver === ''){
                                        return val
                                    }else if(val.jobsiteName.toLowerCase().includes(searchDriver.toLocaleLowerCase())) {
                                        return val
                                    }}).map(driver => 
                                <Link to={`/itemsList/${driver.id}`}><li key={driver.id} onClick={()=>{hideElement('.list-of-drivers')}}>{driver.jobsiteName}</li></Link>)}
                        </ul>
                    </div>
                    <div className="no-service-msg">
                        
                    <h2>No Service Selected</h2>
                    <p>Please select a service on your left to proceed.</p>
                    </div>
                </div>:
            <div className="items-table-container">
                <div className="search-nav">
                    <h2>{itemsListCopy[0].category}</h2>
                    <input placeholder="Search a driver"
                    onFocus={()=>{showElement('.list-of-drivers')}}
                    onClick={()=> {{document.querySelector('.list-of-drivers').classList.toggle('hidden')}}}
                    onChange={event => {setSearchDriver(event.target.value)}}
                    />
                    </div>
                    <div className="list-of-drivers hidden">
                        <ul>
                        {drivers.filter((val) => {
                                    if(searchDriver === ''){
                                        return val
                                    }else if(val.jobsiteName.toLowerCase().includes(searchDriver.toLocaleLowerCase())) {
                                        return val
                                    }}).map(driver => 
                                <Link to={`/itemsList/${driver.id}`}><li key={driver.id} onClick={()=>{hideElement('.list-of-drivers')}}>{driver.jobsiteName}</li></Link>)}
                        </ul>
                    </div>
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Nr</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsListCopy.map((item) => {
                        return(
                            <tr>
                                <td>{iteration+=1}</td>
                                <td onClick={()=>{getItemData(item.id)}}>{item.item}</td>
                                <td>{item.quantity}</td>
                                <td>{item.description}</td>
                                <td>{item.notes}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>}
            <div className="edit-item-form hidden">
            <section >
                <div className="top-border">
                    <h5>Title</h5>
                    <button onClick={()=>{hideElement('.edit-item-form')}}>&#10006;</button>
                </div>
                <div className="container-form">
                    <p><span>&#x1F6C8; </span>Informative piece of text regarding this modal.</p>
                    <form id='form'
                    onSubmit={submitItemData}
                    >
                        <div id='item'>
                            <label>Item</label>
                            <select
                            name="item"
                            required='required'
                            defaultValue={'Select Item'}
                            onChange={updateItemData}>
                                <option selected >{editItemData.item}</option>
                                {driverData.items.map(item => <option>{item.item}</option>)}
                            </select>
                        </div>
                        <div id='quantity'>
                            <label>Quantity</label>
                            <input
                            type='number'
                            placeholder="Set quantity"
                            name="quantity"
                            required='required'
                            value={editItemData.quantity}
                            onChange={updateItemData}
                            />
                        </div>
                        <div id='descrtption'>
                            <label>Description</label>
                            <textarea
                            placeholder="Type the deescription..."
                            name="description"
                            value={editItemData.description}
                            onChange={updateItemData}
                            />
                        </div>
                        <div id='notes'>
                            <label>Notes</label>
                            <textarea
                            placeholder="Type a note..."
                            name="notes"
                            value={editItemData.notes}
                            onChange={updateItemData}
                            />
                        </div>
                        <div className='form-buttons'>
                            <button id='save-btn' type="submit" onClick={submitItemData}>Save Changes</button>
                        </div>
                        </form>
                    </div>
                </section>
            </div>
        </div> 
    )
}

export default ItemsTable;