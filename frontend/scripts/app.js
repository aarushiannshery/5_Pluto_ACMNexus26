document.addEventListener('DOMContentLoaded', () => {
  const scanBtn = document.getElementById('scanBtn');
  const riskProbability = document.getElementById('riskProbability');
  const threatLevel = document.getElementById('threatLevel');
  const predictedEvent = document.getElementById('predictedEvent');
  const riskCircle = document.getElementById('riskCircle');
  const coordinatesDisplay = document.getElementById('coordinatesDisplay');
  const alertBanner = document.getElementById('alertBanner');
  const alertMessageText = document.getElementById('alertMessageText');
  const systemStatusText = document.getElementById('systemStatusText');

  // AI Cards
  const shelterCapacityMetric = document.getElementById('shelterCapacityMetric');
  const waterLevelMetric = document.getElementById('waterLevelMetric');
  const gridStabilityMetric = document.getElementById('gridStabilityMetric');

  // --- API Configuration ---
  const API_BASE = 'http://localhost:5000/api';

  scanBtn.addEventListener('click', () => {
      systemStatusText.innerText = "Scanning 100m GPS...";
      
      if (!navigator.geolocation) {
          alert("Geolocation is not supported by your browser!");
          return;
      }

      navigator.geolocation.getCurrentPosition(
          async (position) => {
              const lat = position.coords.latitude.toFixed(4);
              const lon = position.coords.longitude.toFixed(4);
              coordinatesDisplay.innerText = `Radius Origin: ${lat}° N, ${lon}° E`;

              try {
                  // Fetch Real Data from Developer 2's backend
                  const riskRes = await fetch(`${API_BASE}/risk?lat=${lat}&lon=${lon}`);
                  const reportRes = await fetch(`${API_BASE}/report?lat=${lat}&lon=${lon}`);
                  
                  if (!riskRes.ok || !reportRes.ok) throw new Error('Backend offline');

                  const riskData = await riskRes.json();
                  const reportData = await reportRes.json();

                  updateUI(riskData, reportData);

              } catch (error) {
                  // MOCK DATA FALLBACK (Perfect for hackathons if Developer 2's backend is off!)
                  console.warn("Backend server not detected! Switching to Mock Presentation Mode for testing.");
                  systemStatusText.innerText = "[Offline] Simulation Mode";
                  
                  // Simulate an active Danger Event just for testing the UI
                  simulateEmergencyUI();
              }
          },
          (error) => {
              alert("Please allow location access to run the 100m Geolocation Radar!");
          }
      );
  });

  function updateUI(riskData, reportData) {
      // 1. Update Core Radar Text
      riskProbability.innerText = `${riskData.probability}%`;
      threatLevel.innerText = riskData.riskLevel;
      predictedEvent.innerText = riskData.disasterType;

      // 2. Clear old state classes
      riskCircle.className = 'risk-circle';

      // 3. Apply precise UI colors based on risk level
      if (riskData.probability > 75) {
          riskCircle.classList.add('state-red');
          systemStatusText.innerText = "CRITICAL LIMITS";
          systemStatusText.className = "state-red";
      } else if (riskData.probability >= 30) {
          riskCircle.classList.add('state-caution');
          systemStatusText.innerText = "System Warning";
          systemStatusText.className = "state-caution";
      } else {
          riskCircle.classList.add('state-safe');
          systemStatusText.innerText = "System Safe";
          systemStatusText.className = "state-safe";
      }

      // 4. Update the Grid Cards
      shelterCapacityMetric.innerText = reportData.shelterCapacity || '82';
      waterLevelMetric.innerText = reportData.waterLevel || 'Normal';
      gridStabilityMetric.innerText = reportData.gridStability || 'Stable';

      // 5. Check Emergency Banner Dropdown!
      handleAlertSystem(riskData.isAlertActive, riskData.alertMessage);
  }

  function handleAlertSystem(isActive, message) {
      if (isActive) {
          alertBanner.classList.remove('hidden');
          // Slight delay to allow display block to render before sliding in via CSS transform
          setTimeout(() => alertBanner.classList.add('show'), 50);
          alertMessageText.innerText = message;
      } else {
          alertBanner.classList.remove('show');
          setTimeout(() => alertBanner.classList.add('hidden'), 400); // give it time to slide up
      }
  }

  function simulateEmergencyUI() {
      // If the true Postgres/Express backend is turned off, this ensures the UI still looks incredible
      const mockRisk = {
          probability: 88,
          riskLevel: "CRITICAL",
          disasterType: "Flash Flood Warning",
          isAlertActive: true,
          alertMessage: "EMERGENCY: Immediate Flash Flood Warning risk within your 100m radius. Seek shelter immediately."
      };
      
      const mockReport = {
          shelterCapacity: 12,
          waterLevel: "Rising Fast",
          gridStability: "Failing"
      };

      updateUI(mockRisk, mockReport);
  }
});
