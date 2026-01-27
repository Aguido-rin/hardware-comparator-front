export async function scrapeCoolboxSearch(page, task) {
  const url = `https://www.coolbox.pe/${encodeURIComponent(task.keyword)}`;

  console.log(`   (Coolbox) Navegando a: ${url}`);

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

  try {
    await page.waitForSelector(".vtex-search-result-3-x-galleryItem", { timeout: 15000 });
  } catch (e) {
    console.log("   ⚠️ Coolbox tardó en mostrar productos o cambió la estructura.");
    return [];
  }
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  await new Promise((r) => setTimeout(r, 2000));

  return await page.evaluate((category) => {
    const items = [];
    const cards = document.querySelectorAll("section.vtex-product-summary-2-x-container");

    cards.forEach((card) => {
      try {
        const titleEl = card.querySelector(".vtex-product-summary-2-x-productBrand");
        const linkEl = card.querySelector("a.vtex-product-summary-2-x-clearLink");
        const imgEl = card.querySelector("img.vtex-product-summary-2-x-image");
        const priceEl = card.querySelector(".coolboxpe-store-components-0-x-currencyInteger");

        if (titleEl && linkEl && priceEl) {
          const priceRaw = priceEl.innerText.replace(/\D/g, "");
          let finalUrl = linkEl.getAttribute("href");
          if (finalUrl && !finalUrl.startsWith("http")) {
            finalUrl = "https://www.coolbox.pe" + finalUrl;
          }

          items.push({
            title: titleEl.innerText.trim(),
            url: finalUrl,
            imageUrl: imgEl ? imgEl.src : null,
            price: parseFloat(priceRaw),
            categorySlug: category,
            storeName: "Coolbox",
          });
        }
      } catch (e) {}
    });
    return items.slice(0, 8);
  }, task.category);
}
