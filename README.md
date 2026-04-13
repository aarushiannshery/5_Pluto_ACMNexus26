# 🚀 Welcome to NEXUS

### Conducted by | CLIQUE x ACM MITS |

### 📅 March 27 & 28

### 📍 Muthoot Institute of Technology and Science

<p align="center">
  <img src="template_acm.png" width="500"/>
  <img src="template_clique.png" width="250"/>
</p>

---

### 📖 Description

A **16-hour hackathon** across various domains where innovation meets execution. Build, collaborate, and push your limits.

---

## 🧠 Project Details

### 🏷️ Project Name
**RESQ.AI** - Climate Intelligence & Environmental Monitoring Platform

### 🎯 Chosen Domain
Climate Intelligence & Environmental Monitoring

### ❗ Problem Statement
Environmental conditions are becoming increasingly unpredictable, leading to localized risks such as floods and heatwaves. Although large volumes of data are available, there is a lack of systems that translate this data into clear, actionable insights for individuals. There is a need for a simple system that can analyze environmental data, identify location-specific risks, and provide simple, practical guidance for public safety.

### 💡 Solution
RESQ.AI is an AI-powered web platform that analyzes environmental data to detect potential disasters and provides location-specific risk levels. It delivers clear, actionable preparedness steps—before, during, and after disasters—helping individuals make informed decisions and stay safe.

---

## 🎯 Hackathon Domains

Participants must choose **one** of the following domains:

1️⃣ Digital Asset Protection
2️⃣ Smart Supply Chains
3️⃣ Digital Health & Predictive Care
4️⃣ Climate Intelligence
5️⃣ Cybersecurity & Threat Intelligence

---

## ⚙️ Hackathon Workflow & Rules

To ensure fairness and transparency, we have designed a structured development and tracking system.

---

### 🔗 GitHub Template

👉 **Template Repo:** `{link}`

* All teams must **fork this repository**
* Fork name must follow:

```
<TeamId>_<TeamName>_ACMNexus26
```

* Example:

```
12_CodeWarriors_ACMNexus26
```

* You may rename the repository **after the event ends**

---


---

## 👥 Participation Rules

* Team Size: **2–4 members**
* **Pre-created projects are strictly not allowed**
* All work must be done **during the hackathon timeframe**
* Only registered team members must participate
* Do **not attack or interfere** with college infrastructure/network
* Follow all instructions from the organizing team

---

## 📁 Repository Structure


Repository must not be private. The template Repository includes:

```
AGENTS.md
README.md
CHANGELOG.md
/progress/
```

---

## ⏱️ Hourly Progress Requirements

Every hour, teams must:

* Make **at least one commit**
* Add **at least one progress update** inside `/progress/`

Progress can include:

* Screenshots
* Screen recordings
* Dataset snapshots
* Any meaningful proof of work

### 📂 Progress Format

```
/progress
1.png
2.png
3.png
```

* Files must be **numbered sequentially**
* Each file should reflect **actual development progress**

---

## 📝 Changelog Rules (VERY IMPORTANT)

Every commit must be reflected in `CHANGELOG.md`.

You can:

* Update it per commit, OR
* Update it periodically (but must be complete at the end)

---

### 📌 Changelog Format

```md
## HH:MM

### Features Added
- Added login functionality
- Implemented API integration

### Files Modified
- auth.js
- login.jsx

### Issues Faced
- Firebase auth errors
- API timeout issues
```

---

💡 Tip:
Instructions are already included in `AGENTS.md`.
You can simply prompt it to **"CREATE CHANGELOG"** to follow the format.

---

## 📖 Documentation

We have provided:

* Examples
* Guidelines

Inside:

* `AGENTS.md`
* `README.md`

Please follow them strictly.

---

## 🔍 Monitoring & Verification

* Random checks will be conducted during the hackathon
* Organizers may:

  * Inspect commit history
  * Review changelog consistency
  * Verify progress evidence

---

## 👨‍💻 Team Collaboration Rules

* All members must be added as **collaborators**
* By the end of the hackathon:

  * **Each member must have at least one commit**

