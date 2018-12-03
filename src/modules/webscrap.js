const puppeteer = require('puppeteer');

async function scraping() {
    
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 300,
        devtools: false
    });
    const page = await browser.newPage();
    await page.goto('http://ascii2hex.com');

    const entrada = await page.$eval('#converter_text', (el) => el.value = 'HI');
    console.log(`ENTRADA = ${entrada}`);

    await page.click('input[name="convert_from_text"]');

    const resultado = await page.$eval('#converter_binary', (el) => el.value);
    console.log(`RESULTADO = ${resultado}`);

    await page.waitForNavigation();

    await browser.close();
}

scraping();

//  export default scraping;