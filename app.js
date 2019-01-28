const puppeteer = require('puppeteer');

const generatePDF = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const options = {
        waitUntil: 'networkidle2'
    }

    await page.goto('http://ashishpatel.ml', options);
    await page.pdf({
        path: 'pdfs/website.pdf',
        format: 'A4'
    })

    await browser.close();
}

generatePDF();


// const takeScreenshot = async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     const options = {
//         path: 'images/screen.png',
//         fullPage: true,
//         omitBackground: true
//     };

//     await page.goto('http://ashishpatel.ml');
//     await page.waitForSelector('.social-me');
//     await page.screenshot(options);

//     await browser.close();
// }

// takeScreenshot();