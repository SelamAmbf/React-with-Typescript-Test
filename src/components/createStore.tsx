import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import {useSelector, useDispatch, ConnectedProps,connect } from 'react-redux';
import { insertDatabase, deleteData, stores, updateData, searchData } from '../state/actions/productActions';
import { addStore,addProduct, deleteStore, deleteProducts, updateStore, updateProducts, searchProducts,searchStore } from '../state/action Creator/storeAction';
import "../css/index.css";
import Api from '../state/action Creator/Api';
// import { Button } from 'antd';
import { Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
interface Store {
  storeName: string;
  storeDescription: string;
  storeCountry: string;
  storeCity: string;
  storeLocation: string;
}
// Define types for props
type PropsFromRedux = ConnectedProps<typeof connector>;
// Define component props interface
interface Props extends PropsFromRedux {}
const StoreForm: React.FC<Props> = ({updateData}) => {
  const dispatch = useDispatch();
  const [storeName, setName] = useState('');
  const [storeDescription, setDescription] = useState('');
  const [storeCountry, setCountry] = useState('');
  const [storeCity, setCity] = useState('');
  const [storeLocation, setLocation] = useState('');
  const [Stores, setStores] = useState<Store[]>([]);
  const [nameError, setError] = useState('');
  const store = useSelector((state: any) => state.store);
  const [updateDatas, setUpdateData] = useState({
    storeName: store.storeName,
    storeDescription: store.storeDescription,
    storeCountry: store.storeCountry,
    storeCity: store.storeCity,
    storeLocation: store.storeLocation
  });
  const nameRegex = /^[a-zA-Z\s]+$/;
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  
    if (!nameRegex.test(value)) {
      setError('Name should only contain alphabets and spaces');
    } else {
      setError('');
    }
  };
  const fetchData = async () => {
    try {
      const response = await Api.get('store');
      setStores(response.data);
      console.log("fetch response");
      console.log(response.data);
      console.log("fetch_response");
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await Api.post('store', {
        id: Math.floor(Math.random() * 1000), // generate a random id
        storeName,
        storeDescription,
        storeCountry,
        storeLocation,
        storeCity
      });
      dispatch(insertDatabase(response.data));
    } catch (error) {
      console.error(error);
    }
    await fetchData();
    window.history.pushState({}, '', '/');
  };
  const handleDeletes = async (id: any) => {
    try {
      console.log("deleted");
      const response = await Api.delete(`store/${id}`);
      dispatch(deleteData(response.data));
    } catch (error) {
      console.error(error);
    }
    await fetchData();

  };
  const handleEditClick = async (id: any) => {
    const response = await Api.get(`store/${id}`);
    const store = response.data;
    const storeData = {
      storeName: store.storeName,
      storeDescription: store.storeDescription,
      storeCountry: store.storeCountry,
      storeCity: store.storeCity,
      storeLocation: store.storeLocation
    }
    updateData(storeData);
  };

  const handleChange = (searchValue: string) => {
    try{
    const searchStore = Stores.filter((store) =>
      (store.storeDescription && store.storeDescription.toLowerCase().includes(searchValue.toLowerCase())) ||
      (store.storeCity && store.storeCity.toLowerCase().includes(searchValue.toLowerCase())) ||
      (store.storeCountry && store.storeCountry.toLowerCase().includes(searchValue.toLowerCase())) ||
      (store.storeLocation && store.storeLocation.toLowerCase().includes(searchValue.toLowerCase())) ||
      (store.storeName && store.storeName.toLowerCase().includes(searchValue.toLowerCase()))
    );
    dispatch(searchData(setStores(searchStore)));
    // setStores(searchStore)
    console.log(searchStore);
  }
    catch(error){
      console.error(error);
    }
    
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="CreateStore">
      {/* <input type="text" placeholder="Search items..." onChange={(e) => handleChange(e.target.value)}/> */}
      <TextField id="outlined-search" label="Search field" type="search" onChange={(e) => handleChange(e.target.value)}/>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="storeName">STORE NAME</label>
        <input placeholder="Store Name"
          type="text"
          id="storeName"
          name="storeName"
          value={updateDatas.storeName}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
      <div>
        <label htmlFor="description">DESCRIPTION</label>
        <input
        placeholder ="Description"
          type="text"
          id="description"
          name="storeDescription"
          value={updateDatas.storeDescription}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
        <label htmlFor="country">COUNTRY</label>
        <input
        placeholder ="Country"
          type="text"
          id="country"
          name="storeCountry"
          value={updateDatas.storeCountry}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="city">CITY</label>
        <input
        placeholder ="City"
          type="text"
          id="city"
          name="storeCity"
          value={updateDatas.storeCity}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="location">LOCATION</label>
        <input
        placeholder="Location"
          type="text"
          id="location"
          name="storeLocation"
          value={updateDatas.storeLocation}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <Button type="submit" id="button" variant="contained" color="success">
      Submit</Button>
      </form>
      <div className="table-container"><table className="table-latitude">
      <caption>Store List</caption>
      <thead>
        <tr>
          <th>Store Name</th>
          <th>Store Description</th>
          <th>Country</th>
          <th>City</th>
          <th>Location</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {Stores.map((store: any) => (
          <tr>
            <td>{store.storeName}</td>
            <td>{store.storeDescription}</td>
            <td>{store.storeCountry}</td>
            <td>{store.storeCity}</td>
            <td>{store.storeLocation}</td>
            <td>
            <Button id="button" variant="outlined" onClick={() => handleEditClick(store.id)}>Update</Button>
            <Button id="dbutton" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeletes(store.id)} >Delete</Button>
            </td>
            </tr>
            
        ))}
         
      </tbody>
    </table> </div>
   
  </div>
  );
};
// Connect redux state
const mapStateToProps = () => ({
  // No need to map state to props if not using root state
});

const connector = connect(mapStateToProps, { updateData});
export default connector(StoreForm);