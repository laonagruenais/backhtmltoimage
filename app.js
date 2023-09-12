const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur Node.js !");
});

app.post("/generate-image", async (req, res) => {
  const { htmlContent } = req.body;

  // Créez une instance de navigateur Puppeteer
  const browser = await puppeteer.launch();

  // Ouvrez une nouvelle page
  const page = await browser.newPage();

  // Chargez le contenu HTML à partir de la requête
  await page.setContent(htmlContent);

  // Capturez une capture d'écran de la page
  const screenshot = await page.screenshot();

  // Fermez le navigateur Puppeteer
  await browser.close();

  // Envoyez la capture d'écran en tant que réponse
  res.contentType("image/png");
  res.send(screenshot);
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
