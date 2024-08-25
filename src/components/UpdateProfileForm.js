import React, { useState, useEffect } from 'react'

const UpdateProfileForm = () => {
    const [formData , setFormData] = useState({
        user_id: '',
        name: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        address: '',
        email: '',
        user_name: '',
        bio: '',
    })

    const [files , setFiles] = useState({
        profile_img: null,
        banner_img : null
    })

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetchCountries();
    },[]);

    const fetchCountries = () => {
        const token = localStorage.getItem('authToken');
        fetch(`https://ottadmin.imboxocinema.com/api/country`,{
            method: 'GET' ,
            headers:{
                 'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
            }
        })
        .then(response=>response.json())
        .then((val=>{
            console.log('value',val);
            if(val.message == "Invalid token"){
                alert('Something is wrong !!')
                return
            }else{
                setCountries(val.data)
            console.log('countries',countries)
            }
            
        }))
        .catch(error =>console.error('Error fetching states:', error) )
    };

    const fetchStates = (countryId) => {

        const token = localStorage.getItem('authToken');
        fetch(`https://ottadmin.imboxocinema.com/api/state/${countryId}`,{
            method: 'GET' ,
            headers:{
                 'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
            }
        })
        .then(response=>response.json())
        .then((val=>{
            console.log('value',val);
            if(val.message == "State Not Found"){
                alert(val.message);
                return
            }
            else{
                setStates(val.data)
            }
           
        }))
        .catch(error =>console.error('Error fetching states:', error) )
    };

    const fetchCities = (stateId) => {
        const token = localStorage.getItem('authToken');
        fetch(`https://ottadmin.imboxocinema.com/api/city/${stateId}`,{
            method: 'GET' ,
            headers:{
                 'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
            }
        })
        .then(response=>response.json())
        .then((val=>{
            console.log('value',val);
            if(val.message == "City Not Found"){
                alert(val.message)
                return
            }else{
                setCities(val.data)
            }
            
        }))
        .catch(error =>console.error('Error fetching states:', error) )
    };

    const handleCountryChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, country: value });
        console.log('value in handleCountryChange ',value)
        fetchStates(value);
    };

    const handleStateChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, state: value });
        fetchCities(value);
    };

    const handleChange =(e)=>{
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]:value
        })

    }

    const handleFileChange = (e)=>{
        const {name , files} = e.target;

        setFiles({
            ...files,
            [name] : files[0]
        })
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        const data = new FormData();
        const combinedData = {...formData , ...files};
        console.log('combinedData',combinedData );
        Object.entries(combinedData).forEach(([key, value]) => data.append(key, value));
        console.log('Data',data);
        const token = localStorage.getItem('authToken');
        console.log('token',token);
        // const user_id= localStorage.getItem('userID');
        

        fetch('https://ottadmin.imboxocinema.com/api/user-update', {
            method: 'POST',
            body: data,
            headers:{
                 'Authorization': `Bearer ${token}`
            }
        })
        //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMSwiaWF0IjoxNzI0NDgxNjg3fQ.Ae64QXTRKngW4GuR1smEZFxLMn7LE9syO5c99IQpHao"
        .then(response => response.json())
        .then(data => {
            console.log('Response',data)
            if (data.success) {
                alert('Profile updated successfully!');
            } else if (data.error){
                alert(data.error)
            }
            else if (data.status == '401'){
                alert(data.message);
            }else if (data.status == '422'){
                alert (data.errors[0].user_id)
            }
        })
        .catch(error => console.error('Error:', error));
    };
    
  return (
    <form onSubmit={handleSubmit}>
        <input type='number' name ='user_id' value={formData.user_id} onChange={handleChange} placeholder='Enter User ID' required/>
        <input type='text' name ='name' value={formData.name} onChange={handleChange} placeholder='Enter Name' required/>
        <select name="country" value={formData.country} onChange={handleCountryChange}>
                <option value="">Select Country</option>
                {countries.map(country => (
                    <option key={country.id} value={country.id}>{country.name}</option>
                ))}
            </select>
            
            <select name="state" value={formData.state} onChange={handleStateChange} disabled={!states.length}>
                <option value="">Select State</option>
                {states.map(state => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                ))}
            </select>
            
            <select name="city" value={formData.city} onChange={handleChange} disabled={!cities.length}>
                <option value="">Select City</option>
                {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                ))}
            </select>
        <input type='text' name ='phone' value={formData.phone} onChange={handleChange} placeholder='Enter Phone Number'/>
        <input type='text' name ='address' value={formData.address} onChange={handleChange} placeholder='Enter Address' />
        <input type='email' name ='email' value={formData.email} onChange={handleChange} placeholder='Enter Email' />
        <input type='text' name ='user_name' value={formData.user_name} onChange={handleChange} placeholder='Enter Enter UserName'/>
        <input type='file' name='profile_img' onChange={handleFileChange}/>
        <input type='file' name='banner_img' onChange={handleFileChange}/>
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"></textarea>
        <button type="submit">Update Profile</button>

    </form>
  )
}

export default UpdateProfileForm