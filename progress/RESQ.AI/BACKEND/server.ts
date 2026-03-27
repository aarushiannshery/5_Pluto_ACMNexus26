import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import cookieSession from "cookie-session";
import dotenv from "dotenv";

dotenv.config();

// Express and cookie-session types are handled by their respective @types packages

const app = express();
const PORT = 3000;

app.set('trust proxy', 1);

// Session configuration for iframe context
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'resq-ai-secret'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  secure: true,      // Required for SameSite=None
  sameSite: 'none',  // Required for cross-origin iframe
  httpOnly: true,
}));

app.use(express.json());

// --- GitHub OAuth Routes ---

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

app.get("/api/auth/github/url", (req, res) => {
  const redirectUri = `${process.env.APP_URL}/api/auth/github/callback`;
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID!,
    redirect_uri: redirectUri,
    scope: 'user:email',
  });
  res.json({ url: `https://github.com/login/oauth/authorize?${params}` });
});

app.get("/api/auth/github/callback", async (req, res) => {
  const { code } = req.query;
  
  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = tokenResponse.data.access_token;
    
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${accessToken}` },
    });

    // Store user info in session
    req.session!.user = {
      id: userResponse.data.id,
      login: userResponse.data.login,
      name: userResponse.data.name,
      avatar_url: userResponse.data.avatar_url,
    };

    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. This window should close automatically.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("GitHub OAuth Error:", error);
    res.status(500).send("Authentication failed");
  }
});

app.get("/api/auth/me", (req, res) => {
  res.json({ user: req.session?.user || null });
});

app.post("/api/auth/logout", (req, res) => {
  req.session = null;
  res.json({ success: true });
});

// --- Disaster Risk API ---

app.get("/api/risk", (req, res) => {
  const location = req.query.location || "Unknown";
  // Mock risk data
  const risks = [
    { type: "Flood Watch", level: "Medium Alert", probability: "64%", icon: "Waves" },
    { type: "Heatwave", level: "Low Risk", probability: "12%", icon: "Thermometer" },
    { type: "Wildfire", level: "High Alert", probability: "88%", icon: "Flame" },
  ];
  
  const randomRisk = risks[Math.floor(Math.random() * risks.length)];
  
  res.json({
    location,
    risk: randomRisk,
    stats: {
      heatwave: "72°F",
      humidity: "42%",
      wind: "12 mph",
    }
  });
});

// --- Vite Middleware ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
