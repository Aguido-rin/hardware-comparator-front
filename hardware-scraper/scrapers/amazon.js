export async function scrapeAmazonSearch(page, task) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(task.keyword)}`;

  console.log(`   (Amazon) Navegando a: ${url}`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

  try {
    await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 10000 });
  } catch (e) {
    console.log("   ⚠️ Timeout esperando resultados visuales en Amazon.");
    return [];
  }

  return await page.evaluate((category) => {
    const items = [];
    const cards = document.querySelectorAll('[data-component-type="s-search-result"]');

    cards.forEach((card) => {
      try {
        const titleEl = card.querySelector("h2 span");
        const linkEl = card.querySelector(".s-title-instructions-style a") || card.querySelector("h2").closest("a");
        const imgEl = card.querySelector(".s-image");
        const priceEl = card.querySelector(".a-price .a-offscreen");

        if (titleEl && linkEl && priceEl) {
          const priceRaw = priceEl.innerText.replace(/[^0-9.]/g, "");
          let finalUrl = linkEl.getAttribute("href");
          if (!finalUrl.startsWith("http")) {
            finalUrl = "https://www.amazon.com" + finalUrl;
          }

          items.push({
            title: titleEl.innerText.trim(),
            url: finalUrl,
            imageUrl: imgEl ? imgEl.src : null,
            price: parseFloat(priceRaw),
            categorySlug: category,
            storeName: "Amazon",
          });
        }
      } catch (e) {}
    });
    return items.slice(0, 8);
  }, task.category);
}
