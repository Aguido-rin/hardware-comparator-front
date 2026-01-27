import puppeteer from "puppeteer";
import axios from "axios";
import { TASKS } from "./config/tasks.js";
import { scrapeAmazonSearch } from "./scrapers/amazon.js";
import { scrapeCoolboxSearch } from "./scrapers/coolbox.js";

const JAVA_IMPORT_URL = "http://localhost:8080/api/products/import";

async function startDiscovery() {
  console.log("🕵️ INICIANDO PROTOCOLO DE DESCUBRIMIENTO (MODULAR)...");

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--disable-notifications"],
  });

  const page = await browser.newPage();

  await page.setUserAgent({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0",
  });

  for (const task of TASKS) {
    let foundProducts = [];

    try {
      console.log(`\n------------------------------------------------`);
      console.log(`🚀 Misión: Buscar "${task.keyword}" en [${task.store}]`);

      if (task.store === "Amazon") {
        foundProducts = await scrapeAmazonSearch(page, task);
      } else if (task.store === "Coolbox") {
        foundProducts = await scrapeCoolboxSearch(page, task);
      }

      if (foundProducts.length > 0) {
        console.log(`📦 Encontrados ${foundProducts.length} items. Enviando a Java...`);
        await sendToJava(foundProducts);
      } else {
        console.warn("⚠️ No se encontraron productos o la tienda bloqueó el acceso.");
      }
    } catch (e) {
      console.error(`❌ Error crítico en misión "${task.keyword}":`, e.message);
    }

    await new Promise((r) => setTimeout(r, 4000));
  }

  console.log("\n🏁 Misiones completadas. Cerrando navegador.");
  await browser.close();
}

async function sendToJava(products) {
  try {
    const response = await axios.post(JAVA_IMPORT_URL, products);
    console.log(`✅ Java responde: ${response.data}`);
  } catch (error) {
    if (error.response) {
      console.error(`❌ Error Java (${error.response.status}):`, error.response.data);
    } else {
      console.error("❌ Error de red al conectar con Java:", error.message);
    }
  }
}

// EJECUTAR
startDiscovery();
