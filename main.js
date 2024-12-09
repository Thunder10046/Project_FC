// Fetch players data from the backend
async function fetchPlayers() {
    try {
        const response = await fetch('http://localhost:5000/api/players'); // Replace with your backend endpoint
        if (!response.ok) {
            throw new Error('Failed to fetch players');
        }
        const players = await response.json();

        // Display players data in the list
        const playersList = document.getElementById('players-list');
        playersList.innerHTML = ''; // Clear the list first
        players.forEach(player => {
            const li = document.createElement('li');
            li.textContent = `${player.name} - ${player.position}, Age: ${player.age}`;
            playersList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching players:', error);
    }
}

// Fetch and display players on page load
fetchPlayers();
