const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('API Works');
})

app.post('/', (req, res) => {
    let body = req.body;
    let html = body.html;
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': html.length,
        'Expires': new Date().toUTCString()
    });
    res.end(html);
})

app.listen(PORT, () => {
    console.log('Server running on http://localhost:'+PORT);
})

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