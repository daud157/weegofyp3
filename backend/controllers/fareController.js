const axios = require('axios');
const googleMapsAPIKey = process.env.API_KEY;

// Base fare rates for each vehicle type
const baseFares = {
  bike: 5,       // Base fare for Bike
  economy: 10,   // Base fare for Economy
  comfort: 15,   // Base fare for Comfort
};

// Fare calculation function
const calculateFares = async (req, res) => {
  const { origin, destination } = req.body;

  // Validate origin and destination
  if (!origin || !destination) {
    return res.status(400).json({ error: "Origin and destination are required." });
  }

  try {
    // Get the distance between origin and destination using Google Maps API
    const distanceResponse = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
      params: {
        origins: origin,
        destinations: destination,
        key: googleMapsAPIKey,
      },
    });

    // Ensure the response contains valid data
    const elements = distanceResponse.data.rows[0]?.elements[0];
    if (!elements || elements.status !== 'OK') {
      return res.status(400).json({ error: "Unable to calculate distance. Please check the locations." });
    }

    // Get the distance and duration values
    const distanceInKm = elements.distance.value / 1000;  // Distance in kilometers
    const durationInMinutes = elements.duration.value / 60; // Duration in minutes

    // Calculate fares based on distance and base fare
    const fareEstimates = {
      bike: baseFares.bike + distanceInKm * 2,       // $2 per km for Bike
      economy: baseFares.economy + distanceInKm * 2, // $2 per km for Economy
      comfort: baseFares.comfort + distanceInKm * 2, // $2 per km for Comfort
    };

    // Return the fare estimates along with the distance and duration
    res.json({
      fares: fareEstimates,
      distance: distanceInKm.toFixed(2), // Round distance to 2 decimal places
      duration: durationInMinutes.toFixed(2), // Round duration to 2 decimal places
    });

  } catch (error) {
    console.error("Error calculating fare:", error.message);
    res.status(500).json({ error: "Error calculating fare. Please try again later." });
  }
};

module.exports = {
  calculateFares,
};
