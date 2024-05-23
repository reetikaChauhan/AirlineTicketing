const axios = require('axios');

const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('token in airline', token)
    // Check if token is missing or invalid
    if (!token || token === "BAD") {
      return res.status(401).send('Unauthorized: No token provided');
    }
    
   

    try {
        const response = await axios.post('http://localhost:4000/auth/verify', {token });

        if (response.data.valid) {
            req.user = response.data.user; // Assuming the user data is returned if valid
            next();
        } else {
            res.status(401).json({ message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = isAuthenticated;
