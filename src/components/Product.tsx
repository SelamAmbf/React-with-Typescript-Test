import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/index.css";
import { insertDatabase } from '../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
const Store: React.FC = () => {
  // State variables to store form data
  const [storeName, setStoreName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [stores, setStores] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/store');
      setStores(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const dispatch = useDispatch();
  // const store = useSelector((state: any) => state.product);

  // const [formData, setFormData] = useState({
  //   storeName: store.storeName,
  //   country: store.country,
  //   city: store.city,
  //   location: store.location,
  // });



  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Make POST request to backend API using Axios
      const response = await axios.post('http://localhost:8000/store', {
storeName,city,country,location
      });
      
      // Handle response if needed
      console.log('Data sent successfully:', response.data);
      
      // Optionally, reset form fields after successful submission
      setStoreName('');
      setCountry('');
      setCity('');
      setLocation('');
    } catch (error) {
      // Handle error if request fails
      console.error('Error sending data:', error);
    }
    await fetchData();
  };
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.id]: e.target.value
  //   });
  // };

  return (
    <div className="CreateStore">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="storeName">STORE NAME</label>
          <input placeholder="Store Name"
            type="text"
            id="storeName"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country">COUNTRY</label>
          <input
          placeholder ="Country"
            type="text"
            id="country"
            value={country}
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
            value={city}
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Submit</button>
        <div className="table-container"><table className="table-latitude">
        <caption>Store List</caption>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Country</th>
            <th>City</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store: any) => (
            <tr>
              <td>{store.storeName}</td>
              <td>{store.country}</td>
              <td>{store.city}</td>
              <td>{store.location}</td>
              <td><button id="edit"type="button">Edit</button>
              &nbsp;
              <button id="delete" type="button">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table> </div>
      </form>
    </div>
  );
};
export default Store;
