// const puppeteer = require("puppeteer");

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://tender.pengadaan.com/tender");
//   await page.screenshot({ path: "screenshot.png" });
//   await browser.close();

// })();

// await page.type('input[name=search]', 'Adenosine triphosphate');
// await page.$eval("input[id=tbtitle-tender]", (el) => (el.value = "IT"));

// await page.click(".block-on-mobile");
// await page.waitForSelector("#boxTender");

// const text = await page.evaluate(() => {
//   const anchor = document.querySelector("#boxTender");
//   return anchor.textContent;
// });
// console.log(text);

const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://oss.go.id/informasi/kbli-berbasis-risiko/", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector("input[id=input-78]");
  await page.click("input[id=input-78]");
  await page.type("input[id=input-99]", "Jagung");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(3000);

  await page.waitForSelector(".searchKBLICardText");
  await page.screenshot({ path: "screenshot.png" });

  const resultsSelector = ".searchKBLICardText .oss-red--text";
  const text = await page.evaluate((resultsSelector) => {
    return [...document.querySelectorAll(resultsSelector)].map((anchor) => {
      const title = anchor.textContent.split("|")[0].trim();
      const link = anchor.parentElement.href;
      return `${title} - ${link}`;
    });
  }, resultsSelector);

  console.log(text);

  await browser.close();
})();
