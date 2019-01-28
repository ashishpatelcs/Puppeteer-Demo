const puppeteer = require('puppeteer');

const takeScreenshot = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const options = {
        path: 'images/screen.png',
        fullPage: true,
        omitBackground: true
    };

    await page.goto('http://ashishpatel.ml');
    await page.waitForSelector('.social-me');
    await page.screenshot(options);

    await browser.close();
}

takeScreenshot();