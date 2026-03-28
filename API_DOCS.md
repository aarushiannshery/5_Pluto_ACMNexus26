# RESQ.AI Backend API Documentation (Cerulean Precision Schema)

Welcome to the **RESQ.AI** API documentation! The payloads are perfectly mapped to the "Cerulean Precision" Nocturnal Observer UI blueprint. 

---

## 🌎 Global Information
- **Base URL:** `http://localhost:5000/api`
- **Authentication:** None required for local Hackathon phase.
- **Content-Type:** `application/json`

---

## 1. 📡 The Data Tier: Atmospheric Telemetry
`GET /risk?lat=35.61&lon=139.69`
Fetches exact telemetry grids powered by OpenWeather and triggers emergency alerts exclusively on strict L1-L4 severity indexes.

### JSON Response (200 OK)
```json
{
  "coordinates": { "lat": "35.61", "lon": "139.69" },
  "telemetry": {
    "heat_wave_index": 44.5,
    "humidity_percent": 88,
    "impact_level": "L4",
    "wind_speed_mph": 42.1
  },
  "disasterType": "Extreme Heat Hazard",
  "probability": 80,
  "isAlertActive": true,
  "alertMessage": "CRITICAL RESPONSE REQUIRED: L4 Extreme Heat Hazard localized at current coordinates. Initiate tactical evacuation."
}
```

### Response Breakdown
- **`telemetry`:** Exactly maps to the UI's 2x2 requirements (HWI, Humidity, Impact Level, Wind Speed).
- **`isAlertActive` (bool):** If `true`, the UI must drop the top-tier critical response banner without gradients.

---

## 2. 📋 The Mid Tier: Tactical Protocol
`GET /report?lat=35.61&lon=139.69`
Provides sterile environment intelligence summaries and structures objective survival protocols.

### JSON Response (200 OK)
```json
{
  "summary": "Atmospheric telemetry indicates a rapid deviation in localized moisture aggregates spanning a 100m perimeter. Structural integrity holds, but secondary systems show minor stress markers.",
  "structural_telemetry": {
      "water_level": "Caution: 1.2m",
      "grid_stability": "Fluctuating",
      "shelter_capacity": 45
  },
  "response_protocol": {
      "before": ["Secure structural perimeters", "Cache emergency rations"],
      "during": ["Maintain strict radio silence", "Stay clear of power grids"],
      "after": ["Execute perimeter sweeps", "Submit signals via dashboard"]
  },
  "db_reference": 1045,
  "coordinates": { "lat": 35.61, "lon": 139.69 }
}
```

---

## 3. 👥 The Bottom Tier: Live Signals (Crowdsourced DB)
`POST /signals`
Allows real users to submit field telemetry.
**Body:** `{ "lat": 35.61, "lon": 139.69, "type": "Road flooded" }`

---

## 4. 🏥 One-Tap Emergency Assets API
`GET /emergency/assets?lat=35.61&lon=139.69`
Fetches the nearest shelters, survival checklists, and rescue contacts for their GPS zone.
