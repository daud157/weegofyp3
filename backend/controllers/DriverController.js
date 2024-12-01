const axios = require('axios');
const User = require('../models/user');

// Dummy driver data (latitude and longitude)
const drivers = [
  { id: 1, name: 'Driver A', latitude: 33.6844, longitude: 73.0479 },  // Example coordinates
  { id: 2, name: 'Driver B', latitude: 33.6848, longitude: 73.0500 },
  { id: 3, name: 'Driver C', latitude: 33.6900, longitude: 73.0600 },
  { id: 4, name: 'Driver D', latitude: 33.6880, longitude: 73.0485 },
];

// Haversine formula to calculate distance between two points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

// API to find the nearest driver
const getNearestDriver = async (req, res) => {
  const { userLatitude, userLongitude } = req.body;

  if (!userLatitude || !userLongitude) {
    return res.status(400).json({ error: "User location is required." });
  }

  try {
    // Find the nearest driver based on distance
    let nearestDriver = null;
    let minDistance = Infinity;

    drivers.forEach(driver => {
      const distance = calculateDistance(userLatitude, userLongitude, driver.latitude, driver.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearestDriver = driver;
      }
    });

    if (nearestDriver) {
      res.json({
        driver: nearestDriver,
        distance: minDistance.toFixed(2), // Distance in kilometers
      });
    } else {
      res.status(404).json({ error: "No drivers available." });
    }
  } catch (error) {
    console.error("Error finding nearest driver:", error.message);
    res.status(500).json({ error: "Error finding nearest driver. Please try again later." });
  }
};

// API endpoint to update driver's online status
 const updateDriverStatus = async (req, res) => {
  const { userId, isOnline } = req.body;

  try {
    // Find the user by userId and check if they are a driver
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!user.isDriver) {
      return res.status(400).json({ error: "This user is not a driver." });
    }

    // Update the driver's online status
    user.driverProfile.isOnline = isOnline;

    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: `Driver's online status updated to ${isOnline ? 'Online' : 'Offline'}`,
      driver: {
        id: user._id,
        name: `${user.firstname} ${user.lastname}`,
        isOnline: user.driverProfile.isOnline,
      }
    });
  } catch (error) {
    console.error("Error updating online status:", error.message);
    res.status(500).json({ error: "Error updating status. Please try again later." });
  }
}

const getDriverDetails = async (req, res) => {
  const { userId } = req.body;

  try {
    // Find the user by userId and check if they are a driver
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ error: "User not found." });
        }

    if (!user.isDriver) {

        return res.status(400).json({ error: "This user is not a driver." });

    }

    res.status(200).json({
        driver: {
            id: user._id,
            name: `${user.firstname} ${user.lastname}`,
            isOnline: user.driverProfile.isOnline,
            vehicleType: user.driverProfile.vehicleType,
            vehicleNumber: user.driverProfile.vehicleNumber,
            isVerified: user.driverProfile.isVerified,
        }
    });

}
catch (error) {
    console.error("Error getting driver status:", error.message);
    res.status(500).json({ error: "Error getting driver status. Please try again later." });
}

}




module.exports = {
  getNearestDriver,
    updateDriverStatus,
};
