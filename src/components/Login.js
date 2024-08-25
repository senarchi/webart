import React, { useState } from 'react';
let token;

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formData.password.length<8){
            alert ('Password must be 8 characters long')
        }

        fetch('https://ottadmin.imboxocinema.com/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data from login',data);
            token = data.token;
            localStorage.setItem('authToken', token);
            // localStorage.setItem('userID', data.user_id)
            
            if (data.success) {
                alert("USER ID is " + data.data.user_id)
                alert('Login successful! Refreshing the page');
                window.location.reload()
                // alert ('User ID is '+ data.user_id)
                
            } else if (data.status == '401') {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    };

    // console.log('token from login', localStorage.getItem('authToken'));
    

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
