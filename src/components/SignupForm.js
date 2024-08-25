import React, { useState } from 'react';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        role: '0',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formData.password.length<8){
            alert('Password must be 8 characters long')
        }

        fetch('https://ottadmin.imboxocinema.com/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data',data)
            console.log(data.errors[0].email)
            if (data.success) {
                alert('Signup successful!');
            } else if (data.errors[0].email){
                alert(data.errors[0].email)
            }
             else {
                alert('Signup failed: ');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="0">User</option>
                <option value="1">Creator</option>
                <option value="2">Studio</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;
