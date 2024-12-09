function validateLogin() {
    const managerName = document.getElementById('managerName').value.trim();
    const password = document.getElementById('password').value.trim();

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ managerName, password }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            return response.json(); // Parse JSON response
        })
        .then((data) => {
            alert(data.message); // Show login success message
            window.location.href = 'index.html'; // Redirect to index.html
        })
        .catch((error) => {
            console.error(error); // Log any errors
            alert('Login failed. Please try again.');
        });
}
