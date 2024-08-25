import React from 'react';

const LogoutButton = () => {
    const handleLogout = () => {
        fetch('https://ottadmin.imboxocinema.com/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Logout response',data)
            if (data.success) {
                alert('Logged out successfully!');
                
            } else {
                alert('Logout failed: ');
            }
        })
        .catch(error =>{
            alert('Something is wrong')
            console.log('Error:', error)
        } );
    };

    return (
        <div className="logout-container">
        <button onClick={handleLogout}>Logout</button>
    </div>
    );
};

export default LogoutButton;
