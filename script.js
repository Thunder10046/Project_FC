// Event listeners for slides
let sld1 = document.getElementsByClassName("slide1");
let sld2 = document.getElementsByClassName("slide2");
let sld3 = document.getElementsByClassName("slide3");

sld1[0].addEventListener("click", function () {
    window.location.href = "slide1.html";
});

sld2[0].addEventListener("click", function () {
    window.location.href = "slide2.html";
});

sld3[0].addEventListener("click", function () {
    window.location.href = "slide3.html";
});

// Logout function
function logout() {
    localStorage.removeItem('authToken'); // Clear token
    alert('You have been logged out.');
    window.location.href = 'login.html'; // Redirect to login
}

// Function to fetch and display player data
async function fetchPlayerData() {
    try {
        // Fetch data from the backend API (replace 'your-api-endpoint' with your actual endpoint)
        const response = await fetch('your-api-endpoint/players');
        const data = await response.json();

        if (response.ok) {
            populateSections(data);
        } else {
            console.error('Error fetching data:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to populate sections with data
function populateSections(data) {
    // All players
    const allPlayersList = document.getElementById('all-players-list');
    const availablePlayersList = document.getElementById('available-players-list');
    const selectedPlayersList = document.getElementById('selected-players-list');

    data.forEach(player => {
        // Create list item for each player
        const listItem = document.createElement('li');
        listItem.textContent = `${player.name} - ${player.position}, Age: ${player.age}, Goals: ${player.goals}`;

        // Append to respective section
        if (player.red_cards === 0 && player.yellow_cards < 3) {
            availablePlayersList.appendChild(listItem); // Available players
        }

        if (player.selected === true) {
            selectedPlayersList.appendChild(listItem); // Selected players
        }

        allPlayersList.appendChild(listItem.cloneNode(true)); // Add to all players
    });
}

// Call fetchPlayerData to populate data on page load
document.addEventListener('DOMContentLoaded', fetchPlayerData);
