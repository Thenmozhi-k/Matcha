import express from "express";
import request from "request";
import cors from "cors";

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

app.get("/api/swap-quote", (req, res) => {
  const endpoint = "https://api.0x.org/swap/permit2/quote";
  const query = req.query;

  const apiUrl = `${endpoint}?${new URLSearchParams(query).toString()}`;

  request(
    {
      url: apiUrl,
      headers: {
        "0x-api-key": "a9e6734f-cd87-44c8-a4b5-a1c75945ae29",
        "0x-version": "v2",
        "Content-Type": "application/json",
      },
    },
    (error, response, body) => {
      if (error) {
        return res.status(500).json({ error: "Failed to fetch data" });
      }

      res.status(response.statusCode).send(body);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