---

## ⚠️ Disqualification Criteria

* Use of **pre-built / pre-developed projects**
* Fake or manipulated commit history
* Missing hourly commits or progress updates
* Incomplete or inconsistent changelog

---

## 🏁 Final Note

Focus on building, learning, and enjoying the experience.

---

🔥 **Build. Break. Innovate. See you at NEXUS.**

---

# 🌍 RESQ.AI - Project Setup Guide

## 📦 Tech Stack

### Backend
- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Package Manager**: npm

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router
- **Maps**: Leaflet + React Leaflet
- **HTTP Client**: Axios
- **Styling**: CSS3

### ML/Data Integration
- **Data Sources**: OpenWeather API, USGS, Climate APIs
- **Models**: Risk Prediction (Flood, Heatwave, Drought, Wildfire, Hurricane, Storm)

## 🏗️ Project Structure

```
RESQ.AI/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API routes
│   │   ├── controllers/       # Request handlers
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Middleware
│   │   ├── utils/             # Utilities
│   │   └── server.js          # Entry point
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── components/        # Components
│   │   ├── pages/             # Pages
│   │   ├── services/          # API calls
│   │   ├── utils/             # Utilities
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
├── database/                   # Database config
│   └── schema.md
│
├── ml_models/                 # ML model info
│   └── README.md
│
├── docs/                      # Documentation
│   ├── API_DOCUMENTATION.md
│   └── PROJECT_STRUCTURE.md
│
├── progress/                  # Hackathon tracking
│
├── CHANGELOG.md
├── README.md
├── AGENTS.md
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend and install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Create environment configuration**
   ```bash
   cp .env.example .env
   ```
   
3. **Configure MongoDB and API keys in `.env`**
   ```env
   MONGODB_URI=mongodb://localhost:27017/resq_ai
   PORT=5000
   JWT_SECRET=your_secret_here
   ```

4. **Start the backend**
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend and install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

3. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Core Features

- ✅ **Real-time Risk Analysis** - Analyze environmental data instantly
- ✅ **Location-Based Assessment** - Get risks specific to your location
- ✅ **Multi-Disaster Support** - Flood, Heatwave, Drought, Wildfire, Hurricane, Storm
- ✅ **Preparedness Guides** - Before, During, After guidance
- ✅ **Alert System** - Real-time notifications for high-risk situations
- ✅ **User Dashboard** - Saved locations and alert history
- ✅ **Responsive Design** - Works on desktop and mobile

## 📊 Risk Assessment Process

1. **Data Collection** - Gather environmental data from APIs
2. **Risk Analysis** - Apply ML models to identify risks
3. **Risk Scoring** - Calculate risk scores (0-100 scale)
4. **Alert Generation** - Create alerts if threshold exceeded
5. **Guidance Provision** - Provide actionable preparedness steps

## 🔗 API Endpoints

See [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) for all endpoints.

Key endpoints:
- `GET /api/health` - Health check
- `POST /api/risks/analyze` - Analyze risk for location
- `GET /api/preparedness/guides` - Get preparedness guides

## 📚 Additional Resources

- [API Documentation](docs/API_DOCUMENTATION.md)
- [Database Schema](database/schema.md)
- [ML Models Documentation](ml_models/README.md)
- [Project Structure](docs/PROJECT_STRUCTURE.md)

## 👥 Team Members

All team members should:
1. Clone the repository
2. Create a feature branch
3. Make commits with format: `[HH:MM] Description`
4. Push to repository
5. Ensure at least one commit during the hackathon

## 📝 Hackathon Progress Checklist

- [ ] Project structure setup
- [ ] Backend API endpoints implemented
- [ ] Frontend UI components created
- [ ] MongoDB schema configured
- [ ] Environment variables configured
- [ ] API integration complete
- [ ] ML models integrated
- [ ] Testing completed
- [ ] Documentation updated
- [ ] Hourly commits made
- [ ] Progress files added
- [ ] CHANGELOG.md updated

---

**Last Updated**: March 27, 2026  
**Status**: ✅ Setup Complete - Ready for Development
