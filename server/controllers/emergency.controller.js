const getEmergencyAssets = async (req, res, next) => {
    try {
      const { lat, lon } = req.query;
  
      if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude coordinates are required to find local assets.' });
      }
  
      // Simulate dynamic asset generation based on the 100m zone
      const numericLat = parseFloat(lat);
      const numericLon = parseFloat(lon);
  
      res.status(200).json({
        zone: `GeoZone [${numericLat.toFixed(2)}, ${numericLon.toFixed(2)}]`,
        shelters: [
            { name: "Central High School Gym", capacity: 250, distance: "0.8mi" },
            { name: "Community Rec Center", capacity: 120, distance: "1.2mi" },
            { name: "First Baptist Church", capacity: 85, distance: "2.1mi" }
        ],
        emergency_kit_checklist: [
            { item: "1 Gallon Water", category: "Hydration", priority: "High" },
            { item: "Flashlight & Batteries", category: "Tools", priority: "High" },
            { item: "Non-perishable Food", category: "Nutrition", priority: "High" },
            { item: "Power Bank", category: "Electronics", priority: "Medium" },
            { item: "First Aid Kit", category: "Medical", priority: "High" }
        ],
        emergency_contacts: {
            "Local FEMA Dispatch": "1-800-621-3362",
            "Regional Red Cross": "1-800-733-2767",
            "Coast Guard Search & Rescue": "911 or Local Channel 16"
        }
      });
  
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = { getEmergencyAssets };
