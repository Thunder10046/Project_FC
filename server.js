const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// MySQL Database Configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'football_db',
    port: 3306,
    connectTimeout: 10000,
});

// Test Database Connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// API endpoint for login
app.post('/login', (req, res) => {
    console.log(req.body); // Log the incoming data
    const { managerName, password } = req.body;

    const query = 'SELECT * FROM Managers WHERE name = ? AND password = ?';
    db.query(query, [managerName, password], (err, results) => {
        if (err) {
            console.error(err); // Log SQL errors
            res.status(500).send({ message: 'Error connecting to database' });
            return;
        }
        console.log(results); // Log query results
        if (results.length > 0) {
            res.status(200).send({ message: 'Login successful' });
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    });
});


// Serve static files (CSS, Images, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/api/players', (req, res) => {
    const query = 'SELECT * FROM players'; // Replace with your table name
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving players:', err);
            res.status(500).send({ message: 'Database query failed' });
        } else {
            res.json(results); // Send results as JSON
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
