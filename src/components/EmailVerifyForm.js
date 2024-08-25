import React, { useState } from 'react';

const EmailVerifyForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://ottadmin.imboxocinema.com/api/email-verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data from email verification',data);
            // console.log(data.errors[0].email);
            
            
            if (data.success) {
                alert('Email verification successful!');
            } 
             else if(data.status == 400) {
                alert('Email verification failed: '+ data.message);
            }
            else if (data.errors[0].email ){
                alert(data.errors[0].email)
            } 
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="number" name="otp" value={formData.otp} onChange={handleChange} placeholder="OTP" required />
            <button type="submit">Verify Email</button>
        </form>
    );
};

export default EmailVerifyForm;

