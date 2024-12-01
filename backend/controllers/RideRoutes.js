const express = require('express');
const axios = require('axios');
const app = express();

// Your Google Maps API Key (make sure it's restricted)
const GOOGLE_API_KEY = process.env.API_KEY;

// Cache to store route information (optional, for performance)
let routeCache = {};

// Function to fetch routes from Google Directions API
async function getDirections(origin, destination) {
    try {
        // Check if the route already exists in the cache
        const cacheKey = `${origin}-${destination}`;
        if (routeCache[cacheKey]) {
            return routeCache[cacheKey]; // Return cached route if available
        }

        // If not cached, request directions from Google Maps API
        const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
            params: {
                origin,
                destination,
                key: GOOGLE_API_KEY,
            },
        });

        if (response.data.status === 'OK') {
            // Cache the result for future use
            routeCache[cacheKey] = response.data.routes;
            return response.data.routes;
        } else {
            throw new Error('Unable to fetch directions');
        }
    } catch (error) {
        console.error('Error fetching directions:', error);
        throw new Error('Error fetching directions from Google API');
    }
}

// API endpoint to request directions
app.get('/api/routes', async (req, res) => {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination are required' });
    }

    try {
        const routes = await getDirections(origin, destination);
        return res.json(routes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Server configuration

